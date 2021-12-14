import "./index.css";
import Box from "./Box";
import { StartSize } from "../../utils/constants";

const Editor = ({
  layoutDefinition,
  path,
  onUpdateSelectedPath,
  selectedPath,
}) => {
  return (
    <div className="Editor">
      <div className="BoxWrapper" style={StartSize}>
        <Box
          layoutDefinition={layoutDefinition}
          path={path}
          computedLayout={null}
          selectedPath={selectedPath}
          onUpdateSelectedPath={onUpdateSelectedPath}
        ></Box>
      </div>
    </div>
  );
};

export default Editor;
