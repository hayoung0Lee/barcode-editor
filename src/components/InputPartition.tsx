import styles from "../css/InputPartition.module.css";

const InputPartition = ({ children }) => {
  return <div className={styles.inputPartition}>{children}</div>;
};

export default InputPartition;
