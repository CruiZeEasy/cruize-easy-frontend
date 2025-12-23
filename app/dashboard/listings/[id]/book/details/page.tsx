// "use client";
// import { RentTypeToggle } from "@/components/dashboard/listings/RentTypeToggle";
// import { HostHeader } from "@/components/host/HostHeader";
// import { Button } from "@/components/ui/Buttons";
// import { DateTimePicker } from "@/components/ui/DateTimePicker";
// import Image from "next/image";
// import { useState } from "react";

// export default function BookingDetailsPage() {
//   const [rentType, setRentType] = useState<"self-drive" | "driver">(
//     "self-drive"
//   );
//   const [pickupDate, setPickupDate] = useState("");
//   const [pickupTime, setPickupTime] = useState("00:00");
//   const [returnDate, setReturnDate] = useState("");
//   const [returnTime, setReturnTime] = useState("00:00");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log({
//       rentType,
//       pickupDate,
//       pickupTime,
//       returnDate,
//       returnTime,
//     });
//     // Add your booking logic here
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
//           <section className="grid grid-cols-2 gap-x-8">
//             <div className="space-y-6">
//               <div className="space-y-4 bg-white p-4 rounded-[20px]">
//                 <div className="relative w-full h-[278px]">
//                   <Image
//                     src={`/images/cars/1.webp`}
//                     fill
//                     alt={`1 car`}
//                     quality={100}
//                     className="object-cover object-center rounded-[20px]"
//                   />
//                 </div>

//                 <span className="font-gilroy-bold">GLE AMG 63S </span>
//               </div>

//               <div className="grid grid-cols-2 gap-x-4 bg-white p-4 rounded-[20px]">
//                 <div className="relative w-full h-[247px]">
//                   <Image
//                     src={`/images/cars/2.webp`}
//                     fill
//                     alt={`2 car`}
//                     quality={100}
//                     className="object-cover object-center rounded-[20px]"
//                   />
//                 </div>
//                 <div className="relative w-full h-[247px]">
//                   <Image
//                     src={`/images/cars/2.webp`}
//                     fill
//                     alt={`2 car`}
//                     quality={100}
//                     className="object-cover object-center rounded-[20px]"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Right Column */}
//             <div className="bg-white rounded-[20px] p-4 flex flex-col justify-between">
//               <RentTypeToggle value={rentType} onChange={setRentType} />

//               <div className="space-y-6">
//                 {/* Pickup Date and Time */}
//                 <div>
//                   <span className="font-gilroy-medium text-sm">
//                     Pick up Date and Time
//                   </span>
//                   <div className="mt-2 flex items-center justify-between gap-4">
//                     <div className="flex flex-1 items-center justify-between border-[1.1px] border-neutral-150 transition-all duration-200 hover:border-primary-dark rounded-lg px-4 py-3 cursor-pointer">
//                       <span>Wed Jan 2024</span>
//                       <Image
//                         src="/images/icons/calendar.svg"
//                         alt="Calendar Icon"
//                         width={24}
//                         height={24}
//                       />
//                     </div>

//                     <span className="w-12 text-center">From</span>

//                     <div className="flex flex-1 items-center justify-between border-[1.1px] border-neutral-150 transition-all duration-200 hover:border-primary-dark rounded-lg px-4 py-3 cursor-pointer">
//                       <span>00:00</span>
//                       <Image
//                         src="/images/icons/timer.svg"
//                         alt="Timer Icon"
//                         width={24}
//                         height={24}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Return Date and Time  */}
//                 <div>
//                   <span className="font-gilroy-medium text-sm">
//                     Return Date and Time
//                   </span>
//                   <div className="mt-2 flex items-center justify-between gap-4">
//                     <div className="flex flex-1 items-center justify-between border-[1.1px] border-neutral-150 transition-all duration-200 hover:border-primary-dark rounded-lg px-4 py-3 cursor-pointer">
//                       <span>Wed Jan 2024</span>
//                       <Image
//                         src="/images/icons/calendar.svg"
//                         alt="Calendar Icon"
//                         width={24}
//                         height={24}
//                       />
//                     </div>

//                     <span className="w-12 text-center">To</span>

//                     <div className="flex flex-1 items-center justify-between border-[1.1px] border-neutral-150 transition-all duration-200 hover:border-primary-dark rounded-lg px-4 py-3 cursor-pointer">
//                       <span>00:00</span>
//                       <Image
//                         src="/images/icons/timer.svg"
//                         alt="Timer Icon"
//                         width={24}
//                         height={24}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-12 lg:mt-0">
//                   <Button
//                     variant="dark-primary"
//                     fontFamily="gilroy-medium"
//                     shadow="shadow-none"
//                     fullWidth
//                   >
//                     Book Now
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

import { RentTypeToggle } from "@/components/dashboard/listings/RentTypeToggle";
import { HostHeader } from "@/components/host/HostHeader";
import { Button } from "@/components/ui/Buttons";
import { DatePicker } from "@/components/ui/DatePicker";
import { TimePickerWrapper } from "@/components/ui/TimePickerWrapper";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingFormData, bookingSchema } from "@/schemas/booking/booking";

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

export default function BookingDetailsPage() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      rentType: "self-drive",
      pickupDate: "",
      pickupTime: "09:00 AM",
      returnDate: "",
      returnTime: "09:00 AM",
    },
  });

  const pickupDate = watch("pickupDate");
  const today = new Date().toISOString().split("T")[0];

  const onSubmit = (data: BookingFormData) => {
    console.log("Booking data:", data);
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className="grid lg:grid-cols-2 gap-x-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="space-y-4 bg-white md:p-4 rounded-[20px]">
                  <div className="relative w-full h-[278px]">
                    <Image
                      src={`/images/cars/1.webp`}
                      fill
                      alt={`1 car`}
                      quality={100}
                      className="object-cover object-center rounded-[20px]"
                    />
                  </div>
                  <span className="font-gilroy-bold">GLE AMG 63S</span>
                </div>

                <div className="lg:grid hidden grid-cols-2 gap-x-4 bg-white lg:p-4 rounded-[20px]">
                  <div className="relative w-full h-[247px]">
                    <Image
                      src={`/images/cars/2.webp`}
                      fill
                      alt={`2 car`}
                      quality={100}
                      className="object-cover object-center rounded-[20px]"
                    />
                  </div>
                  <div className="relative w-full h-[247px]">
                    <Image
                      src={`/images/cars/2.webp`}
                      fill
                      alt={`2 car`}
                      quality={100}
                      className="object-cover object-center rounded-[20px]"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="bg-white rounded-[20px] md:p-4 flex flex-col justify-between">
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

                <div className="space-y-6 mt-6 lg:mt-0">
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

                  <div className="mt-12 lg:mt-0">
                    <Button
                      type="submit"
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
          </form>
        </div>
      </div>
    </>
  );
}
