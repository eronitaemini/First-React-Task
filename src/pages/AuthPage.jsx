import AuthForm from "../components/AuthForm";
import { redirect, useActionData } from "react-router-dom";
import useIsLoggedIn from "../hooks/useLoginStatus";
import { Navigate } from "react-router-dom";
export default function AuthPage() {
  const isLoggedIn = useIsLoggedIn();

  return !isLoggedIn ? <AuthForm /> : <Navigate to="/home" />;
}
