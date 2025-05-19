import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openPostBox: false,
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
  },
});

export default postSlice.reducer;
export const { openBox, closeBox } = postSlice.actions;
