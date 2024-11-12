import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
export default function RootLayout() {
  return (
    <>
      <Header />
      <div className="flex flex-row">
        <Sidebar></Sidebar>
        <Outlet></Outlet>
      </div>
    </>
  );
}
