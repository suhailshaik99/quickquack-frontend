// Library Imports
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

// Local Imports
import InputElement from "../UI/InputElement";
import useMutationFunc from "../hooks/useMutation";
import { LoginFormSubmission } from "../services/FormSubmitAPI";

function LoginPage() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const navigate = useNavigate();

  const [mutate, isPending, isSuccess] = useMutationFunc(
    LoginFormSubmission,
    "Login Successfull",
    "Login Failed",
    true,
  );

  function onSubmit(data) {
    mutate(data);
  }

  useEffect(
    function () {
      isSuccess ? navigate("/") : "";
    },
    [isSuccess, navigate],
  );

  return (
    <main className="grid min-h-[100dvh] grid-cols-1 sm:h-screen sm:grid-cols-[1fr_1fr]">
      <div className="hidden bg-sky-300 sm:flex sm:items-center sm:justify-center">
        <div>
          <img
            src="LOGIN_IMG.webp"
            alt="login_image"
            className="h-[30rem] sm:h-[50rem]"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-14 bg-sky-200 p-4">
        <div className="w-[33rem] rounded-3xl bg-sky-50 p-10 shadow-md shadow-gray-400 sm:w-[60rem]">
          <h1 className="mb-7 text-center text-5xl font-semibold text-sky-800 sm:mb-16 sm:text-8xl">
            Quick-Quack
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-7 sm:gap-12">
              <InputElement
                label="Email"
                type="email"
                id="email"
                placeholder="Enter your registered email"
                register={register}
                errors={errors}
              />

              <InputElement
                label="Password"
                type="password"
                id="password"
                placeholder="Enter your password"
                register={register}
                errors={errors}
              />
              <button
                className="duration-400 rounded-xl bg-sky-400 p-3 text-2xl font-semibold tracking-wide text-slate-800 transition-colors hover:bg-sky-500 hover:text-white focus:outline-none focus:ring focus:ring-sky-500 focus:ring-offset-2 disabled:cursor-not-allowed sm:text-3xl"
                disabled={isPending}
              >
                {isPending ? "Loging In..." : "Login"}
              </button>
              <Link
                to={"/forgot-password"}
                className="text-center text-2xl font-semibold hover:text-sky-300 hover:underline focus:rounded-md focus:outline-none focus:ring focus:ring-sky-500 focus:ring-offset-2"
              >
                Forgotten your password?
              </Link>
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

export default LoginPage;
