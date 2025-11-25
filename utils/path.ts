export const PATHS = {
  HOME: "/",

  AUTH: {
    SIGNUP: "/auth/signup",
    LOGIN: "/auth/login",
    FORGOT_PASSWORD: "/auth/forgot-password",
    VERIFY_OTP: "/auth/verify-otp",
    RESET_PASSWORD: "/auth/reset-password",
    CHANGE_PASSWORD: "/auth/change-password",
  },

  ONBOARDING: {
    COMPLETE_PROFILE: "/onboarding/complete-profile",
    ALLOW_LOCATION: "/onboarding/allow-location",
    ALLOW_NOTIFICATIONS: "/onboarding/allow-notifications",
  },

  USER: {
    HOME: "/dashboard",
    BOOKINGS: "/dashboard/bookings",
    BOOKING_OVERVIEW: (id: number) => `/dashboard/listings/${id}/book`,
    BOOKING_DETAILS: (id: number) => `/dashboard/listings/${id}/book/details`,
    LISTINGS: "/dashboard/listings",
    NOTIFICATION: "/dashboard/notification",
  },

  HOST: {
    HOME: "/host",
    PROFILE: "/host/profile",
    NOTIFICATION: "/host/notification",
    BOOKINGS: "/host/bookings",
    ADD_CAR: "/host/add-car",
    // LISTINGS: "/host/listings",
    // EARNINGS: "/host/earnings",
  },

  ADMIN: {
    HOME: "/admin",
    // USERS: "/admin/users",
    // VEHICLES: "/admin/vehicles",
    // REPORTS: "/admin/reports",
    // SETTINGS: "/admin/settings",
  },
};
