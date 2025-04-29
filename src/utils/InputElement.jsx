import { useState } from "react";
import { EyeOpen, EyeClosed } from "./PasswordVisibility";

function InputElement({ label, type, id, placeholder, register, errors }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <label className="flex flex-col gap-2 text-2xl font-semibold text-sky-600 sm:gap-5 sm:text-4xl">
      {label}{" "}
      {errors?.[id]?.message && (
        <span className="text-[1rem] tracking-wider text-red-600">
          {errors?.[id].message}
        </span>
      )}
      <input
        type={type === "password" && showPassword ? "text" : type}
        placeholder={placeholder}
        className="focus:ring-offset-5 h-[4rem] rounded-xl p-4 text-[1.5rem] text-slate-700 placeholder:text-[1.5rem] placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-1"
        {...register(`${id}`, { required: "This field is required" })}
      />
      {id == "password" &&
        (showPassword ? EyeOpen(setShowPassword) : EyeClosed(setShowPassword))}
    </label>
  );
}

export default InputElement;
