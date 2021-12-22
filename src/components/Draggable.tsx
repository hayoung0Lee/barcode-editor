import * as R from "ramda";
import styles from "../css/Draggable.module.css";
import {
  useRef,
  forwardRef,
  useContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { LabelContext, onDragBox } from "../utils/LabelContext";
import customMemo from "../hooks/customMemo";

const Draggable = forwardRef((props: any, ref: any) => {
  const {
    left,
    top,
    width,
    height,
    path,
    onUpdateSelectedPath,
    selectedPath,
    children,
  }: any = props;
  const startRef = useRef<any>({ x: undefined, y: undefined });
  const isRoot = path.length === 0;
  const isSelected = R.equals(path, selectedPath);
  const [dragMode, setDragMode] = useState(false);
  const [labelState, dispatch] = useContext(LabelContext);
  const layoutDefinition: any = R.path([...path], labelState);
  const isDraggable = !isRoot && isSelected && dragMode;

  const memoizedFlexUpdate = useCallback(
    R.partial(onDragBox, [{ selectedPath, dispatch, layoutDefinition }]),
    [layoutDefinition, selectedPath]
  );

  useEffect(() => {
    if (!isSelected) {
      setDragMode(false);
    }
  }, [isSelected]);

  return (
    <div
      ref={ref ? ref : null}
      className={`${styles.box} ${isSelected ? styles.selected : ""} ${
        isDraggable ? styles.draggable : ""
      } `}
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
      onDoubleClick={(e) => {
        e.stopPropagation();
        if (isSelected && !dragMode) {
          setDragMode(true);
        }
      }}
      draggable={isDraggable}
      onDragStart={(e) => {
        e.stopPropagation();
        startRef.current = { x: e.clientX, y: e.clientY };
      }}
      onDrag={(e) => {
        e.stopPropagation();
        memoizedFlexUpdate({
          x: e.clientX - startRef.current.x,
          y: e.clientY - startRef.current.y,
        });
        startRef.current = { x: e.clientX, y: e.clientY };
      }}
      onDragEnd={(e) => {
        e.stopPropagation();
        memoizedFlexUpdate({
          x: e.clientX - startRef.current.x,
          y: e.clientY - startRef.current.y,
        });
      }}
    >
      {children}
    </div>
  );
});

export default customMemo(Draggable);
