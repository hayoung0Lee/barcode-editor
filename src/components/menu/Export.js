import ReactJson from "react-json-view";
import Button from "../common/Button";
import styles from "../../css/Export.module.css";

const Export = ({ labelState, close }) => {
  function copy({ labelState }) {
    const text = JSON.stringify(labelState);
    navigator.clipboard.writeText(text).then(function () {
      alert("Copied!");
    });
  }

  return (
    <div className={styles.export}>
      <div className={styles.exportHeader}>
        <Button className={styles.copy} onClick={() => copy({ labelState })}>
          Copy
        </Button>
        <Button className={styles.close} onClick={close}>
          Close
        </Button>
      </div>
      <ReactJson src={labelState} theme="monokai" />
    </div>
  );
};

export default Export;
