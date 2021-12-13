import "./App.css";
import Editor from "./components/Editor";
import SideBar from "./components/SideBar";
import { useReducer } from "react";
import { StartSize } from "./utils/constants";
import * as R from "ramda";

function appendAtPath(state, { path, node }) {
  try {
    const currentChildren = R.path(path, state);
    return R.assocPath(path, R.append(node, currentChildren), state);
  } catch (err) {
    console.error("appendAtPath에서 에러남", err);
    return state;
  }
}

function reducer(state, action) {
  switch (action.type) {
    // add
    case "ADD_CONTAINER":
      return appendAtPath(state, action.payload);
    // remove

    // update

    default:
      return state;
  }
}

function App() {
  const [labelState, dispatch] = useReducer(reducer, {
    type: "Container",
    flex: { size: StartSize, flex_direction: "column" },
    children: [],
  });

  function onAdd() {
    // onAddContainer: addChildNode
    // onAddText
    // onAddBarcode
    // onAdd: type별로 나누기, children은 Container만 가지도록 함.
    // 일단은 무조건 100 * 100을 추가합니다.
    // 이거 뭔가 이렇게 거지처럼 갈순없다.
    const defaultPath = ["children"]; // root를 말함. ex) ["children" 0 "children"] root의 첫번째 children, ["children" 1 "chidren" 2 "children"] root의 첫번째 children의 두번째 children

    dispatch({
      type: "ADD_CONTAINER",
      payload: {
        path: defaultPath,
        node: {
          type: "Container",
          flex: { size: { width: "100px", height: "100px" } },
          children: [],
        },
      },
    });
  }

  function onRemove() {
    // onRemove: remove selected Node
  }

  function onUpdate() {
    // flex값 변경
    // contents값 변경
  }

  function onUpdateSelectedPath() {
    // 지금 선택된 path를 핸들링
  }

  return (
    <div className="App">
      <Editor layoutDefinition={labelState} />
      <SideBar onAdd={onAdd} onRemove={() => null} />
    </div>
  );
}

export default App;
