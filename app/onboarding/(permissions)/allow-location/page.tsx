"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Buttons";
import { fadeUp } from "@/config/animation";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePageTransition } from "@/hooks/usePageTransition";
import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";
import { Toast } from "@/components/ui/Toast";
import { updateUserProfile } from "@/services/userService";
import { PATHS } from "@/utils/path";

export default function AllowLocationPage() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const { navigate, isNavigating } = usePageTransition();

  const handleAllowLocation = async () => {
    setLoading(true);
    setToast(null);

    try {
      const res = await updateUserProfile({ allowLocation: true });

      if (res?.success) {
        setToast({
          message: "Location access enabled successfully!",
          type: "success",
        });

        setTimeout(() => {
          navigate(PATHS.ONBOARDING.ALLOW_NOTIFICATIONS);
        }, 1500);
      } else {
        throw new Error("Failed to enable location access");
      }
    } catch (error: any) {
      setToast({
        message: error.message || "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        {/* Image */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.25 }}
          className="mb-10"
        >
          <Image
            src="/images/robots/robot-location.png"
            alt="gpt robot holding loupe"
            width={400}
            height={250}
            className="w-36 h-auto"
            quality={100}
            priority
          />
        </motion.div>

        {/* Title + Description */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.25 }}
          className="mb-6 flex flex-col items-center text-center space-y-2"
        >
          <h1 className="font-modulus-semibold text-[26px] block">
            What is your location?
          </h1>

          <p className="font-gilroy-medium text-sm text-neutral-550 max-w-[19rem]">
            We need to know your location to suggest nearby cars to you.
          </p>
        </motion.div>

        {/* Button */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.25 }}
          className="w-full flex justify-center"
        >
          <Button
            onClick={handleAllowLocation}
            variant="dark-primary"
            fontFamily="inter"
            fullWidth
            shadow="shadow-none"
            className="p-4 text-xs sm:max-w-sm"
            disabled={loading}
            loading={loading}
            loadingText="Requesting Location..."
          >
            Allow Location Access
          </Button>
        </motion.div>

        {/* Toast */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </motion.div>

      {/* Page Transition Spinner */}
      <PageTransitionSpinner isVisible={isNavigating} />
    </>
  );
}
