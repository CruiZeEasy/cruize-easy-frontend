"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ToastProps {
  message: string;
  type?: "error" | "success" | "info"; // future-proof for other toast types
  onClose: () => void;
  duration?: number; // auto-dismiss duration in ms
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "error",
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor =
    type === "error" ? "bg-red" : type === "success" ? "bg-green" : "bg-blue";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.25 }}
        className={`fixed top-4 sm:w-full max-w-xs z-50 font-inter font-medium text-xs py-4 px-8 rounded-lg text-white text-center ${bgColor}`}
      >
        {message}
      </motion.div>
    </AnimatePresence>
  );
};
