import styles from "./App.module.css";
import Editor from "./components/Editor";
import SideBar from "./components/SideBar";
import { useState, useReducer } from "react";
import { StartSize } from "./utils/constants";
import * as R from "ramda";

const font = "Roboto,Noto Sans KR,Noto Sans SC,Noto Sans TC,Noto Sans JP";

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

function reducer(state, action) {
  switch (action.type) {
    // add
    case "ADD":
      return appendAtPath(state, action.payload);
    // remove
    case "REMOVE":
      return removeAtPath(state, action.payload);
    // update
    case "UPDATE_FLEX":
      return updateAttr(state, action.payload);
    case "CONVERT_TO_BARCODE":
      return convertToBarcode(state, action.payload);
    case "CONVERT_TO_TEXT":
      return convertToText(state, action.payload);
    case "CONVERT_TO_CONTAINER":
      return convertToContainer(state, action.payload);
    // update
    default:
      return state;
  }
}

function App() {
  const [selectedPath, onUpdateSelectedPath] = useState<any>([]);
  const [labelState, dispatch] = useReducer(reducer, {
    type: "Container",
    flex: {
      size: StartSize,
      flex_direction: "row",
    },
    children: [],
  });

  function onAdd({ type, selectedPath }) {
    if (type === "Container") {
      dispatch({
        type: "ADD",
        payload: {
          selectedPath,
          node: {
            type: "Container",
            flex: {
              size: { width: "50%", height: "50%" },
            },
            children: [],
          },
        },
      });
    }
  }

  function onRemove({ selectedPath }) {
    // onRemove: remove selected Node
    dispatch({
      type: "REMOVE",
      payload: {
        selectedPath,
      },
    });
  }

  function onUpdate(action, attr, value) {
    // flex값 변경
    // contents값 변경
    // const type = "Container";
    if (action === "UPDATE_FLEX") {
      // flex-wrap을 임의로 넣어둠 curNode.setFlexWrap(yoga.WRAP_WRAP);
      dispatch({ type: "UPDATE_FLEX", payload: { selectedPath, attr, value } });
    } else if (action === "CONVERT_TO_BARCODE") {
      dispatch({ type: "CONVERT_TO_BARCODE", payload: { selectedPath } });
    } else if (action === "CONVERT_TO_TEXT") {
      dispatch({ type: "CONVERT_TO_TEXT", payload: { selectedPath } });
    } else if (action === "CONVERT_TO_CONTAINER") {
      dispatch({ type: "CONVERT_TO_CONTAINER", payload: { selectedPath } });
    }
  }

  function onDragBox({ x, y }) {
    // margin값만 조정하도록 한다.
    const currentMargin: any = R.path(
      [...selectedPath, "flex", "margin"],
      labelState
    ) || {
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
    };
    onUpdate("UPDATE_FLEX", "margin", {
      ...currentMargin,
      left: `${+currentMargin.left + x}`,
      top: `${+currentMargin.top + y}`,
    });
  }

  function exportLabel() {
    console.log("createdLabel", JSON.stringify(labelState));
  }

  return (
    <div className={styles.app}>
      <Editor
        layoutDefinition={labelState}
        path={[]}
        selectedPath={selectedPath}
        onUpdateSelectedPath={onUpdateSelectedPath}
        onDragBox={onDragBox}
      />
      <SideBar
        selectedValue={R.path(selectedPath, labelState)}
        onAdd={(type) => onAdd({ type, selectedPath })}
        onRemove={() => onRemove({ selectedPath })}
        exportLabel={exportLabel}
        onUpdate={onUpdate}
      />
    </div>
  );
}

export default App;
