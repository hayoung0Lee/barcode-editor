import "./index.css";
import Box from "./Box";
import { StartSize } from "../../utils/constants";

const Editor = ({ layoutDefinition }) => {
  return (
    <div className="Editor">
      <div className="BoxWrapper" style={StartSize}>
        <Box layoutDefinition={layoutDefinition} computedLayout={null}></Box>
      </div>
    </div>
  );
};

export default Editor;
