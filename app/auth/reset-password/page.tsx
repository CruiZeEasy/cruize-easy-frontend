"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Buttons";
import { FormInput } from "@/components/ui/FormInput";
import { motion } from "framer-motion";
import { Toast } from "@/components/ui/Toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  ResetPasswordFormData,
} from "@/schemas/auth/resetPasswordSchema";

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    setLoading(true);
    setError(null);

    const trimmedData = {
      newPassword: data.newPassword.trim(),
      confirmPassword: data.confirmPassword.trim(),
    };

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      const hasError = Math.random() > 0.5;
      if (hasError) {
        setError("Something went wrong, please try again!");
      } else {
        reset();
        console.log("✅ Form submitted:", trimmedData);
      }
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center md:py-12"
    >
      <div className="mb-12 flex flex-col items-center text-center space-y-6">
        <h1 className="font-modulus-semibold text-[20px] hidden md:block">
          Reset Password
        </h1>
        <p className="font-gilroy-medium text-sm text-neutral-550 md:w-[26rem]">
          Please enter your new password below to reset your account.
        </p>
      </div>

      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.3 }}
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

      {error && (
        <Toast message={error} type="error" onClose={() => setError(null)} />
      )}
    </motion.div>
  );
}
