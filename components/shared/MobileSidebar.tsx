"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { hostSidebarLinks, userSidebarLinks } from "@/data/sidebarLinks";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { usePageTransition } from "@/hooks/usePageTransition";
import { PATHS } from "@/utils/path";
import { PageTransitionSpinner } from "../ui/PageTransitionSpinner";

export function MobileSidebar({ role }: { role: "host" | "user" }) {
  const queryClient = useQueryClient();
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
      <button
        onClick={() => setExpanded(true)}
        aria-label="Open sidebar"
        className="cursor-pointer"
      >
        <Image
          src="/images/icons/menu-dark.svg"
          alt="menu icon"
          width={35}
          height={35}
          priority
        />
      </button>

      <AnimatePresence>
        {expanded && (
          <>
            {/* Background overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setExpanded(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Sidebar Panel */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-64 bg-primary-light-opaque text-white flex flex-col py-6 z-50 shadow-lg rounded-tr-[30px] rounded-br-[30px]"
            >
              {/* Header Section */}
              <div className="flex flex-col gap-2 px-4 mb-10">
                <Image
                  src="/images/logo/cruize-easy-logo-light.svg"
                  alt="Cruize Easy Logo"
                  width={178}
                  height={40}
                  priority
                />
              </div>

              {/* Nav Links */}
              <nav className="flex-1 flex flex-col space-y-4">
                {links.map((link) => {
                  const isActive =
                    pathname === link.href

                  return (
                    <Link
                      key={link.id}
                      href={link.href}
                      onClick={() => setExpanded(false)}
                      className={clsx(
                        "relative flex items-center gap-3 py-3 px-4 rounded-md font-gilroy-semibold text-sm hover:bg-primary-light-transparent transition-all",
                        isActive &&
                          "bg-primary-light-transparent before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-white"
                      )}
                    >
                      <Image
                        src={`/images/icons/${link.icon}.svg`}
                        alt={link.label}
                        width={22}
                        height={22}
                        priority
                      />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Log Out Button */}
              <div className="px-4 mt-auto font-gilroy-semibold text-sm">
                <button
                  className="flex items-center gap-3"
                  onClick={handleLogout}
                >
                  <Image
                    src={`/images/icons/logout.svg`}
                    alt="logout icon"
                    width={22}
                    height={22}
                    priority
                  />

                  <span>Log Out</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Page Transition Spinner */}
      <PageTransitionSpinner isVisible={isNavigating} />
    </>
  );
}
