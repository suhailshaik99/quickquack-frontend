import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postId: null,
  carouselPosts: [],
  openPostBox: false,
  openCarousel: false,
  carouselPostId: null,
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

    setCarousel(state) {
      state.openCarousel = !state.openCarousel;
    },
    setCarouselPostId(state, action) {
      state.carouselPostId = action.payload;
    },
    clearCarouselPostId(state) {
      state.carouselPostId = null;
    },

    setCarouselPosts(state, action) {
      state.carouselPosts = action.payload;
    },
    clearCarouselPosts(state) {
      state.carouselPosts = [];
    },
  },
});

export default postSlice.reducer;
export const {
  openBox,
  closeBox,
  setPostId,
  clearPostId,
  setCarousel,
  setCarouselPostId,
  openCommentsListBox,
  clearCarouselPostId,
  closeCommentsListBox,
  setCarouselPosts,
  clearCarouselPosts,
} = postSlice.actions;
