import { createSlice } from "@reduxjs/toolkit";
const initialState = { isLoggedIn: false };
const authSlice = createSlice({
  name: "Auth",
  initialState: initialState,
  reducers: {
    setIsLoggedIn(state) {
      state.isLoggedIn = true;
      localStorage.setItem("isUserLoggedIn", (state.isLoggedIn = true));
      console.log("Message from the reducer, user is logged IN succesfully");
    },
    setIsLoggedOut(state) {
      state.isLoggedIn = false;
      localStorage.setItem("isUserLoggedIn", (state.isLoggedIn = false));
      console.log("Message from the reducer, user is logged OUT succesfully");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
