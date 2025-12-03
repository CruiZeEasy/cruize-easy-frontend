export const API_ROUTES = {
  AUTH: {
    REGISTER: "/api/v1/auth/register",
    LOGIN: "/api/v1/auth/login",
    FORGOT_PASSWORD: "/api/v1/auth/forgot-password",
    RESET_PASSWORD: "/api/v1/auth/reset-password",
    VERIFY_OTP: "/api/v1/auth/verify-otp",
    RESEND_OTP: "/api/v1/auth/resend-otp",
    REFRESH_TOKEN: "/api/v1/auth/refresh-token",
    GOOGLE: "/oauth2/authorization/google",
  },

  USER: {
    ME: "/api/v1/users/me", // get current user profile
    UPLOAD_PROFILE_IMAGE: "/api/v1/users/me/profile-image",
  },

  HOST: {
    ME: "/api/v1/host-profiles/me", // get current host profile
  },

  VEHICLES: {
    CREATE: "/api/v1/vehicles",
    ME: "/api/v1/vehicles/host/me", // get vehicles of current host
    AVAILABLE_VEHICLES: "/api/v1/vehicles/available",
  },

  WALLET: {
    CREATE: "/api/v1/wallets/create/initiate",
    VERIFY_OTP: "/api/v1/wallets/create/verify",
    RESEND_OTP: "/api/v1/wallets/create/resend-otp",
  },

  CLOUDINARY: {
    PROFILE_IMAGE_SIGNATURE: "/api/v1/cloudinary/signature/profile-image",
    DOCUMENT_SIGNATURE: "/api/v1/cloudinary/signature/documents",
    IMAGE_SIGNATURE: "/api/v1/cloudinary/signature/images",
  },
};
