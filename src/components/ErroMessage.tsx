import React from "react";
import style from "../cssModules/ErrorMessage.module.css";
export function ErrorMessage() {
  return (
    <div className={style.errorModal}>
      <h1 className={style.h1}> An error occured! Please try again later</h1>
    </div>
  );
}
