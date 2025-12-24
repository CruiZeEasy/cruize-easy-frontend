// "use client";

// import { HostHeader } from "@/components/host/HostHeader";
// import { Button } from "@/components/ui/Buttons";
// import { DatePicker } from "@/components/ui/DatePicker";
// import { TimePickerWrapper } from "@/components/ui/TimePickerWrapper";
// import { LocationPicker } from "@/components/shared/LocationPicker";
// import Image from "next/image";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useState } from "react";
// import { MapPin, Clock, ChevronDown, ChevronUp } from "lucide-react";
// import { z } from "zod";
// import { RentTypeToggle } from "@/components/dashboard/listings/RentTypeToggle";
// import { FormCheckbox } from "@/components/ui/FormCheckbox";

// const bookingSchema = z.object({
//   rentType: z.enum(["self-drive", "driver"]),
//   pickupDate: z.string().min(1, "Pickup date is required"),
//   pickupTime: z.string().min(1, "Pickup time is required"),
//   returnDate: z.string().min(1, "Return date is required"),
//   returnTime: z.string().min(1, "Return time is required"),
//   dropoffSameAsPickup: z.boolean(),
//   dropoffAddress: z.string().optional(),
//   dropoffCity: z.string().optional(),
//   dropoffState: z.string().optional(),
//   dropoffCountry: z.string().optional(),
//   dropoffPostalCode: z.string().optional(),
//   dropoffLatitude: z.number().optional(),
//   dropoffLongitude: z.number().optional(),
//   dropoffNotes: z.string().optional(),
// });

// type BookingFormData = z.infer<typeof bookingSchema>;

// // Mock data - replace with useVehicleDetails
// const workingHours = [
//   {
//     day: "Monday",
//     isActive: false,
//     startTime: "09:00 AM",
//     endTime: "09:00 PM",
//   },
//   {
//     day: "Tuesday",
//     isActive: true,
//     startTime: "09:00 AM",
//     endTime: "09:00 PM",
//   },
//   {
//     day: "Wednesday",
//     isActive: false,
//     startTime: "09:00 AM",
//     endTime: "09:00 PM",
//   },
//   {
//     day: "Thursday",
//     isActive: false,
//     startTime: "09:00 AM",
//     endTime: "09:00 PM",
//   },
//   {
//     day: "Friday",
//     isActive: false,
//     startTime: "09:00 AM",
//     endTime: "09:00 PM",
//   },
//   {
//     day: "Saturday",
//     isActive: true,
//     startTime: "09:00 AM",
//     endTime: "09:00 PM",
//   },
//   {
//     day: "Sunday",
//     isActive: false,
//     startTime: "09:00 AM",
//     endTime: "09:00 PM",
//   },
// ];

// const mockPickupLocation = {
//   address: "Lekki - Ikoyi Link Brg, Lagos 106104, Lagos, Nigeria",
//   notes: "Around that cold stone pizza side.",
// };

// export default function BookingDetailsPage() {
//   const [showWorkingHours, setShowWorkingHours] = useState(false);

//   const {
//     control,
//     handleSubmit,
//     watch,
//     setValue,
//     formState: { errors },
//   } = useForm<BookingFormData>({
//     resolver: zodResolver(bookingSchema),
//     defaultValues: {
//       rentType: "self-drive",
//       pickupDate: "",
//       pickupTime: "09:00 AM",
//       returnDate: "",
//       returnTime: "09:00 AM",
//       dropoffSameAsPickup: true,
//       dropoffAddress: "",
//       dropoffNotes: "",
//     },
//   });

//   const pickupDate = watch("pickupDate");
//   const dropoffSameAsPickup = watch("dropoffSameAsPickup");
//   const today = new Date().toISOString().split("T")[0];

//   const onSubmit = (data: BookingFormData) => {
//     console.log("Booking data:", data);
//   };

//   return (
//     <>
//       <div className="pb-28">
//         <div className="sticky top-0 z-40 bg-white lg:pt-2 lg:mx-12 md:border-b md:border-b-neutral-275 shadow-sm md:shadow-none">
//           <div className="px-4 py-4 lg:px-0">
//             <HostHeader />
//           </div>
//         </div>

//         <div className="px-4 lg:px-12 lg:py-4 mt-8 lg:mt-10">
//           <section className="grid lg:grid-cols-2 gap-x-8">
//             {/* Left Column */}
//             <div className="space-y-6">
//               <div className="space-y-4 bg-white md:p-4 rounded-[20px]">
//                 <div className="relative w-full h-[278px]">
//                   <Image
//                     src={`/images/cars/1.webp`}
//                     fill
//                     alt={`car`}
//                     quality={100}
//                     className="object-cover object-center rounded-[20px]"
//                   />
//                 </div>
//                 <span className="font-gilroy-bold">GLE AMG 63S</span>
//               </div>

