import NodeWrapper from "./NodeWrapper";
import customMemo from "../hooks/customMemo";
import { ContainerLayout, PathType, CalcChildren } from "../types/index";

interface PropType {
  layoutDefinition: ContainerLayout;
  path: PathType;
  containerChildren: CalcChildren;
}

const ContainerNode = ({
  layoutDefinition,
  path,
  containerChildren,
}: PropType) => {
  return (containerChildren || []).map((child, index) => {
    if (layoutDefinition?.children[index]) {
      return (
        <NodeWrapper
          key={index}
          layoutDefinition={layoutDefinition.children[index]} // definition 상의 children
          computedLayout={child} // 여기서 layout 구한거
          path={[...path, "children", index]} // 여기까지 오는 path임
        />
      );
    } else {
      return null;
    }
  });
};

export default customMemo(ContainerNode);
