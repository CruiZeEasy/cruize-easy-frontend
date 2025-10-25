// import { z } from "zod";

// export const completeProfileSchema = z.object({
//   username: z
//     .string()
//     .min(3, "Username must be at least 3 characters")
//     .max(20, "Username must be less than 20 characters")
//     .regex(
//       /^[a-zA-Z0-9_]+$/,
//       "Username can only contain letters, numbers, and underscores"
//     ),
//   phoneNumber: z
//     .string()
//     .transform((val) => val.replace(/\D/g, "")) // strip all non-digits
//     .refine((val) => val.length === 10, {
//       message: "Phone number must be 10 digits",
//     }),
//   gender: z.enum(["male", "female"], {
//     message: "Please select a gender",
//   }),
//   profileImage: z
//     .instanceof(File, { message: "Please upload a profile image" })
//     .optional()
//     .refine(
//       (file) => !file || file.size <= 5 * 1024 * 1024,
//       "Image must be less than 5MB"
//     )
//     .refine(
//       (file) => !file || file.type.startsWith("image/"),
//       "File must be an image"
//     ),
// });

// export type CompleteProfileFormData = z.infer<typeof completeProfileSchema>;

import { z } from "zod";
import { UserRoles } from "@/constants/roles";

export const completeProfileSchema = (role: UserRoles) =>
  z.object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be less than 20 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      ),
    phoneNumber: z
      .string()
      .transform((val) => val.replace(/\D/g, ""))
      .refine((val) => val.length === 10, {
        message: "Phone number must be 10 digits",
      }),
    gender: z.enum(["male", "female"], {
      message: "Please select a gender",
    }),
    profileImage:
      role === UserRoles.HOST
        ? z
            .instanceof(File, { message: "Please upload a profile image" })
            .refine(
              (file) => file.size <= 5 * 1024 * 1024,
              "Image must be less than 5MB"
            )
            .refine(
              (file) => file.type.startsWith("image/"),
              "File must be an image"
            )
        : z
            .instanceof(File)
            .optional()
            .refine(
              (file) => !file || file.size <= 5 * 1024 * 1024,
              "Image must be less than 5MB"
            )
            .refine(
              (file) => !file || file.type.startsWith("image/"),
              "File must be an image"
            ),
  });

export type CompleteProfileFormData = z.infer<
  ReturnType<typeof completeProfileSchema>
>;
