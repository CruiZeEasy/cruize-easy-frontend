import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Toast() {
  return (
    <AnimatePresence>
      <motion.div className="bg-red fixed top-4 font-inter font-medium text-xs py-4 px-8 rounded-lg text-white text-center sm:w-full max-w-xs z-50">
        An Error occured try again
      </motion.div>
    </AnimatePresence>
  );
}
