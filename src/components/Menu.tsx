import * as R from "ramda";
import styles from "../css/Menu.module.css";
import Button from "./Button";
import React from "react";

const MenuButton = ({ children, ...props }: any) => {
  return (
    <Button {...props} style={{ width: "180px", height: "30px" }}>
      {children && children}
    </Button>
  );
};

const Menu = ({ onAdd, onRemove, onUpdate }) => {
  return (
    <div className={styles.buttonGroup}>
      <MenuButton onClick={onAdd}>Add Container</MenuButton>
      <MenuButton onClick={onRemove}>Remove</MenuButton>
      <MenuButton onClick={R.partial(onUpdate, ["CONVERT_TO_TEXT"])}>
        Convert to Text
      </MenuButton>
      <MenuButton onClick={R.partial(onUpdate, ["CONVERT_TO_BARCODE"])}>
        Convert to Barcode
      </MenuButton>
      <MenuButton onClick={R.partial(onUpdate, ["CONVERT_TO_CONTAINER"])}>
        Convert To Container
      </MenuButton>
      <MenuButton></MenuButton>
      {/* <MenuButton onClick={exportLabel}>Export Label</MenuButton> */}
    </div>
  );
};
export default React.memo(Menu);
