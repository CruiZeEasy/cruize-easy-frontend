// "use client";
// import React, { useState } from "react";
// import clsx from "clsx";

// interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   label: string;
//   id: string;
//   fullWidth?: boolean;
//   rounded?: "lg" | "full";
//   fontFamily?: "gilroy-medium" | "gilroy-semibold";
// }

// export const FormInput: React.FC<InputProps> = ({
//   label,
//   id,
//   type = "text",
//   fullWidth = true,
//   rounded = "lg",
//   fontFamily = "gilroy-medium",
//   className,
//   ...props
// }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const inputType = type === "password" && showPassword ? "text" : type;

//   return (
//     <div className={clsx("flex flex-col space-y-2", fullWidth && "w-full")}>
//       <label htmlFor={id} className="font-gilroy-bold text-sm">
//         {label}
//       </label>

//       <div className="relative">
//         <input
//           id={id}
//           type={inputType}
//           className={clsx(
//             "border border-neutral-200 py-4 px-4 pr-10 transition-all duration-200 ease-in-out focus:ring-1 focus:ring-primary outline-none w-full",
//             fontFamily === "gilroy-medium" && "font-gilroy-medium",
//             fontFamily === "gilroy-semibold" && "font-gilroy-semibold",
//             rounded === "full" && "rounded-full",
//             rounded === "lg" && "rounded-lg",
//             className
//           )}
//           {...props}
//         />

//         {type === "password" && (
//           <i
//             className={clsx(
//               "fa",
//               showPassword ? "fa-eye-slash" : "fa-eye",
//               "absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 text-sm transition duration-200 hover:scale-[1.1] active:scale-90"
//             )}
//             onClick={() => setShowPassword((prev) => !prev)}
//           ></i>
//         )}
//       </div>
//     </div>
//   );
// };

"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

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
  const [focused, setFocused] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className={clsx("flex flex-col space-y-2", fullWidth && "w-full")}>
      <label htmlFor={id} className="font-gilroy-bold text-sm">
        {label}
      </label>

      <motion.div
        animate={{
          scale: focused ? 1.005 : 1,
          boxShadow: focused
            ? "0px 1px 6px rgba(0,0,0,0.08)"
            : "0px 0px 0px rgba(0,0,0,0)",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        className="relative"
      >
        <input
          id={id}
          type={inputType}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={clsx(
            "border border-neutral-200 p-4 bg-white text-gray-900",
            "transition-all duration-200 ease-in-out focus:border-primary-dark focus:ring-0 outline-none w-full",
            fontFamily === "gilroy-medium" && "font-gilroy-medium",
            fontFamily === "gilroy-semibold" && "font-gilroy-semibold",
            rounded === "full" && "rounded-full",
            rounded === "lg" && "rounded-lg",
            className
          )}
          {...props}
        />

        {type === "password" && (
          <motion.i
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseDown={(e) => e.preventDefault()} // Prevent input blur on click
            className={clsx(
              "fa",
              showPassword ? "fa-eye-slash" : "fa-eye",
              "absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 text-sm transition-colors duration-200 hover:text-gray-700"
            )}
            onClick={() => setShowPassword((prev) => !prev)}
          ></motion.i>
        )}
      </motion.div>
    </div>
  );
};
