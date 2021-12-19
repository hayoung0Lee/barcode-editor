import * as R from "ramda";
import { font } from "./constants";

function appendAtPath(state, { selectedPath, node }) {
  try {
    const pathToChildren = [...selectedPath, "children"];
    const currentChildren: any = R.path(pathToChildren, state);
    return R.assocPath(pathToChildren, R.append(node, currentChildren), state);
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
            height: `${textData.text_size * 1.2 * textData.text_max_line} `,
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

export {
  appendAtPath,
  removeAtPath,
  updateAttr,
  convertToBarcode,
  convertToContainer,
  convertToText,
};
