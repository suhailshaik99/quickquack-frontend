import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Form from "../UI/SignUpForm";
import useMutationFunc from "../services/useMutation";
import { SignUpFormSubmission } from "../services/FormSubmitAPI";

function SignupPage() {
  const navigate = useNavigate();
  const [mutate, , isSuccess] = useMutationFunc(
    SignUpFormSubmission,
    "Sign Up successfull",
    "Signing up failed",
  );

  useEffect(
    function () {
      isSuccess ? navigate("/login") : "";
    },
    [isSuccess, navigate],
  );

  return (
    <div className="grid min-h-[100dvh] grid-cols-1 place-items-center bg-sky-200 p-4 sm:h-screen sm:grid-cols-[1fr_1fr]">
      <div className="hidden sm:block">
        <img
          src="SIGNUP_IMG.PNG"
          alt="signup_image"
          className="h-full w-full"
        />
      </div>
      <div className="rounded-[2.5rem] bg-sky-100 shadow-md shadow-gray-500">
        <div className="p-6 sm:w-[60rem]">
          <h1 className="mb-10 text-center text-6xl font-semibold tracking-wide text-sky-600 sm:text-7xl">
            SignUp
          </h1>
          <Form mutate={mutate} />
          <div className="mt-2 flex items-center justify-center text-[1.7rem] font-bold tracking-wide">
            <Link
              to={"/login"}
              className="focus:rounded-md focus:px-2 focus:outline-none focus:ring focus:ring-sky-500 focus:ring-offset-2"
            >
              Already have an account?{" "}
              <span className="text-sky-700 hover:underline">Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
