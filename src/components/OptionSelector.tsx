import styles from "../css/OptionSelector.module.css";

const OptionSelector = ({
  optionName,
  options,
  selectedValue,
  onClickOption,
}) => {
  return (
    <div>
      <div>{optionName}</div>
      {(options || []).map((opt, index) => {
        return (
          <button
            key={index}
            className={
              opt === selectedValue
                ? styles.selectedOption
                : styles.unSelectedOption
            }
            onClick={() => onClickOption(opt)}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
};

export default OptionSelector;
