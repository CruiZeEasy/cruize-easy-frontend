"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Buttons";
import Divider from "@/components/ui/Divider";
import { FormInput } from "@/components/ui/FormInput";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PATHS } from "@/utils/path";
import { signupSchema, SignupFormData } from "@/schemas/auth/signupSchema";
import { Toast } from "@/components/ui/Toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  // const passwordValue = watch("password");

  const normalize = (str: string) => str.trim().replace(/\s+/g, " ");

  const onSubmit = (data: SignupFormData) => {
    setLoading(true);
    setError(null);

    const trimmedData = {
      ...data,
      fullName: normalize(data.fullName),
      email: data.email.trim(),
      password: data.password,
    };

    // Simulate API call
    setTimeout(() => {
      setLoading(false);

      // Example: simulate an error
      const hasError = Math.random() > 0.5;
      if (hasError) {
        setError("Email already in use. Try another one!");
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
      className="flex flex-col items-center md:pl-4 md:pr-12 md:py-12"
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <Image
          src="/images/logo/cruize-easy-logo-icon.svg"
          alt="Cruize Easy Logo Icon"
          width={70}
          height={70}
          quality={100}
          className="w-12 h-auto"
          priority
        />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="font-modulus-semibold text-[26px] mb-12"
      >
        Sign Up
      </motion.h1>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.3 }}
        className="w-full"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <FormInput
              id="fullName"
              label="Full Name"
              type="text"
              autoComplete="name"
              placeholder="Full Name"
              {...register("fullName")}
              error={errors.fullName?.message}
            />

            <FormInput
              id="email"
              label="Email Address"
              type="email"
              autoComplete="email"
              placeholder="email@gmail.com"
              {...register("email")}
              error={errors.email?.message}
            />

            <FormInput
              id="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              placeholder="Password"
              // showPasswordRules
              // watchValue={passwordValue} Might need later, basically used for showing password rules
              {...register("password")}
              error={errors.password?.message}
            />
          </div>

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
            loadingText="Creating Account..."
          >
            Sign Up
          </Button>

          {/* Divider */}
          <Divider />

          {/* Google Button */}
          <Button
            variant="sign_up_with_google"
            fontFamily="poppins"
            fullWidth
            shadow="shadow-[0px_-2px_30px_rgba(0,0,0,0.02),_0px_2px_30px_rgba(0,0,0,0.05)]"
            className="hover:bg-neutral-100 transition-colors duration-200"
            onClick={(e) => e.preventDefault()}
          >
            <span>
              <Image
                src="/images/icons/google-icon.svg"
                alt="Google Icon"
                width={20}
                height={20}
                className="inline mr-2"
              />
              Sign Up with Google
            </span>
          </Button>

          {/* Login Redirect */}
          <p className="font-gilroy-medium text-sm text-center">
            If you have an account?{" "}
            <Link
              href={PATHS.AUTH.LOGIN}
              className="text-primary-dark hover:underline transition-all"
            >
              Log in here
            </Link>
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
