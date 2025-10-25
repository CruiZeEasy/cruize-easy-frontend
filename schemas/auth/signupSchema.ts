import { z } from "zod";

export const signupSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain one uppercase letter")
    .regex(/[a-z]/, "Must contain one lowercase letter")
    .regex(/[0-9]/, "Must contain one number"),
  // .regex(/[^A-Za-z0-9]/, "Must contain one special character"),
});

export type SignupFormData = z.infer<typeof signupSchema>;
