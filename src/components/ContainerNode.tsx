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
    const nodeId = layoutDefinition?.children[index];
    if (nodeId) {
      return (
        <NodeWrapper
          key={nodeId}
          layoutDefinition={layoutDefinition[nodeId]} // definition 상의 children
          computedLayout={child} // 여기서 layout 구한거
          path={nodeId} // 여기까지 오는 path임
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
