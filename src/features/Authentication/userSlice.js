// Library Imports
import { createSlice } from "@reduxjs/toolkit";

// Local Imports
import { verifyUserAuthentication } from "../../services/FormSubmitAPI";

const initialState = {
  userDetails: {},
  isAuthenticated: false,
  isAuthenticating: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userAuthentication(state) {
      state.isAuthenticated = true;
    },

    userLogin(state, action) {
      state.isAuthenticated = true;
      state.userDetails = action.payload;
    },

    userLogout(state) {
      state.userDetails = {};
      state.isAuthenticated = false;
    },

    setUserDetails(state, action) {
      state.userDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyUserAuthentication.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isAuthenticating = false;
        state.userDetails = action.payload.user;
      })
      .addCase(verifyUserAuthentication.rejected, (state) => {
        state.isAuthenticated = false;
        state.isAuthenticating = false;
        state.userDetails = {};
      })
      .addCase(verifyUserAuthentication.pending, (state) => {
        state.isAuthenticated = false;
        state.isAuthenticating = true;
      });
  },
});

export default userSlice.reducer;
export const { userLogin, userLogout, setUserDetails, userAuthentication } =
  userSlice.actions;
