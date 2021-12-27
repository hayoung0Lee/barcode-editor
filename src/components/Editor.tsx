import styles from "../css/Editor.module.css";
import NodeWrapper from "./NodeWrapper";
import { useRef, useLayoutEffect, useContext } from "react";
import { LabelContext } from "../utils/LabelContext";

const Editor = () => {
  const labelState = useContext<any>(LabelContext)[0];
  const wrapperNode = useRef<any>();
  const rootNode = useRef<any>();

  useLayoutEffect(() => {
    const nodeSize = rootNode.current.getBoundingClientRect();
    wrapperNode.current.style.width = `${nodeSize.width}px`;
    wrapperNode.current.style.height = `${nodeSize.height}px`;
  }, [labelState.flex.size]);

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
          path={[]}
          computedLayout={null}
        ></NodeWrapper>
      </div>
    </div>
  );
};

export default Editor;
