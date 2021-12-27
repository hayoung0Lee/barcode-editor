import { useState, useRef, useEffect } from "react";
import JsBarcode from "jsbarcode";
import styles from "../css/BarcodeNode.module.css";
import customMemo from "../hooks/customMemo";

const BarcodeNode = ({ layoutDefinition }: any) => {
  const [_, forceUpdate] = useState<any>(false);
  const barcodeRef = useRef(null);

  const renderBarcode = (node) => {
    if (node && layoutDefinition && layoutDefinition.type === "Barcode") {
      JsBarcode(node, layoutDefinition.barcode.text, {
        format: "code128",
        textMargin: 0,
        margin: 0,
        displayValue: false,
      });
    }
    forceUpdate((prev) => !prev);
  };

  useEffect(() => {
    renderBarcode(barcodeRef.current);
  }, [layoutDefinition]);

  return <svg ref={barcodeRef} className={styles.barcode}></svg>;
};

export default customMemo(BarcodeNode);
