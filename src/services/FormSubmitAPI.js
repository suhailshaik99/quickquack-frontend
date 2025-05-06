import axios from "axios";

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
  console.log(import.meta.VITE_SIGNUP_URL);
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
    console.log(response.data);
    return response.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "OTP Sending Failed...";
    throw new Error(errorMessage);
  }
}

export {
  SignUpFormSubmission,
  LoginFormSubmission,
  ChangePasswordSubmission,
  sendOTPSubmission,
};
