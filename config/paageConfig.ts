import { PATHS } from "@/utils/path";

export const PAGE_CONFIG = {
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

  [PATHS.HOST.CREATE_WALLET]: {
    title: "Payment Method",
    showBadge: false,
  },

  [PATHS.HOST.VERIFY_WALLET_OTP]: {
    title: "Verify OTP",
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

  ["/dashboard/hosts/"]: {
    title: "Host Profile",
    showBadge: false,
  },

  [PATHS.USER.LISTINGS]: {
    title: "Listings",
    showBadge: false,
  },

  [PATHS.USER.CREATE_WALLET]: {
    title: "Payment Method",
    showBadge: false,
  },

  [PATHS.USER.VERIFY_WALLET_OTP]: {
    title: "Verify OTP",
    showBadge: false,
  },

  [PATHS.USER.FUND_WALLET]: {
    title: "Top up E-wallet",
    showBadge: false,
  },
} as const;
