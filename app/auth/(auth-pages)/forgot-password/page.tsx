"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Buttons";
import { FormInput } from "@/components/ui/FormInput";
import Image from "next/image";
import { PATHS } from "@/utils/path";
import { Toast } from "@/components/ui/Toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  ForgotPasswordFormData,
} from "@/schemas/auth/forgotPasswordSchema";
import { forgotPassword } from "@/services/authService";
import { usePageTransition } from "@/hooks/usePageTransition";
import { fadeUp } from "@/config/animation";
import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";
import { APIError } from "@/utils/apiClient";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const { navigate, isNavigating } = usePageTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setLoading(true);
    setToast(null);

    const payload = { email: data.email.trim().toLowerCase() };

    try {
      const res = await forgotPassword(payload);

      if (res?.success) {
        setToast({
          message: "OTP has been sent to your email!",
          type: "success",
        });
        reset();

        setTimeout(() => {
          navigate(
            `${PATHS.AUTH.VERIFY_OTP}?email=${encodeURIComponent(
              payload.email.toLowerCase()
            )}&type=forgot-password`
          );
        }, 1500);
      } else {
        throw new Error(res?.message || "No account found with this email.");
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

        {/* Title + Description */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.25 }}
          className="mb-12 flex flex-col items-center text-center space-y-6"
        >
          <h1 className="font-modulus-semibold text-[20px] hidden md:block">
            Forgot Password
          </h1>

          <p className="font-gilroy-medium text-sm text-neutral-550 md:w-[26rem]">
            Enter the email address registered with your account. We&apos;ll
            send you a one-time code to reset your password.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          variants={fadeUp}
          transition={{ duration: 0.25 }}
          className="w-full space-y-6"
        >
          <FormInput
            id="email"
            label="Email Address"
            type="email"
            placeholder="email@gmail.com"
            disabled={loading}
            autoComplete="email"
            {...register("email")}
            error={errors.email?.message}
          />

          <Button
            type="submit"
            variant="dark-primary"
            fontFamily="inter"
            fullWidth
            shadow="shadow-none"
            className="p-4"
            disabled={loading}
            loading={loading}
            loadingText="Sending OTP..."
          >
            Send OTP
          </Button>

          <p className="font-gilroy-medium text-sm text-neutral-550 text-center">
            Remembered your password?{" "}
            <button
              type="button"
              onClick={() => navigate(PATHS.AUTH.LOGIN)}
              className="text-primary-dark hover:underline transition-all cursor-pointer"
            >
              Log in here
            </button>
          </p>
        </motion.form>

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
