import { Link } from "react-router-dom";
import { useState } from "react";
import menuImg from "../assets/menus.png";
import { useDispatch } from "react-redux";
import { authActions } from "../store/AuthSlice";
import useLoginStatus from "../hooks/useLoginStatus";
import style from "../cssModules/Text.module.css";
import btnStyle from "../cssModules/Button.module.css";
export default function Sidebar() {
  const [menuClicked, toggleMenu] = useState(false);

  const dispatch = useDispatch();
  function handleToggleMenu() {
    toggleMenu((prev) => !prev);
  }
  function handleSignOut() {
    dispatch(authActions.setIsLoggedOut());
  }
  const isUserLoggedIn = useLoginStatus();

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
              <button onClick={handleSignOut} className={btnStyle.btn}>
                Sign Out
              </button>
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
