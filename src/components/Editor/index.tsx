import "./index.css";
import Box from "./Box";
import { StartSize } from "../../utils/constants";
import { useState } from "react";

const Editor = ({ layoutDefinition }) => {
  const [check, setCheck] = useState(false);

  console.log("check");
  return (
    <div className="Editor" onClick={() => setCheck((prev) => !prev)}>
      <div className="BoxWrapper" style={StartSize}>
        <Box layoutDefinition={layoutDefinition} computedLayout={null}></Box>
      </div>
    </div>
  );
};

export default Editor;
