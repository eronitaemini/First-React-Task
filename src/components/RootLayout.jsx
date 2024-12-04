import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import style from "../cssModules/Div.module.css";
export default function RootLayout() {
  return (
    <>
      <Header />
      <div className={style.flexRow}>
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}
