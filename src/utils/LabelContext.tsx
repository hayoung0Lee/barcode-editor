import { createContext, useReducer } from "react";
import {
  appendAtPath,
  removeAtPath,
  updateAttr,
  convertToBarcode,
  convertToContainer,
  convertToText,
} from "../utils/handler";
import * as R from "ramda";

export function onAdd({ selectedPath, dispatch }) {
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

export function onRemove({ selectedPath, dispatch }) {
  dispatch({
    type: "REMOVE",
    payload: {
      selectedPath,
    },
  });
}

export function onUpdate({ selectedPath, dispatch, action }, attr, value) {
  if (action === "UPDATE_FLEX") {
    dispatch({ type: "UPDATE_FLEX", payload: { selectedPath, attr, value } });
  } else if (action === "CONVERT_TO_BARCODE") {
    dispatch({ type: "CONVERT_TO_BARCODE", payload: { selectedPath } });
  } else if (action === "CONVERT_TO_TEXT") {
    dispatch({ type: "CONVERT_TO_TEXT", payload: { selectedPath } });
  } else if (action === "CONVERT_TO_CONTAINER") {
    dispatch({ type: "CONVERT_TO_CONTAINER", payload: { selectedPath } });
  }
}

export function onDragBox(
  { layoutDefinition, selectedPath, dispatch },
  { x, y }
) {
  const currentMargin: any = R.path(["flex", "margin"], layoutDefinition) || {
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
  };
  onUpdate({ selectedPath, dispatch, action: "UPDATE_FLEX" }, "margin", {
    ...currentMargin,
    left: `${+currentMargin.left + x}`,
    top: `${+currentMargin.top + y}`,
  });
}

const reducer = (state, action) => {
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
};

const defaultLabel = {
  type: "Container",
  flex: {
    size: { width: "300", height: "300" },
    flex_direction: "row",
  },
  children: [],
};

export const LabelContext = createContext([defaultLabel, () => {}]);

export const LabelProvider = ({ children }) => {
  const [labelState, dispatch] = useReducer(reducer, defaultLabel);
  return (
    <LabelContext.Provider value={[labelState, dispatch]}>
      {children}
    </LabelContext.Provider>
  );
};
