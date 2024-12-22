import React from "react";
import AuthForm from "../components/AuthForm";
import useIsLoggedIn from "../hooks/useLoginStatus";
import { Navigate } from "react-router-dom";
export default function AuthPage() {
  const isLoggedIn: boolean = useIsLoggedIn();

  return !isLoggedIn ? <AuthForm /> : <Navigate to="/home" />;
}
