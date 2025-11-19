import { RENT_TYPES, TRANSMISSION_TYPES } from "@/constants/enums";
import { z } from "zod";

export const vehicleInformationSchema = z.object({
  carName: z
    .string()
    .min(3, "Car name must be at least 3 characters")
    .max(50, "Car name must be less than 50 characters"),
  carBrand: z
    .string()
    .min(2, "Car brand must be at least 2 characters")
    .max(30, "Car brand must be less than 30 characters"),
  carDescription: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(500, "Description must be less than 500 characters"),
  carColor: z
    .string()
    .min(3, "Color must be at least 3 characters")
    .max(20, "Color must be less than 20 characters"),
});

export const vehicleLicensesSchema = z.object({
  plateNumber: z
    .string()
    .min(5, "Plate number must be at least 5 characters")
    .max(10, "Plate number must be less than 10 characters")
    .regex(/^[A-Z0-9-]+$/i, "Invalid plate number format"),
  carRegNo: z
    .string()
    .min(5, "Registration number must be at least 5 characters")
    .max(10, "Registration number must be less than 10 characters"),
  vehicleDocument: z
    .instanceof(File, { message: "Please upload vehicle document" })
    .refine(
      (file) => file.size <= 10 * 1024 * 1024,
      "PDF must be less than 10MB"
    )
    .refine((file) => file.type === "application/pdf", "File must be a PDF"),
  isTinted: z.boolean().optional(),
});

export const rentInformationSchema = z.object({
  rentType: z.enum(RENT_TYPES, {
    message: "Please select a rent type",
  }),
  rentPrice: z.coerce
    .number({ message: "Rent price must be a number" })
    .min(10000, "Rent price must be at least ₦10,000 per day")
    .max(1000000, "Rent price is too high") as z.ZodNumber,
  fuelPrice: z.coerce
    .number({ message: "Fuel price must be a number" })
    .min(1000, "Fuel price must be at least ₦1,000")
    .max(30000, "Fuel price is too high") as z.ZodNumber,
  transmission: z.enum(TRANSMISSION_TYPES, {
    message: "Please select a transmission type",
  }),
  seats: z.string().refine((val) => ["1", "2", "3", "4"].includes(val), {
    message: "Please select number of seats",
  }),
});

export const carImagesSchema = z.object({
  carImages: z
    .array(z.instanceof(File))
    .min(9, "Please upload at least 9 photos")
    .max(12, "Maximum 12 photos allowed")
    .refine(
      (files) => files.every((file) => file.size <= 5 * 1024 * 1024),
      "Each image must be less than 5MB"
    )
    .refine(
      (files) => files.every((file) => file.type.startsWith("image/")),
      "All files must be images"
    ),
  confirmPhotos: z.boolean().refine((val) => val === true, {
    message: "Please confirm that your photos are clear and accurate",
  }),
});

export const workingHoursSchema = z.object({
  workingHours: z
    .array(
      z.object({
        day: z.string(),
        isActive: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      })
    )
    .refine(
      (hours) => hours.some((h) => h.isActive),
      "Please select at least one working day for car availability"
    ),
});

// Combined schema
export const addCarSchema = z.object({
  ...vehicleInformationSchema.shape,
  ...vehicleLicensesSchema.shape,
  ...rentInformationSchema.shape,
  ...carImagesSchema.shape,
  ...workingHoursSchema.shape,
});

export type AddCarFormData = z.infer<typeof addCarSchema>;
