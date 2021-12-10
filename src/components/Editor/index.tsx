import "./index.css";
import Box from "./Box";
import { barcode } from "../../sample";

// 숫자는 다 px이다.
const Editor = () => (
  <div className="Editor">
    <Box
      layoutDefinition={{
        type: "Container",
        flex: { size: { width: "100", height: "80" } },
        children: [barcode],
      }}
      computedLayout={null}
    ></Box>
  </div>
);

export default Editor;
