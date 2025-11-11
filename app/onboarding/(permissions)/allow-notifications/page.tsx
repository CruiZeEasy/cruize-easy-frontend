"use client";

import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Buttons";
import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";
import { Toast } from "@/components/ui/Toast";
import { fadeUp } from "@/config/animation";
import { getNextOnboardingPath } from "@/utils/getNextOnboardingPath";
import { usePageTransition } from "@/hooks/usePageTransition";
import { updateUserProfile } from "@/services/userService";

export default function AllowNotificationPage() {
  const queryClient = useQueryClient();
  const { navigate, isNavigating } = usePageTransition();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const mutation = useMutation({
    mutationFn: () => updateUserProfile({ emailNotificationsEnabled: true }),
    onSuccess: async (data) => {
      queryClient.setQueryData(["currentUser"], data);

      setToast({ message: "Notification access enabled!", type: "success" });

      setTimeout(async () => {
        const nextPath = getNextOnboardingPath(data);
        navigate(nextPath);
      }, 1500);
    },
    onError: (err: any) => {
      setToast({
        message: err.message || "Something went wrong.",
        type: "error",
      });
    },
  });

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
            onClick={() => mutation.mutate()}
            variant="dark-primary"
            fontFamily="inter"
            fullWidth
            shadow="shadow-none"
            className="p-4 text-xs sm:max-w-sm"
            disabled={mutation.isPending}
            loading={mutation.isPending}
            loadingText="Requesting Notification Permission..."
          >
            Allow Notification
          </Button>
        </motion.div>

        {/* Toast */}
        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </motion.div>

      {/* Page Transition Spinner */}
      <PageTransitionSpinner isVisible={isNavigating} />
    </>
  );
}
