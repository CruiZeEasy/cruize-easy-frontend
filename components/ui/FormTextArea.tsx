"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  fullWidth?: boolean;
  rounded?: "lg" | "xl";
  fontFamily?: "gilroy-medium" | "gilroy-semibold";
  labelFontFamily?: "gilroy-medium" | "gilroy-bold";
  error?: string;
  showCharCount?: boolean;
  maxLength?: number;
  rows?: number;
  resize?: "none" | "vertical" | "horizontal" | "both";
  placeholderVariant?: "light" | "dark";
}

export const FormTextArea = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaProps
>(
  (
    {
      label,
      id,
      fullWidth = true,
      rounded = "lg",
      fontFamily = "gilroy-medium",
      labelFontFamily = "gilroy-bold",
      error,
      showCharCount = false,
      maxLength,
      rows = 4,
      resize = "vertical",
      placeholderVariant = "dark",
      className,
      value,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const [charCount, setCharCount] = useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      if (props.onChange) {
        props.onChange(e);
      }
    };

    return (
      <div className={clsx("flex flex-col space-y-2", fullWidth && "w-full")}>
        {/* Label */}
        <div className="flex items-center justify-between">
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

          {/* Character count */}
          {showCharCount && maxLength && (
            <span className="text-xs font-gilroy-medium text-neutral-475">
              {charCount}/{maxLength}
            </span>
          )}
        </div>

        {/* TextArea */}
        <div className="relative">
          <textarea
            ref={ref}
            id={id}
            rows={rows}
            maxLength={maxLength}
            value={value}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={handleChange}
            className={clsx(
              "border border-neutral-200 p-4 bg-white text-black w-full block",
              "transition-all duration-200 ease-in-out focus:border-primary-dark focus:ring-0 outline-none",
              fontFamily === "gilroy-medium" && "font-gilroy-medium",
              fontFamily === "gilroy-semibold" && "font-gilroy-semibold",
              rounded === "lg" && "rounded-lg",
              rounded === "xl" && "rounded-xl",
              resize === "none" && "resize-none",
              resize === "vertical" && "resize-y",
              resize === "horizontal" && "resize-x",
              resize === "both" && "resize",
              placeholderVariant === "light" && "placeholder:text-neutral-350",
              placeholderVariant === "dark" && "placeholder:text-neutral-425",
              className
            )}
            {...props}
          />
        </div>

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

FormTextArea.displayName = "FormTextArea";
