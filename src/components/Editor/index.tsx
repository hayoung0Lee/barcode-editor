import "./index.css";
import Box from "./Box";
import { barcode } from "../../sample";

const Editor = () => (
  <div className="Editor">
    <Box layoutDefinition={barcode} computedLayout={null}></Box>
  </div>
);

export default Editor;
