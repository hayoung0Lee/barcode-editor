import styles from "../css/OptionSelector.module.css";
import Button from "./Button";

const OptionSelector = ({ options, selectedValue, onClickOption }) => {
  return (
    <div>
      {(options || []).map((opt, index) => {
        return (
          <Button
            key={index}
            className={opt === selectedValue ? styles.selectedOption : ""}
            style={{
              minWidth: "105px",
              height: "25px",
              marginBottom: "2px",
              marginRight: "2px",
            }}
            onClick={() => onClickOption(opt)}
          >
            {opt}
          </Button>
        );
      })}
    </div>
  );
};

export default OptionSelector;