//               {/* Pickup Location */}
//               <div className="bg-white rounded-[20px] md:p-4">
//                 <div className="flex items-start gap-3">
//                   <MapPin className="w-5 h-5 text-primary-dark mt-1 shrink-0" />
//                   <div className="flex-1">
//                     <h3 className="font-gilroy-bold text-base mb-2">
//                       Pickup Location
//                     </h3>
//                     <p className="font-gilroy-medium text-neutral-475 text-sm">
//                       {mockPickupLocation.address}
//                     </p>
//                     {mockPickupLocation.notes && (
//                       <p className="font-gilroy-medium text-neutral-450 text-sm mt-2 italic">
//                         Note: {mockPickupLocation.notes}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Working Hours */}
//               <div className="bg-white rounded-[20px] md:p-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowWorkingHours(!showWorkingHours)}
//                   className="flex items-center justify-between w-full cursor-pointer"
//                 >
//                   <div className="flex items-center gap-3">
//                     <Clock className="w-5 h-5 text-primary-dark" />
//                     <h3 className="font-gilroy-bold text-base">
//                       Working Hours
//                     </h3>
//                   </div>
//                   {showWorkingHours ? (
//                     <ChevronUp className="w-5 h-5 text-neutral-450" />
//                   ) : (
//                     <ChevronDown className="w-5 h-5 text-neutral-450" />
//                   )}
//                 </button>

//                 {showWorkingHours && (
//                   <div className="mt-4 space-y-3 pt-4 border-t border-neutral-275">
//                     {workingHours.map((schedule) => (
//                       <div
//                         key={schedule.day}
//                         className="flex justify-between text-sm font-gilroy-medium"
//                       >
//                         <span className="text-neutral-430">{schedule.day}</span>
//                         {schedule.isActive ? (
//                           <span className="text-black">
//                             {schedule.startTime} - {schedule.endTime}
//                           </span>
//                         ) : (
//                           <span className="text-neutral-475 italic">
//                             Closed
//                           </span>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Right Column */}
//             <div className="bg-white rounded-[20px] mt-6 lg:mt-0 md:p-4 flex flex-col justify-between">
//               <Controller
//                 name="rentType"
//                 control={control}
//                 render={({ field }) => (
//                   <RentTypeToggle
//                     value={field.value}
//                     onChange={field.onChange}
//                   />
//                 )}
//               />

//               <div className="space-y-6 mt-6">
//                 {/* Pickup Date and Time */}
//                 <div>
//                   <span className="font-gilroy-medium text-sm">
//                     Pick up Date and Time
//                   </span>
//                   <div className="mt-2 flex items-center justify-between gap-4">
//                     <Controller
//                       name="pickupDate"
//                       control={control}
//                       render={({ field }) => (
//                         <DatePicker
//                           value={field.value}
//                           onChange={field.onChange}
//                           workingHours={workingHours}
//                           minDate={today}
//                           error={errors.pickupDate?.message}
//                         />
//                       )}
//                     />

//                     <span className="hidden md:inline-block w-12 text-center text-sm font-gilroy-medium text-neutral-450">
//                       From
//                     </span>

//                     <Controller
//                       name="pickupTime"
//                       control={control}
//                       render={({ field }) => (
//                         <TimePickerWrapper
//                           value={field.value}
//                           onChange={field.onChange}
//                           selectedDate={pickupDate}
//                           workingHours={workingHours}
//                           error={errors.pickupTime?.message}
//                         />
//                       )}
//                     />
//                   </div>
//                 </div>

//                 {/* Return Date and Time */}
//                 <div>
//                   <span className="font-gilroy-medium text-sm">
//                     Return Date and Time
//                   </span>
//                   <div className="mt-2 flex items-center justify-between gap-4">
//                     <Controller
//                       name="returnDate"
//                       control={control}
//                       render={({ field }) => (
//                         <DatePicker
//                           value={field.value}
//                           onChange={field.onChange}
//                           workingHours={workingHours}
//                           minDate={pickupDate || today}
//                           error={errors.returnDate?.message}
//                         />
//                       )}
//                     />

//                     <span className="hidden md:inline-block w-12 text-center text-sm font-gilroy-medium text-neutral-450">
//                       To
//                     </span>

