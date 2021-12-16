import styles from "./App.module.css";
import Editor from "./components/Editor";
import SideBar from "./components/SideBar";
import { useState, useReducer } from "react";
import { StartSize } from "./utils/constants";
import * as R from "ramda";

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
    // root의 경우 [] 이렇게라 지울수가 없구만. ["children" 0] 이렇게면 그 path를 지운다.
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

function reducer(state, action) {
  switch (action.type) {
    // add
    case "ADD_CONTAINER":
      return appendAtPath(state, action.payload);
    // remove
    case "REMOVE":
      return removeAtPath(state, action.payload);
    // update
    case "UPDATE_FLEX":
      return updateAttr(state, action.payload);
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

  function onAdd({ selectedPath }) {
    // onAddContainer: addChildNode
    // onAddText
    // onAddBarcode
    // onAdd: type별로 나누기, children은 Container만 가지도록 함.
    // 일단은 무조건 100 * 100을 추가합니다.
    // 이거 뭔가 이렇게 거지처럼 갈순없다.
    // const defaultPath = ["children"]; // root를 말함. ex) ["children" 0 "children"] root의 첫번째 children, ["children" 1 "chidren" 2 "children"] root의 첫번째 children의 두번째 children

    dispatch({
      type: "ADD_CONTAINER",
      payload: {
        selectedPath,
        node: {
          type: "Container",
          flex: {
            size: { width: "100", height: "100" },
            align_self: "center",
          },
          children: [],
        },
      },
    });
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

  function onUpdate(type, attr, value) {
    // flex값 변경
    // contents값 변경
    // const type = "Container";
    if (type === "Container") {
      dispatch({ type: "UPDATE_FLEX", payload: { selectedPath, attr, value } });
    }

    // if (attr === "size") {
    //   // width,
    //   // height
    //   // dispatch({ type: "UPDATE_FLEX", payload: { selectedPath, attr, value } });
    // }

    // if (attr === "margin") {
    //   // top, right, bottom, left
    // }

    // if (attr === "padding") {
    //   // top, right, bottom, left
    // }

    if (attr === "flex_direction") {
      // row, column, row-reverse, column-reverse
    }

    if (attr === "flex_grow") {
      // flex-grow
    }

    if (attr === "align_items") {
      // flex-start, flex-end, center, baseline, stretch
    }

    if (attr === "justify_content") {
      // flex-start, flex-end, center, space-between, space-around, space-evenly
    }

    if (attr === "align_self") {
      // auto, flex-start, flex-end, center, baseline, stretch
    }

    // flex-wrap을 임의로 넣어둠 curNode.setFlexWrap(yoga.WRAP_WRAP);
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
      />
      <SideBar
        selectedValue={R.path(selectedPath, labelState)}
        onAdd={() => onAdd({ selectedPath })}
        onRemove={() => onRemove({ selectedPath })}
        exportLabel={exportLabel}
        onUpdate={onUpdate}
      />
    </div>
  );
}

export default App;
