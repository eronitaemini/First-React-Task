import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoggedIn: false,
  errorMessage: "Intiial state of error",
};
const authSlice = createSlice({
  name: "Auth",
  initialState: initialState,
  reducers: {
    setIsLoggedIn(state) {
      state.isLoggedIn = true;
      localStorage.setItem("isUserLoggedIn", (state.isLoggedIn = true));
    },
    setIsLoggedOut(state) {
      state.isLoggedIn = false;
      localStorage.setItem("isUserLoggedIn", (state.isLoggedIn = false));
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
    clearErrorMessage(state) {
      state.errorMessage = "";
    },
    setDefualtErrorMessage(state) {
      state.errorMessage = "default error message";
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
