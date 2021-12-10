import { useState, useEffect, useCallback, useRef } from "react";
import yoga, { Node } from "yoga-layout-prebuilt";
import JsBarcode from "jsbarcode";

interface PropType {
  layoutDefinition: any;
  computedLayout: any;
}

function handleSize(size: any, zoom: any = 1): any {
  if (!size) {
    return "auto";
  }

  if (size.charAt(size.length - 1) === "%") {
    // percent인경우
    return size;
  }

  return `${parseInt(size) * zoom}`;
}

function setterName(key) {
  return `set${key[0].toUpperCase()}${key.substr(1)}`;
}

const Box = ({ layoutDefinition, computedLayout }: PropType) => {
  const [currentLayout, setCurrentLayout] = useState<any>();

  function setNodeSize(curNode: any, layoutDefinition: any) {
    const { type, flex } = layoutDefinition;
    // type별 크기 계산 로직 만들기
    if (type === "Container") {
      curNode[setterName("width")](handleSize(flex?.size?.width));
      curNode[setterName("height")](handleSize(flex?.size?.height));
    } else {
      curNode[setterName("width")](handleSize(flex?.size?.width));

      if (type === "Text") {
        if (flex?.size?.height) {
          curNode[setterName("height")](handleSize(flex?.size?.height));
        } else {
          curNode[setterName("height")](
            `${layoutDefinition.text.text_size * 1.2}`
          );
        }
      }
    }
  }

  function createYogaNodes(layoutDefinition) {
    const curNode = Node.create();
    const { flex } = layoutDefinition;
    setNodeSize(curNode, layoutDefinition);

    // size와 관련되지 않은 다른 속성들.
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
            handleSize(flex[key][dir]) // 값이 있다면 일단 px인걸로 나중에 처리하게
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
      handleSize(layoutDefinition.flex?.size?.width),
      handleSize(layoutDefinition.flex?.size?.height),
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

  const barcodeRef = useCallback(
    (node) => {
      if (node && layoutDefinition.type === "Barcode") {
        JsBarcode(node, "12345", {
          format: "code128",
          textMargin: 0,
          margin: 0,
          displayValue: false,
        });
      }
      // setUpdate((prev) => !prev);
    },
    [height]
  );

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
        <svg ref={barcodeRef} className="Barcode"></svg>
      )}
      {layoutDefinition?.text?.text && (
        <div
          style={{
            fontSize: layoutDefinition.text.text_size,
            lineHeight: 1.2,
            textAlign: layoutDefinition.text.text_align,
            fontFamily: layoutDefinition.text.font_family,
            fontWeight: layoutDefinition.text.font_weight,
          }}
        >
          {layoutDefinition.text.text}
        </div>
      )}
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
