"use client";

import { useState } from "react";
import { APIError } from "@/utils/apiClient";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Buttons";
import Cookies from "js-cookie";
import { FormInput } from "@/components/ui/FormInput";
import Image from "next/image";
import { PATHS } from "@/utils/path";
import { Toast } from "@/components/ui/Toast";
import Divider from "@/components/ui/Divider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/schemas/auth/loginSchema";
import { loginUser } from "@/services/authService";
import { API_BASE_URL } from "@/utils/api";
import { API_ROUTES } from "@/utils/apiRoutes";
import { usePageTransition } from "@/hooks/usePageTransition";
import { fadeUp } from "@/config/animation";
import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";
import { tokenConfig } from "@/config/tokenConfig";
import { getCurrentUser } from "@/services/userService";
import { getNextOnboardingPath } from "@/utils/getNextOnboardingPath";
import { useQueryClient } from "@tanstack/react-query";

// TODO: Add rate limiting on failed login attempts to enhance security
//       In the future, if backend returns 429 Too Many Requests, you could add a retry or cooldown message.

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

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
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setToast(null);

    const payload = {
      email: data.email.trim().toLowerCase(),
      password: data.password,
    };

    try {
      const res = await loginUser(payload);

      if (res?.success) {
        const { accessToken, refreshToken } = res || {};

        Cookies.set("access_token", accessToken, {
          expires: tokenConfig.accessTokenExpiryDays,
          secure: true,
          sameSite: "Strict",
          path: "/",
        });
        Cookies.set("refresh_token", refreshToken, {
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

        const user = await getCurrentUser();

        // cache the user globally so I don't have to refetch again
        queryClient.setQueryData(["currentUser"], user);

        const nextPath = getNextOnboardingPath(user);

        // setToast({
        //   message: "Login successful! Redirecting...",
        //   type: "success",
        // });

        reset();

        navigate(nextPath);

        // setTimeout(() => {
        //   navigate(nextPath);
        // }, 1500);
      } else {
        throw new Error(res?.message || "Invalid credentials");
      }
    } catch (error: any) {
      let message =
        error instanceof APIError
          ? error.message
          : "Email or password is incorrect.";

      if (error instanceof APIError) {
        //  Handle account not verified
        if (error.status === 403 && /not verified/i.test(error.message)) {
          message =
            "Your account is not verified. Redirecting to OTP verification...";
          setToast({ message, type: "error" });
          setTimeout(() => {
            navigate(
              `${PATHS.AUTH.VERIFY_OTP}?email=${encodeURIComponent(
                payload.email.toLowerCase()
              )}&type=signup`
            );
          }, 1500);
          return;
        }
        message = error.message;
      } else if (
        // Handle network errors explicitly
        error.message === "Failed to fetch" ||
        /network/i.test(error.message)
      ) {
        message = "Couldn't connect. Check your internet connection.";
      }

      // Handle all other errors normally
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
          Welcome Back
        </motion.h1>

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

          <div className="space-y-2">
            <FormInput
              id="password"
              label="Password"
              type="password"
              placeholder="Password"
              disabled={loading}
              autoComplete="current-password"
              {...register("password")}
              error={errors.password?.message}
            />

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate(PATHS.AUTH.FORGOT_PASSWORD)}
                className="font-gilroy-bold text-sm text-primary-dark hover:underline transition-all cursor-pointer"
              >
                Forgot Password
              </button>
            </div>
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
            loadingText="Signing In..."
          >
            Login
          </Button>

          <Divider />

          {/* Google Login */}
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
              Sign In with Google
            </span>
          </Button>

          {/* Sign Up Redirect */}
          <p className="font-gilroy-medium text-sm text-center">
            If you don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate(PATHS.AUTH.SIGNUP)}
              className="text-primary-dark hover:underline transition-all cursor-pointer"
            >
              Sign up here
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
