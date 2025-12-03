"use client";

import { HostHeader } from "@/components/host/HostHeader";
import { Button } from "@/components/ui/Buttons";
import { OTPInput } from "@/components/ui/OTPInput";
import { Toast } from "@/components/ui/Toast";
import { verifyWallet, resendWalletOtp } from "@/services/walletService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { REQUEST_COOLDOWN } from "@/config/cooldown";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { motion } from "framer-motion";
import { fadeUp } from "@/config/animation";
import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";
import { WalletSuccess } from "@/components/shared/WalletSuccess";
import { PATHS } from "@/utils/path";
import { usePageTransition } from "@/hooks/usePageTransition";

export default function HostWalletVerifyOtpPage() {
  const { data: user } = useCurrentUser();
  const queryClient = useQueryClient();

  const { navigate, isNavigating } = usePageTransition();
  const [showSpinner, setShowSpinner] = useState(false);
  const [success, setSuccess] = useState(false);

  const [otp, setOtp] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (user?.walletStatus === "ACTIVE") {
      navigate(PATHS.HOST.HOME);
    }
  }, [user]);

  useEffect(() => {
    if (cooldown === 0) return;
    const interval = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const verifyOtpMutation = useMutation({
    mutationFn: async (code?: string) => {
      const finalCode = code || otp;
      if (finalCode.length !== 6) {
        setToast({ message: "Please enter all 6 digits", type: "error" });
        return;
      }

      return verifyWallet({ otp: finalCode });
    },

    onSuccess: () => {
      setShowSpinner(true);

      queryClient.invalidateQueries({ queryKey: ["hostProfile"] });

      setTimeout(() => {
        setShowSpinner(false);
        setSuccess(true);
      }, 1500);
    },

    onError: (err: any) => {
      setToast({
        message: err.message || "Something went wrong.",
        type: "error",
      });
    },
  });

  const resendOtpMutation = useMutation({
    mutationFn: async () => {
      return resendWalletOtp();
    },

    onSuccess: () => {
      setToast({
        message: "OTP resent successfully! Check your email.",
        type: "success",
      });
      setCooldown(REQUEST_COOLDOWN);
    },

    onError: (err: any) => {
      setToast({
        message: err.message || "Failed to resend OTP.",
        type: "error",
      });
    },
  });

  if (success) return <WalletSuccess type="host" />;

  return (
    <>
      <div className="pb-28 max-w-3xl mx-auto bg-white min-h-[100dvh]">
        <div className="sticky top-0 z-10 bg-white md:border-b md:border-b-neutral-275 shadow-sm md:shadow-none md:pt-2 md:px-10">
          <div className="px-4 py-4 md:px-0">
            <HostHeader />
          </div>
        </div>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="p-4 md:px-10 mt-10 bg-white font-gilroy-medium text-center"
        >
          <p className="text-sm text-neutral-550 md:w-[26rem] mx-auto">
            We&apos;ve sent an email to <strong>{user?.email}</strong>, please
            enter the code below.
          </p>

          <form
            className="w-full space-y-6 mt-6"
            onSubmit={(e) => {
              e.preventDefault();
              if (otp.length !== 6) {
                setToast({
                  message: "Please enter all 6 digits",
                  type: "error",
                });
                return;
              }
              verifyOtpMutation.mutate(otp);
            }}
          >
            <OTPInput
              onChange={(val) => {
                setOtp(val);
                if (toast) setToast(null);
              }}
              error={toast?.type === "error" ? toast.message : undefined}
              disabled={
                verifyOtpMutation.isPending || resendOtpMutation.isPending
              }
              onComplete={(code) => {
                if (!verifyOtpMutation.isPending)
                  verifyOtpMutation.mutate(code);
              }}
            />

            <Button
              type="submit"
              variant="dark-primary"
              fontFamily="inter"
              fullWidth
              shadow="shadow-none"
              className="p-4"
              disabled={
                verifyOtpMutation.isPending || resendOtpMutation.isPending
              }
              loading={verifyOtpMutation.isPending}
              loadingText="Verifying Code..."
            >
              Verify
            </Button>

            {/* RESEND OTP */}
            <p className="font-gilroy-medium text-sm md:text-center text-neutral-550">
              Didn't receive the email?{" "}
              <button
                type="button"
                onClick={() => {
                  if (cooldown === 0 && !resendOtpMutation.isPending) {
                    resendOtpMutation.mutate();
                  }
                }}
                disabled={
                  cooldown > 0 ||
                  resendOtpMutation.isPending ||
                  verifyOtpMutation.isPending
                }
                className={`text-blue-600 hover:underline transition-all cursor-pointer ${
                  cooldown > 0 || resendOtpMutation.isPending
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {resendOtpMutation.isPending
                  ? "Resending..."
                  : cooldown > 0
                  ? `Resend (${cooldown}s)`
                  : "Resend"}
              </button>
            </p>
          </form>
        </motion.section>

        {toast && (
          <div className="flex justify-center">
            <Toast {...toast} onClose={() => setToast(null)} />
          </div>
        )}
      </div>

      <PageTransitionSpinner isVisible={showSpinner || isNavigating} />
    </>
  );
}
