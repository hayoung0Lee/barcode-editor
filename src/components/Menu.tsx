import * as R from "ramda";
import styles from "../css/Menu.module.css";

const Button = ({ onClick, children }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

const Menu = ({ selectedValue, onAdd, onRemove, exportLabel, onUpdate }) => {
  return (
    <div className={styles.buttonGroup}>
      <Button onClick={R.partial(onAdd, ["Container"])}>Add Container</Button>
      <Button onClick={onRemove}>Remove</Button>
      <Button onClick={R.partial(onUpdate, ["CONVERT_TO_TEXT"])}>
        Convert to Text
      </Button>
      <Button onClick={R.partial(onUpdate, ["CONVERT_TO_BARCODE"])}>
        Convert to Barcode
      </Button>
      <Button onClick={R.partial(onUpdate, ["CONVERT_TO_CONTAINER"])}>
        Convert To Container
      </Button>
      <Button onClick={exportLabel}>Export Label</Button>
    </div>
  );
};
export default Menu;
