import styles from "../css/Editor.module.css";
import NodeWrapper from "./NodeWrapper";
import { useRef, useLayoutEffect } from "react";

const Editor = ({
  layoutDefinition,
  path,
  onUpdateSelectedPath,
  selectedPath,
  onDragBox,
}) => {
  const wrapperNode = useRef<any>();
  const rootNode = useRef<any>();

  useLayoutEffect(() => {
    const nodeSize = rootNode.current.getBoundingClientRect();
    wrapperNode.current.style.width = `${nodeSize.width}px`;
    wrapperNode.current.style.height = `${nodeSize.height}px`;
  }, [layoutDefinition]);

  return (
    <div className={styles.editor}>
      <div
        ref={wrapperNode}
        style={{
          position: "relative",
          backgroundColor: "white",
        }}
      >
        <NodeWrapper
          ref={rootNode}
          layoutDefinition={layoutDefinition}
          path={path}
          computedLayout={null}
          selectedPath={selectedPath}
          onUpdateSelectedPath={onUpdateSelectedPath}
          onDragBox={onDragBox}
        ></NodeWrapper>
      </div>
    </div>
  );
};

export default Editor;
