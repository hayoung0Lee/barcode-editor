import "./index.css";
import Box from "./Box";
import { barcode } from "../../sample";

// 숫자는 다 px이다.
const StartSize = { width: "300px", height: "300px" };

const Editor = () => (
  <div className="Editor">
    <div className="BoxWrapper" style={StartSize}>
      <Box
        layoutDefinition={{
          type: "Container",
          flex: { size: StartSize },
          children: [barcode],
        }}
        computedLayout={null}
      ></Box>
    </div>
  </div>
);

export default Editor;
