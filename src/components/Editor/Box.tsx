import { useState, useEffect, useCallback } from "react";
import yoga, { Node } from "yoga-layout-prebuilt";
import JsBarcode from "jsbarcode";

interface PropType {
  layoutDefinition: any;
  computedLayout: any;
}

function convertToPx(pt: any): any {
  if (!pt) {
    return "auto";
  }

  if (pt.charAt(pt.length - 1) === "%") {
    return pt;
  }

  return `${parseInt(pt) * (96 / 72)}`;
}

const Box = ({ layoutDefinition, computedLayout }: PropType) => {
  const [currentLayout, setCurrentLayout] = useState<any>();

  // barcode 생길때만
  const barcodeRef = useCallback((node) => {
    if (node && layoutDefinition.type === "Barcode") {
      JsBarcode(node, "12345", {
        format: "code128",
        width: 0.5, // 사이 간격을 말하는 듯
        height: 20, // 높이 동일하게 주도록 계산해야할듯.
        textMargin: 0,
        margin: 0,
        displayValue: false,
      }); // 이거 크기를 동적으로 구할 수 있으려나?
    }
  }, []);

  function setterName(key) {
    return `set${key[0].toUpperCase()}${key.substr(1)}`;
  }

  function createYogaNodes(layoutDefinition) {
    const curNode = Node.create();
    const { type, flex } = layoutDefinition;

    // auto
    // type별 크기 계산 로직 만들기
    if (type === "Container") {
      curNode[setterName("width")](convertToPx(flex?.size?.width));
      curNode[setterName("height")](convertToPx(flex?.size?.height));
    } else if (type === "Text") {
      curNode[setterName("width")]("auto");
      curNode[setterName("height")](
        `${parseInt(layoutDefinition.text.text_size) + 1}`
      );
    } else if (type === "Barcode") {
      curNode[setterName("width")]("auto");
      curNode[setterName("height")]("20");
    } else if (type === "Qrcode") {
      //qrcode
    }

    if (flex?.flex_direction) {
      curNode[setterName("flexDirection")](flex.flex_direction);
    }

    if (flex?.flex_grow) {
      curNode[setterName("flexGrow")](flex.flex_grow);
    }

    // padding, margin, postion, border같은것 처리
    ["margin", "padding"].forEach((key) => {
      ["top", "right", "bottom", "left"].forEach((dir) => {
        try {
          curNode[setterName(key)](
            yoga[`EDGE_${dir.toUpperCase()}`],
            flex[key][dir]
          );
        } catch (e) {}
      });
    });

    // flex처리
    curNode.setDisplay(yoga.DISPLAY_FLEX); // 이거 당연한거아닌가?

    // 해당 Node의 children을 여기에 넣어서 계산을 한다.
    (layoutDefinition.children || [])
      .map(createYogaNodes)
      .forEach((node, i) => {
        curNode.insertChild(node, i);
      });

    return curNode;
  }

  function getComputedLayout(node) {
    return {
      ...node.getComputedLayout(),
      curNode: node,
      children: Array.from({ length: node.getChildCount() }, (_, i) => i).map(
        (i) => getComputedLayout(node.getChild(i))
      ),
    };
  }

  function calculateLayout(layoutDefinition) {
    const curYogaNode = createYogaNodes(layoutDefinition);
    curYogaNode.calculateLayout(
      convertToPx(layoutDefinition.flex?.size?.width),
      convertToPx(layoutDefinition.flex?.size?.height),
      layoutDefinition.flex?.flex_direction || yoga.DIRECTION_LTR // width, height는 꼭 있고 direction은 없으면 LTR
    );
    setCurrentLayout(getComputedLayout(curYogaNode));
  }

  useEffect(() => {
    calculateLayout(layoutDefinition);
  }, [layoutDefinition]);

  // 현재의 computedLayout
  const curComputedLayout = computedLayout || currentLayout; // props로 받은것(부모가 계산한 layout) | 없으면(root 같은 경우) 현재 자기 값.
  const { left, top, width, height, children } = curComputedLayout || {
    left: 0,
    top: 0,
    width: 0,
    height: 0,
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
      {layoutDefinition.type === "Barcode" && (
        <div>
          <svg ref={barcodeRef}></svg>
        </div>
      )}
      {layoutDefinition?.text?.text && <div>{layoutDefinition.text.text}</div>}
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
