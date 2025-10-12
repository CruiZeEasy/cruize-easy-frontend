"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

interface BackButtonProps {
  href: string;
  variant?: "desktop" | "mobile";
  className?: string;
}

export function BackButton({
  href,
  variant = "desktop",
  className,
}: BackButtonProps) {
  const isDesktop = variant === "desktop";

  return (
    <Link
      href={href}
      className={clsx(
        isDesktop ? "absolute top-6 left-10" : "md:hidden mb-6",
        className
      )}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className={clsx(isDesktop ? "cursor-pointer" : "w-fit")}
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
      </motion.div>
    </Link>
  );
}
