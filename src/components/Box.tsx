import React, { useState, useEffect, useCallback, useRef } from "react";
import yoga, { Node } from "yoga-layout-prebuilt";
import JsBarcode from "jsbarcode";
import * as R from "ramda";
import styles from "./Box.module.css";

interface PropType {
  layoutDefinition: any;
  computedLayout: any;
  path: any; // 여기까지 오는 path
  onUpdateSelectedPath: any;
  selectedPath: any;
  onDragBox: any;
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

const Box = ({
  layoutDefinition,
  path,
  computedLayout,
  onUpdateSelectedPath,
  selectedPath,
  onDragBox,
}: PropType) => {
  // children 변경하고, 상위 컴포넌트에 뭐 변하면 다시 계산할 수도 있는데, React.memo를 써야할지도?
  // 근데 내려줄때 json object 에 걍 reference로 넘겨주는건데 어떻게 처리하려나
  const [currentLayout, setCurrentLayout] = useState<any>();
  const [_, forceUpdate] = useState<any>(false);
  const startRef = useRef<any>({ x: undefined, y: undefined });

  function setNodeSize(curNode: any, layoutDefinition: any) {
    const { type, flex } = layoutDefinition;
    // type별 크기 계산 로직 만들기
    if (type === "Container" || type === "Barcode") {
      curNode[setterName("width")](handleSize(flex?.size?.width));
      curNode[setterName("height")](handleSize(flex?.size?.height));
    } else {
      // text도 원래거에 채워 넣도록 구현하는게 나을것같기도?
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

  function handleFlex(curNode, layoutDefinition) {
    const { flex } = layoutDefinition;

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

    // size와 관련되지 않은 다른 속성들.
    if (flex?.flex_direction) {
      const flexDir = {
        row: yoga.FLEX_DIRECTION_ROW,
        "row-reverse": yoga.FLEX_DIRECTION_ROW_REVERSE,
        column: yoga.FLEX_DIRECTION_COLUMN,
        "column-reverse": yoga.FLEX_DIRECTION_COLUMN_REVERSE,
      };
      curNode[setterName("flexDirection")](flexDir[flex.flex_direction]);
    }

    if (flex?.flex_grow) {
      // number
      curNode[setterName("flexGrow")](flex.flex_grow);
    }

    if (flex?.align_items) {
      const flexAlignItems = {
        "flex-start": yoga.ALIGN_FLEX_START,
        "flex-end": yoga.ALIGN_FLEX_END,
        center: yoga.ALIGN_CENTER,
        baseline: yoga.ALIGN_BASELINE,
        stretch: yoga.ALIGN_STRETCH,
      };
      curNode[setterName("alignItems")](flexAlignItems[flex.align_items]);
    }

    if (flex?.justify_content) {
      const flexJustifyContent = {
        "flex-start": yoga.JUSTIFY_FLEX_START,
        "flex-end": yoga.JUSTIFY_FLEX_END,
        center: yoga.JUSTIFY_CENTER,
        "space-between": yoga.JUSTIFY_SPACE_BETWEEN,
        "space-around": yoga.JUSTIFY_SPACE_AROUND,
        "space-evenly": yoga.JUSTIFY_SPACE_EVENLY,
      };
      curNode[setterName("justifyContent")](
        flexJustifyContent[flex.justify_content]
      );
    }

    if (flex?.align_self) {
      const flexAlignSelf = {
        auto: yoga.ALIGN_AUTO,
        "flex-start": yoga.ALIGN_FLEX_START,
        "flex-end": yoga.ALIGN_FLEX_END,
        center: yoga.ALIGN_CENTER,
        baseline: yoga.ALIGN_BASELINE,
        stretch: yoga.ALIGN_STRETCH,
      };

      curNode[setterName("alignSelf")](flexAlignSelf[flex.align_self]);
    }

    // flex처리
    curNode.setDisplay(yoga.DISPLAY_FLEX); // 이거 당연한거아닌가?
    curNode.setFlexWrap(yoga.WRAP_WRAP); // 필요한건가? 일단 넣어봄
  }

  function createYogaNodes(layoutDefinition) {
    const curNode = Node.create();

    // node의 크기 계산.
    // type별로 다르게 계산, text는 글자크기에 맞춰서 비례한다. barcode는 무조건 stretch로 하거나 그럴듯.
    setNodeSize(curNode, layoutDefinition);

    // setFlex
    handleFlex(curNode, layoutDefinition);

    // handleChildren
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
    curYogaNode.calculateLayout();
    setCurrentLayout(getComputedLayout(curYogaNode));
  }

  useEffect(() => {
    calculateLayout(layoutDefinition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <div
      className={`${styles.box} ${
        R.equals(path, selectedPath) ? styles.selected : ""
      }`}
      style={{
        left,
        top,
        width,
        height,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onUpdateSelectedPath(path);
      }}
      draggable={true}
      onDragStart={(e) => {
        startRef.current = { x: e.clientX, y: e.clientY };
        requestAnimationFrame(() => {
          const element: any = e.target;
          element.classList.add(styles.hide);
        });
      }}
      onDragEnd={(e) => {
        onDragBox({
          x: e.clientX - startRef.current.x,
          y: e.clientY - startRef.current.y,
        });
        const element: any = e.target;
        element.classList.remove(styles.hide);
      }}
    >
      {layoutDefinition?.type === "Barcode" && (
        <svg ref={barcodeRef} className={styles.barcode}></svg>
      )}
      {layoutDefinition?.text?.text && (
        <div
          style={{
            fontSize: layoutDefinition.text.text_size,
            lineHeight: 1.2,
            textAlign: layoutDefinition.text.text_align,
            fontFamily: layoutDefinition.text.font_family,
            fontWeight: layoutDefinition.text.font_weight,
            WebkitLineClamp: layoutDefinition.text.text_max_line,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {layoutDefinition.text.text}
        </div>
      )}

      {(children || []).map((child, index) => {
        if (layoutDefinition?.children[index]) {
          return (
            <Box
              key={index}
              layoutDefinition={layoutDefinition.children[index]} // definition 상의 children
              computedLayout={child} // 여기서 layout 구한거
              path={[...path, "children", index]} // 여기까지 오는 path임
              onUpdateSelectedPath={onUpdateSelectedPath}
              selectedPath={selectedPath}
              onDragBox={onDragBox}
            />
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default React.memo(Box);
