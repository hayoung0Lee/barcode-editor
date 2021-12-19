import styles from "./App.module.css";
import Editor from "./components/Editor";
import SideBar from "./components/SideBar";
import { useState, useReducer } from "react";
import { StartSize } from "./utils/constants";
import * as R from "ramda";
import Menu from "./components/Menu";
import {
  appendAtPath,
  removeAtPath,
  updateAttr,
  convertToBarcode,
  convertToContainer,
  convertToText,
} from "./utils/handler";

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return appendAtPath(state, action.payload);
    case "REMOVE":
      return removeAtPath(state, action.payload);
    case "UPDATE_FLEX":
      return updateAttr(state, action.payload);
    case "CONVERT_TO_BARCODE":
      return convertToBarcode(state, action.payload);
    case "CONVERT_TO_TEXT":
      return convertToText(state, action.payload);
    case "CONVERT_TO_CONTAINER":
      return convertToContainer(state, action.payload);
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
      <div className={styles.leftMenu}>
        <Menu
          selectedValue={R.path(selectedPath, labelState)}
          onAdd={(type) => onAdd({ type, selectedPath })}
          onRemove={() => onRemove({ selectedPath })}
          exportLabel={exportLabel}
          onUpdate={onUpdate}
        />
        <Editor
          layoutDefinition={labelState}
          path={[]}
          selectedPath={selectedPath}
          onUpdateSelectedPath={onUpdateSelectedPath}
          onDragBox={onDragBox}
        />
      </div>
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
