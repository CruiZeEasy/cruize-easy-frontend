// "use client";
// import React from "react";
// import clsx from "clsx";
// import { motion, HTMLMotionProps } from "framer-motion";

// interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
//   variant?:
//     | "primary"
//     | "secondary"
//     | "outline"
//     | "sign_up_with_google"
//     | "dark-primary";
//   fontFamily?: "gilroy-semibold" | "gilroy-medium" | "inter" | "poppins";
//   fontWeight?: "thin" | "light" | "medium" | "semibold" | "bold";
//   fullWidth?: boolean;
//   rounded?: "lg" | "full";
//   shadow?: string;
// }

// export function Button({
//   children,
//   variant = "primary",
//   fontFamily = "gilroy-semibold",
//   fontWeight = "medium",
//   fullWidth = false,
//   rounded = "lg",
//   shadow = "shadow-xl",
//   className,
//   ...props
// }: ButtonProps) {
//   const fontClass =
//     fontFamily === "inter"
//       ? `font-inter font-${fontWeight}`
//       : fontFamily === "poppins"
//       ? `font-poppins font-${fontWeight}`
//       : `font-${fontFamily}`;

//   return (
//     <motion.button
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.95 }}
//       transition={{ type: "spring", stiffness: 300, damping: 15 }}
//       className={clsx(
//         `text-sm cursor-pointer ${fontClass} transform-gpu antialiased`,
//         shadow,
//         fullWidth && "w-full",
//         rounded === "lg" && "rounded-lg",
//         rounded === "full" && "rounded-full",
//         variant === "primary" &&
//           "bg-primary hover:bg-primary-dark text-white px-6 py-4",
//         variant === "secondary" && "bg-white text-red-accent px-6 py-4",
//         variant === "outline" &&
//           "bg-primary text-white border border-white px-6 py-4",
//         variant === "dark-primary" && "bg-primary-dark text-white px-6 py-4",
//         variant === "sign_up_with_google" && "bg-white text-neutral-950 p-4",
//         className
//       )}
//       {...props}
//     >
//       {children}
//     </motion.button>
//   );

"use client";
import React from "react";
import clsx from "clsx";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "sign_up_with_google"
    | "dark-primary";
  fontFamily?: "gilroy-semibold" | "gilroy-medium" | "inter" | "poppins";
  fontWeight?: "thin" | "light" | "medium" | "semibold" | "bold";
  fullWidth?: boolean;
  rounded?: "lg" | "full";
  shadow?: string;
  loading?: boolean;
  loadingText?: string;
}

const Spinner = ({ variant }: { variant?: string }) => {
  const spinnerColor =
    variant === "sign_up_with_google" ? "border-neutral-950" : "border-white";

  return (
    <motion.div
      className={clsx(
        "inline-block w-4 h-4 border-2 rounded-full",
        spinnerColor,
        "border-t-transparent"
      )}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

export function Button({
  children,
  variant = "primary",
  fontFamily = "gilroy-semibold",
  fontWeight = "medium",
  fullWidth = false,
  rounded = "lg",
  shadow = "shadow-xl",
  loading = false,
  loadingText,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const fontClass =
    fontFamily === "inter"
      ? `font-inter font-${fontWeight}`
      : fontFamily === "poppins"
      ? `font-poppins font-${fontWeight}`
      : `font-${fontFamily}`;

  const isDisabled = disabled || loading;

  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.95 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      disabled={isDisabled}
      className={clsx(
        `text-sm cursor-pointer ${fontClass} transform-gpu antialiased`,
        shadow,
        fullWidth && "w-full",
        rounded === "lg" && "rounded-lg",
        rounded === "full" && "rounded-full",
        variant === "primary" &&
          "bg-primary hover:bg-primary-dark text-white px-6 py-4",
        variant === "secondary" && "bg-white text-red-accent px-6 py-4",
        variant === "outline" &&
          "bg-primary text-white border border-white px-6 py-4",
        variant === "dark-primary" && "bg-primary-dark text-white p-4",
        variant === "sign_up_with_google" && "bg-white text-neutral-950 p-4",
        isDisabled && "opacity-60 cursor-not-allowed",
        className
      )}
      {...props}
    >
      <motion.span
        className="flex items-center justify-center gap-2"
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {loading && <Spinner variant={variant} />}
        <span>
          {(loading && loadingText ? loadingText : children) as React.ReactNode}
        </span>
      </motion.span>
    </motion.button>
  );
}