//                     <Controller
//                       name="returnTime"
//                       control={control}
//                       render={({ field }) => (
//                         <TimePickerWrapper
//                           value={field.value}
//                           onChange={field.onChange}
//                           selectedDate={watch("returnDate")}
//                           workingHours={workingHours}
//                           error={errors.returnTime?.message}
//                         />
//                       )}
//                     />
//                   </div>
//                 </div>

//                 {/* Dropoff Location */}
//                 <div>
//                   <span className="font-gilroy-medium text-sm block mb-2">
//                     Dropoff Location
//                   </span>

//                   <Controller
//                     name="dropoffSameAsPickup"
//                     control={control}
//                     render={({ field }) => (
//                       <FormCheckbox
//                         id="dropoffSameAsPickup"
//                         label="Same as pickup location"
//                         labelFontFamily="gilroy-medium"
//                         labelVariant="light"
//                         checked={field.value}
//                         onChange={(e) => field.onChange(e.target.checked)}
//                         className="mb-4"
//                       />
//                     )}
//                   />

//                   {!dropoffSameAsPickup && (
//                     <div className="space-y-4">
//                       <LocationPicker
//                         label=""
//                         placeholder="Enter dropoff address"
//                         value={
//                           watch("dropoffLatitude")
//                             ? {
//                                 address: watch("dropoffAddress") || "",
//                                 latitude: watch("dropoffLatitude") || 0,
//                                 longitude: watch("dropoffLongitude") || 0,
//                               }
//                             : undefined
//                         }
//                         notes={watch("dropoffNotes")}
//                         onNotesChange={(notes) =>
//                           setValue("dropoffNotes", notes)
//                         }
//                         onLocationSelect={(location) => {
//                           setValue("dropoffAddress", location.address);
//                           setValue("dropoffCity", location.city);
//                           setValue("dropoffState", location.state);
//                           setValue("dropoffCountry", location.country);
//                           setValue("dropoffPostalCode", location.postalCode);
//                           setValue("dropoffLatitude", location.latitude);
//                           setValue("dropoffLongitude", location.longitude);
//                         }}
//                       />
//                     </div>
//                   )}
//                 </div>

//                 <div className="mt-12 lg:mt-0">
//                   <Button
//                     type="button"
//                     onClick={handleSubmit(onSubmit)}
//                     variant="dark-primary"
//                     fontFamily="gilroy-medium"
//                     shadow="shadow-none"
//                     fullWidth
//                   >
//                     Proceed to Checkout
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";

