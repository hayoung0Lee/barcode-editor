import "./index.css";

const SideBar = ({ onAdd, onRemove }) => {
  return (
    <div className="SideBar">
      SideBar
      <button onClick={onAdd}>onAdd</button>
    </div>
  );
};

export default SideBar;
