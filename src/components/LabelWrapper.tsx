import styles from "../css/LabelWrapper.module.css";
import React from "react";

const LabelWrapper = ({ labelName, children }) => {
  return (
    <label className={styles.label}>
      <span className={styles.labelName}>{labelName}</span>
      {children}
    </label>
  );
};

export default React.memo(LabelWrapper);
