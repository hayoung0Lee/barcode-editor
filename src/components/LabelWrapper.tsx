import styles from "../css/LabelWrapper.module.css";

const LabelWrapper = ({ labelName, children }) => {
  return (
    <label className={styles.label}>
      <span className={styles.labelName}>{labelName}</span>
      {children}
    </label>
  );
};

export default LabelWrapper;
