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

export default function AllowLocationPage() {
  const queryClient = useQueryClient();
  const { navigate, isNavigating } = usePageTransition();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const mutation = useMutation({
    mutationFn: () => updateUserProfile({ allowLocation: true }),
    onSuccess: async (data) => {
      queryClient.setQueryData(["currentUser"], data);

      setToast({ message: "Location access enabled!", type: "success" });

      setTimeout(() => {
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
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.25 }}
          className="mb-10"
        >
          <Image
            src="/images/robots/robot-location.webp"
            alt="robot holding magnifying glass"
            width={144}
            height={100}
            quality={100}
            priority
          />
        </motion.div>

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
            loadingText="Requesting Location..."
          >
            Allow Location Access
          </Button>
        </motion.div>

        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </motion.div>

      <PageTransitionSpinner isVisible={isNavigating} />
    </>
  );
}
