"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import Image from "next/image";
import { Spinner } from "@/components/ui/Spinner";
import { PATHS } from "@/utils/path";
import { tokenConfig } from "@/config/tokenConfig";
import { getCurrentUser } from "@/services/userService";
import { getNextOnboardingPath } from "@/utils/getNextOnboardingPath";

export function OAuthRedirectClient() {
  const router = useRouter();
  const params = useSearchParams();

  const accessToken = params.get("accessToken");
  const refreshToken = params.get("refreshToken");

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (accessToken && refreshToken) {
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

        try {
          const user = await getCurrentUser();
          const nextPath = getNextOnboardingPath(user);
          router.push(nextPath);
        } catch {
          router.push(PATHS.AUTH.LOGIN);
        }
      } else {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        router.push(PATHS.AUTH.LOGIN);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [accessToken, refreshToken, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] text-center bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center space-y-6"
      >
        <Image
          src="/images/logo/cruize-easy-logo-icon.svg"
          alt="Cruize Easy Logo Icon"
          width={70}
          height={70}
          className="w-14 h-auto"
          priority
        />

        <div>
          <h1 className="font-modulus-semibold text-xl text-neutral-950">
            Signing you in securely...
          </h1>
          <p className="text-sm text-neutral-600 mt-2 font-inter">
            Please wait while we complete your authentication.
          </p>
        </div>

        <Spinner />
      </motion.div>
    </div>
  );
}
