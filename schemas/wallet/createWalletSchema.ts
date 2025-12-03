import { z } from "zod";

export const createWalletSchema = z
  .object({
    transactionPin: z
      .string()
      .min(5, "PIN must be 5 digits")
      .max(5, "PIN must be 5 digits")
      .regex(/^\d{5}$/, "PIN must contain only numbers"),

    confirmPin: z
      .string()
      .min(5, "PIN must be 5 digits")
      .max(5, "PIN must be 5 digits")
      .regex(/^\d{5}$/, "PIN must contain only numbers"),

    agree: z.boolean().refine((val) => val === true, {
      message: "You must agree to the Terms & Conditions",
    }),
  })
  .refine((data) => data.transactionPin === data.confirmPin, {
    message: "PINs do not match",
    path: ["confirmPin"],
  });

export type CreateWalletFormData = z.infer<typeof createWalletSchema>;
