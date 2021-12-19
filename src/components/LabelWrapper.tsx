import styles from "../css/LabelWrapper.module.css";

const LabelWrapper = ({ labelName, children }) => {
  return (
    <div>
      <label>
        {labelName}
        {children}
      </label>
    </div>
  );
};

export default LabelWrapper;
