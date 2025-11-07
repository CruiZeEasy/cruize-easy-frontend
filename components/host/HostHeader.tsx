"use client";
import { usePathname } from "next/navigation";
import { BackButton } from "../ui/BackButton";
import { PATHS } from "@/utils/path";
import clsx from "clsx";

export function HostHeader() {
  const pathname = usePathname();
  const isHostNotificationPage = pathname.startsWith(PATHS.HOST.NOTIFICATION);

  const pageTitle = pathname.startsWith(PATHS.HOST.BOOKINGS)
    ? "Bookings"
    : pathname.startsWith(PATHS.HOST.NOTIFICATION)
    ? "Notification"
    : "";

  return (
    <div className="flex items-center justify-between">
      <BackButton variant="mobile" showOnDesktop />

      <span className="font-modulus-semibold">{pageTitle}</span>

      <div
        className={clsx(
          "font-gilroy-semibold text-sm bg-primary-dark text-white rounded-lg py-2 px-4",
          { invisible: !isHostNotificationPage }
        )}
      >
        3 new
      </div>
    </div>
  );
}
