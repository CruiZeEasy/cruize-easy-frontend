export interface CreateWalletPayload {
  agree: boolean;
  confirmPin: string;
  transactionPin: string;
}

export interface VerifyWalletPayload {
  otp: string;
}