import { HostHeader } from "@/components/host/HostHeader";
import { Button } from "@/components/ui/Buttons";
import { DatePicker } from "@/components/ui/DatePicker";
import { TimePickerWrapper } from "@/components/ui/TimePickerWrapper";
import { LocationPicker } from "@/components/shared/LocationPicker";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { MapPin, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { z } from "zod";
import { RentTypeToggle } from "@/components/dashboard/listings/RentTypeToggle";
import { FormCheckbox } from "@/components/ui/FormCheckbox";

// Utility function to combine date and time into ISO format
const combineDateAndTime = (date: string, time: string): string => {
  // date: "2025-12-24"
  // time: "09:00 AM"

  // Parse the time
  const [timeStr, meridiem] = time.split(" ");
  const [hours, minutes] = timeStr.split(":").map(Number);

  // Convert to 24-hour format
  let hour24 = hours;
  if (meridiem === "PM" && hours !== 12) hour24 += 12;
  if (meridiem === "AM" && hours === 12) hour24 = 0;

  // Create a date object in local timezone
  const dateTime = new Date(date);
  dateTime.setHours(hour24, minutes, 0, 0);

  // Convert to ISO string (automatically converts to UTC)
  return dateTime.toISOString();
};

const bookingSchema = z
  .object({
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
  })
  .refine(
    (data) => {
      // Only validate if all required fields are present
      if (
        !data.pickupDate ||
        !data.pickupTime ||
        !data.returnDate ||
        !data.returnTime
      ) {
        return true; // Let the individual field validations handle empty fields
      }

      // Ensure pickup is before return
      const pickup = new Date(
        combineDateAndTime(data.pickupDate, data.pickupTime)
      );
      const returnDt = new Date(
        combineDateAndTime(data.returnDate, data.returnTime)
      );
      return pickup < returnDt;
    },
    {
      message: "Return date/time must be after pickup date/time",
      path: ["returnDate"],
    }
  );

type BookingFormData = z.infer<typeof bookingSchema>;

// Mock data - replace with useVehicleDetails
const workingHours = [
  {
    day: "Monday",
    isActive: false,
    startTime: "09:00 AM",
    endTime: "09:00 PM",
  },
  {
    day: "Tuesday",
    isActive: true,
    startTime: "09:00 AM",
    endTime: "09:00 PM",
  },
  {
    day: "Wednesday",
    isActive: false,
    startTime: "09:00 AM",
    endTime: "09:00 PM",
  },
  {
    day: "Thursday",
    isActive: false,
    startTime: "09:00 AM",
    endTime: "09:00 PM",
  },
  {
    day: "Friday",
    isActive: false,
    startTime: "09:00 AM",
    endTime: "09:00 PM",
  },
  {
    day: "Saturday",
    isActive: true,
    startTime: "09:00 AM",
    endTime: "09:00 PM",
  },
  {
    day: "Sunday",
    isActive: false,
    startTime: "09:00 AM",
    endTime: "09:00 PM",
  },
];

const mockPickupLocation = {
  address: "Lekki - Ikoyi Link Brg, Lagos 106104, Lagos, Nigeria",
  notes: "Around that cold stone pizza side.",
};

export default function BookingDetailsPage() {
  const [showWorkingHours, setShowWorkingHours] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      rentType: "self-drive",
      pickupDate: "",
      pickupTime: "09:00 AM",
      returnDate: "",
      returnTime: "09:00 AM",
      dropoffSameAsPickup: true,
      dropoffAddress: "",
      dropoffNotes: "",
    },
  });

  const pickupDate = watch("pickupDate");
  const dropoffSameAsPickup = watch("dropoffSameAsPickup");
  const today = new Date().toISOString().split("T")[0];

  const onSubmit = (data: BookingFormData) => {
    // Prepare the payload for the backend
    const payload = {
      vehicleId: "vehicle123", // TODO: Get from route params or props
      rentType: data.rentType, // TODO: Backend might need this - waiting for confirmation
      startDateTime: combineDateAndTime(data.pickupDate, data.pickupTime),
      endDateTime: combineDateAndTime(data.returnDate, data.returnTime),
      dropOffLocation: data.dropoffSameAsPickup
        ? null
        : {
            address: data.dropoffAddress || "",
            city: data.dropoffCity || "",
            state: data.dropoffState || "",
            country: data.dropoffCountry || "",
            postalCode: data.dropoffPostalCode || "",
            coordinates: {
              x: data.dropoffLongitude || 0,
              y: data.dropoffLatitude || 0,
              type: "Point",
              coordinates: [
                data.dropoffLongitude || 0,
                data.dropoffLatitude || 0,
              ],
            },
            notes: data.dropoffNotes || "",
            latitude: data.dropoffLatitude || 0,
            longitude: data.dropoffLongitude || 0,
          },
      deliveryRequested: false, // TODO: Might need to add this as a form field
      idempotencyKey: `booking_${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 15)}`,
    };

    console.log("=== BOOKING PAYLOAD ===");
    console.log(JSON.stringify(payload, null, 2));
    console.log("======================");

    // TODO: Send to backend when ready
    // await bookingApi.createBooking(payload);
  };

  return (
    <>
      <div className="pb-28">
        <div className="sticky top-0 z-40 bg-white lg:pt-2 lg:mx-12 md:border-b md:border-b-neutral-275 shadow-sm md:shadow-none">
          <div className="px-4 py-4 lg:px-0">
            <HostHeader />
          </div>
        </div>

        <div className="px-4 lg:px-12 lg:py-4 mt-8 lg:mt-10">
          <section className="grid lg:grid-cols-2 gap-x-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="space-y-4 bg-white md:p-4 rounded-[20px]">
                <div className="relative w-full h-[278px]">
                  <Image
                    src={`/images/cars/1.webp`}
                    fill
                    alt={`car`}
                    quality={100}
                    className="object-cover object-center rounded-[20px]"
                  />
                </div>
                <span className="font-gilroy-bold">GLE AMG 63S</span>
              </div>

              {/* Pickup Location */}
              <div className="bg-white rounded-[20px] md:p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-dark mt-1 shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-gilroy-bold text-base mb-2">
                      Pickup Location
                    </h3>
                    <p className="font-gilroy-medium text-neutral-475 text-sm">
                      {mockPickupLocation.address}
                    </p>
                    {mockPickupLocation.notes && (
                      <p className="font-gilroy-medium text-neutral-450 text-sm mt-2 italic">
                        Note: {mockPickupLocation.notes}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-white rounded-[20px] md:p-4">
                <button
                  type="button"
                  onClick={() => setShowWorkingHours(!showWorkingHours)}
                  className="flex items-center justify-between w-full cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary-dark" />
                    <h3 className="font-gilroy-bold text-base">
                      Working Hours
                    </h3>
                  </div>
                  {showWorkingHours ? (
                    <ChevronUp className="w-5 h-5 text-neutral-450" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-neutral-450" />
                  )}
                </button>

                {showWorkingHours && (
                  <div className="mt-4 space-y-3 pt-4 border-t border-neutral-275">
                    {workingHours.map((schedule) => (
                      <div
                        key={schedule.day}
                        className="flex justify-between text-sm font-gilroy-medium"
                      >
                        <span className="text-neutral-430">{schedule.day}</span>
                        {schedule.isActive ? (
                          <span className="text-black">
                            {schedule.startTime} - {schedule.endTime}
                          </span>
                        ) : (
                          <span className="text-neutral-475 italic">
                            Closed
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="bg-white rounded-[20px] mt-6 lg:mt-0 md:p-4 flex flex-col justify-between">
              <Controller
                name="rentType"
                control={control}
                render={({ field }) => (
                  <RentTypeToggle
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />

              <div className="space-y-6 mt-6">
                {/* Pickup Date and Time */}
                <div>
                  <span className="font-gilroy-medium text-sm">
                    Pick up Date and Time
                  </span>
                  <div className="mt-2 flex items-center justify-between gap-4">
                    <Controller
                      name="pickupDate"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          value={field.value}
                          onChange={field.onChange}
                          workingHours={workingHours}
                          minDate={today}
                          error={errors.pickupDate?.message}
                        />
                      )}
                    />

                    <span className="hidden md:inline-block w-12 text-center text-sm font-gilroy-medium text-neutral-450">
                      From
                    </span>

                    <Controller
                      name="pickupTime"
                      control={control}
                      render={({ field }) => (
                        <TimePickerWrapper
                          value={field.value}
                          onChange={field.onChange}
                          selectedDate={pickupDate}
                          workingHours={workingHours}
                          error={errors.pickupTime?.message}
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Return Date and Time */}
                <div>
                  <span className="font-gilroy-medium text-sm">
                    Return Date and Time
                  </span>
                  <div className="mt-2 flex items-center justify-between gap-4">
                    <Controller
                      name="returnDate"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          value={field.value}
                          onChange={field.onChange}
                          workingHours={workingHours}
                          minDate={pickupDate || today}
                          error={errors.returnDate?.message}
                        />
                      )}
                    />

                    <span className="hidden md:inline-block w-12 text-center text-sm font-gilroy-medium text-neutral-450">
                      To
                    </span>

                    <Controller
                      name="returnTime"
                      control={control}
                      render={({ field }) => (
                        <TimePickerWrapper
                          value={field.value}
                          onChange={field.onChange}
                          selectedDate={watch("returnDate")}
                          workingHours={workingHours}
                          error={errors.returnTime?.message}
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Dropoff Location */}
                <div>
                  <span className="font-gilroy-medium text-sm block mb-2">
                    Dropoff Location
                  </span>

                  <Controller
                    name="dropoffSameAsPickup"
                    control={control}
                    render={({ field }) => (
                      <FormCheckbox
                        id="dropoffSameAsPickup"
                        label="Same as pickup location"
                        labelFontFamily="gilroy-medium"
                        labelVariant="light"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="mb-4"
                      />
                    )}
                  />

                  {!dropoffSameAsPickup && (
                    <div className="space-y-4">
                      <LocationPicker
                        label=""
                        placeholder="Enter dropoff address"
                        value={
                          watch("dropoffLatitude")
                            ? {
                                address: watch("dropoffAddress") || "",
                                latitude: watch("dropoffLatitude") || 0,
                                longitude: watch("dropoffLongitude") || 0,
                              }
                            : undefined
                        }
                        notes={watch("dropoffNotes")}
                        onNotesChange={(notes) =>
                          setValue("dropoffNotes", notes)
                        }
                        onLocationSelect={(location) => {
                          setValue("dropoffAddress", location.address);
                          setValue("dropoffCity", location.city);
                          setValue("dropoffState", location.state);
                          setValue("dropoffCountry", location.country);
                          setValue("dropoffPostalCode", location.postalCode);
                          setValue("dropoffLatitude", location.latitude);
                          setValue("dropoffLongitude", location.longitude);
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="mt-12 lg:mt-0">
                  <Button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    variant="dark-primary"
                    fontFamily="gilroy-medium"
                    shadow="shadow-none"
                    fullWidth
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
