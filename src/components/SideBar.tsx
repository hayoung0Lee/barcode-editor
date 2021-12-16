import styles from "./SideBar.module.css";

const SideBar = ({ onAdd, onRemove, exportLabel }) => {
  return (
    <div className={styles.sideBar}>
      SideBar
      <button onClick={onAdd}>onAdd</button>
      <button onClick={onRemove}>onRemove</button>
      <button onClick={exportLabel}>exportLabel</button>
    </div>
  );
};

export default SideBar;
