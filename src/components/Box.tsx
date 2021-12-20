import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { Node } from "yoga-layout-prebuilt";
import JsBarcode from "jsbarcode";
import * as R from "ramda";
import styles from "../css/Box.module.css";
import { handleFlex } from "../utils/handler";
interface PropType {
  layoutDefinition: any;
  computedLayout: any;
  path: any; // 여기까지 오는 path
  onUpdateSelectedPath: any;
  selectedPath: any;
  onDragBox: any;
}

const useExpensiveFunc = (
  nextLayoutDefinition,
  compare,
  expensiveFunc
): any => {
  // 최적화를 더 해보자
  // const currentLayout = useMemo(
  //   () => calculateLayout(layoutDefinition),
  //   [layoutDefinition]
  // );

  const previousRef = useRef<any>();
  if (!previousRef?.current) {
    previousRef.current = [
      nextLayoutDefinition,
      expensiveFunc(nextLayoutDefinition),
    ];
    return previousRef.current[1];
  }
  if (compare(previousRef.current[0], nextLayoutDefinition)) {
    // console.log("헌거 calc", nextLayoutDefinition);
    return previousRef.current[1];
  } else {
    previousRef.current = [
      nextLayoutDefinition,
      expensiveFunc(nextLayoutDefinition),
    ];
    return previousRef.current[1];
  }
};

const Box = ({
  layoutDefinition,
  path,
  computedLayout,
  onUpdateSelectedPath,
  selectedPath,
  onDragBox,
}: PropType) => {
  const [_, forceUpdate] = useState<any>(false);
  const startRef = useRef<any>({ x: undefined, y: undefined });

  const barcodeRef = useCallback(
    (node) => {
      if (node && layoutDefinition && layoutDefinition.type === "Barcode") {
        JsBarcode(node, layoutDefinition.barcode.text, {
          format: "code128",
          textMargin: 0,
          margin: 0,
          displayValue: false,
        });
        forceUpdate((prev) => !prev);
      }
    },
    [layoutDefinition]
  );

  function createYogaNodes(layoutDefinition) {
    const curNode = Node.create();
    handleFlex(curNode, layoutDefinition); // flex 값을 다 처리함
    (layoutDefinition.children || [])
      .map(createYogaNodes)
      .forEach((node, i) => {
        curNode.insertChild(node, i);
      });

    return curNode;
  }

  function getComputedLayout(node) {
    return {
      ...node.getComputedLayout(),
      curNode: node,
      children: Array.from({ length: node.getChildCount() }, (_, i) => i).map(
        (i) => getComputedLayout(node.getChild(i))
      ),
    };
  }

  function calculateLayout(layoutDefinition) {
    if (layoutDefinition) {
      const curYogaNode = createYogaNodes(layoutDefinition);
      curYogaNode.calculateLayout();
      return getComputedLayout(curYogaNode);
    } else {
      return {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      };
    }
  }

  // 그래도 얘가 더 빠름. react children들은 왜 re-render 하는건지 모르겠음
  const currentLayout = useExpensiveFunc(
    layoutDefinition,
    R.equals,
    calculateLayout
  );

  // const currentLayout = useMemo(
  //   () => calculateLayout(layoutDefinition),
  //   [layoutDefinition]
  // );

  // 현재의 computedLayout
  const curComputedLayout = computedLayout || currentLayout; // props로 받은것(부모가 계산한 layout) | 없으면(root 같은 경우) 현재 자기 값.
  const { left, top, width, height, children } = curComputedLayout;

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
      {layoutDefinition?.type === "Barcode" && (
        <svg ref={barcodeRef} className={styles.barcode}></svg>
      )}
      {layoutDefinition?.text?.text && (
        <div
          style={{
            fontSize: layoutDefinition.text.text_size,
            lineHeight: 1.2,
            textAlign: layoutDefinition.text.text_align,
            fontFamily: layoutDefinition.text.font_family,
            fontWeight: layoutDefinition.text.font_weight,
            WebkitLineClamp: layoutDefinition.text.text_max_line,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {layoutDefinition.text.text}
        </div>
      )}
      {(children || []).map((child, index) => {
        if (layoutDefinition?.children[index]) {
          return (
            <Box
              key={index}
              layoutDefinition={layoutDefinition.children[index]} // definition 상의 children
              computedLayout={child} // 여기서 layout 구한거
              path={[...path, "children", index]} // 여기까지 오는 path임
              onUpdateSelectedPath={onUpdateSelectedPath}
              selectedPath={selectedPath}
              onDragBox={onDragBox}
            />
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default React.memo(Box);
