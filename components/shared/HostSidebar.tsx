"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { hostSidebarLinks } from "@/data/sidebarLinks";

export default function HostSidebar() {
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
      <div
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
      </div>

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

        {/* Nav links */}
        <nav className="flex-1 flex flex-col space-y-3">
          {desktopLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={clsx(
                "relative flex items-center gap-2 py-3 font-gilroy-semibold text-sm hover:bg-primary-light-transparent  transition-all",
                expanded ? "pl-4" : "justify-center",
                link.active &&
                  "bg-primary-light-transparent before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-white"
              )}
            >
              <Image
                src={`/images/icons/${link.src}.svg`}
                alt={link.label}
                width={24}
                height={24}
              />
              {expanded && <span>{link.label}</span>}
            </Link>
          ))}
        </nav>

        {/* User Profile Photo */}
        <div
          className={clsx(
            "flex transition-all mt-auto mb-12",
            expanded ? "pl-4" : "justify-center"
          )}
        >
          <div className="size-11 bg-white rounded-full overflow-hidden relative">
            <Image
              src="/images/me.jpg"
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
