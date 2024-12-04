import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export function ProtectedRoutes() {
  const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return isUserLoggedIn ? <Outlet /> : <Navigate to="/" />;
}
