import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
  rounded?: "lg" | "full";
}

export function Button({
  children,
  variant = "primary",
  fullWidth = false,
  rounded = "lg",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "text-sm cursor-pointer font-gilroy-semibold transition duration-200",
        "shadow-xl hover:scale-[1.02] active:scale-95",
        fullWidth && "w-full",
        rounded === "lg" && "rounded-lg",
        rounded === "full" && "rounded-full",
        variant === "primary" &&
          "bg-primary hover:bg-primary-dark text-white px-6",
        variant === "secondary" && "bg-white text-red-accent px-6 py-4",
        variant === "outline" &&
          "bg-primary text-white border border-white px-6 py-4",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
