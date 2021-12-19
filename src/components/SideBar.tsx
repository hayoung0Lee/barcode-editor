import styles from "../css/SideBar.module.css";
import * as R from "ramda";
import FlexSetter from "./FlexSetter";

const SideBar = ({ selectedValue, onAdd, onRemove, exportLabel, onUpdate }) => {
  return (
    <div className={styles.sideBar}>
      {selectedValue &&
        selectedValue["flex"] && ( // container일때만 뭐 설정하게 하기. 나머지는 걍 다 고정시킬거.
          <FlexSetter
            selectedFlex={selectedValue["flex"]}
            onUpdateContainer={R.partial(onUpdate, ["UPDATE_FLEX"])}
          />
        )}
    </div>
  );
};

export default SideBar;
