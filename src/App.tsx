import "./App.css";
import Editor from "./components/Editor";
import SideBar from "./components/SideBar";
import { barcode } from "./sample";
import { StartSize } from "./utils/constants";

function App() {
  // onAddContainer: addChildNode
  // onAddText
  // onAddBarcode
  // onAdd: type별로 나누기, children은 Container만 가지도록 함.

  // onRemove: remove selected Node

  return (
    <div className="App">
      <Editor
        layoutDefinition={{
          type: "Container",
          flex: { size: StartSize },
          children: [barcode],
        }}
      />
      <SideBar onAdd={() => null} onRemove={() => null} />
    </div>
  );
}

export default App;
