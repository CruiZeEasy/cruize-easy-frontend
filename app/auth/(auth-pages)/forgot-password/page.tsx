"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Buttons";
import { FormInput } from "@/components/ui/FormInput";
import Image from "next/image";
import Link from "next/link";
import { PATHS } from "@/utils/path";
import { Toast } from "@/components/ui/Toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  ForgotPasswordFormData,
} from "@/schemas/auth/forgotPasswordSchema";
import { forgotPassword } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const router = useRouter();

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

    const payload = { email: data.email.trim() };

    try {
      const res = await forgotPassword(payload);
      console.log("Forgot Password Response:", res);
      if (res?.success) {
        setToast({
          message: "OTP has been sent to your email!",
          type: "success",
        });
        reset();

        setTimeout(() => {
          router.push(
            `${PATHS.AUTH.VERIFY_OTP}?email=${encodeURIComponent(
              payload.email
            )}&type=forgot-password`
          );
        }, 1500);
      } else {
        throw new Error(res?.message || "No account found with this email.");
      }
    } catch (error: any) {
      setToast({
        message:
          error.message ||
          "An error occurred while sending the password reset OTP.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Animation delay offset (for smoother entry)
  const DELAY_OFFSET = 0.5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: DELAY_OFFSET, duration: 0.4, ease: "easeOut" }}
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

      {/* Title + Description */}
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
          Forgot Password
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: DELAY_OFFSET + 0.3, duration: 0.3 }}
          className="font-gilroy-medium text-sm text-neutral-550 md:w-[26rem]"
        >
          Enter the email address registered with your account. We&apos;ll send
          you a one-time code to reset your password.
        </motion.p>
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: DELAY_OFFSET + 0.35, duration: 0.3 }}
        className="w-full"
      >
        <div className="space-y-6">
          <FormInput
            id="email"
            label="Email Address"
            type="email"
            placeholder="email@gmail.com"
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
            className="p-4 text-xs"
            disabled={loading}
            loading={loading}
            loadingText="Sending OTP..."
          >
            Send OTP
          </Button>

          <p className="font-gilroy-medium text-sm text-neutral-550 text-center">
            Remembered your password?{" "}
            <Link
              href={PATHS.AUTH.LOGIN}
              className="text-primary-dark hover:underline transition-all"
            >
              Log in here
            </Link>
          </p>
        </div>
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
  );
}
