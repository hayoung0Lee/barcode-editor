import * as R from "ramda";
import styles from "../css/Draggable.module.css";
import { useRef } from "react";

const Draggable = ({
  left,
  top,
  width,
  height,
  path,
  onUpdateSelectedPath,
  selectedPath,
  onDragBox,
  children,
}: any) => {
  const startRef = useRef<any>({ x: undefined, y: undefined });

  return (
    <div
      className={`${styles.box} ${
        R.equals(path, selectedPath) ? styles.selected : ""
      }`}
      style={{
        left,
        top,
        width,
        height,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onUpdateSelectedPath(path);
      }}
      draggable={R.equals(path, selectedPath) && path.length > 0 ? true : false}
      onDragStart={(e) => {
        e.stopPropagation();
        startRef.current = { x: e.clientX, y: e.clientY };
      }}
      onDrag={(e) => {
        e.stopPropagation();
        onDragBox({
          x: e.clientX - startRef.current.x,
          y: e.clientY - startRef.current.y,
        });
        startRef.current = { x: e.clientX, y: e.clientY };
      }}
      onDragEnd={(e) => {
        e.stopPropagation();
        onDragBox({
          x: e.clientX - startRef.current.x,
          y: e.clientY - startRef.current.y,
        });
      }}
    >
      {children}
    </div>
  );
};

export default Draggable;
