import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewFollowers: false,
  viewFollowing: false,
  openFriendsBox: false,
  profileOptionsBox: false,
  viewProfileEditBox: false,
  profileViewer: false,
  profilePictureURL: "",
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
    setViewProfileEditBox(state) {
      state.viewProfileEditBox = !state.viewProfileEditBox;
    },
    setViewProfileOptionsBox(state) {
      state.profileOptionsBox = !state.profileOptionsBox;
    },
    setProfileViewer(state, action) {
      const isOpening = action.payload !== undefined && action.payload !== null;
      state.profileViewer = isOpening;
      state.profilePictureURL = isOpening ? action.payload : "";
    },
  },
});

export default profileSlice.reducer;
export const {
  openFriendsBox,
  closeFriendsBox,
  setViewFollowers,
  setProfileViewer,
  setViewFollowing,
  setViewProfileEditBox,
  setViewProfileOptionsBox,
} = profileSlice.actions;
