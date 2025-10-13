"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Buttons";
import { FormInput } from "@/components/ui/FormInput";
import Image from "next/image";
import Link from "next/link";
import { PATHS } from "@/utils/path";
import { Toast } from "@/components/ui/Toast";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);

      // Example: simulate an error
      const hasError = Math.random() > 0.5; // 50% chance
      if (hasError) {
        setError("Email already in use. Try another one!");
      }
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center md:pl-4 md:pr-12 md:py-12"
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="mb-12 hidden md:block"
      >
        <Image
          src="/images/logo/cruize-easy-logo-dark.svg"
          alt="Cruize Easy Logo Icon"
          width={192}
          height={38}
          className="w-40 lg:w-48 h-auto"
          quality={100}
          priority
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="mb-12 flex flex-col items-center text-center space-y-6"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.3 }}
          className="font-modulus-semibold text-[20px] hidden md:block"
        >
          Forgot Password
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="font-gilroy-medium text-sm text-neutral-550 md:w-[26rem]"
        >
          Enter the email address registered with your account.{" "}
          <span className="inline lg:hidden">
            <br />
          </span>
          We&apos;ll send you a link to reset your password.
        </motion.p>
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.3 }}
        className="w-full"
      >
        <div className="space-y-6">
          <FormInput
            id="email"
            label="Email Address"
            type="email"
            placeholder="email@gmail.com"
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="dark-primary"
            fontFamily="inter"
            fullWidth
            shadow="shadow-none"
            className="p-4 text-xs"
            disabled={loading}
            loading={loading}
            loadingText="Verifying Account..."
          >
            Find my account
          </Button>

          {/* Login Redirect */}
          <p className="font-gilroy-semibold text-sm text-neutral-550">
            <Link
              href={PATHS.AUTH.LOGIN}
              className="text-primary-dark hover:underline transition-all"
            >
              Remembered Password
            </Link>
            ? Login to your account
          </p>
        </div>
      </motion.form>

      {/* Toast for error */}
      {error && (
        <Toast message={error} type="error" onClose={() => setError(null)} />
      )}
    </motion.div>
  );
}
