// Library Imports
import { configureStore } from "@reduxjs/toolkit";

// Local Imports
import postReducer from "./features/Posts/postSlice";
import profileReducer from "./features/Profile/profileSlice";
import userReducer from "./features/Authentication/userSlice";
import messageReducer from "./features/Messages/messageSlice";
import requestsReducer from "./features/ConnectionRequests/requestSlice";
import notificationsReducer from "./features/Notifications/notificationSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    profile: profileReducer,
    message: messageReducer,
    requests: requestsReducer,
    notifications: notificationsReducer,
  },
});

export default store;
