import styles from "../cssModules/Button.module.css";
export default function Button({ children, handleOnClick, style }) {
  return (
    <button className={styles.btn} style={style} onClick={handleOnClick}>
      {children}
    </button>
  );
}
