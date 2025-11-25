// "use client";
// import { usePathname } from "next/navigation";
// import { BackButton } from "../ui/BackButton";
// import { PATHS } from "@/utils/path";
// import { MobileSidebar } from "../shared/MobileSidebar";
// import { useCurrentUser } from "@/hooks/useCurrentUser";
// import { UserRoles } from "@/constants/enums";

// const PAGE_CONFIG = {
//   // Host Configs
//   [PATHS.HOST.BOOKINGS]: {
//     title: "Booking",
//     showBadge: false,
//   },
//   [PATHS.HOST.ADD_CAR]: {
//     title: "Add Car",
//     showBadge: false,
//   },
//   [PATHS.HOST.NOTIFICATION]: {
//     title: "Notification",
//     showBadge: true,
//   },
//   [PATHS.HOST.PROFILE]: {
//     title: "Host Profile",
//     showBadge: false,
//   },

//   // User Configs
//   [PATHS.USER.LISTINGS]: {
//     title: "Listings",
//     showBadge: false,
//   },
//   [PATHS.USER.BOOKINGS]: {
//     title: "Booking",
//     showBadge: false,
//   },
//   [PATHS.USER.NOTIFICATION]: {
//     title: "Notification",
//     showBadge: true,
//   },
//   ["/dashboard/listings/"]: {
//     title: "Booking",
//     showBadge: false,
//   },
// } as const;

// interface HostHeaderProps {
//   notificationCount?: number;
// }

// export function HostHeader({ notificationCount = 3 }: HostHeaderProps) {
//   const { data: user } = useCurrentUser();
//   const isHost = user?.roles?.includes(UserRoles.HOST);

//   const pathname = usePathname();

//   const currentPage = Object.entries(PAGE_CONFIG).find(([path]) =>
//     pathname.startsWith(path)
//   );

//   const pageTitle = currentPage?.[1].title || "";
//   const showBadge = currentPage?.[1].showBadge || false;
//   const showNotificationBadge = showBadge && notificationCount > 0;

//   const isHostProfilePage = currentPage?.[0] === PATHS.HOST.PROFILE;

//   return (
//     <div className="flex items-center justify-between">
//       <BackButton variant="mobile" showOnDesktop={!isHostProfilePage} />
//       {isHostProfilePage && <div className="hidden md:block" />}

//       <span className="font-modulus-semibold md:text-[20px]">{pageTitle}</span>

//       {/* Right side: Either notification badge OR mobile sidebar */}
//       {showNotificationBadge ? (
//         <div className="font-gilroy-semibold text-sm bg-primary-dark text-white rounded-lg py-2 px-4">
//           {notificationCount} new
//         </div>
//       ) : (
//         <>
//           {/* Mobile sidebar on small screens */}
//           <div className="md:hidden">
//             <MobileSidebar role={isHost ? "host" : "user"} />
//           </div>
//           {/* Empty spacer on desktop for layout balance */}
//           <div className="hidden md:block w-[88px]" />{" "}
//           {/* matches badge width */}
//         </>
//       )}
//     </div>
//   );
// }

"use client";
import { usePathname } from "next/navigation";
import { BackButton } from "../ui/BackButton";
import { PATHS } from "@/utils/path";
import { MobileSidebar } from "../shared/MobileSidebar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { UserRoles } from "@/constants/enums";

const PAGE_CONFIG = {
  // Host Configs
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
  [PATHS.HOST.PROFILE]: {
    title: "Host Profile",
    showBadge: false,
  },

  // User Configs
  [PATHS.USER.BOOKINGS]: {
    title: "Booking",
    showBadge: false,
  },
  [PATHS.USER.NOTIFICATION]: {
    title: "Notification",
    showBadge: true,
  },
  // Specific pattern for /dashboard/listings/:id/... (booking pages)
  "/dashboard/listings/": {
    title: "Booking",
    showBadge: false,
  },
  // This should come AFTER the more specific pattern
  [PATHS.USER.LISTINGS]: {
    title: "Listings",
    showBadge: false,
  },
} as const;

type PageConfig = (typeof PAGE_CONFIG)[keyof typeof PAGE_CONFIG];

interface HostHeaderProps {
  notificationCount?: number;
}

export function HostHeader({ notificationCount = 3 }: HostHeaderProps) {
  const { data: user } = useCurrentUser();
  const isHost = user?.roles?.includes(UserRoles.HOST);

  const pathname = usePathname();

  // Find matching page config with priority for more specific paths
  const currentPage = (() => {
    // First check for /dashboard/listings/:id/... pattern (more specific)
    if (
      pathname.startsWith("/dashboard/listings/") &&
      pathname !== PATHS.USER.LISTINGS
    ) {
      return PAGE_CONFIG["/dashboard/listings/"];
    }

    // Then check exact matches and other patterns
    const entry = Object.entries(PAGE_CONFIG).find(([path]) => {
      if (path === "/dashboard/listings/") return false; // Skip this, already handled above
      return pathname.startsWith(path);
    });

    return entry?.[1];
  })();

  const pageTitle = currentPage?.title || "";
  const showBadge = currentPage?.showBadge || false;
  const showNotificationBadge = showBadge && notificationCount > 0;

  const isHostProfilePage = pathname === PATHS.HOST.PROFILE;
  const isListingsPage = pathname.startsWith(PATHS.USER.LISTINGS);
  const hideBackButton = isHostProfilePage || isListingsPage;

  return (
    <div className="flex items-center justify-between">
      <BackButton variant="mobile" showOnDesktop={!hideBackButton} />
      {hideBackButton && <div className="hidden md:block" />}

      <span className="font-modulus-semibold md:text-[20px]">{pageTitle}</span>

      {/* Right side: Either notification badge OR mobile sidebar */}
      {showNotificationBadge ? (
        <div className="font-gilroy-semibold text-sm bg-primary-dark text-white rounded-lg py-2 px-4">
          {notificationCount} new
        </div>
      ) : (
        <>
          {/* Mobile sidebar on small screens */}
          <div className="md:hidden">
            <MobileSidebar role={isHost ? "host" : "user"} />
          </div>
          {/* Empty spacer on desktop for layout balance */}
          <div className="hidden md:block w-[88px]" />{" "}
          {/* matches badge width */}
        </>
      )}
    </div>
  );
}
