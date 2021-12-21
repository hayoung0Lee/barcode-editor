import React from "react";
import BarcodeNode from "./BarcodeNode";
import TextNode from "./TextNode";
import ContainerNode from "./ContainerNode";
import Draggable from "./Draggable";
import useCalculateLayout from "../hooks/useCalculateLayout";

const NodeWrapper = ({
  layoutDefinition,
  path,
  computedLayout,
  onUpdateSelectedPath,
  selectedPath,
  onDragBox,
}: any) => {
  const currentLayout = useCalculateLayout(layoutDefinition);
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

export default React.memo(NodeWrapper);
