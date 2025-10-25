"use client";

import React, { useRef, useState } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  id: string;
  options: Option[];
  placeholder?: string;
  fullWidth?: boolean;
  rounded?: "lg" | "full";
  fontFamily?: "gilroy-medium" | "gilroy-semibold";
  labelFontFamily?: "gilroy-medium" | "gilroy-bold";
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export const FormSelect = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      label,
      id,
      options,
      placeholder = "Select an option",
      fullWidth = true,
      rounded = "lg",
      fontFamily = "gilroy-medium",
      labelFontFamily = "gilroy-bold",
      error,
      value,
      onChange,
      disabled = false,
      className,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value || "");
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === selectedValue);
    const displayText = selectedOption ? selectedOption.label : placeholder;

    const handleSelect = (optionValue: string) => {
      setSelectedValue(optionValue);
      setIsOpen(false);
      onChange?.(optionValue);
    };

    // Close dropdown when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div
        ref={ref}
        className={clsx("flex flex-col space-y-2", fullWidth && "w-full")}
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

        {/* Custom Select */}
        <div ref={containerRef} className="relative">
          <motion.button
            type="button"
            animate={{
              boxShadow: isOpen
                ? "0px 1px 6px rgba(0,0,0,0.08)"
                : "0px 0px 0px rgba(0,0,0,0)",
            }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
            className={clsx(
              "border border-neutral-200 p-4 bg-white w-full text-left flex items-center justify-between cursor-pointer",
              "transition-all duration-200 ease-in-out focus:border-primary-dark focus:ring-0 outline-none",
              fontFamily === "gilroy-medium" && "font-gilroy-medium",
              fontFamily === "gilroy-semibold" && "font-gilroy-semibold",
              rounded === "full" && "rounded-full",
              rounded === "lg" && "rounded-lg",
              selectedValue ? "text-black" : "text-neutral-425",
              disabled && "opacity-50 cursor-not-allowed",
              className
            )}
          >
            <span>{displayText}</span>
            <motion.i
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="fa fa-chevron-down text-neutral-550 text-sm"
            />
          </motion.button>

          {/* Dropdown Options */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className={clsx(
                  "absolute z-50 w-full mt-2 bg-white border border-neutral-200 shadow-lg overflow-hidden",
                  rounded === "lg" && "rounded-lg",
                  rounded === "full" && "rounded-2xl"
                )}
              >
                <div className="max-h-60 overflow-y-auto">
                  {options.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSelect(option.value)}
                      className={clsx(
                        "w-full text-left px-4 py-3 transition-colors duration-150 cursor-pointer",
                        fontFamily === "gilroy-medium" && "font-gilroy-medium",
                        fontFamily === "gilroy-semibold" &&
                          "font-gilroy-semibold",
                        selectedValue === option.value
                          ? "bg-primary-dark text-white"
                          : "bg-white text-black hover:bg-neutral-100"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";
