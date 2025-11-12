import { z } from "zod";

// Step 1: Vehicle Information
export const vehicleInformationSchema = z.object({
  carName: z
    .string()
    .min(2, "Car name must be at least 2 characters")
    .max(50, "Car name must be less than 50 characters"),
  carBrand: z
    .string()
    .min(2, "Car brand must be at least 2 characters")
    .max(30, "Car brand must be less than 30 characters"),
  carDescription: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  carColor: z
    .string()
    .min(2, "Car color must be at least 2 characters")
    .max(20, "Car color must be less than 20 characters"),
});

// Step 2: Vehicle Licenses
export const vehicleLicensesSchema = z.object({
  plateNumber: z
    .string()
    .min(3, "Plate number is required")
    .max(20, "Plate number must be less than 20 characters")
    .regex(
      /^[A-Z0-9\-\s]+$/i,
      "Plate number can only contain letters, numbers, hyphens, and spaces"
    ),
  carRegNo: z
    .string()
    .min(3, "Registration number is required")
    .max(30, "Registration number must be less than 30 characters"),
  vehicleDocument: z
    .instanceof(File, { message: "Please upload vehicle document" })
    .refine(
      (file) => file.size <= 10 * 1024 * 1024,
      "Document must be less than 10MB"
    )
    .refine(
      (file) =>
        file.type.startsWith("image/") || file.type === "application/pdf",
      "File must be an image or PDF"
    ),
  isTinted: z.boolean().default(false),
});

// Step 3: Rent Information
export const rentInformationSchema = z.object({
  rentType: z.enum(["self-drive", "driver"], {
    message: "Please select a rent type",
  }),
  rentPrice: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Rent price must be a positive number",
    }),
  fuelPrice: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Fuel price must be a positive number",
    }),
  transmission: z.enum(["manual", "automatic", "electric"], {
    message: "Please select a transmission type",
  }),
  seats: z.enum(["1", "2", "3", "4"], {
    message: "Please select number of seats",
  }),
});

// Step 4: Car Images
export const carImagesSchema = z.object({
  frontImage: z
    .instanceof(File, { message: "Please upload front image" })
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Image must be less than 5MB"
    )
    .refine((file) => file.type.startsWith("image/"), "File must be an image"),
  backImage: z
    .instanceof(File, { message: "Please upload back image" })
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Image must be less than 5MB"
    )
    .refine((file) => file.type.startsWith("image/"), "File must be an image"),
  leftImage: z
    .instanceof(File, { message: "Please upload left image" })
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Image must be less than 5MB"
    )
    .refine((file) => file.type.startsWith("image/"), "File must be an image"),
  rightImage: z
    .instanceof(File, { message: "Please upload right image" })
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Image must be less than 5MB"
    )
    .refine((file) => file.type.startsWith("image/"), "File must be an image"),
});

// Combined schema for all steps (optional - for final submission)
export const addCarSchema = z.object({
  ...vehicleInformationSchema.shape,
  ...vehicleLicensesSchema.shape,
  ...rentInformationSchema.shape,
  ...carImagesSchema.shape,
});

// Type exports
export type VehicleInformationFormData = z.infer<
  typeof vehicleInformationSchema
>;
export type VehicleLicensesFormData = z.infer<typeof vehicleLicensesSchema>;
export type RentInformationFormData = z.infer<typeof rentInformationSchema>;
export type CarImagesFormData = z.infer<typeof carImagesSchema>;
export type AddCarFormData = z.infer<typeof addCarSchema>;
