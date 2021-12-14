import "./App.css";
import Editor from "./components/Editor";
import SideBar from "./components/SideBar";
import { useState, useReducer } from "react";
import { StartSize } from "./utils/constants";
import * as R from "ramda";

function appendAtPath(state, { selectedPath, node }) {
  try {
    const pathToChildren = [...selectedPath, "children"];
    const currentChildren = R.path(pathToChildren, state);
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

function reducer(state, action) {
  switch (action.type) {
    // add
    case "ADD_CONTAINER":
      return appendAtPath(state, action.payload);
    // remove
    case "REMOVE":
      return removeAtPath(state, action.payload);

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
      // align_items: "center",
      // justify_content: "space-between",
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
            size: { width: "100px", height: "100px" },
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

  function onUpdate() {
    // flex값 변경
    // contents값 변경
    const type = "Container";

    if ("size") {
      // width,
      // height
    }

    if ("margin") {
      // top, right, bottom, left
    }

    if ("padding") {
      // top, right, bottom, left
    }

    if ("flex_direction") {
      // row, column, row-reverse, column-reverse
    }

    if ("flex_grow") {
      // flex-grow
    }

    if ("align_items") {
      // flex-start, flex-end, center, baseline, stretch
    }

    if ("justify_content") {
      // flex-start, flex-end, center, space-between, space-around, space-evenly
    }

    if ("align_self") {
      // auto, flex-start, flex-end, center, baseline, stretch
    }

    // flex-wrap을 임의로 넣어둠 curNode.setFlexWrap(yoga.WRAP_WRAP);
  }

  function exportLabel() {
    console.log("createdLabel", JSON.stringify(labelState));
  }

  return (
    <div className="App">
      <Editor
        layoutDefinition={labelState}
        path={[]}
        selectedPath={selectedPath}
        onUpdateSelectedPath={onUpdateSelectedPath}
      />
      <SideBar
        onAdd={() => onAdd({ selectedPath })}
        onRemove={() => onRemove({ selectedPath })}
        exportLabel={exportLabel}
      />
    </div>
  );
}

export default App;
