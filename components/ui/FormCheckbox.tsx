"use client";

import React from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

interface FormCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  labelFontFamily?: "gilroy-medium" | "gilroy-bold";
  error?: string;
}

export const FormCheckbox = React.forwardRef<
  HTMLInputElement,
  FormCheckboxProps
>(
  (
    {
      id,
      label,
      labelFontFamily = "gilroy-medium",
      error,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col space-y-1">
        <label
          htmlFor={id}
          className="flex items-center space-x-3 cursor-pointer select-none"
        >
          <input
            ref={ref}
            id={id}
            type="checkbox"
            className={clsx(
              "appearance-none w-5 h-5 border border-neutral-300 rounded-md transition-all",
              "checked:bg-primary-dark checked:border-primary-dark checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:flex checked:after:items-center checked:after:justify-center",
              "focus:ring-2 focus:ring-primary-dark focus:ring-offset-1",
              className
            )}
            {...props}
          />

          <span
            className={clsx(
              "text-sm text-neutral-700",
              labelFontFamily === "gilroy-medium" && "font-gilroy-medium",
              labelFontFamily === "gilroy-bold" && "font-gilroy-bold"
            )}
          >
            {label}
          </span>
        </label>

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

FormCheckbox.displayName = "FormCheckbox";
