import styles from "../../css/InputPartition.module.css";

const InputPartition = ({ title, children }) => {
  return (
    <div className={styles.inputPartition}>
      {title && <div className={styles.title}>{title}</div>}
      {children}
    </div>
  );
};

export default InputPartition;
