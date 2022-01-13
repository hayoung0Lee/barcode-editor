import { Node, YogaNode } from "yoga-layout-prebuilt";
import { handleFlex } from "../utils/handler";
import * as R from "ramda";
import { useRef } from "react";
import { LayoutDefinition, ContainerLayout } from "../types/index";

export type CalculatedLayoutType =
  | {
      left: number;
      top: number;
      width: number;
      height: number;
    }
  | { children: CalculatedLayoutType[]; curNode: YogaNode; [key: string]: any };

function instanceOfContainer(
  object: LayoutDefinition
): object is ContainerLayout {
  return object.type === "Container";
}

function createYogaNodes(layoutDefinition: LayoutDefinition): YogaNode {
  const curNode = Node.create();
  handleFlex(curNode, layoutDefinition); // flex 값을 다 처리함

  if (instanceOfContainer(layoutDefinition)) {
    (layoutDefinition.children || [])
      .map(createYogaNodes)
      .forEach((node, i) => {
        curNode.insertChild(node, i);
      });
  }

  return curNode;
}

function getComputedLayout(node: YogaNode) {
  return {
    ...node.getComputedLayout(),
    curNode: node,
    children: Array.from({ length: node.getChildCount() }, (_, i) => i).map(
      (i) => getComputedLayout(node.getChild(i))
    ),
  };
}

function calculateLayout(
  layoutDefinition: LayoutDefinition
): CalculatedLayoutType {
  if (layoutDefinition) {
    const curYogaNode = createYogaNodes(layoutDefinition);
    curYogaNode.calculateLayout();
    return getComputedLayout(curYogaNode);
  } else {
    return {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    };
  }
}

const useCalculateLayout = (
  layoutDefinition: LayoutDefinition
): CalculatedLayoutType => {
  const previousRef = useRef<[LayoutDefinition, CalculatedLayoutType]>();

  if (!previousRef?.current) {
    previousRef.current = [layoutDefinition, calculateLayout(layoutDefinition)];
  }

  if (R.equals(previousRef.current[0], layoutDefinition)) {
    return previousRef.current[1];
  } else {
    previousRef.current = [layoutDefinition, calculateLayout(layoutDefinition)];
    return previousRef.current[1];
  }
};

export default useCalculateLayout;
