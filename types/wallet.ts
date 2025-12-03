export interface CreateWalletPayload {
  agree: boolean;
  confirmPin: string;
  transactionPin: string;
}

export interface VerifyWalletPayload {
  otp: string;
}

export interface FundWalletPayload {
  amount: number;
  paymentMethod: string;
}
