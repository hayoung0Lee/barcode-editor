import * as R from "ramda";
import styles from "../css/Menu.module.css";
import Button from "./Button";

const MenuButton = ({ children, ...props }) => {
  return (
    <Button {...props} style={{ width: "180px", height: "30px" }}>
      {children}
    </Button>
  );
};

const Menu = ({ selectedValue, onAdd, onRemove, exportLabel, onUpdate }) => {
  return (
    <div className={styles.buttonGroup}>
      <MenuButton onClick={R.partial(onAdd, ["Container"])}>
        Add Container
      </MenuButton>
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
      <MenuButton onClick={exportLabel}>Export Label</MenuButton>
    </div>
  );
};
export default Menu;
