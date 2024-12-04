import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";

const persistedLoginState = localStorage.getItem("isUserLoggedIn") === "true";
export const store = configureStore({
  reducer: { auth: authReducer },
  preloadedState: {
    auth: { isLoggedIn: persistedLoginState },
  },
});
