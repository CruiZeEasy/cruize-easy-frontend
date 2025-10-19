"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Buttons";
import { FormInput } from "@/components/ui/FormInput";
import { motion } from "framer-motion";
import { Toast } from "@/components/ui/Toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import {
  resetPasswordSchema,
  ResetPasswordFormData,
} from "@/schemas/auth/resetPasswordSchema";
import { resetPassword } from "@/services/authService";
import { PATHS } from "@/utils/path";
import { usePageTransition } from "@/hooks/usePageTransition";
import { fadeUp } from "@/config/animation";
import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";

export default function ResetPasswordClient() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const searchParams = useSearchParams();
  const { navigate, isNavigating } = usePageTransition();

  const verificationToken = searchParams.get("token") || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setLoading(true);
    setToast(null);

    const trimmedPassword = data.newPassword.trim();

    try {
      const res = await resetPassword({
        verificationToken,
        newPassword: trimmedPassword,
      });

      if (res?.success) {
        setToast({
          message: "Password reset successful! Redirecting to login...",
          type: "success",
        });
        reset();

        setTimeout(() => {
          navigate(PATHS.AUTH.LOGIN);
        }, 1500);
      } else {
        throw new Error(res?.message || "Failed to reset password.");
      }
    } catch (error: any) {
      setToast({
        message: error.message || "Something went wrong. Please try again!",
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
        {/* Title + Description */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.25 }}
          className="mb-12 flex flex-col items-center text-center space-y-6"
        >
          <h1 className="font-modulus-semibold text-[20px] hidden md:block">
            Reset Password
          </h1>
          <p className="font-gilroy-medium text-sm text-neutral-550 md:w-[26rem]">
            Please enter your new password below to reset your account.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          variants={fadeUp}
          transition={{ duration: 0.25 }}
          className="w-full space-y-6"
        >
          <div className="space-y-4">
            <FormInput
              id="newPassword"
              label="New Password"
              type="password"
              placeholder="New Password"
              autoComplete="new-password"
              {...register("newPassword")}
              error={errors.newPassword?.message}
            />
            <FormInput
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm Password"
              autoComplete="new-password"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />
          </div>

          <Button
            type="submit"
            variant="dark-primary"
            fontFamily="inter"
            fullWidth
            shadow="shadow-none"
            className="p-4 text-xs"
            disabled={loading}
            loading={loading}
            loadingText="Updating Password..."
          >
            Reset Password
          </Button>
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
