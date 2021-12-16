import styles from "./SideBar.module.css";
import * as R from "ramda";
import { useState } from "react";

const ContainerSetter = ({ onUpdateContainer }) => {
  const [size, setSize] = useState({ width: "100", height: "100" });

  return (
    <>
      <div>
        <label>
          Width
          <input
            value={size.width}
            onChange={(e) =>
              setSize((prev) => ({ ...prev, width: e.target.value }))
            }
            onBlur={() => onUpdateContainer("size", size)}
          />
        </label>
      </div>
      <div>
        <label>
          Height
          <input
            value={size.height}
            onChange={(e) =>
              setSize((prev) => ({ ...prev, height: e.target.value }))
            }
            onBlur={() => onUpdateContainer("size", size)}
          />
        </label>
      </div>
    </>
  );
};

const SideBar = ({ onAdd, onRemove, exportLabel, onUpdate }) => {
  return (
    <div className={styles.sideBar}>
      SideBar
      <button onClick={onAdd}>onAdd</button>
      <button onClick={onRemove}>onRemove</button>
      <button onClick={exportLabel}>exportLabel</button>
      <ContainerSetter onUpdateContainer={R.partial(onUpdate, ["Container"])} />
    </div>
  );
};

export default SideBar;
