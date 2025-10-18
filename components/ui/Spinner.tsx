import React from "react";
import { motion } from "framer-motion";

export function Spinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      className="size-8 border-4 border-primary-dark border-t-transparent rounded-full"
    />
  );
}
