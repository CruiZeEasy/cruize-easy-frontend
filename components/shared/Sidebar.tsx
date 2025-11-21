"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { hostSidebarLinks, userSidebarLinks } from "@/data/sidebarLinks";
import { PATHS } from "@/utils/path";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getOptimizedImage } from "@/utils/cloudinary";
import { usePageTransition } from "@/hooks/usePageTransition";
import { PageTransitionSpinner } from "../ui/PageTransitionSpinner";
import { useQueryClient } from "@tanstack/react-query";

export  function Sidebar({ role }: { role: "host" | "user" }) {
  const queryClient = useQueryClient();
  const { data: user } = useCurrentUser();
  const pathname = usePathname();
  const { navigate, isNavigating } = usePageTransition();
  const [expanded, setExpanded] = useState(false);

  const links = role === "host" ? hostSidebarLinks : userSidebarLinks;
  const homePath = role === "host" ? PATHS.HOST.HOME : PATHS.USER.HOME;

  const handleLogout = () => {
    Cookies.remove("access_token", { path: "/" });
    Cookies.remove("refresh_token", { path: "/" });

    queryClient.clear();

    navigate(PATHS.AUTH.LOGIN);
  };

  return (
    <>
      <motion.aside
        initial={{ width: 80 }}
        animate={{ width: expanded ? 240 : 80 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="h-[100dvh] bg-primary-light border-r-neutral-300 border-r hidden md:flex flex-col py-6 shadow-sm relative text-white"
      >
        {/* Logo */}
        <Link
          href={homePath}
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
            {links.map((link) => {
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

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={clsx(
              "flex items-center text-white py-3 hover:bg-primary-light-transparent transition-all cursor-pointer mb-6",
              expanded ? "gap-3 pl-4 pr-2 justify-start" : "justify-center"
            )}
          >
            <Image
              src="/images/icons/logout.svg"
              alt="logout icon"
              width={22}
              height={22}
              priority
            />

            <motion.span
              initial={{ opacity: 0, x: -10, width: 0 }}
              animate={{
                opacity: expanded ? 1 : 0,
                x: expanded ? 0 : -10,
                width: expanded ? "auto" : 0,
              }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="whitespace-nowrap overflow-hidden"
            >
              Log Out
            </motion.span>
          </button>

          {/* User Profile Photo */}
          {user?.profileImageUrl && (
            <div
              className={clsx(
                "flex transition-all",
                expanded ? "pl-4" : "justify-center"
              )}
            >
              <div className="size-11 bg-white rounded-full overflow-hidden relative">
                <Image
                  src={getOptimizedImage(user.profileImageUrl, 10)}
                  alt="Profile Image"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </motion.aside>

      {/* Page Transition Spinner */}
      <PageTransitionSpinner isVisible={isNavigating} />
    </>
  );
}
