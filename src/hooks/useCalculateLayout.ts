import { Node } from "yoga-layout-prebuilt";
import { handleFlex } from "../utils/handler";
import * as R from "ramda";
import { useRef } from "react";

function createYogaNodes(layoutDefinition) {
  const curNode = Node.create();
  handleFlex(curNode, layoutDefinition); // flex 값을 다 처리함
  (layoutDefinition.children || []).map(createYogaNodes).forEach((node, i) => {
    curNode.insertChild(node, i);
  });

  return curNode;
}

function getComputedLayout(node) {
  return {
    ...node.getComputedLayout(),
    curNode: node,
    children: Array.from({ length: node.getChildCount() }, (_, i) => i).map(
      (i) => getComputedLayout(node.getChild(i))
    ),
  };
}

function calculateLayout(layoutDefinition) {
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

const useCalculateLayout = (layoutDefinition) => {
  const previousRef = useRef<any>();
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
