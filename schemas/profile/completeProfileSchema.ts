import { GENDER_TYPES } from "@/constants/enums";
import { z } from "zod";

export function createCompleteProfileSchema(role: "USER" | "HOST") {
  const usernameLabel = role === "HOST" ? "Host name" : "Username";

  return z.object({
    username: z
      .string()
      .min(3, `${usernameLabel} must be at least 3 characters`)
      .max(20, `${usernameLabel} must be less than 20 characters`)
      .regex(
        /^[a-zA-Z0-9_ ]+$/,
        `${usernameLabel} can only contain letters, numbers, spaces and underscores`
      ),

    phoneNumber: z
      .string()
      .transform((val) => val.replace(/\D/g, ""))
      .refine((val) => val.length === 10, {
        message: "Phone number must be 10 digits",
      }),

    gender: z.enum(GENDER_TYPES, {
      message: "Please select a gender",
    }),

    profileImage: z
      .instanceof(File, { message: "Please upload a profile image" })
      .refine(
        (file) => file.size <= 5 * 1024 * 1024,
        "Image must be less than 5MB"
      )
      .refine(
        (file) => file.type.startsWith("image/"),
        "File must be an image"
      ),
  });
}

export type CompleteProfileFormData = z.infer<
  ReturnType<typeof createCompleteProfileSchema>
>;
