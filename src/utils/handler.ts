import * as R from "ramda";
import { font } from "./constants";
import yoga from "yoga-layout-prebuilt";

function appendAtPath(state, { selectedPath, node }) {
  console.log("appendAtPath", selectedPath);
  try {
    const newNodeId = state.nodeCounter;
    return {
      ...state,
      nodeCounter: newNodeId + 1,
      [selectedPath]: {
        ...state[selectedPath],
        children: [...state[selectedPath].children, newNodeId],
      },
      [newNodeId]: node,
    };
  } catch (err) {
    console.error("appendAtPath에서 에러남", err);
    return state;
  }
}

function removeAtPath(state, { selectedPath }) {
  try {
    return R.dissocPath(selectedPath, state);
  } catch (err) {
    console.error("removeAtPath에서 에러남", err);
    return state;
  }
}

function updateAttr(state, { selectedPath, attr, value }) {
  try {
    // root의 경우 [] 이렇게라 지울수가 없구만. ["children" 0] 이렇게면 그 path를 지운다.
    const pathToAttr = [...selectedPath, "flex", attr];
    return R.assocPath(pathToAttr, value, state);
  } catch (err) {
    console.error("updateAttr에서 에러남", err);
    return state;
  }
}

function convertToBarcode(state, { selectedPath }) {
  try {
    const currentNode: any = R.path(selectedPath, state);
    return R.assocPath(
      selectedPath,
      {
        type: "Barcode",
        flex: currentNode.flex,
        barcode: {
          text: "{{barcode}}",
        },
      },
      state
    );
  } catch (err) {
    console.error("convertToBarcode에서 에러남", err);
    return state;
  }
}

function convertToContainer(state, { selectedPath }) {
  try {
    const currentNode: any = R.path(selectedPath, state);
    return R.assocPath(
      selectedPath,
      {
        type: "Container",
        flex: currentNode.flex,
        children: [],
      },
      state
    );
  } catch (err) {
    console.error("convertToContainer에서 에러남", err);
    return state;
  }
}

function convertToText(state, { selectedPath }) {
  try {
    const currentNode: any = R.path(selectedPath, state);
    const textData = {
      text: "12312312312312text입니다 아주자우자우자ㅜㄹ잗ㄹㅈㄷㄹㅈㄷㄹㅈㄷㄹㅁㄴㅇㄹㅈㄷㄹㅈㄷ",
      text_size: 10,
      text_max_line: 3,
      text_align: "left",
      font_weight: "bold",
      font_family: font,
    };

    return R.assocPath(
      selectedPath,
      {
        type: "Text",
        flex: {
          ...currentNode.flex,
          size: {
            ...currentNode.flex.size,
            height: `${textData.text_size * 1.2 * textData.text_max_line}`,
          },
        },
        text: { ...textData },
      },
      state
    );
  } catch (err) {
    console.error("convertToContainer에서 에러남", err);
    return state;
  }
}

// size를 반환
function handleSize(size: any, zoom: any = 1): any {
  if (!size) {
    return "auto";
  }
  if (size.charAt(size.length - 1) === "%") {
    return size;
  }
  if (size.slice(-2) === "px") {
    return `${parseInt(size.slice(0, -2)) * zoom}`;
  }
  if (isNaN(size)) {
    return "auto";
  }
  return `${parseInt(size) * zoom}`;
}

function setterName(key) {
  return `set${key[0].toUpperCase()}${key.substr(1)}`;
}

function handleFlex(curNode, layoutDefinition) {
  const { flex } = layoutDefinition;

  // node의 크기 계산.
  curNode[setterName("width")](handleSize(flex?.size?.width));
  curNode[setterName("height")](handleSize(flex?.size?.height));

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

export {
  appendAtPath,
  removeAtPath,
  updateAttr,
  convertToBarcode,
  convertToContainer,
  convertToText,
  handleFlex,
};
