"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Buttons";
import { fadeUp } from "@/config/animation";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePageTransition } from "@/hooks/usePageTransition";
import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";
import { Toast } from "@/components/ui/Toast";
import { updateUserProfile, getCurrentUser } from "@/services/userService";
import { PATHS } from "@/utils/path";
import { APIError } from "@/utils/apiClient";
import { getNextOnboardingPath } from "@/utils/getNextOnboardingPath";

export default function AllowNotificationPage() {
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const { navigate, isNavigating } = usePageTransition();

  // useEffect(() => {
  //   if (unauthorized) return;

  //   let isMounted = true;
  //   async function fetchUser() {
  //     try {
  //       const currentUser = await getCurrentUser();
  //       if (!isMounted) return;

  //       const nextPath = getNextOnboardingPath(currentUser);
  //       if (nextPath !== PATHS.ONBOARDING.ALLOW_NOTIFICATIONS) {
  //         setRedirecting(true);
  //         navigate(nextPath);
  //         return;
  //       }
  //     } catch (err: any) {
  //       if (err instanceof APIError && err.status === 401) {
  //         setUnauthorized(true);
  //         return;
  //       }

  //       if (isMounted) {
  //         const message =
  //           err instanceof APIError
  //             ? err.message
  //             : "Couldn't connect. Check your internet connection.";
  //         setToast({ message, type: "error" });
  //       }
  //     } finally {
  //       if (isMounted) setUserLoading(false);
  //     }
  //   }

  //   fetchUser();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [navigate, unauthorized]);

  const handleAllowNotification = async () => {
    setLoading(true);
    setToast(null);

    try {
      const res = await updateUserProfile({
        emailNotificationsEnabled: true,
      });

      if (res?.success) {
        setToast({
          message: "Notification access enabled successfully!",
          type: "success",
        });

        const user = await getCurrentUser();
        const nextPath = getNextOnboardingPath(user);

        setTimeout(() => {
          navigate(nextPath);
        }, 1500);
      } else {
        throw new Error("Failed to enable notifications");
      }
    } catch (error: any) {
      setToast({
        message: error?.message || "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (userLoading || redirecting)
    return <PageTransitionSpinner isVisible={true} />;

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
            src="/images/robots/robot-turning-right.webp"
            alt="gpt robot turning right"
            width={144}
            height={100}
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
            Enable Notification Access
          </h1>

          <p className="font-gilroy-medium text-sm text-neutral-550 max-w-[18rem]">
            Enable notifications to receive real-time updates.
          </p>
        </motion.div>

        {/* Button */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.25 }}
          className="w-full flex justify-center"
        >
          <Button
            onClick={handleAllowNotification}
            variant="dark-primary"
            fontFamily="inter"
            fullWidth
            shadow="shadow-none"
            className="p-4 text-xs sm:max-w-sm"
            disabled={loading}
            loading={loading}
            loadingText="Requesting Notification Permission..."
          >
            Allow Notification
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
