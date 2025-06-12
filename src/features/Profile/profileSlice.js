import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewFollowers: false,
  viewFollowing: false,
  openFriendsBox: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    openFriendsBox(state) {
      state.openFriendsBox = true;
    },
    closeFriendsBox(state) {
      state.openFriendsBox = false;
    },
    setViewFollowers(state) {
      state.viewFollowers = !state.viewFollowers;
    },
    setViewFollowing(state) {
      state.viewFollowing = !state.viewFollowing;
    },
  },
});

export default profileSlice.reducer;
export const {
  setFriendsBox,
  openFriendsBox,
  closeFriendsBox,
  setViewFollowers,
  setViewFollowing,
} = profileSlice.actions;
