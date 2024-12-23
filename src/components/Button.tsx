import React from "react";
import styles from "../cssModules/Button.module.css";
type ButtonProps = {
  handleOnClick: () => void;
  style: React.CSSProperties;
  children: React.ReactNode;
};
export default function Button({
  children,
  handleOnClick,
  style,
}: ButtonProps) {
  return (
    <button className={styles.btn} style={style} onClick={handleOnClick}>
      {children}
    </button>
  );
}
