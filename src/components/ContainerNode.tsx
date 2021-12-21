import NodeWrapper from "./NodeWrapper";

const ContainerNode = ({
  layoutDefinition,
  path,
  selectedPath,
  onDragBox,
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
          onDragBox={onDragBox}
        />
      );
    } else {
      return null;
    }
  });
};

export default ContainerNode;
