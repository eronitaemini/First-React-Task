import styles from "../cssModules/Button.module.css";
export default function Button({ children, handleOnClick }) {
  return (
    <button className={styles.btn} onClick={handleOnClick}>
      {children}
    </button>
  );
}
