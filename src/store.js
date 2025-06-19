// Library Imports
import { configureStore } from "@reduxjs/toolkit";

// Local Imports
import postReducer from "./features/Posts/postSlice";
import profileReducer from "./features/Profile/profileSlice";
import userReducer from "./features/Authentication/userSlice";
import messageReducer from "./features/Messages/messageSlice";
import requestsReducer from "./features/ConnectionRequests/requestSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    profile: profileReducer,
    message: messageReducer,
    requests: requestsReducer,
  },
});

export default store;
