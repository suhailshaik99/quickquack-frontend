import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  unreadNotificationsCount: null,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setUnreadNotificationsCount(state, action) {
      state.unreadNotificationsCount = action.payload;
    },
    clearAllNotifications(state) {
      state.unreadNotificationsCount = null;
    },
  },
});

export const { setUnreadNotificationsCount, clearAllNotifications } =
  notificationSlice.actions;
export default notificationSlice.reducer;
