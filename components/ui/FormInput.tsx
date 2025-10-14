"use client";

import React, { useRef, useState } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  fullWidth?: boolean;
  rounded?: "lg" | "full";
  fontFamily?: "gilroy-medium" | "gilroy-semibold";
  error?: string;
  showPasswordRules?: boolean;
  showPasswordRulesBelow?: boolean;
  watchValue?: string; // used only for displaying password rules
}

// Password validation rules
export const passwordRules = [
  { label: "At least 8 characters", test: (val: string) => val.length >= 8 },
  {
    label: "At least 1 uppercase letter",
    test: (val: string) => /[A-Z]/.test(val),
  },
  {
    label: "At least 1 lowercase letter",
    test: (val: string) => /[a-z]/.test(val),
  },
  { label: "At least 1 number", test: (val: string) => /\d/.test(val) },
  {
    label: "At least 1 special character",
    test: (val: string) => /[^A-Za-z0-9]/.test(val),
  },
];

export const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      id,
      type = "text",
      fullWidth = true,
      rounded = "lg",
      fontFamily = "gilroy-medium",
      error,
      showPasswordRules = false,
      showPasswordRulesBelow = false,
      watchValue = "",
      className,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const inputType = type === "password" && showPassword ? "text" : type;

    // Toggle password visibility
    const togglePassword = () => {
      const input = inputRef.current;
      if (!input) return;
      const start = input.selectionStart || 0;
      const end = input.selectionEnd || 0;
      setShowPassword((prev) => !prev);
      requestAnimationFrame(() => {
        input?.setSelectionRange(start, end);
        input?.focus();
      });
    };

    // Determine which value to use for password validation
    const passwordValue =
      typeof watchValue === "string" ? watchValue : String(watchValue ?? "");

    return (
      <div className={clsx("flex flex-col space-y-2", fullWidth && "w-full")}>
        {/* Label */}
        <label htmlFor={id} className="font-gilroy-bold text-sm">
          {label}
        </label>

        {/* Input Field */}
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
            ref={(el) => {
              if (typeof ref === "function") ref(el);
              else if (ref)
                (ref as React.RefObject<HTMLInputElement | null>).current = el;
              inputRef.current = el;
            }}
            id={id}
            type={inputType}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={clsx(
              "border border-neutral-200 p-4 bg-white text-gray-900 w-full",
              "transition-all duration-200 ease-in-out focus:border-primary-dark focus:ring-0 outline-none",
              fontFamily === "gilroy-medium" && "font-gilroy-medium",
              fontFamily === "gilroy-semibold" && "font-gilroy-semibold",
              rounded === "full" && "rounded-full",
              rounded === "lg" && "rounded-lg",
              className
            )}
            {...props} 
          />

          {/* Toggle Password Visibility */}
          {type === "password" && (
            <motion.i
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseDown={(e) => e.preventDefault()}
              className={clsx(
                "fa",
                showPassword ? "fa-eye-slash" : "fa-eye",
                "absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-550 text-sm transition-colors duration-200 hover:text-neutral-600"
              )}
              onClick={togglePassword}
            />
          )}
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              className="text-sm font-source-sans text-red"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Password Rules */}
        {!showPasswordRulesBelow &&
          showPasswordRules &&
          type === "password" && (
            <div className="mt-4 space-y-1">
              {passwordRules.map((rule) => {
                const isValid = rule.test(passwordValue);
                return (
                  <motion.div
                    key={rule.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={clsx(
                      "text-sm flex items-center gap-2 font-source-sans",
                      isValid ? "text-green" : "text-gray-light"
                    )}
                  >
                    <span
                      className={clsx(
                        "size-3 rounded-full",
                        isValid ? "bg-green" : "bg-gray-light"
                      )}
                    ></span>
                    {rule.label}
                  </motion.div>
                );
              })}
            </div>
          )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
