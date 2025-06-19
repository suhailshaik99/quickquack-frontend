// Library Imports
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messageBox: false,
  recipient: {
    userId: null,
    username: "",
    profilePicture: "",
  },
  allMessages: [],
  unreadMessages: {},
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
    setMessages(state, action) {
      state.allMessages = action.payload;
    },
    addMessage(state, action) {
      const exists = state.allMessages.some(
        (m) => m._id === action.payload._id,
      );
      if (!exists) {
        state.allMessages.push(action.payload);
      }
    },
    addUserMessage(state, action) {
      state.allMessages.push(action.payload);
    },
    clearMessages(state) {
      state.allMessages = [];
    },
    clearRecipientDetails(state) {
      const recipient = {
        userId: null,
        username: "",
        profilePicture: "",
      };
      state.recipient = recipient;
    },
    clearUnreadMessages(state, action) {
      const senderId = action.payload;
      delete state.unreadMessages[senderId];
    },

    addUnreadMessage(state, action) {
      const msg = action.payload;
      messageSlice.caseReducers.addUnreadMessagesBatch(state, {
        payload: [msg],
      });
    },

    addUnreadMessagesBatch(state, action) {
      const newMessages = action.payload;

      newMessages.forEach((msg) => {
        const senderId = msg.sender;

        // If no unread messages exist for this sender, initialize the array.
        if (!state.unreadMessages[senderId]) {
          state.unreadMessages[senderId] = [];
        }

        // Check if this specific message already exists to prevent duplicates.
        const exists = state.unreadMessages[senderId].some(
          (existingMsg) => existingMsg._id === msg._id,
        );

        if (!exists) {
          state.unreadMessages[senderId].push(msg);
        }
      });
    },
  },
});

export default messageSlice.reducer;
export const {
  addMessage,
  setMessages,
  setMessageBox,
  clearMessages,
  addUserMessage,
  addUnreadMessage,
  clearUnreadMessages,
  setRecipientDetails,
  clearRecipientDetails,
  addUnreadMessagesBatch,
} = messageSlice.actions;