import { Link } from "react-router-dom";
import { useState } from "react";
import menuImg from "../assets/menus.png";
export default function Sidebar({ style }) {
  const [menuClicked, toggleMenu] = useState(false);

  function handleToggleMenu() {
    toggleMenu((prev) => !prev);
  }
  return (
    <>
      <aside
        style={style}
        className={`bg-slate-100 py-10 ${
          menuClicked ? "block" : "hidden"
        } lg:block h-screen w-1/6`}
      >
        <div>
          <ul className="flex flex-col py-5 px-5">
            <Link className="link">Home</Link>
            <Link to="/newTransaction" className="link">
              New Transaction
            </Link>
            <Link to="/LoginSignup" className="link">
              Login/Signup
            </Link>
          </ul>
        </div>
      </aside>

      <div className="py-5">
        <img
          src={menuImg}
          alt="menu"
          className="w-10 h-5 px-2 block lg:hidden"
          onClick={handleToggleMenu}
        />
      </div>
    </>
  );
}
