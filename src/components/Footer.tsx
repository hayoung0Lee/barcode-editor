import styles from "../css/Footer.module.css";
import Button from "./Button";

const Footer = ({ exportLabel }: any) => {
  return (
    <div className={styles.footer}>
      <Button className={styles.button} onClick={exportLabel}>
        Export
      </Button>
    </div>
  );
};

export default Footer;
