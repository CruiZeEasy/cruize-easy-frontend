"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Spinner } from "@/components/ui/Spinner";

interface PageTransitionSpinnerProps {
  isVisible: boolean;
}

export function PageTransitionSpinner({
  isVisible,
}: PageTransitionSpinnerProps) {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="page-transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-neutral-50/80 backdrop-blur-sm"
        >
          <Spinner />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
