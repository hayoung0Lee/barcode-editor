import React from "react";
import BarcodeNode from "./BarcodeNode";
import TextNode from "./TextNode";
import ContainerNode from "./ContainerNode";
import Draggable from "./Draggable";
import useCalculateLayout from "../hooks/useCalculateLayout";
interface PropType {
  layoutDefinition: any;
  computedLayout: any;
  path: any; // 여기까지 오는 path
  onUpdateSelectedPath: any;
  selectedPath: any;
  onDragBox: any;
}

const NodeWrapper = ({
  layoutDefinition,
  path,
  computedLayout,
  onUpdateSelectedPath,
  selectedPath,
  onDragBox,
}: PropType) => {
  // 그래도 얘가 더 빠름. react children들은 왜 re-render 하는건지 모르겠음
  const currentLayout = useCalculateLayout(layoutDefinition);
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

export default React.memo(NodeWrapper);
