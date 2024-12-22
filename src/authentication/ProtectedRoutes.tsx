import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
import { IRootState } from "../typeInterfaces/types";

export function ProtectedRoutes() {
  const isUserLoggedIn = useSelector(
    (state: IRootState) => state.auth.isLoggedIn
  );

  return isUserLoggedIn ? <Outlet /> : <Navigate to="/" />;
}
