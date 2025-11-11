"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/Buttons";
import Cookies from "js-cookie";
import Image from "next/image";
import { motion } from "framer-motion";
import { OTPInput } from "@/components/ui/OTPInput";
import { PATHS } from "@/utils/path";
import { Toast } from "@/components/ui/Toast";
import { useSearchParams } from "next/navigation";
import { verifyOtp, resendOtp } from "@/services/authService";
import { usePageTransition } from "@/hooks/usePageTransition";
import { fadeUp } from "@/config/animation";
import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";
import { tokenConfig } from "@/config/tokenConfig";
import { APIError } from "@/utils/apiClient";
import { REQUEST_COOLDOWN } from "@/config/cooldown";
import { getCurrentUser } from "@/services/userService";
import { getNextOnboardingPath } from "@/utils/getNextOnboardingPath";
import { useQueryClient } from "@tanstack/react-query";

export function VerifyOtpClient() {
  const queryClient = useQueryClient();
  const [otp, setOtp] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [cooldown, setCooldown] = useState(0);

  const { navigate, isNavigating } = usePageTransition();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const type = searchParams.get("type") || "signup";

  const hasRedirected = useRef(false);

  // Toast close handler
  const handleToastClose = useCallback(() => {
    setToast(null);
  }, []);

  useEffect(() => {
    if (!email && !hasRedirected.current) {
      hasRedirected.current = true;

      setToast({
        message: "Invalid verification link or missing email.",
        type: "error",
      });

      setTimeout(() => {
        console.log("Redirecting to login...");
        navigate(PATHS.AUTH.LOGIN);
      }, 1500);
    }
  }, [email, navigate]);

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

        setTimeout(async () => {
          if (type === "signup") {
            Cookies.set("access_token", res.accessToken, {
              expires: tokenConfig.accessTokenExpiryDays,
              secure: true,
              sameSite: "Strict",
              path: "/",
            });
            Cookies.set("refresh_token", res.refreshToken, {
              expires: tokenConfig.refreshTokenExpiryDays,
              secure: true,
              sameSite: "Strict",
              path: "/",
            });

            queryClient.removeQueries({
              queryKey: ["currentUser"],
              exact: true,
            });

            // Tiny delay — ensures tokens sync before fetching new user
            await new Promise((r) => setTimeout(r, 50));

            try {
              const user = await getCurrentUser();

              queryClient.setQueryData(["currentUser"], user);

              const nextPath = getNextOnboardingPath(user);
              navigate(nextPath);
            } catch {
              navigate(PATHS.AUTH.LOGIN);
            }
          } else {
            const { verificationToken } = res;
            navigate(
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
      let message =
        error instanceof APIError
          ? error.message
          : "Couldn't connect. Check your internet connection.";

      setToast({
        message,
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
        setCooldown(REQUEST_COOLDOWN);
      } else {
        throw new Error(res?.message || "Failed to resend OTP");
      }
    } catch (error: any) {
      const message =
        error instanceof APIError
          ? error.message
          : "Couldn't connect. Check your internet connection.";

      setToast({
        message,
        type: "error",
      });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex flex-col items-center md:pl-4 md:pr-12 md:py-12"
      >
        {/* Logo */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.25 }}
          className="mb-12 hidden md:block"
        >
          <Image
            src="/images/logo/cruize-easy-logo-dark.svg"
            alt="Cruize Easy Logo Icon"
            width={192}
            height={100}
            priority
          />
        </motion.div>

        {/* Title & description */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.25 }}
          className="mb-12 flex flex-col items-center text-center space-y-6"
        >
          <h1 className="font-modulus-semibold text-[20px] hidden md:block">
            Verify OTP
          </h1>

          <p className="font-gilroy-medium text-sm text-neutral-550 md:w-[26rem]">
            We&apos;ve sent an email to <strong>{email}</strong>, please enter
            the code below.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={(e) => handleSubmit(undefined, e)}
          variants={fadeUp}
          transition={{ duration: 0.25 }}
          className="w-full space-y-6"
        >
          <OTPInput
            onChange={setOtp}
            error={toast?.type === "error" ? toast.message : undefined}
            disabled={verifyLoading}
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
            Didn't see your email?{" "}
            <button
              type="button"
              className={`text-blue-600 hover:underline transition-all cursor-pointer ${
                cooldown > 0 || resendLoading
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={handleResend}
              disabled={cooldown > 0 || resendLoading || verifyLoading}
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

      {/* Page Transition Spinner */}
      <PageTransitionSpinner isVisible={isNavigating} />
    </>
  );
}
