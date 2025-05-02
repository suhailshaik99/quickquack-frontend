import { useForm } from "react-hook-form";
import useMutationFunc from "../services/useMutation";

import { SignUpFormSubmission } from "../services/FormSubmitAPI";
import { inputStyle, errorStyle, signUpButton } from "../utils/Styles";

function Form() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 51 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const mutate = useMutationFunc(
    SignUpFormSubmission,
    "Sign Up successfull",
    "Signing up failed",
  );

  function onSubmit(data) {
    const DOB = `${data.year}-${data.month}-${data.day}`;
    data.DOB = new Date(DOB);
    mutate(data);
  }

  return (
    <form className="grid grid-cols-2 gap-2" onSubmit={handleSubmit(onSubmit)}>
      {/* {First Name} */}
      <input
        id="firstname"
        type="text"
        placeholder={
          errors?.firstname?.message
            ? "!" + errors?.firstname?.message
            : "First Name"
        }
        className={`${errors?.firstname ? errorStyle : inputStyle}`}
        {...register("firstname", { required: "First name is required" })}
      />

      {/* {Last Name} */}
      <input
        id="lastname"
        type="text"
        placeholder={
          errors?.lastname?.message
            ? "!" + errors?.lastname?.message
            : "Last Name"
        }
        className={`${errors?.lastname ? errorStyle : inputStyle}`}
        {...register("lastname", { required: "Last name is required" })}
      />

      {/* {Username} */}
      <input
        type="text"
        id="username"
        placeholder={
          errors?.username?.message
            ? "!" + errors?.username?.message
            : "Username"
        }
        className={`col-span-2 ${errors?.username ? errorStyle : inputStyle}`}
        {...register(
          "username",
          { required: "Username is required" },
          {
            pattern: {
              value: /^[a-zA-Z0-9._@]+$/,
              message: "Only letters, numbers, ., _, and @ are allowed",
            },
          },
        )}
      />

      {/* {Email} */}
      <input
        id="email"
        type="email"
        placeholder={
          errors?.email?.message
            ? "!" + errors?.email?.message
            : "Email Address"
        }
        className={`col-span-2 ${errors?.email?.message ? errorStyle : inputStyle}`}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid email address",
          },
        })}
      />

      {/* {Password} */}
      <input
        id="password"
        type="password"
        placeholder={
          errors?.password?.message
            ? "!" + errors?.password?.message
            : "Password"
        }
        className={`col-span-2 sm:col-span-1 ${errors?.password ? errorStyle : inputStyle}`}
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 7,
            message: "Password must be at least 7 characters long.",
          },
        })}
      />

      {/* {Confirm Password} */}
      <input
        id="confirmPassword"
        type="password"
        placeholder={
          errors?.confirmPassword?.message
            ? "!" + errors?.confirmPassword?.message
            : "Confirm Password"
        }
        className={`col-span-2 sm:col-span-1 ${errors?.confirmPassword ? errorStyle : inputStyle}`}
        {...register("confirmPassword", {
          required: "Please confirm your password",
        })}
      />

      {/* {Mobile} */}
      <input
        id="mobile"
        type="tel"
        placeholder={
          errors?.mobile?.message
            ? "!" + errors?.mobile?.message
            : "Mobile Number"
        }
        className={`col-span-2 ${errors?.mobile ? errorStyle : inputStyle}`}
        {...register("mobile", {
          required: "Mobile number is required",
          pattern: {
            value: /^[0-9]{10}$/,
            message: "Invalid mobile number",
          },
        })}
      />

      {/* {Date of Birth} */}
      <div className="col-span-2 flex gap-4">
        <select className={`${inputStyle} w-full`} {...register("day")}>
          <option value="">Day</option>
          {days.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select className={`${inputStyle} w-full`} {...register("month")}>
          <option value="">Month</option>
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <select className={`${inputStyle} w-full`} {...register("year")}>
          <option value="">Year</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* {Gender} */}
      <label className={`${inputStyle} flex items-center justify-between px-3`}>
        Male
        <input id="male" type="radio" name="gender" value="male" />
      </label>
      <label className={`${inputStyle} flex items-center justify-between px-3`}>
        Female
        <input type="radio" name="gender" value="female" />
      </label>

      {/* {Signup button} */}
      <button type="submit" className={signUpButton}>
        Sign Up
      </button>
    </form>
  );
}

export default Form;
