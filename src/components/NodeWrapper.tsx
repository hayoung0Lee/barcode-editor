import { forwardRef, useContext } from "react";
import BarcodeNode from "./BarcodeNode";
import TextNode from "./TextNode";
import ContainerNode from "./ContainerNode";
import Draggable from "./Draggable";
import useCalculateLayout from "../hooks/useCalculateLayout";
import { LabelContext, SelectedContext } from "../utils/LabelContext";
import * as R from "ramda";
import customMemo from "../hooks/customMemo";

const NodeWrapper = forwardRef((props: any, ref: any) => {
  const { path, computedLayout }: any = props;
  const [selectedPath, onUpdateSelectedPath] = useContext(SelectedContext);
  const labelState = useContext<any>(LabelContext)[0];
  const layoutDefinition: any = R.path([...path], labelState);
  const currentLayout = useCalculateLayout(layoutDefinition);
  const curComputedLayout = computedLayout || currentLayout; // props로 받은것(부모가 계산한 layout) | 없으면(root 같은 경우) 현재 자기 값.
  const { left, top, width, height, children } = curComputedLayout;
  const isRoot = path.length === 0;

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
          containerChildren={children}
        />
      )}
    </Draggable>
  );
});

export default customMemo(NodeWrapper);
