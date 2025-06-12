import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messageBox: false,
  recipient: {
    userId: null,
    username: "",
    profilePicture: "",
  },
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessageBox(state) {
      state.messageBox = !state.messageBox;
    },
    setRecipientDetails(state, action) {
      state.recipient = action.payload;
    },
  },
});

export default messageSlice.reducer;
export const { setMessageBox, setRecipientDetails } = messageSlice.actions;
