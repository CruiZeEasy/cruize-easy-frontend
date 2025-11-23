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
    label: "Home",
    href: PATHS.HOST.HOME,
    icon: "home-light",
  },
  {
    id: 2,
    label: "Profile",
    href: PATHS.HOST.PROFILE,
    icon: "user-profile-light",
  },
  // {
  //   id: 2,
  //   label: "My Earnings",
  //   href: "#",
  //   icon: "wallet-light",
  //   // showOnMobile: true,
  // },
  // {
  //   id: 3,
  //   label: "Listings",
  //   href: "#",
  //   icon: "line-chart-light",
  // },
  {
    id: 3,
    label: "Bookings",
    href: PATHS.HOST.BOOKINGS,
    icon: "bookings-light",
    // showOnMobile: true,
  },
  {
    id: 4,
    label: "My Cars",
    href: `${PATHS.HOST.PROFILE}?tab=cars`,
    icon: "driving-light",
  },
  {
    id: 5,
    label: "Notification",
    href: PATHS.HOST.NOTIFICATION,
    icon: "message-notif-light",
  },
  {
    id: 6,
    label: "Settings",
    href: "#",
    icon: "settings-light",
  },
];

export const userSidebarLinks: SidebarLink[] = [
  {
    id: 1,
    label: "Home",
    href: PATHS.USER.HOME,
    icon: "home-light",
  },
  {
    id: 2,
    label: "Profile",
    href: "#",
    icon: "user-profile-light",
  },
  {
    id: 3,
    label: "Listings",
    href: "#",
    icon: "line-chart-light",
  },
  {
    id: 4,
    label: "Bookings",
    href: "#",
    icon: "bookings-light",
  },
  {
    id: 5,
    label: "Settings",
    href: "#",
    icon: "settings-light",
  },
];
