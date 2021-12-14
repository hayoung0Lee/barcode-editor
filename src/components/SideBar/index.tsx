import "./index.css";

const SideBar = ({ onAdd, onRemove, exportLabel }) => {
  return (
    <div className="SideBar">
      SideBar
      <button onClick={onAdd}>onAdd</button>
      <button onClick={exportLabel}>exportLabel</button>
    </div>
  );
};

export default SideBar;
