import * as R from "ramda";
import styles from "../css/Draggable.module.css";
import { useRef, forwardRef, memo } from "react";

const Draggable = forwardRef((props: any, ref: any) => {
  const {
    left,
    top,
    width,
    height,
    path,
    onUpdateSelectedPath,
    selectedPath,
    onDragBox,
    children,
  }: any = props;
  const startRef = useRef<any>({ x: undefined, y: undefined });
  const isRoot = path.length === 0;
  const isSelected = R.equals(path, selectedPath);

  return (
    <div
      ref={ref ? ref : null}
      className={`${styles.box} ${isSelected ? styles.selected : ""}`}
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
      draggable={isSelected && !isRoot ? true : false}
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
});

export default memo(Draggable);
