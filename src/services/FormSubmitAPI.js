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
        response.data.message || "Unable to fetch posts at the moment",
      );
    }
    return response.data.posts;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Unable to fetch posts at the moment";
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

async function createComment({ postId, data }) {
  const postCommentUrl = import.meta.env.VITE_POST_COMMENT_URL.replace(
    ":postId",
    postId,
  );
  try {
    const response = await axios.post(postCommentUrl, data, {
      withCredentials: true,
    });
    if (!response.data.success) {
      throw new Error(response.data.message || "Error posting the comment...");
    }
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    const errorMessage =
      error?.response?.data?.message || "Error posting the comment...";
    throw new Error(errorMessage);
  }
}

async function getComments({ queryKey }) {
  const [, postId] = queryKey[0];
  const getCommentsUrl = import.meta.env.VITE_GET_COMMENTS_URL.replace(
    ":postId",
    postId,
  );
  try {
    const response = await axios.get(getCommentsUrl, { withCredentials: true });
    if (!response.data.success) {
      throw new Error(
        response.data.message || "Unable to fetch comments at the moment..",
      );
    }
    return response.data.comments;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      "Unable to fetch comments at the moment";
    throw new Error(errorMessage);
  }
}

async function getUserProfileDetails({ queryKey }) {
  const [, username] = queryKey[0];
  const getUserProfileDetailsUrl =
    import.meta.env.VITE_GET_USER_PROFILE_DETAILS.replace(
      ":username",
      username,
    );
  try {
    const response = await axios.get(getUserProfileDetailsUrl, {
      withCredentials: true,
    });
    if (!response.data.success) {
      throw new Error(
        response.data.message || "Unable to fetch the profile at the moment",
      );
    }
    return response.data.userDetails;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      "Unable to fetch the profile at the moment";
    throw new Error(errorMessage);
  }
}

async function getProfileDetails() {
  try {
    const response = await axios.get(
      import.meta.env.VITE_GET_PROFILE_DETAILS_URL,
      { withCredentials: true },
    );
    if (!response.data.success) {
      throw new Error(
        response.data.message || "Cannot load profile at the moment..",
      );
    }
    return response.data.profileDetails;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Cannot load profile at the moment..";
    throw new Error(errorMessage);
  }
}

async function getSuggestedFriends() {
  try {
    const response = await axios.get(
      import.meta.env.VITE_GET_SUGGESTED_FRIENDS,
      { withCredentials: true },
    );
    if (!response.data.success) {
      throw new Error(
        response.data.message || "No Friends yet on this application",
      );
    }
    return response.data.suggestedFriends;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Unable to fetch people at the moment";
    throw new Error(errorMessage);
  }
}

async function sendFriendRequest(recipient) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_FRIEND_REQUEST,
      { recipient },
      { withCredentials: true },
    );

    if (!response.data.success) {
      throw new Error(
        response.data.message || "Unable to send request at the moment",
      );
    }
    return response.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Unable to send request at the moment";
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
}

async function cancelFriendRequest(recipient) {
  try {
    const response = await axios.delete(
      import.meta.env.VITE_CANCEL_FRIEND_REQUEST,
      {
        data: { recipient },
        withCredentials: true,
      },
    );

    if (!response.data.success) {
      throw new Error(
        response.data.message || "Unable to cancel request at the moment",
      );
    }
    return response.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      "Unable to cancel request at the moment";
    throw new Error(errorMessage);
  }
}

async function deleteFriendRequest(requester) {
  try {
    const response = await axios.delete(import.meta.env.VITE_FRIEND_REQUEST, {
      data: { requester },
      withCredentials: true,
    });
    if (!response.data.success) {
      throw new Error(
        response.data.message || "Unable to delete request at the moment",
      );
    }
    return response.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      "Unable to delete request at the moment";
    throw new Error(errorMessage);
  }
}

async function confirmFriendRequest({docId, userId}) {
  try {
    const response = await axios.put(
      import.meta.env.VITE_FRIEND_REQUEST,
      { docId, requester: userId },
      {
        withCredentials: true,
      },
    );
    console.log(response.data);
    if (!response.data.success) {
      throw new Error(
        response.data.message || "Unable to confirm request at the moment",
      );
    }
    return response.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      "Unable to confirm request at the moment";
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
}

async function getFriendRequests() {
  try {
    const response = await axios.get(import.meta.env.VITE_FRIEND_REQUEST, {
      withCredentials: true,
    });
    if (!response.data.success) {
      throw new Error("Unable to get pending requests at the moment");
    }
    return response.data.requests;
  } catch (error) {
    console.log(error?.response?.data);
    const errorMessage =
      error?.response?.data?.message ||
      "Unable to get pending requests at the moment";
    throw new Error(errorMessage);
  }
}

export {
  getPosts,
  createPost,
  createLike,
  getComments,
  createUnlike,
  createComment,
  authenticateUser,
  getProfileDetails,
  getFriendRequests,
  sendOTPSubmission,
  sendFriendRequest,
  cancelFriendRequest,
  deleteFriendRequest,
  getSuggestedFriends,
  LoginFormSubmission,
  confirmFriendRequest,
  SignUpFormSubmission,
  getUserProfileDetails,
  verifyUserAuthentication,
  ChangePasswordSubmission,
};
