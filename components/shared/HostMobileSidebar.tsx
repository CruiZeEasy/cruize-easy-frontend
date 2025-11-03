"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { hostSidebarLinks } from "@/data/sidebarLinks";

export function HostMobileSidebar() {
  const [expanded, setExpanded] = useState(false);
  const mobileLinks = hostSidebarLinks.filter((l) => l.showOnMobile);

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
              <div className="flex items-center justify-between px-4 mb-10">
                <Image
                  src="/images/logo/cruize-easy-logo-light.svg"
                  alt="Cruize Easy Logo"
                  width={178}
                  height={40}
                  priority
                />
              </div>

              {/* Nav Links */}
              <nav className="flex-1 flex flex-col space-y-4 px-4">
                {mobileLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={() => setExpanded(false)}
                    className="flex items-center gap-3 py-3 rounded-md font-gilroy-semibold text-sm hover:bg-[#FAA6A6BD]/70 transition-all"
                  >
                    <Image
                      src={`/images/icons/${link.src}.svg`}
                      alt={link.label}
                      width={22}
                      height={22}
                    />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </nav>

              {/* Log Out Button */}
              <div className="px-4 mt-auto font-gilroy-semibold text-sm">
                <button className="flex items-center gap-3 ">
                  <Image
                    src={`/images/icons/logout.svg`}
                    alt="logout icon"
                    width={22}
                    height={22}
                  />

                  <span>Log Out</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
