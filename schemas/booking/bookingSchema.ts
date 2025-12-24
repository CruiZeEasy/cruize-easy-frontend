import { z } from "zod";

// export const bookingSchema = z
//   .object({
//     rentType: z.enum(["self-drive", "driver"]),
//     pickupDate: z.string().min(1, "Please select a pickup date"),
//     pickupTime: z.string().min(1, "Please select a pickup time"),
//     returnDate: z.string().min(1, "Please select a return date"),
//     returnTime: z.string().min(1, "Please select a return time"),
//   })
//   .refine(
//     (data) => {
//       // Ensure return date is after pickup date
//       const pickup = new Date(
//         `${data.pickupDate}T${convertTo24Hour(data.pickupTime)}`
//       );
//       const returnD = new Date(
//         `${data.returnDate}T${convertTo24Hour(data.returnTime)}`
//       );
//       return returnD > pickup;
//     },
//     {
//       message: "Return date and time must be after pickup date and time",
//       path: ["returnDate"],
//     }
//   );

// export type BookingFormData = z.infer<typeof bookingSchema>;

// // Helper to convert 12-hour to 24-hour format
// function convertTo24Hour(time12h: string): string {
//   const [time, period] = time12h.split(" ");
//   let [hours, minutes] = time.split(":");

//   if (period === "PM" && hours !== "12") {
//     hours = String(parseInt(hours) + 12);
//   } else if (period === "AM" && hours === "12") {
//     hours = "00";
//   }

//   return `${hours.padStart(2, "0")}:${minutes}:00`;
// }

export const bookingSchema = z.object({
  rentType: z.enum(["self-drive", "driver"]),
  pickupDate: z.string().min(1, "Pickup date is required"),
  pickupTime: z.string().min(1, "Pickup time is required"),
  returnDate: z.string().min(1, "Return date is required"),
  returnTime: z.string().min(1, "Return time is required"),
  dropoffSameAsPickup: z.boolean(),
  dropoffAddress: z.string().optional(),
  dropoffCity: z.string().optional(),
  dropoffState: z.string().optional(),
  dropoffCountry: z.string().optional(),
  dropoffPostalCode: z.string().optional(),
  dropoffLatitude: z.number().optional(),
  dropoffLongitude: z.number().optional(),
  dropoffNotes: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
