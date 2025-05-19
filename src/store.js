import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./features/Posts/postSlice";
import userReducer from "./features/Authentication/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
});

export default store;
