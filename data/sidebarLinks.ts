export type SidebarLink = {
  id: number;
  label: string;
  href: string;
  src: string;
  showOnMobile?: boolean;
  showOnDesktop?: boolean;
  active?: boolean;
};

export const hostSidebarLinks: SidebarLink[] = [
  {
    id: 1,
    label: "Profile",
    href: "#",
    src: "user-profile-light",
    showOnMobile: true,
    showOnDesktop: true,
  },
  {
    id: 2,
    label: "My Earnings",
    href: "#",
    src: "wallet-light",
    showOnMobile: true,
  },
  {
    id: 3,
    label: "Listings",
    href: "#",
    src: "line-chart-light",
    showOnDesktop: true,
  },
  {
    id: 4,
    label: "Bookings",
    href: "#",
    src: "bookings-light",
    showOnMobile: true,
    showOnDesktop: true,
  },
  {
    id: 5,
    label: "My Cars",
    href: "#",
    src: "driving-light",
    showOnMobile: true,
  },
  {
    id: 6,
    label: "Notification",
    href: "#",
    src: "message-notif-light",
    showOnMobile: true,
  },
  {
    id: 7,
    label: "Settings",
    href: "#",
    src: "settings-light",
    active: true,
    showOnMobile: true,
    showOnDesktop: true,
  },
];
