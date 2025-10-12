import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  fontFamily?: "gilroy-semibold" | "gilroy-medium" | "inter";
  fontWeight?: "thin" | "light" | "medium" | "semibold" | "bold";
  fullWidth?: boolean;
  rounded?: "lg" | "full";
}

export function Button({
  children,
  variant = "primary",
  fontFamily = "gilroy-semibold",
  fontWeight = "medium",
  fullWidth = false,
  rounded = "lg",
  className,
  ...props
}: ButtonProps) {
  const fontClass =
    fontFamily === "inter"
      ? `font-inter font-${fontWeight}`
      : `font-${fontFamily}`;
  return (
    <button
      className={clsx(
        `text-sm cursor-pointer ${fontClass} transition duration-200`,
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
