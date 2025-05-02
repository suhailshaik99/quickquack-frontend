import { useState } from "react";
import { EyeOpen, EyeClosed } from "./PasswordVisibility";

const inputElementStyle =
  "h-[4rem] rounded-xl border-2 p-4 text-[1.6rem] text-slate-700 placeholder:text-[1.5rem] placeholder:font-medium focus:outline-none focus:ring focus:ring-sky-400 focus:ring-offset-0 border-sky-500";

const errorElementStyle =
  "h-[4rem] rounded-xl border-2 border-red-500 p-4 text-[1.6rem] placeholder:text-red-500 placeholder:text-[1.5rem] placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-0";

function InputElement({ label, type, id, placeholder, register, errors }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <label className="flex flex-col gap-2 text-2xl font-semibold text-sky-600 sm:gap-5 sm:text-4xl">
      {label}{" "}
      {/* {errors?.[id]?.message && (
        <span className="text-[1rem] tracking-wider text-red-600">
          {errors?.[id].message}
        </span>
      )} */}
      <input
        type={type === "password" && showPassword ? "text" : type}
        placeholder={errors?.[id] ? errors?.[id].message : placeholder}
        className={errors?.[id] ? errorElementStyle : inputElementStyle}
        {...register(`${id}`, { required: `${id} is required` })}
      />
      {id == "password" &&
        (showPassword ? EyeOpen(setShowPassword) : EyeClosed(setShowPassword))}
    </label>
  );
}

export default InputElement;
