import { apiClient } from "@/utils/apiClient";
import { API_ROUTES } from "@/utils/apiRoutes";

enum UserRoles {
  USER = "ROLE_USER",
  HOST = "ROLE_HOST",
  ADMIN = "ROLE_ADMIN",
}

export async function registerUser(data: {
  fullName: string;
  email: string;
  password: string;
}) {
  return apiClient(API_ROUTES.AUTH.REGISTER, {
    method: "POST",
    body: JSON.stringify({
      ...data,
    }),
  });
}

export async function loginUser(data: { email: string; password: string }) {
  return apiClient(API_ROUTES.AUTH.LOGIN, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function verifyOtp(data: {
  email: string;
  otp: string;
  type?: string;
}) {
  return apiClient(API_ROUTES.AUTH.VERIFY_OTP, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function resendOtp(data: { email: string; type?: string }) {
  return apiClient(API_ROUTES.AUTH.RESEND_OTP, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function forgotPassword(data: { email: string }) {
  return apiClient(API_ROUTES.AUTH.FORGOT_PASSWORD, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function resetPassword(data: {
  verificationToken: string;
  newPassword: string;
}) {
  return apiClient(API_ROUTES.AUTH.RESET_PASSWORD, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function refreshAccessToken(refreshToken: string) {
  return apiClient(API_ROUTES.AUTH.REFRESH_TOKEN, {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });
}
