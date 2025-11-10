import { PATHS } from "@/utils/path";

interface SidebarLink {
  id: number;
  label: string;
  href: string;
  icon: string;
  showOnMobile?: boolean;
  showOnDesktop?: boolean;
  active?: boolean;
}

export const hostSidebarLinks: SidebarLink[] = [
  {
    id: 1,
    label: "Profile",
    href: PATHS.HOST.PROFILE,
    icon: "user-profile-light",
    // showOnMobile: true,
    // showOnDesktop: true,
  },
  {
    id: 2,
    label: "My Earnings",
    href: "#",
    icon: "wallet-light",
    // showOnMobile: true,
  },
  // {
  //   id: 3,
  //   label: "Listings",
  //   href: "#",
  //   icon: "line-chart-light",
  //   // showOnDesktop: true,
  // },
  {
    id: 4,
    label: "Bookings",
    href: PATHS.HOST.BOOKINGS,
    icon: "bookings-light",
    // showOnMobile: true,
    // showOnDesktop: true,
  },
  {
    id: 5,
    label: "My Cars",
    href: "#",
    icon: "driving-light",
    // showOnMobile: true,
  },
  {
    id: 6,
    label: "Notification",
    href: PATHS.HOST.NOTIFICATION,
    icon: "message-notif-light",
    // showOnMobile: true,
  },
  {
    id: 7,
    label: "Settings",
    href: "#",
    icon: "settings-light",
    // showOnMobile: true,
    // showOnDesktop: true,
  },
];
