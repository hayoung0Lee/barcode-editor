import NodeWrapper from "./NodeWrapper";
import { memo } from "react";

const ContainerNode = ({
  layoutDefinition,
  path,
  selectedPath,
  onUpdateSelectedPath,
  containerChildren,
}) => {
  return (containerChildren || []).map((child, index) => {
    if (layoutDefinition?.children[index]) {
      return (
        <NodeWrapper
          key={index}
          layoutDefinition={layoutDefinition.children[index]} // definition 상의 children
          computedLayout={child} // 여기서 layout 구한거
          path={[...path, "children", index]} // 여기까지 오는 path임
          onUpdateSelectedPath={onUpdateSelectedPath}
          selectedPath={selectedPath}
        />
      );
    } else {
      return null;
    }
  });
};

export default memo(ContainerNode);
