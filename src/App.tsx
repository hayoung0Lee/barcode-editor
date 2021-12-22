import styles from "./App.module.css";
import Editor from "./components/Editor";
import SideBar from "./components/SideBar";
import { useState, useReducer, useCallback } from "react";
import * as R from "ramda";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
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
      size: { width: "300", height: "300" },
      flex_direction: "row",
    },
    children: [],
  });

  function onAdd({ selectedPath }) {
    dispatch({
      type: "ADD",
      payload: {
        selectedPath,
        node: {
          type: "Container",
          flex: {
            size: { width: "50%", height: "50%" },
            flex_direction: "row",
          },
          children: [],
        },
      },
    });
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
    // x, y 증가 방향으로만 이동가능,
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

  const memoizedOnAdd = useCallback(() => {
    onAdd({ selectedPath });
  }, [selectedPath]);
  const memoizedOnRemove = useCallback(() => {
    onRemove({ selectedPath });
  }, [selectedPath]);

  const memoizedOnUpdate = useCallback(onUpdate, [selectedPath]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedOnDragBox = useCallback(onDragBox, [selectedPath, labelState]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizeOnFlexUpdate = useCallback(
    R.partial(onUpdate, ["UPDATE_FLEX"]),
    [selectedPath]
  );

  return (
    <div className={styles.app}>
      <div className={styles.main}>
        <div className={styles.leftMenu}>
          <Menu
            onAdd={memoizedOnAdd}
            onRemove={memoizedOnRemove}
            onUpdate={memoizedOnUpdate}
          />
          <Editor
            layoutDefinition={labelState}
            path={[]}
            selectedPath={selectedPath}
            onUpdateSelectedPath={onUpdateSelectedPath}
            onDragBox={memoizedOnDragBox}
          />
        </div>
        <SideBar
          selectedFlex={R.path([...selectedPath, "flex"], labelState)}
          onFlexUpdate={memoizeOnFlexUpdate}
        />
      </div>
      <Footer labelState={labelState} />
    </div>
  );
}

export default App;
