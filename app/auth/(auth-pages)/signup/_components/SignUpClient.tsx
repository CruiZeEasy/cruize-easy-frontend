"use client";

import React, { useState } from "react";
import { API_BASE_URL } from "@/utils/api";
import { API_ROUTES } from "@/utils/apiRoutes";
import { Button } from "@/components/ui/Buttons";
import Divider from "@/components/ui/Divider";
import { FormInput } from "@/components/ui/FormInput";
import { fadeUp } from "@/config/animation";
import Image from "next/image";
import { motion } from "framer-motion";
import { PATHS } from "@/utils/path";
import { signupSchema, SignupFormData } from "@/schemas/auth/signupSchema";
import { Toast } from "@/components/ui/Toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/services/authService";
import { usePageTransition } from "@/hooks/usePageTransition";
import { UserRoles } from "@/constants/roles";
import { useSearchParams } from "next/navigation";
import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";
import { normalizeString } from "@/utils/stringUtils";
import { APIError } from "@/utils/apiClient";

export function SignUpClient() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const searchParams = useSearchParams();
  const roleFromQuery = searchParams.get("role");

  const role = roleFromQuery === "host" ? UserRoles.HOST : UserRoles.USER;
  const roleDisplay = role === UserRoles.HOST ? "Host" : "User";

  const { navigate, isNavigating } = usePageTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    setToast(null);

    const payload = {
      ...data,
      fullName: normalizeString(data.fullName),
      email: data.email.trim().toLowerCase(),
      role,
    };

    try {
      const res = await registerUser(payload);

      if (res?.success) {
        setToast({
          message:
            "Registration successful! Check your email for OTP verification.",
          type: "success",
        });
        reset();

        setTimeout(() => {
          navigate(
            `${PATHS.AUTH.VERIFY_OTP}?email=${encodeURIComponent(
              payload.email.toLowerCase()
            )}&type=signup`
          );
        }, 1500);
      } else {
        throw new Error(res?.message || "An unexpected error occurred");
      }
    } catch (error: any) {
      const message =
        error instanceof APIError
          ? error.message
          : "Couldn't connect. Check your internet connection.";

      setToast({ message, type: "error" });
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
        <motion.div variants={fadeUp} transition={{ duration: 0.25 }}>
          <Image
            src="/images/logo/cruize-easy-logo-icon.svg"
            alt="Cruize Easy Logo Icon"
            width={48}
            height={48}
            priority
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.25 }}
          className="font-modulus-semibold text-[26px] mb-12"
        >
          Sign Up as a {roleDisplay}
        </motion.h1>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          variants={fadeUp}
          transition={{ duration: 0.25 }}
          className="w-full space-y-6"
        >
          <div className="space-y-2">
            <FormInput
              id="fullName"
              label="Full Name"
              type="text"
              disabled={loading}
              autoComplete="name"
              placeholder="Full Name"
              {...register("fullName")}
              error={errors.fullName?.message}
            />
            <FormInput
              id="email"
              label="Email Address"
              type="email"
              disabled={loading}
              autoComplete="email"
              placeholder="email@gmail.com"
              {...register("email")}
              error={errors.email?.message}
            />
            <FormInput
              id="password"
              label="Password"
              type="password"
              disabled={loading}
              autoComplete="new-password"
              placeholder="Password"
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

          <Divider />

          {/* Google Button */}
          <Button
            type="button"
            variant="sign_up_with_google"
            fontFamily="poppins"
            fullWidth
            shadow="shadow-[0px_-2px_30px_rgba(0,0,0,0.02),_0px_2px_30px_rgba(0,0,0,0.05)]"
            className="hover:bg-neutral-100 transition-colors duration-200"
            onClick={() =>
              (window.location.href = `${API_BASE_URL}${API_ROUTES.AUTH.GOOGLE}`)
            }
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
