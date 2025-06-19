import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openRequestsBox: false,
  connectionRequestsCount: null,
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
    setConnectionRequestsCount(state, action) {
      state.connectionRequestsCount = action.payload;
    },
    incrementConnectionRequestsCount(state) {
      const currentCount = state.connectionRequestsCount;
      state.connectionRequestsCount =
        (currentCount !== null ? currentCount : 0) + 1;
    },
  },
});

export default requestSlice.reducer;
export const {
  openRequestsBox,
  closeRequestsBox,
  setConnectionRequestsCount,
  incrementConnectionRequestsCount,
} = requestSlice.actions;
