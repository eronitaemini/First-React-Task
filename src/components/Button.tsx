import React from "react";
import styles from "../cssModules/Button.module.css";
import { IButtonProps } from "../typeInterfaces/types";

export default function Button({
  children,
  handleOnClick,
  style,
}: IButtonProps) {
  return (
    <button className={styles.btn} style={style} onClick={handleOnClick}>
      {children}
    </button>
  );
}
