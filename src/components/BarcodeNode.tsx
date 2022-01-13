import { useState, useRef, useEffect } from "react";
import JsBarcode from "jsbarcode";
import styles from "../css/BarcodeNode.module.css";
import customMemo from "../hooks/customMemo";
import { BarcodeLayout } from "../types/index";

interface PropType {
  layoutDefinition: BarcodeLayout;
}

const BarcodeNode = ({ layoutDefinition }: PropType) => {
  const [_, forceUpdate] = useState<boolean>(false);
  const barcodeRef = useRef<SVGSVGElement>(null);

  const renderBarcode = (node: SVGSVGElement) => {
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
    if (barcodeRef.current) {
      renderBarcode(barcodeRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutDefinition]);

  return <svg ref={barcodeRef} className={styles.barcode}></svg>;
};

export default customMemo(BarcodeNode);
