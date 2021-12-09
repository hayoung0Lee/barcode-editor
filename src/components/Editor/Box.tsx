import { useState, useEffect, useCallback } from "react";
import yoga, { Node } from "yoga-layout-prebuilt";
import JsBarcode from "jsbarcode";

interface PropType {
  layoutDefinition: any;
  computedLayout: any;
}

const Box = ({ layoutDefinition, computedLayout }: PropType) => {
  const [currentLayout, setCurrentLayout] = useState<any>();

  // barcode 생길때만
  const barcodeRef = useCallback((node) => {
    if (node && layoutDefinition.type === "barcode") {
      JsBarcode(node, "12345", {
        format: "pharmacode",
        width: 2, // 사이 간격을 말하는 듯
        height: 50, // 그리고 20 플러스 됨
      }); // 이거 크기를 동적으로 구할 수 있으려나?
    }
  }, []);

  useEffect(() => {
    // calculateLayout(layoutDefinition.flex);
  }, [layoutDefinition]);

  //   if (!currentLayout) {
  //     return <></>;
  //   }

  // 현재의 computedLayout
  const curComputedLayout = computedLayout || currentLayout; // props로 받은것(부모가 계산한 layout) | 없으면(root 같은 경우) 현재 자기 값.
  const { left, top, width, height, children } = curComputedLayout || {
    left: 0,
    top: 0,
    width: 200,
    height: 200,
  };

  return (
    <div
      className="Box"
      style={{
        left,
        top,
        width,
        height,
      }}
    >
      {layoutDefinition.type === "Barcode" && <svg ref={barcodeRef}></svg>}
      {(children || []).map((child, index) => {
        return (
          <Box
            key={index}
            layoutDefinition={layoutDefinition.children[index]} // definition 상의 children
            computedLayout={child} // 여기서 layout 구한거
          />
        );
      })}
    </div>
  );
};

export default Box;
