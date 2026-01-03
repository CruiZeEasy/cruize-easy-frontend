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
    href: PATHS.HOST.PROFILE,
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
    href: PATHS.USER.LISTINGS,
    icon: "line-chart-light",
  },
  {
    id: 4,
    label: "Bookings",
    href: PATHS.USER.BOOKINGS,
    icon: "bookings-light",
  },
  {
    id: 5,
    label: "Notification",
    href: PATHS.USER.NOTIFICATION,
    icon: "message-notif-light",
  },
  {
    id: 6,
    label: "Settings",
    href: "#",
    icon: "settings-light",
  },
];
