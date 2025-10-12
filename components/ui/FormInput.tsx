import React from "react";
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
  fullWidth = true,
  rounded = "lg",
  fontFamily = "gilroy-medium",
  className,
  ...props
}) => {
  return (
    <div className={clsx("flex flex-col space-y-2", fullWidth && "w-full")}>
      <label htmlFor={id} className="font-gilroy-bold text-sm">
        {label}
      </label>
      <input
        id={id}
        className={clsx(
          "border border-neutral-200 rounded-lg py-4 px-4 transition-all duration-200 ease-in-out focus:ring-1 focus:ring-primary outline-none",
          fontFamily === "gilroy-medium" && "font-gilroy-medium",
          fontFamily === "gilroy-semibold" && "font-gilroy-semibold",
          rounded === "full" && "rounded-full",
          rounded === "lg" && "rounded-lg",
          className
        )}
        {...props}
      />
    </div>
  );
};
