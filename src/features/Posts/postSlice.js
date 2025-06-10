import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postId: null,
  openPostBox: false,
  openCommentsList: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    openBox(state) {
      state.openPostBox = true;
    },
    closeBox(state) {
      state.openPostBox = false;
    },

    openCommentsListBox(state) {
      state.openCommentsList = true;
    },
    closeCommentsListBox(state) {
      state.openCommentsList = false;
    },

    setPostId(state, action) {
      state.postId = action.payload;
    },
    clearPostId(state) {
      state.postId = null;
    },
  },
});

export default postSlice.reducer;
export const {
  openBox,
  closeBox,
  setPostId,
  clearPostId,
  openCommentsListBox,
  closeCommentsListBox,
} = postSlice.actions;
