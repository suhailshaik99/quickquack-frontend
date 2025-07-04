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

async function deletePost(data) {
  try {
    const response = await axios.delete(import.meta.env.VITE_DELETE_POST_URL, {
      data,
      withCredentials: true,
    });
    if (!response.data.success) {
      throw new Error(response?.data?.message || "Trouble deleting post...");
    }
    return response.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Trouble deleting post...";
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

async function updateProfileDetails(data) {
  try {
    const response = await axios.put(
      import.meta.env.VITE_UPDATE_PROFILE_DETAILS_URL,
      data,
      { withCredentials: true },
    );
    if (!response.data.success) {
      throw new Error(
        response.data.message || "Unable to update profile details",
      );
    }
    return response.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Unable to update profile details";
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

async function confirmFriendRequest({ docId, userId }) {
  try {
    const response = await axios.put(
      import.meta.env.VITE_FRIEND_REQUEST,
      { docId, requester: userId },
      {
        withCredentials: true,
      },
    );
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
    const errorMessage =
      error?.response?.data?.message ||
      "Unable to get pending requests at the moment";
    throw new Error(errorMessage);
  }
}

async function getFriends() {
  try {
    const response = await axios.get(import.meta.env.VITE_GET_FRIENDS, {
      withCredentials: true,
    });
    if (!response.data.success) {
      throw new Error("Unable to get friends at the moment");
    }
    return response?.data?.friends;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Unable to get friends at the moment";
    throw new Error(errorMessage);
  }
}

async function removeFollower(friendId) {
  try {
    const response = await axios.delete(import.meta.env.VITE_REMOVE_FOLLOWER, {
      data: {
        friendId,
      },
      withCredentials: true,
    });
    if (!response.data.success) {
      throw new Error("Error removing follower");
    }
    return response.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Error removing follower";
    throw new Error(errorMessage);
  }
}

async function unfollowUser(friendId) {
  try {
    const response = await axios.delete(import.meta.env.VITE_REMOVE_FOLLOWING, {
      data: {
        friendId,
      },
      withCredentials: true,
    });
    if (!response.data.success) {
      throw new Error("Error removing the user from following list");
    }
    return response.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      "Error removing the user from following list";
    throw new Error(errorMessage);
  }
}

async function getMessageCards() {
  try {
    const response = await axios.get(import.meta.env.VITE_GET_MESSAGE_CARDS, {
      withCredentials: true,
    });
    if (!response.data.success) {
      throw new Error("Error fetching the message cards at the moment");
    }
    return response.data.messages;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      "Error fetching the message cards at the moment";
    throw new Error(errorMessage);
  }
}

async function getUserMessages({ queryKey }) {
  const [, receiver] = queryKey[0];
  const url = import.meta.env.VITE_GET_USER_MESSAGES.replace(
    ":receiver",
    receiver,
  );
  try {
    const response = await axios.get(url, { withCredentials: true });
    if (!response.data.success) {
      throw new Error("Error fetching the user messages");
    }
    return response?.data?.userMessages;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Error fetching the user messages..";
    throw new Error(errorMessage);
  }
}

async function searchUsers(username) {
  const url = import.meta.env.VITE_SEARCH_USERS_URL.replace(
    "userName",
    username,
  );
  try {
    const response = await axios.get(url, { withCredentials: true });
    if (!response.data.success) {
      throw new Error("Error fetching results");
    }
    return response?.data?.searchResults;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Error fetching results..";
    throw new Error(errorMessage);
  }
}

async function getNotifications() {
  try {
    const response = await axios.get(
      import.meta.env.VITE_GET_NOTIFICATIONS_URL,
      { withCredentials: true },
    );
    if (!response.data.success) {
      throw new Error("Error fetching notifications");
    }
    return response?.data?.notifications;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Error fetching notifications..";
    throw new Error(errorMessage);
  }
}

async function getUnreadCount() {
  try {
    const response = await axios.get(
      import.meta.env.VITE_GET_NOTIFICATIONS_COUNT_URL,
      { withCredentials: true },
    );
    if (!response.data.success) {
      throw new Error("Error fetching notifications count");
    }
    return response?.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Error fetching notifications count..";
    throw new Error(errorMessage);
  }
}

async function logoutUser() {
  try {
    const response = await axios.get(
      import.meta.env.VITE_LOGOUT_USER,
      { withCredentials: true },
    );
    if (!response.data.success) {
      throw new Error("Error Logging out user");
    }
    return response?.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Error Logging out user";
    throw new Error(errorMessage);
  }
}

export {
  getPosts,
  createPost,
  createLike,
  logoutUser,
  getFriends,
  deletePost,
  getComments,
  searchUsers,
  createUnlike,
  unfollowUser,
  createComment,
  getUnreadCount,
  removeFollower,
  getMessageCards,
  getUserMessages,
  getNotifications,
  authenticateUser,
  getProfileDetails,
  getFriendRequests,
  sendOTPSubmission,
  sendFriendRequest,
  cancelFriendRequest,
  deleteFriendRequest,
  getSuggestedFriends,
  LoginFormSubmission,
  updateProfileDetails,
  confirmFriendRequest,
  SignUpFormSubmission,
  getUserProfileDetails,
  verifyUserAuthentication,
  ChangePasswordSubmission,
};
