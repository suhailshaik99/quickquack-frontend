// Library Imports
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

// Local Imports
import {
  ChangePasswordSubmission,
  sendOTPSubmission,
} from "../services/FormSubmitAPI";
import InputElement from "../UI/InputElement";
import useMutationFunc from "../hooks/useMutation";

function ForgotPassword() {
  const navigate = useNavigate();
  const {
    register: registerOTPForm,
    handleSubmit: handleOTPSubmit,
    formState: { errors: OTPErrors },
  } = useForm();

  const {
    register: registerForgotPasswordForm,
    handleSubmit: handleForgotPasswordFormSubmit,
    formState: { errors: ForgotPasswordErrors },
  } = useForm();

  const [mutateChangePassword, isChangingPassword, isSuccess] = useMutationFunc(
    ChangePasswordSubmission,
    "Password Changed Successfully",
    "Password resetting failed.",
  );

  const [mutateOTP, isSendingEmail] = useMutationFunc(
    sendOTPSubmission,
    "OTP sent to your email..!",
    "Sending OTP Failed...!",
  );

  function onSubmitOTP(data) {
    mutateOTP(data);
  }

  function onSubmitPassword(data) {
    mutateChangePassword(data);
  }

  useEffect(
    function () {
      isSuccess ? navigate("/login") : "";
    },
    [isSuccess, navigate],
  );

  return (
    <main className="grid min-h-[100dvh] grid-cols-1 sm:h-screen sm:grid-cols-[1fr_1fr]">
      <div className="hidden bg-sky-300 sm:flex sm:items-center sm:justify-center">
        <div>
          <img
            src="/LOGIN_IMG.webp"
            alt="login_image"
            className="h-[30rem] sm:h-[50rem]"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-14 bg-sky-200 p-4">
        <div className="w-[33rem] rounded-3xl bg-sky-50 p-10 shadow-md shadow-gray-400 sm:w-[60rem]">
          <h1 className="mb-7 text-center text-5xl font-semibold text-sky-800 sm:mb-16 sm:text-7xl">
            Forgot Password
          </h1>
          <form onSubmit={handleOTPSubmit(onSubmitOTP)}>
            <div className="flex flex-col gap-7 sm:gap-6">
              <InputElement
                label="Email"
                type="email"
                id="email"
                placeholder="Enter your registered email"
                register={registerOTPForm}
                errors={OTPErrors}
              />
              <button
                type="submit"
                className="rounded-2xl bg-sky-900 p-4 text-2xl font-semibold text-white focus:outline-none focus:ring focus:ring-sky-900 focus:ring-offset-2 disabled:cursor-not-allowed sm:text-2xl"
                disabled={isSendingEmail}
              >
                {isSendingEmail ? "Sending OTP..." : "Request OTP"}
              </button>
            </div>
          </form>
          <form onSubmit={handleForgotPasswordFormSubmit(onSubmitPassword)}>
            <div className="mt-6 flex flex-col gap-4 sm:gap-5">
              <InputElement
                label="Password"
                type="password"
                id="password"
                placeholder="Enter new password"
                register={registerForgotPasswordForm}
                errors={ForgotPasswordErrors}
              />
              <InputElement
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                placeholder="Confirm new password"
                register={registerForgotPasswordForm}
                errors={ForgotPasswordErrors}
              />
              <div className="flex gap-3">
                <InputElement
                  type="text"
                  id="otp"
                  placeholder="Enter your OTP here"
                  register={registerForgotPasswordForm}
                  errors={ForgotPasswordErrors}
                />
              </div>
              <button
                className="duration-400 rounded-xl bg-sky-400 p-3 text-2xl font-semibold text-white transition-colors hover:bg-sky-600 hover:text-white focus:outline-none focus:ring focus:ring-sky-500 focus:ring-offset-2 sm:text-3xl"
                disabled={isChangingPassword}
              >
                {isChangingPassword
                  ? "Changing Password..."
                  : "Change Password"}
              </button>
            </div>
          </form>
        </div>
        <div>
          <Link
            to={"/signup"}
            className="p-4 text-3xl font-bold focus:rounded-md focus:outline-none focus:ring focus:ring-sky-500 focus:ring-offset-2"
          >
            Dont have an account?{" "}
            <span className="text-sky-800 hover:underline">Sign Up</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ForgotPassword;
