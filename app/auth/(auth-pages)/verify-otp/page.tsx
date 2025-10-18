"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Buttons";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { OTPInput } from "@/components/ui/OTPInput";
import { PATHS } from "@/utils/path";
import { Toast } from "@/components/ui/Toast";

const DELAY_OFFSET = 0.5; // starts after transition overlay disappears

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (code?: string, e?: React.FormEvent) => {
    e?.preventDefault();
    const finalCode = code || otp;

    if (finalCode.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setLoading(true);
    setError(null);

    setTimeout(() => {
      setLoading(false);
      const hasError = Math.random() > 0.5;
      if (hasError) {
        setError("Incorrect Code. Please try again!");
      }
    }, 2000);
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
          We&apos;ve sent an email to becca@gmail.com, please enter the code
          below.
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
          error={error}
          onComplete={(code) => {
            if (!loading) handleSubmit(code);
          }}
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
          loadingText="Verifying Code..."
        >
          Verify
        </Button>

        <p className="font-gilroy-medium text-sm md:text-center text-neutral-550">
          Didn&apos;t see your email?{" "}
          <Link
            href={PATHS.AUTH.LOGIN}
            className="text-blue-600 hover:underline transition-all"
          >
            Resend
          </Link>
        </p>
      </motion.form>

      {error && (
        <Toast message={error} type="error" onClose={() => setError(null)} />
      )}
    </motion.div>
  );
}
