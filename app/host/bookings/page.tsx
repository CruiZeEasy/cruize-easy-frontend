"use client";
import { HostHeader } from "@/components/host/HostHeader";
import {
  BookingCard,
  type BookingStatus,
} from "@/components/host/bookings/BookingCard";
import { Button } from "@/components/ui/Buttons";
import { mockBookings } from "@/data/hostBookings";
import Image from "next/image";
import { useState } from "react";

export default function HostBookingsPage() {
  const [selectedStatus, setSelectedStatus] =
    useState<BookingStatus>("upcoming");

  // Filter bookings based on selected status
  const filteredBookings = mockBookings.filter(
    (booking) => booking.status === selectedStatus
  );

  const handleAccept = (bookingId: string) => {
    console.log("Accept booking:", bookingId);
    // TODO: API call to accept booking
  };

  const handleDecline = (bookingId: string) => {
    console.log("Decline booking:", bookingId);
    // TODO: API call to decline booking
  };

  const handleFindCar = (bookingId: string) => {
    console.log("Find car:", bookingId);
    // TODO: Navigate to map/tracking page
  };

  const handleMessage = (bookingId: string) => {
    console.log("Message customer:", bookingId);
    // TODO: Navigate to messages
  };

  const emptyStateConfig = {
    upcoming: {
      message:
        "You currently don't have any upcoming bookings. Get started by adding your first car",
      buttonText: "Add Car",
      buttonAction: () => console.log("Navigate to add car"),
    },
    ongoing: {
      message:
        "You don't have any ongoing bookings at the moment. Check back here when a customer picks up their rental.",
      buttonText: "View Upcoming",
      buttonAction: () => setSelectedStatus("upcoming"),
    },
    completed: {
      message:
        "You haven't completed any bookings yet. Once you complete your first rental, it will appear here.",
      buttonText: "View Upcoming",
      buttonAction: () => setSelectedStatus("upcoming"),
    },
  } as const;

  return (
    // pb-28
    <div className="max-w-2xl mx-auto">
      <div className="sticky top-0 z-10 bg-white md:pt-6">
        <div className="px-4 pt-4 md:px-0 pb-0">
          <HostHeader />

          <section className="mt-4">
            <div className="grid grid-cols-3 border-b border-b-neutral-275">
              {(
                [
                  {
                    status: "upcoming",
                    label: "Upcoming",
                    color: "yellow-500",
                  },
                  {
                    status: "ongoing",
                    label: "Ongoing",
                    color: "orange-bright",
                  },
                  {
                    status: "completed",
                    label: "Completed",
                    color: "green-bright",
                  },
                ] as const
              ).map(({ status, label, color }) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className="font-gilroy-medium text-neutral-475 relative py-4 cursor-pointer transition-colors hover:text-black"
                >
                  <span>{label}</span>
                  <div
                    className={`bg-${color} absolute bottom-0 left-0 w-full h-[5px] rounded-tr-[240px] rounded-tl-[240px] transition-opacity ${
                      selectedStatus === status ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>

      <section className="p-4 md:px-1 flex items-center justify-center">
        {filteredBookings.length > 0 ? (
          <div className="w-full">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="mt-5">
                <BookingCard
                  booking={booking}
                  onAccept={handleAccept}
                  onDecline={handleDecline}
                  onFindCar={handleFindCar}
                  onMessage={handleMessage}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="min-h-[calc(100vh-300px)] flex flex-col justify-center items-center">
            <div className="relative w-[150px] h-[200px] md:w-[150px] md:h-[200px]">
              <Image
                src="/images/robots/sad-robot.webp"
                alt="Sad and confused robot"
                fill
                priority
                quality={100}
                className="object-contain"
              />
            </div>

            <p className="font-gilroy-medium text-xs md:text-sm text-center max-w-[25rem] px-4 text-neutral-475 mt-2 md:mt-4">
              {emptyStateConfig[selectedStatus].message}
            </p>

            <div className="w-80 max-w-full mt-3 px-4">
              <Button
                variant="dark-primary"
                fontFamily="gilroy-medium"
                shadow="shadow-none"
                className="py-4 md:px-6 text-xs"
                fullWidth
                onClick={emptyStateConfig[selectedStatus].buttonAction}
              >
                {emptyStateConfig[selectedStatus].buttonText}
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
