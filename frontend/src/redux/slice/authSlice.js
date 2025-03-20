import { createSlice } from "@reduxjs/toolkit";
//Create slice an api. It automatically creates reducers and actions

//Initial state
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },

  //Reducers
  reducers: {
    //Login
    loginAction: (state, action) => {
      state.user = action.payload;
    },
    //Logout
    logoutAction: (state) => {
      state.user = null;
    },
  },
});

//Generate actions
export const { loginAction, logoutAction } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
