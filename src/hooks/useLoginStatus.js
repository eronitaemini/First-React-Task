import { useSelector } from "react-redux";

export default function useIsLoggedIn() {
  return useSelector((state) => state.auth.isLoggedIn);
}
