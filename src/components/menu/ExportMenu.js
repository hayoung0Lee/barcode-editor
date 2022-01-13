import styles from "../../css/ExportMenu.module.css";
import Button from "../common/Button";
import Modal from "../common/Modal";
import Export from "./Export";
import { useState, useContext } from "react";
import { LabelContext } from "../../utils/LabelContext";

const Footer = () => {
  const [modalStatus, toggleModal] = useState(false);
  const labelState = useContext(LabelContext)[0];

  return (
    <div className={styles.footer}>
      <Button
        className={styles.button}
        onClick={() => toggleModal((prev) => !prev)}
      >
        Export
      </Button>

      {modalStatus && (
        <Modal>
          <Export labelState={labelState} close={() => toggleModal(false)} />
        </Modal>
      )}
    </div>
  );
};

export default Footer;
