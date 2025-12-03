import { z } from "zod";

export const fundWalletSchema = z.object({
  amount: z.coerce
    .number({ message: "Rent price must be a number" })
    .min(100, "Amount must be at least ₦100")
    .max(5000000, "Amount cannot exceed ₦5,000,000") as z.ZodNumber,

  paymentMethod: z.enum(["PAYSTACK"], {
    // required_error: "Please select a payment method",
    message: "Please select a payment method",
  }),
});

export type FundWalletFormData = z.infer<typeof fundWalletSchema>;
