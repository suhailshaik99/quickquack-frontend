import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

async function SignUpFormSubmission(data) {
  try {
    const response = await axios.post(import.meta.env.VITE_SIGNUP_URL, data, {
      withCredentials: true,
    });
    if (!response.data.success) {
      throw new Error(response.data.message || "Signup Failed");
    }
    return response.data;
  } catch (error) {
    const errorMessage = error?.response?.data?.message || "Sign Up Failed";
    throw new Error(errorMessage);
  }
}

async function LoginFormSubmission(data) {
  try {
    const response = await axios.post(import.meta.env.VITE_LOGIN_URL, data, {
      withCredentials: true,
    });
    if (!response.data.success) {
      throw new Error(response.data.message || "Login Failed");
    }
    return response.data;
  } catch (error) {
    const errorMessage = error?.response?.data?.message || "Login Failed";
    throw new Error(errorMessage);
  }
}

async function ChangePasswordSubmission(data) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_SUBMIT_OTP_URL,
      data,
    );
    if (!response.data.success) {
      throw new Error(response.data.message || "Changing Password Failed");
    }
    return response.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Changing Password Failed";
    throw new Error(errorMessage);
  }
}

async function sendOTPSubmission(data) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_REQUEST_OTP_URL,
      data,
    );
    if (!response.data.success) {
      throw new Error(response.data.message || "OTP Sending Failed...");
    }
    return response.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "OTP Sending Failed...";
    throw new Error(errorMessage);
  }
}

async function authenticateUser() {
  try {
    const response = await axios.get(
      import.meta.env.VITE_AUTHENTICATE_USER_URL,
      { withCredentials: true },
    );
    if (!response.data.success) {
      throw new Error(response.data.message || "User Authentication Failed..");
    }
    return response.data;
  } catch (error) {
    const errorMessage = error?.response?.status;
    throw new Error(errorMessage);
  }
}

// Thunk Middlware Function
const verifyUserAuthentication = createAsyncThunk(
  "user/verifyUserAuth",
  async (_, thunkAPI) => {
    try {
      const data = await authenticateUser();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.message || "Authentication Failed..!",
      );
    }
  },
);

async function getPosts() {
  try {
    const response = await axios.get(import.meta.env.VITE_GET_POSTS_URL, {
      withCredentials: true,
    });
    if (!response.data.success) {
      throw new Error(
        response.data.message || "Unable fetch posts at the moment",
      );
    }
    return response.data.posts;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Unable fetch posts at the moment";
    throw new Error(errorMessage);
  }
}

async function createPost(data) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_CREATE_POST_URL,
      data,
      {
        withCredentials: true,
      },
    );
    if (!response.data.success) {
      throw new Error(
        response.data.message || "Trouble while uploading post...",
      );
    }
    return response.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Trouble while uploading post...";
    throw new Error(errorMessage);
  }
}

async function createLike(postId) {
  const likePostUrl = import.meta.env.VITE_LIKE_POST_URL.replace(
    ":postId",
    postId,
  );
  try {
    const response = await axios.post(
      likePostUrl,
      {},
      { withCredentials: true },
    );
    if (!response.data.success) {
      throw new Error(response.data.message || "Trouble Liking post...");
    }
    return response.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Error Liking post...";
    throw new Error(errorMessage);
  }
}

async function createUnlike(postId) {
  const unLikePostUrl = import.meta.env.VITE_UNLIKE_POST_URL.replace(
    ":postId",
    postId,
  );
  try {
    const response = await axios.delete(unLikePostUrl, {
      withCredentials: true,
    });
    if (!response.data.success) {
      throw new Error(response.data.message || "Error unliking the post...");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    const errorMessage =
      error?.response?.data?.message || "Error unliking the post...";
    throw new Error(errorMessage);
  }
}

export {
  getPosts,
  createPost,
  createLike,
  createUnlike,
  authenticateUser,
  sendOTPSubmission,
  LoginFormSubmission,
  SignUpFormSubmission,
  verifyUserAuthentication,
  ChangePasswordSubmission,
};
