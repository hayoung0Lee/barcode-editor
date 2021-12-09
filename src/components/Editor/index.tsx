import "./index.css";
import Box from "./Box";
import { barcode } from "../../sample";

const Editor = () => (
  <div className="Editor">
    <Box
      layoutDefinition={{
        type: "Container",
        flex: { size: { width: "50", height: "40" } },
        children: [barcode],
      }}
      computedLayout={null}
    ></Box>
  </div>
);

export default Editor;
