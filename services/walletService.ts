import { API_ROUTES } from "@/utils/apiRoutes";
import { apiClient } from "@/utils/apiClient";
import {
  CreateWalletPayload,
  FundWalletPayload,
  VerifyWalletPayload,
} from "@/types/wallet";
import { generateIdempotencyKey } from "@/utils/wallet";

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
  return apiClient(API_ROUTES.WALLET.RESEND_OTP, {
    method: "POST",
  });
}

export function fundWallet(data: FundWalletPayload) {
  const payload = {
    ...data,
    idempotencyKey: generateIdempotencyKey(),
    description: `Wallet funding via ${data.paymentMethod}`,
  };

  return apiClient(API_ROUTES.WALLET.FUND_WALLET, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
