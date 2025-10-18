"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/Buttons";
import Image from "next/image";
import { motion } from "framer-motion";
import { OTPInput } from "@/components/ui/OTPInput";
import { PATHS } from "@/utils/path";
import { Toast } from "@/components/ui/Toast";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyOtp, resendOtp } from "@/services/authService";

const DELAY_OFFSET = 0.5;
const RESEND_COOLDOWN = 60; // seconds

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [cooldown, setCooldown] = useState(0);

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const type = searchParams.get("type") || "signup";

  // Toast close handler
  const handleToastClose = useCallback(() => {
    setToast(null);
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (cooldown === 0) return;
    const interval = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const handleSubmit = async (code?: string, e?: React.FormEvent) => {
    e?.preventDefault();
    const finalCode = code || otp;

    if (finalCode.length !== 6) {
      setToast({ message: "Please enter all 6 digits", type: "error" });
      return;
    }

    setVerifyLoading(true);
    setToast(null);

    try {
      const res = await verifyOtp({
        email,
        otp: finalCode,
        type: type === "signup" ? "REGISTRATION" : "PASSWORD_RESET",
      });

      if (res?.success) {
        setToast({
          message:
            type === "signup"
              ? "Account verified successfully!"
              : "OTP verified! Proceed to reset password.",
          type: "success",
        });

        setTimeout(() => {
          if (type === "signup") {
            router.push(PATHS.AUTH.LOGIN);
          } else {
            const { verificationToken } = res;
            router.push(
              `${PATHS.AUTH.RESET_PASSWORD}?email=${encodeURIComponent(
                email
              )}&token=${verificationToken}`
            );
          }
        }, 1500);
      } else {
        throw new Error(res?.message || "Invalid or expired OTP");
      }
    } catch (error: any) {
      setToast({
        message: error.message || "Verification failed. Try again.",
        type: "error",
      });
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;

    setResendLoading(true);
    setToast(null);

    try {
      const res = await resendOtp({
        email,
        type: type === "signup" ? "REGISTRATION" : "PASSWORD_RESET",
      });

      if (res?.success) {
        setToast({
          message: "OTP resent successfully! Check your email.",
          type: "success",
        });
        setCooldown(RESEND_COOLDOWN);
      } else {
        throw new Error(res?.message || "Failed to resend OTP");
      }
    } catch (error: any) {
      setToast({
        message: error.message || "Could not resend OTP. Try again.",
        type: "error",
      });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: DELAY_OFFSET }}
      className="flex flex-col items-center md:pl-4 md:pr-12 md:py-12"
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: DELAY_OFFSET + 0.1, duration: 0.3 }}
        className="mb-12 hidden md:block"
      >
        <Image
          src="/images/logo/cruize-easy-logo-dark.svg"
          alt="Cruize Easy Logo Icon"
          width={192}
          height={38}
          className="w-48 h-auto"
          quality={100}
          priority
        />
      </motion.div>

      {/* Title & description */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: DELAY_OFFSET + 0.2, duration: 0.3 }}
        className="mb-12 flex flex-col items-center text-center space-y-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: DELAY_OFFSET + 0.25, duration: 0.3 }}
          className="font-modulus-semibold text-[20px] hidden md:block"
        >
          Verify OTP
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: DELAY_OFFSET + 0.3, duration: 0.3 }}
          className="font-gilroy-medium text-sm text-neutral-550 md:w-[26rem]"
        >
          We&apos;ve sent an email to <strong>{email}</strong>, please enter the
          code below.
        </motion.p>
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={(e) => handleSubmit(undefined, e)}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: DELAY_OFFSET + 0.35, duration: 0.3 }}
        className="w-full space-y-6"
      >
        <OTPInput
          onChange={setOtp}
          error={toast?.type === "error" ? toast.message : undefined}
          onComplete={(code) => {
            if (!verifyLoading) handleSubmit(code);
          }}
        />

        <Button
          type="submit"
          variant="dark-primary"
          fontFamily="inter"
          fullWidth
          shadow="shadow-none"
          className="p-4 text-xs"
          disabled={verifyLoading || resendLoading}
          loading={verifyLoading}
          loadingText="Verifying Code..."
        >
          Verify
        </Button>

        <p className="font-gilroy-medium text-sm md:text-center text-neutral-550">
          Didn’t see your email?{" "}
          <button
            type="button"
            className={`text-blue-600 hover:underline transition-all ${
              cooldown > 0 || resendLoading
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={handleResend}
            disabled={cooldown > 0 || resendLoading}
          >
            {resendLoading
              ? "Resending..."
              : cooldown > 0
              ? `Resend (${cooldown}s)`
              : "Resend"}
          </button>
        </p>
      </motion.form>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleToastClose}
        />
      )}
    </motion.div>
  );
}
