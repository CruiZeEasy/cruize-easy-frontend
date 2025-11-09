"use client";
import { usePathname } from "next/navigation";
import { BackButton } from "../ui/BackButton";
import { PATHS } from "@/utils/path";
import clsx from "clsx";

const PAGE_CONFIG = {
  [PATHS.HOST.BOOKINGS]: {
    title: "Booking",
    showBadge: false,
  },
  [PATHS.HOST.ADD_CAR]: {
    title: "Add Car",
    showBadge: false,
  },
  [PATHS.HOST.NOTIFICATION]: {
    title: "Notification",
    showBadge: true,
  },
} as const;

interface HostHeaderProps {
  notificationCount?: number;
}

export function HostHeader({ notificationCount = 3 }: HostHeaderProps) {
  const pathname = usePathname();

  // Find matching page config
  const currentPage = Object.entries(PAGE_CONFIG).find(([path]) =>
    pathname.startsWith(path)
  );

  const pageTitle = currentPage?.[1].title || "";
  const showBadge = currentPage?.[1].showBadge || false;

  return (
    <div className="flex items-center justify-between">
      <BackButton variant="mobile" showOnDesktop />

      <span className="font-modulus-semibold md:text-[20px]">{pageTitle}</span>

      <div
        className={clsx(
          "font-gilroy-semibold text-sm bg-primary-dark text-white rounded-lg py-2 px-4",
          { invisible: !showBadge || notificationCount === 0 }
        )}
      >
        {notificationCount} new
      </div>
    </div>
  );
}
