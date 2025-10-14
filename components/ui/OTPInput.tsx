"use client";

import React, { useState, useRef } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

interface OTPInputProps {
  length?: number;
  onChange: (code: string) => void;
  onComplete?: (code: string) => void;
  error?: string | null;
  disabled?: boolean;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  onChange,
  onComplete,
  error,
  disabled = false,
}) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = (index: number) => {
    const input = inputRefs.current[index];
    if (input) input.focus();
  };

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
    const joined = newValues.join("");
    onChange(joined);

    if (value && index < length - 1) focusInput(index + 1);

    // auto-submit when all digits are filled
    if (joined.length === length && !newValues.includes("")) {
      inputRefs.current[index]?.blur(); // smooth finish
      onComplete?.(joined);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").trim();

    if (!/^\d+$/.test(paste)) return;

    const digits = paste.slice(0, length).split("");
    const newValues = Array(length).fill("");

    digits.forEach((digit, i) => {
      newValues[i] = digit;
    });

    setValues(newValues);
    const joined = newValues.join("");
    onChange(joined);

    // Auto submit if all digits filled
    if (joined.length === length) {
      inputRefs.current.forEach((input) => input?.blur());
      onComplete?.(joined);
    } else {
      focusInput(Math.min(digits.length, length - 1));
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <motion.div
        animate={error ? { x: [0, -4, 4, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-center gap-1  mb-2"
      >
        {values.map((val, i) => (
          <motion.input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={val}
            disabled={disabled}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={handlePaste}
            whileFocus={{
              scale: 1.05,
              boxShadow: "0px 1px 6px rgba(0,0,0,0.08)",
            }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className={clsx(
              "size-10 xs:size-12 md:size-14 text-center text-lg md:text-xl font-gilroy-medium border border-neutral-200 rounded-lg bg-white",
              "focus:border-primary-dark focus:ring-0 outline-none",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          />
        ))}
      </motion.div>
    </div>
  );
};
