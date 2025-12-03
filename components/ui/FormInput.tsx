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
  labelFontFamily?: "gilroy-medium" | "gilroy-bold";
  error?: string;
  showPasswordRules?: boolean;
  showPasswordRulesBelow?: boolean;
  watchValue?: string;
  variant?: "default" | "phone" | "search" | "pin";
  placeholderVariant?: "light" | "dark";
}

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
      labelFontFamily = "gilroy-bold",
      error,
      showPasswordRules = false,
      showPasswordRulesBelow = false,
      watchValue = "",
      className,
      variant = "default",
      placeholderVariant = "dark",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const inputType = type === "password" && showPassword ? "text" : type;

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

    const passwordValue =
      typeof watchValue === "string" ? watchValue : String(watchValue ?? "");

    return (
      <div
        className={clsx(
          variant === "search" ? "flex w-full" : "flex flex-col space-y-2",
          fullWidth && "w-full"
        )}
      >
        {/* Label */}
        <label
          htmlFor={id}
          className={clsx(
            "text-sm",
            labelFontFamily === "gilroy-medium" && "font-gilroy-medium",
            labelFontFamily === "gilroy-bold" && "font-gilroy-bold"
          )}
        >
          {label}
        </label>

        {/* Default input, search input or Pin Input  or phone input */}

        {variant === "pin" ? (
          <div className="flex flex-col space-y-2 w-full">
            <input
              ref={(el) => {
                if (typeof ref === "function") ref(el);
                else if (ref)
                  (ref as React.RefObject<HTMLInputElement | null>).current =
                    el;
                inputRef.current = el;
              }}
              id={id}
              type="tel"
              inputMode="numeric"
              maxLength={5}
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                target.value = target.value.replace(/\D/g, "").slice(0, 5);
              }}
              className={clsx(
                "border border-neutral-200 p-4 bg-white text-black w-full",
                "transition-all duration-200 ease-in-out focus:border-primary-dark outline-none",
                "rounded-lg font-gilroy-medium placeholder:text-neutral-425",
                className
              )}
              {...props}
            />
          </div>
        ) : variant === "search" ? (
          <input
            ref={(el) => {
              if (typeof ref === "function") ref(el);
              else if (ref)
                (ref as React.RefObject<HTMLInputElement | null>).current = el;
              inputRef.current = el;
            }}
            id={id}
            type="search"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={clsx(
              "p-4 border border-primary-dark/25 placeholder:text-neutral-425",
              "outline-none rounded-[20px] font-gilroy-medium",
              "transition-all duration-200 ease-in-out focus:border-primary-dark",
              className
            )}
            {...props}
          />
        ) : variant === "phone" ? (
          <div className="flex gap-2">
            {/* Country Code */}
            <input
              type="text"
              inputMode="numeric"
              value="+234"
              readOnly
              className={clsx(
                "border border-neutral-200 bg-white rounded-lg font-gilroy-medium w-20 text-center outline-none",
                placeholderVariant === "light" && "text-neutral-350",
                placeholderVariant === "dark" && "text-neutral-425"
              )}
            />

            {/* Phone number input */}
            <div className="relative flex-1">
              <input
                ref={(el) => {
                  if (typeof ref === "function") ref(el);
                  else if (ref)
                    (ref as React.RefObject<HTMLInputElement | null>).current =
                      el;
                  inputRef.current = el;
                }}
                id={id}
                type="tel"
                inputMode="numeric"
                pattern="[0-9 ]*"
                maxLength={13} // formatted version length (e.g. 8123 456 789)
                onInput={(e) => {
                  const target = e.target as HTMLInputElement;
                  let value = target.value.replace(/\D/g, ""); // strip non-digits

                  // Normalize pasted formats
                  if (value.startsWith("234"))
                    value = value.slice(3); // remove leading 234
                  else if (value.startsWith("0")) value = value.slice(1); // remove leading 0 if user already typed it

                  // Limit to 10 digits (after country code)
                  if (value.length > 10) value = value.slice(0, 10);

                  // Format as 8123 456 789
                  let formatted = value;
                  if (value.length > 7) {
                    formatted = value.replace(
                      /(\d{3})(\d{3})(\d{0,4})/,
                      "$1 $2 $3"
                    );
                  } else if (value.length > 3) {
                    formatted = value.replace(/(\d{3})(\d{0,3})/, "$1 $2");
                  }

                  target.value = formatted.trim();
                }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className={clsx(
                  "border border-neutral-200 p-4 bg-white text-black w-full",
                  "transition-all duration-200 ease-in-out focus:border-primary-dark focus:ring-0 outline-none",
                  fontFamily === "gilroy-medium" && "font-gilroy-medium",
                  fontFamily === "gilroy-semibold" && "font-gilroy-semibold",
                  rounded === "full" && "rounded-full",
                  rounded === "lg" && "rounded-lg",
                  placeholderVariant === "light" &&
                    "placeholder:text-neutral-350",
                  placeholderVariant === "dark" &&
                    "placeholder:text-neutral-425",
                  className
                )}
                {...props}
              />
            </div>
          </div>
        ) : (
          <div className="relative">
            <input
              ref={(el) => {
                if (typeof ref === "function") ref(el);
                else if (ref)
                  (ref as React.RefObject<HTMLInputElement | null>).current =
                    el;
                inputRef.current = el;
              }}
              id={id}
              type={inputType}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className={clsx(
                "border border-neutral-200 p-4 bg-white text-black w-full ",
                "transition-all duration-200 ease-in-out focus:border-primary-dark focus:ring-0 outline-none",
                fontFamily === "gilroy-medium" && "font-gilroy-medium",
                fontFamily === "gilroy-semibold" && "font-gilroy-semibold",
                rounded === "full" && "rounded-full",
                rounded === "lg" && "rounded-lg",
                placeholderVariant === "light" &&
                  "placeholder:text-neutral-350",
                placeholderVariant === "dark" && "placeholder:text-neutral-425",
                className
              )}
              {...props}
            />

            {/* Toggle Password */}
            {type === "password" && (
              <i
                onMouseDown={(e) => e.preventDefault()}
                className={clsx(
                  "fa",
                  showPassword ? "fa-eye-slash" : "fa-eye",
                  "absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-550 text-md transition-colors duration-200 hover:text-neutral-600"
                )}
                onClick={togglePassword}
              />
            )}
          </div>
        )}

        {/* Error message */}
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
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
