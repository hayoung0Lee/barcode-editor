import React, { useState, useEffect, useCallback } from "react";
import yoga, { Node } from "yoga-layout-prebuilt";
import JsBarcode from "jsbarcode";
import * as R from "ramda";

interface PropType {
  layoutDefinition: any;
  computedLayout: any;
  path: any; // 여기까지 오는 path
  onUpdateSelectedPath: any;
  selectedPath: any;
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
}: PropType) => {
  // children 변경하고, 상위 컴포넌트에 뭐 변하면 다시 계산할 수도 있는데, React.memo를 써야할지도?
  // 근데 내려줄때 json object 에 걍 reference로 넘겨주는건데 어떻게 처리하려나
  const [currentLayout, setCurrentLayout] = useState<any>();

  // console.log("Box", layoutDefinition);
  console.log("Path", path);

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

  function handleFlex(curNode, layoutDefinition) {
    const { flex } = layoutDefinition;

    setNodeSize(curNode, layoutDefinition);

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
    curYogaNode
      .calculateLayout
      // handleSize(layoutDefinition.flex?.size?.width),
      // handleSize(layoutDefinition.flex?.size?.height)
      // layoutDefinition.flex?.flex_direction || yoga.DIRECTION_LTR // width, height는 꼭 있고 direction은 없으면 LTR
      ();
    setCurrentLayout(getComputedLayout(curYogaNode));
  }

  useEffect(() => {
    if (layoutDefinition) {
      calculateLayout(layoutDefinition);
    }
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

  if (!layoutDefinition) {
    return <div></div>;
  }

  return (
    <div
      className={`Box ${R.equals(path, selectedPath) ? "selected" : ""}`}
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
            path={[...path, "children", index]} // 여기까지 오는 path임
            onUpdateSelectedPath={onUpdateSelectedPath}
            selectedPath={selectedPath}
          />
        );
      })}
    </div>
  );
};

// React.memo는 shallow comparison를 한다. 두번째 인자로 custom comparison 로직을 추가할 수 있다. https://blog.openreplay.com/improving-react-application-performance-react-memo-vs-usememo
// Shallow compare does check for equality. When comparing scalar values (numbers, strings) it compares their values. When comparing objects, it does not compare their attributes - only their references are compared (e.g. "do they point to same object?").
// 지금 구조에는 attribute 뭐 바뀌면 걔를 싹 갈아쳐야할것같은디? 그래도 전체 다 계산하는건 오바니까 일단 add, remove 테스트할때는 이렇게 둔다.
// 이거 뭐 업데이트되면 업데이트됬다고 해쉬같은걸로 비교하게 못하나
// 이거 Ramda쓰면 다 바뀌기 때매 머 다른걸로 비교해야함 지금 렌더링 장난아님~
export default React.memo(Box);
