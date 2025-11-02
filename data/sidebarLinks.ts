export type SidebarLink = {
  id: number;
  label: string;
  href: string;
  src: string;
  active?: boolean;
};

export const hostSidebarLinks: SidebarLink[] = [
  {
    id: 1,
    label: "Profile",
    href: "#",
    src: "user-profile-light",
    // active: true,
  },
  {
    id: 2,
    label: "Listings",
    href: "#",
    src: "line-chart-light",
  },
  {
    id: 3,
    label: "Bookings",
    href: "#",
    src: "bookings-light",
  },
  {
    id: 4,
    label: "Settings",
    href: "#",
    src: "settings-light",
    active: true,
  },
];
