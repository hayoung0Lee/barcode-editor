import styles from "../../css/Button.module.css";

const Button = ({ children, className, ...props }) => {
  if (className) {
    return (
      <button {...props} className={`${styles.button} ${className}`}>
        {children}
      </button>
    );
  }

  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
