"use client";

import clsx from "clsx";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  variant?: "desktop" | "mobile";
  className?: string;
  showOnDesktop?: boolean;
}

export function BackButton({
  variant = "desktop",
  className,
  showOnDesktop = false,
}: BackButtonProps) {
  const router = useRouter();
  const isDesktop = variant === "desktop";

  return (
    <motion.button
      onClick={() => router.back()}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={clsx(
        isDesktop
          ? "absolute top-6 left-10 cursor-pointer"
          : clsx("w-fit cursor-pointer", !showOnDesktop && "md:hidden"),
        className
      )}
    >
      <Image
        src={
          isDesktop
            ? "/images/icons/arrow-left-desktop.svg"
            : "/images/icons/arrow-left-mobile.svg"
        }
        alt="Back"
        width={34}
        height={34}
        className="block"
        priority
      />
    </motion.button>
  );
}
