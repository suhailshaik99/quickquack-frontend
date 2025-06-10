import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openRequestsBox: false,
};

const requestSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    openRequestsBox(state) {
      state.openRequestsBox = true;
    },
    closeRequestsBox(state) {
      state.openRequestsBox = false;
    },
  },
});

export default requestSlice.reducer;
export const { openRequestsBox, closeRequestsBox } = requestSlice.actions;
