// Library Imports
import { configureStore } from "@reduxjs/toolkit";

// Local Imports
import postReducer from "./features/Posts/postSlice";
import userReducer from "./features/Authentication/userSlice";
import requestsReducer from "./features/ConnectionRequests/requestSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    requests: requestsReducer,
  },
});

export default store;
