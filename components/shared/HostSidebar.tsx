"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { hostSidebarLinks } from "@/data/sidebarLinks";
import { PATHS } from "@/utils/path";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getOptimizedImage } from "@/utils/cloudinary";

export default function HostSidebar() {
  const { data: user } = useCurrentUser();
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const desktopLinks = hostSidebarLinks.filter((l) => l.showOnDesktop);

  return (
    <motion.aside
      initial={{ width: 80 }}
      animate={{ width: expanded ? 240 : 80 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="h-[100dvh] bg-primary-light border-r-neutral-300 border-r hidden md:flex flex-col py-6 shadow-sm relative text-white"
    >
      {/* Logo */}
      <Link
        href={PATHS.HOST.HOME}
        className={clsx(
          "flex items-center transition-all mb-12",
          expanded ? "justify-start pl-4" : "justify-center"
        )}
      >
        <Image
          src="/images/logo/cruize-easy-logo-icon-light.svg"
          alt="Cruize Easy Logo Icon Transparent"
          width={40}
          height={40}
          priority
        />
      </Link>

      {/* Toggle Button and Nav Links */}
      <div className="flex-1 flex flex-col">
        <button
          onClick={() => setExpanded(!expanded)}
          aria-label="Toggle sidebar"
          className={clsx(
            "flex cursor-pointer transition-all mb-6",
            expanded ? "pl-4" : "justify-center"
          )}
        >
          <Image
            src="/images/icons/menu-light.svg"
            alt="menu icon"
            width={30}
            height={30}
            priority
          />
        </button>

        <nav className="flex-1 flex flex-col space-y-3 overflow-y-auto overflow-x-hidden">
          {hostSidebarLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.id}
                href={link.href}
                className={clsx(
                  "relative flex items-center py-3 font-gilroy-semibold text-sm hover:bg-primary-light-transparent transition-all duration-300 ease-in-out",
                  expanded ? "gap-3 pl-4" : "justify-center",
                  isActive &&
                    "bg-primary-light-transparent before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-white"
                )}
              >
                <Image
                  src={`/images/icons/${link.icon}.svg`}
                  alt={link.label}
                  width={24}
                  height={24}
                  className="min-w-6"
                />

                <motion.div
                  className="overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: expanded ? "auto" : 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: expanded ? 1 : 0,
                      x: expanded ? 0 : -10,
                    }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="whitespace-nowrap"
                  >
                    {link.label}
                  </motion.span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* User Profile Photo */}
        <div
          className={clsx(
            "flex transition-all mt-auto",
            expanded ? "pl-4" : "justify-center"
          )}
        >
          <div className="size-11 bg-white rounded-full overflow-hidden relative">
            <Image
              src={getOptimizedImage(user.profileImageUrl, "low")}
              alt="Profile Image"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
