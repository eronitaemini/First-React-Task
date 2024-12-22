import React from "react";
import style from "../cssModules/Text.module.css";
type TitleProp = string;
export default function NavigatedPage({ title }: { title: TitleProp }) {
  return (
    <>
      <div style={{ padding: "5%" }}>
        <h1 className={style.transactionsWillAppearText}>{title}</h1>
      </div>
    </>
  );
}
