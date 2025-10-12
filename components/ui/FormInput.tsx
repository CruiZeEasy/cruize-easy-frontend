"use client";
import React, { useState } from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  fullWidth?: boolean;
  rounded?: "lg" | "full";
  fontFamily?: "gilroy-medium" | "gilroy-semibold";
}

export const FormInput: React.FC<InputProps> = ({
  label,
  id,
  type = "text",
  fullWidth = true,
  rounded = "lg",
  fontFamily = "gilroy-medium",
  className,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className={clsx("flex flex-col space-y-2", fullWidth && "w-full")}>
      <label htmlFor={id} className="font-gilroy-bold text-sm">
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={inputType}
          className={clsx(
            "border border-neutral-200 py-4 px-4 pr-10 transition-all duration-200 ease-in-out focus:ring-1 focus:ring-primary outline-none w-full",
            fontFamily === "gilroy-medium" && "font-gilroy-medium",
            fontFamily === "gilroy-semibold" && "font-gilroy-semibold",
            rounded === "full" && "rounded-full",
            rounded === "lg" && "rounded-lg",
            className
          )}
          {...props}
        />

        {type === "password" && (
          <i
            className={clsx(
              "fa",
              showPassword ? "fa-eye-slash" : "fa-eye",
              "absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 text-sm transition duration-200 hover:scale-[1.1] active:scale-90"
            )}
            onClick={() => setShowPassword((prev) => !prev)}
          ></i>
        )}
      </div>
    </div>
  );
};
