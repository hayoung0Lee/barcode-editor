import styles from "../css/SideBar.module.css";
import FlexSetter from "./FlexSetter";
import React from "react";

const SideBar = ({ selectedFlex, onFlexUpdate }) => {
  return (
    <div className={styles.sideBar}>
      {selectedFlex && (
        <FlexSetter selectedFlex={selectedFlex} onFlexUpdate={onFlexUpdate} />
      )}
    </div>
  );
};

export default React.memo(SideBar);
