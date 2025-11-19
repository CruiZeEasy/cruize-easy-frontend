"use client";

import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

interface RadioButtonProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      onClick={onChange}
      disabled={disabled}
      className={clsx(
        "relative bg-primary-soft/15 w-9 h-5 rounded-full transition-colors duration-200 cursor-pointer",

        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <motion.div
        initial={false}
        animate={{
          x: checked ? 15 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        className={clsx(
          "absolute top-0 size-5 rounded-full shadow-sm transition-colors duration-200",
          checked
            ? "bg-primary-dark border-0"
            : "bg-white border-2 border-primary-dark"
        )}
      />
    </button>
  );
};
