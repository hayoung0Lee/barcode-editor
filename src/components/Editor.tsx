import styles from "../css/Editor.module.css";
import Box from "./Box";

const Editor = ({
  layoutDefinition,
  path,
  onUpdateSelectedPath,
  selectedPath,
  onDragBox,
}) => {
  return (
    <div className={styles.editor}>
      <div
        style={{
          width: `${
            isNaN(layoutDefinition.flex.size.width)
              ? 300
              : layoutDefinition.flex.size.width
          }px`,
          height: `${
            isNaN(layoutDefinition.flex.size.height)
              ? 300
              : layoutDefinition.flex.size.height
          }px`,
          position: "relative",
          backgroundColor: "white",
        }}
      >
        <Box
          layoutDefinition={layoutDefinition}
          path={path}
          computedLayout={null}
          selectedPath={selectedPath}
          onUpdateSelectedPath={onUpdateSelectedPath}
          onDragBox={onDragBox}
        ></Box>
      </div>
    </div>
  );
};

export default Editor;
