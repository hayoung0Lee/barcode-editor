import { forwardRef, memo } from "react";
import BarcodeNode from "./BarcodeNode";
import TextNode from "./TextNode";
import ContainerNode from "./ContainerNode";
import Draggable from "./Draggable";
import useCalculateLayout from "../hooks/useCalculateLayout";

const NodeWrapper = forwardRef((props: any, ref: any) => {
  const {
    labelState,
    path,
    computedLayout,
    onUpdateSelectedPath,
    selectedPath,
    onDragBox,
  }: any = props;
  const layoutDefinition = labelState[path];
  const currentLayout = useCalculateLayout(layoutDefinition);
  const curComputedLayout = computedLayout || currentLayout; // props로 받은것(부모가 계산한 layout) | 없으면(root 같은 경우) 현재 자기 값.
  const { left, top, width, height, children } = curComputedLayout;
  const isRoot = path === 0;

  return (
    <Draggable
      ref={isRoot ? ref : null}
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
});

export default memo(NodeWrapper);
