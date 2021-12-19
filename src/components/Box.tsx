import React, { useState, useEffect, useCallback, useRef } from "react";
import { Node } from "yoga-layout-prebuilt";
import JsBarcode from "jsbarcode";
import * as R from "ramda";
import styles from "./Box.module.css";
import { handleFlex } from "../utils/handler";
interface PropType {
  layoutDefinition: any;
  computedLayout: any;
  path: any; // 여기까지 오는 path
  onUpdateSelectedPath: any;
  selectedPath: any;
  onDragBox: any;
}

const Box = ({
  layoutDefinition,
  path,
  computedLayout,
  onUpdateSelectedPath,
  selectedPath,
  onDragBox,
}: PropType) => {
  const [currentLayout, setCurrentLayout] = useState<any>();
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
    const curYogaNode = createYogaNodes(layoutDefinition);
    curYogaNode.calculateLayout();
    setCurrentLayout(getComputedLayout(curYogaNode));
  }

  useEffect(() => {
    calculateLayout(layoutDefinition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutDefinition]);

  // 현재의 computedLayout
  const curComputedLayout = computedLayout || currentLayout; // props로 받은것(부모가 계산한 layout) | 없으면(root 같은 경우) 현재 자기 값.
  const { left, top, width, height, children } = curComputedLayout || {
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  };

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
      draggable={path.length === 0 ? false : true}
      onDragStart={(e) => {
        startRef.current = { x: e.clientX, y: e.clientY };
        requestAnimationFrame(() => {
          const element: any = e.target;
          element.classList.add(styles.hide);
        });
      }}
      onDragEnd={(e) => {
        onDragBox({
          x: e.clientX - startRef.current.x,
          y: e.clientY - startRef.current.y,
        });
        const element: any = e.target;
        element.classList.remove(styles.hide);
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
