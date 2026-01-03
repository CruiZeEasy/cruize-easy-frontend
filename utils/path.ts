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

  KYC: {
    SUCCESS: "/kyc/success",
  },

  USER: {
    HOME: "/dashboard",
    BOOKINGS: "/dashboard/bookings",
    BOOKING_OVERVIEW: (bookingId: string) =>
      `/dashboard/listings/${bookingId}/book`,
    BOOKING_DETAILS: (bookingId: string) =>
      `/dashboard/listings/${bookingId}/book/details`,
    BOOKING_CHECKOUT: (bookingId: string) =>
      `/dashboard/bookings/${bookingId}/checkout`,
    BOOKING_SUCCESS: (bookingId: string) =>
      `/dashboard/bookings/${bookingId}/success`,

    LISTINGS: "/dashboard/listings",
    NOTIFICATION: "/dashboard/notification",

    HOST_PROFILE: (hostId: string) => `/dashboard/hosts/${hostId}`,

    WALLET: "/dashboard/wallet",
    CREATE_WALLET: "/dashboard/wallet/create",
    VERIFY_WALLET_OTP: "/dashboard/wallet/verify-otp",

    FUND_WALLET: "/dashboard/wallet/fund",
    FUND_WALLET_SUCCESS: "/dashboard/wallet/fund/success",
    FUND_WALLET_FAILED: "/dashboard/wallet/fund/success",
  },

  HOST: {
    HOME: "/host",
    PROFILE: "/host/profile",
    NOTIFICATION: "/host/notification",
    BOOKINGS: "/host/bookings",
    ADD_CAR: "/host/add-car",

    WALLET: "/host/wallet",
    CREATE_WALLET: "/host/wallet/create",
    VERIFY_WALLET_OTP: "/host/wallet/verify-otp",
  },

  ADMIN: {
    HOME: "/admin",
  },
};
