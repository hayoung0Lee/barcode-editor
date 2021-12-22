import * as R from "ramda";
import styles from "../css/Menu.module.css";
import Button from "./Button";
import { memo, useContext, useCallback } from "react";
import { LabelContext, onAdd, onRemove, onUpdate } from "../utils/LabelContext";

const MenuButton = memo(({ children, ...props }: any) => {
  return (
    <Button {...props} style={{ width: "180px", height: "30px" }}>
      {children && children}
    </Button>
  );
});

const Menu = ({ selectedPath }) => {
  const [_, dispatch] = useContext(LabelContext);

  const memoizedOnAdd = useCallback(() => {
    onAdd({ selectedPath, dispatch });
  }, [selectedPath]);

  const memoizedOnRemove = useCallback(() => {
    onRemove({ selectedPath, dispatch });
  }, [selectedPath]);

  const memoizedToText = useCallback(
    R.partial(onUpdate, [
      { selectedPath, dispatch, action: "CONVERT_TO_TEXT" },
    ]),
    [selectedPath]
  );

  const memoizedToBarcode = useCallback(
    R.partial(onUpdate, [
      { selectedPath, dispatch, action: "CONVERT_TO_BARCODE" },
    ]),
    [selectedPath]
  );

  const memoizedToContainer = useCallback(
    R.partial(onUpdate, [
      { selectedPath, dispatch, action: "CONVERT_TO_CONTAINER" },
    ]),
    [selectedPath]
  );

  return (
    <div className={styles.buttonGroup}>
      <MenuButton onClick={memoizedOnAdd}>Add Container</MenuButton>
      <MenuButton onClick={memoizedOnRemove}>Remove</MenuButton>
      <MenuButton onClick={memoizedToText}>Convert to Text</MenuButton>
      <MenuButton onClick={memoizedToBarcode}>Convert to Barcode</MenuButton>
      <MenuButton onClick={memoizedToContainer}>
        Convert To Container
      </MenuButton>
      <MenuButton></MenuButton>
    </div>
  );
};
export default memo(Menu);
