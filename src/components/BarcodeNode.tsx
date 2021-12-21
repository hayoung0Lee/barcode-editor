import { useState, useCallback } from "react";
import JsBarcode from "jsbarcode";
import styles from "../css/BarcodeNode.module.css";

const BarcodeNode = ({ layoutDefinition }: any) => {
  const [_, forceUpdate] = useState<any>(false);

  const barcodeRef = useCallback(
    (node) => {
      if (node && layoutDefinition && layoutDefinition.type === "Barcode") {
        JsBarcode(node, layoutDefinition.barcode.text, {
          format: "code128",
          textMargin: 0,
          margin: 0,
          displayValue: false,
        });
        forceUpdate((prev) => !prev);
      }
    },
    [layoutDefinition]
  );

  return <svg ref={barcodeRef} className={styles.barcode}></svg>;
};

export default BarcodeNode;
