import React, { useRef } from "react";
import { Node } from "yoga-layout-prebuilt";
import BarcodeNode from "./BarcodeNode";
import TextNode from "./TextNode";
import ContainerNode from "./ContainerNode";
import * as R from "ramda";
import { handleFlex } from "../utils/handler";
import Draggable from "./Draggable";
interface PropType {
  layoutDefinition: any;
  computedLayout: any;
  path: any; // 여기까지 오는 path
  onUpdateSelectedPath: any;
  selectedPath: any;
  onDragBox: any;
}

const useExpensiveFunc = (
  nextLayoutDefinition,
  compare,
  expensiveFunc
): any => {
  // 최적화를 더 해보자
  // const currentLayout = useMemo(
  //   () => calculateLayout(layoutDefinition),
  //   [layoutDefinition]
  // );

  const previousRef = useRef<any>();
  if (!previousRef?.current) {
    previousRef.current = [
      nextLayoutDefinition,
      expensiveFunc(nextLayoutDefinition),
    ];
    return previousRef.current[1];
  }
  if (compare(previousRef.current[0], nextLayoutDefinition)) {
    // console.log("헌거 calc", nextLayoutDefinition);
    return previousRef.current[1];
  } else {
    previousRef.current = [
      nextLayoutDefinition,
      expensiveFunc(nextLayoutDefinition),
    ];
    return previousRef.current[1];
  }
};

const Box = ({
  layoutDefinition,
  path,
  computedLayout,
  onUpdateSelectedPath,
  selectedPath,
  onDragBox,
}: PropType) => {
  function createYogaNodes(layoutDefinition) {
    const curNode = Node.create();
    handleFlex(curNode, layoutDefinition); // flex 값을 다 처리함
    (layoutDefinition.children || [])
      .map(createYogaNodes)
      .forEach((node, i) => {
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

  // 그래도 얘가 더 빠름. react children들은 왜 re-render 하는건지 모르겠음
  const currentLayout = useExpensiveFunc(
    layoutDefinition,
    R.equals,
    calculateLayout
  );

  // 현재의 computedLayout
  const curComputedLayout = computedLayout || currentLayout; // props로 받은것(부모가 계산한 layout) | 없으면(root 같은 경우) 현재 자기 값.
  const { left, top, width, height, children } = curComputedLayout;

  return (
    <Draggable
      left={left}
      top={top}
      width={width}
      height={height}
      path={path}
      onUpdateSelectedPath={onUpdateSelectedPath}
      selectedPath={selectedPath}
      onDragBox={onDragBox}
    >
      {layoutDefinition?.type === "Barcode" && (
        <BarcodeNode layoutDefinition={layoutDefinition} />
      )}
      {layoutDefinition?.type === "Text" && (
        <TextNode layoutDefinition={layoutDefinition} />
      )}
      {layoutDefinition?.type === "Container" && (
        <ContainerNode
          layoutDefinition={layoutDefinition}
          path={path}
          selectedPath={selectedPath}
          onDragBox={onDragBox}
          onUpdateSelectedPath={onUpdateSelectedPath}
          containerChildren={children}
        />
      )}
    </Draggable>
  );
};

export default React.memo(Box);
