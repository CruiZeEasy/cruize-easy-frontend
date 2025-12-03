import { API_ROUTES } from "@/utils/apiRoutes";
import { apiClient } from "@/utils/apiClient";
import { CreateWalletPayload, VerifyWalletPayload } from "@/types/wallet";

export async function createWallet(data: CreateWalletPayload) {
  return apiClient(API_ROUTES.WALLET.CREATE, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function verifyWallet(data: VerifyWalletPayload) {
  return apiClient(API_ROUTES.WALLET.VERIFY_OTP, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function resendWalletOtp() {
  return apiClient(API_ROUTES.WALLET.VERIFY_OTP, {
    method: "POST",
  });
}
