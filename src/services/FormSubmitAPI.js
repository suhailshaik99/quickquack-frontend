import axios from "axios";

async function SignUpFormSubmission(data) {
  const response = await axios.post(import.meta.env.VITE_SIGNUP_URL, data);
  console.log(response.data);
  return response.data;
}

async function LoginFormSubmission(data) {
  const response = await axios.post(import.meta.env.VITE_LOGIN_URL, data);
  return response.data;
}

export { SignUpFormSubmission, LoginFormSubmission };
