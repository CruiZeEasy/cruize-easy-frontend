// schemas/host/addCarSchema.ts
import { z } from "zod";

// Step 1: Vehicle Information
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

// Step 2: Vehicle Licenses
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

// Step 3: Rent Information
export const rentInformationSchema = z.object({
  rentType: z.enum(["SELF_DRIVE", "DRIVER"], {
    message: "Please select a rent type",
  }),
  rentPrice: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(1, "Rent price must be at least 1")
    .max(1000000, "Rent price is too high"),
  fuelPrice: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(0, "Fuel price cannot be negative")
    .max(100000, "Fuel price is too high"),
  transmission: z.enum(["MANUAL", "AUTOMATIC", "ELECTRIC"], {
    message: "Please select a transmission type",
  }),
  seats: z.string().refine((val) => ["1", "2", "3", "4"].includes(val), {
    message: "Please select number of seats",
  }),
});

// Step 4: Car Images
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

// Combined schema for all steps
export const addCarSchema = vehicleInformationSchema
  .extend(vehicleLicensesSchema.shape)
  .extend(rentInformationSchema.shape)
  .extend(carImagesSchema.shape);

export type VehicleInformationFormData = z.infer<
  typeof vehicleInformationSchema
>;
export type VehicleLicensesFormData = z.infer<typeof vehicleLicensesSchema>;
export type RentInformationFormData = z.infer<typeof rentInformationSchema>;
export type CarImagesFormData = z.infer<typeof carImagesSchema>;
export type AddCarFormData = z.infer<typeof addCarSchema>;
