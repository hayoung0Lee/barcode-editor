import { LabelContext, SelectedContext } from "../utils/LabelContext";
import * as R from "ramda";
import { useContext, useState, useEffect } from "react";

const ContentsForm = () => {
  const [labelState, dispatch] = useContext(LabelContext);
  const [selectedPath] = useContext<any>(SelectedContext);
  const selectedNode: any = R.path(selectedPath, labelState);
  const [text, setText] = useState("");

  useEffect(() => {
    if (selectedNode.type === "Barcode") {
      setText(selectedNode.barcode.text);
    } else if (selectedNode.type === "Text") {
      setText(selectedNode.text.text);
    }
  }, [selectedPath, selectedNode.type]);

  if (selectedNode.type === "Container") {
    return <h3>Container type은 값을 설정할 수 없습니다. </h3>;
  }
  return (
    <input
      key={JSON.stringify(selectedPath)}
      value={text}
      onChange={(e) => setText(e.target.value)}
      onBlur={() =>
        // @ts-ignore
        dispatch({
          type: "UPDATE_TEXT",
          payload: { selectedPath, type: selectedNode.type, text },
        })
      }
    ></input>
  );
};

export default ContentsForm;
