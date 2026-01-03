"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { usePageTransition } from "@/hooks/usePageTransition";
import { PATHS } from "@/utils/path";
import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";

export default function KYCSuccessPage() {
  const { navigate, isNavigating } = usePageTransition();

  useEffect(() => {
    const timer = setTimeout(() => {
      //   navigate(PATHS.USER.BOOKINGS);
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-dvh font-gilroy-bold text-4xl sm:text-5xl text-black/55 space-y-6">
        {/* Ripple circles */}
        <div className="relative flex items-center justify-center size-60">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute w-full h-full bg-green-accent rounded-full"
          />

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 0.75, opacity: 0.25 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="absolute w-full h-full bg-green-accent rounded-full"
          />

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 0.5, opacity: 0.35 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="absolute w-full h-full bg-green-accent rounded-full"
          />

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "backOut", delay: 0.3 }}
            className="absolute size-16 bg-green-accent rounded-full z-10"
          />

          {/* Checkmark icon */}
          <motion.svg
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="absolute z-20 w-8 h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center px-4"
        >
          <span className="block">Identity Verified!</span>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-base font-gilroy-medium text-neutral-475 mt-4"
          >
            Your identity has been successfully verified and your account is now
            active
          </motion.p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-sm font-gilroy-medium text-neutral-475"
        >
          Redirecting to dashboard...
        </motion.p>
      </div>

      <PageTransitionSpinner isVisible={isNavigating} />
    </>
  );
}
