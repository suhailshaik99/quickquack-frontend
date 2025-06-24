// Library Imports
import { createSlice } from "@reduxjs/toolkit";

// Local Imports
import { verifyUserAuthentication } from "../../services/FormSubmitAPI";

const initialState = {
  userDetails: {},
  viewLogoutBox: false,
  isAuthenticated: false,
  isAuthenticating: false,
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

    setLogoutBox(state) {
      state.viewLogoutBox = !state.viewLogoutBox;
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
export const {
  userLogin,
  userLogout,
  setLogoutBox,
  setUserDetails,
  userAuthentication,
} = userSlice.actions;
