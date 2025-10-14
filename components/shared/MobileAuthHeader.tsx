"use client";

import { BackButton } from "@/components/ui/BackButton";
import { PATHS } from "@/utils/path";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function MobileAuthHeader() {
  const pathname = usePathname();

  const showCenteredTitle =
    pathname.includes(PATHS.AUTH.FORGOT_PASSWORD) ||
    pathname.includes(PATHS.AUTH.VERIFY_OTP) ||
    pathname.includes("/auth/change-password");

  const pageTitle = pathname.includes("forgot-password")
    ? "Forgot Password"
    : pathname.includes("verify")
    ? "Verify OTP"
    : pathname.includes("change-password")
    ? "Change Password"
    : "";

  const containerClass = clsx(
    "flex justify-between items-center md:mb-0 md:hidden",
    showCenteredTitle ? "mb-12" : "mb-6"
  );

  return (
    <div className={containerClass}>
      <BackButton variant="mobile" />

      {showCenteredTitle ? (
        <>
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="font-modulus-semibold"
          >
            {pageTitle}
          </motion.span>
          <div /> {/* Empty div to balance flex spacing */}
        </>
      ) : (
        <div />
      )}
    </div>
  );
}
