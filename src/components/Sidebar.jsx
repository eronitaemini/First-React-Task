import { Link } from "react-router-dom";
import { useState } from "react";
import menuImg from "../assets/menus.png";
import { useSelector } from "react-redux";
import useLoginStatus from "../hooks/useLoginStatus";
import style from "../cssModules/Text.module.css";
import btnStyle from "../cssModules/Button.module.css";
import { logoutRequest } from "../authentication/authRequests";
export default function Sidebar() {
  const [menuClicked, toggleMenu] = useState(false);
  const errMsg = useSelector((state) => state.auth.errorMessage);
  const isUserLoggedIn = useLoginStatus();
  function handleToggleMenu() {
    toggleMenu((prev) => !prev);
  }
  function handleSignOut() {
    logoutRequest();
  }

  return (
    <>
      <aside
        className={`bg-slate-100 py-10 ${
          menuClicked ? "block" : "hidden"
        } lg:block h-screen w-1/6`}
      >
        <div>
          <ul className="flex flex-col py-5 px-5">
            <Link to="/home" className={style.link}>
              Home
            </Link>
            {isUserLoggedIn && (
              <Link to="/auth/newTransaction" className={style.link}>
                New Transaction
              </Link>
            )}
            {!isUserLoggedIn && (
              <Link to="/" className={style.link}>
                Login/Signup
              </Link>
            )}
            {isUserLoggedIn && (
              <>
                <button onClick={handleSignOut} className={btnStyle.btn}>
                  Sign Out
                </button>
                <p className={style.errorMsg}>{errMsg}</p>
              </>
            )}
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
