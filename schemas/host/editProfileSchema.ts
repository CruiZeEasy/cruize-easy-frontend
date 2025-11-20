import { z } from "zod";

export const editProfileSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  hostName: z
    .string()
    .min(3, "Host name must be at least 3 characters")
    .max(20, "Host name must be less than 20 characters")
    .regex(
      /^[a-zA-Z0-9_ ]+$/,
      "Host name can only contain letters, numbers, spaces and underscores"
    ),
  phoneNumber: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => val.length === 10, {
      message: "Phone number must be 10 digits",
    }),
});

export type EditProfileFormData = z.infer<typeof editProfileSchema>;
