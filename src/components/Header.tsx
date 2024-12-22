import React from "react";
import style from "../cssModules/Text.module.css";
export default function Header() {
  return (
    <header className={style.header}>
      <h1 className={style.title}>Transactions</h1>
    </header>
  );
}
