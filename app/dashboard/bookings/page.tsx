"use client";
import { HostHeader } from "@/components/host/HostHeader";
import {
  BookingCard,
  type BookingStatus,
} from "@/components/shared/BookingCard";
import { Button } from "@/components/ui/Buttons";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { useMyBookings } from "@/hooks/useMyBookings";
import { getApiStatus, getUIStatus } from "@/utils/bookingHelpers";
import { Spinner } from "@/components/ui/Spinner";

export default function UserBookingsPage() {
  const [selectedStatus, setSelectedStatus] =
    useState<BookingStatus>("upcoming");

  // Fetch bookings from API
  const { data, isLoading, isError, error } = useMyBookings({
    status: getApiStatus(selectedStatus),
    page: 0,
    size: 20,
    sortBy: "createdAt",
    sortDirection: "DESC",
  });

  // Filter bookings based on selected status
  const filteredBookings =
    data?.data.bookings.filter(
      (booking) => getUIStatus(booking.status) === selectedStatus
    ) || [];

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

  const handleEndTrip = (bookingId: string) => {
    console.log("End trip:", bookingId);
    // TODO: API call to end trip
  };

  const handleMessage = (bookingId: string) => {
    console.log("Message customer:", bookingId);
    // TODO: Navigate to messages
  };

  const emptyStateConfig = {
    upcoming: {
      message:
        "You currently don't have any upcoming bookings. Get started by booking your first car",
      buttonText: "Browse Cars",
      buttonAction: () => console.log("Navigate to browse cars"),
    },
    ongoing: {
      message:
        "You don't have any ongoing bookings at the moment. Check back here when you pick up your rental.",
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
    <div
      className={clsx(
        "max-w-3xl mx-auto bg-white min-h-screen",
        filteredBookings.length > 0 && "pb-28"
      )}
    >
      <div className="sticky top-0 z-10 bg-white md:pt-2 md:px-10">
        <div className="px-4 pt-4 md:px-0 pb-0">
          <HostHeader />

          <section className="mt-4">
            <div className="grid grid-cols-3 border-b border-b-neutral-275">
              {(
                [
                  {
                    status: "upcoming",
                    label: "Upcoming",
                    indicatorClass: "bg-yellow-500",
                  },
                  {
                    status: "ongoing",
                    label: "Ongoing",
                    indicatorClass: "bg-orange-bright",
                  },
                  {
                    status: "completed",
                    label: "Completed",
                    indicatorClass: "bg-green-bright",
                  },
                ] as const
              ).map(({ status, label, indicatorClass }) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className="font-gilroy-medium text-neutral-475 relative py-4 cursor-pointer transition-colors hover:text-black"
                >
                  <span>{label}</span>
                  <div
                    className={clsx(
                      "absolute bottom-0 left-0 w-full h-[5px] rounded-tr-[240px] rounded-tl-[240px] transition-opacity",
                      indicatorClass,
                      selectedStatus === status ? "opacity-100" : "opacity-0"
                    )}
                  />
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>

      <section className="p-4 md:px-10 flex items-center justify-center">
        {isLoading ? (
          <div className="min-h-[calc(100vh-300px)] md:min-h-[calc(100vh-200px)] flex flex-col justify-center items-center">
            <Spinner />
            <p className="font-gilroy-medium text-sm text-neutral-475 mt-4">
              Loading bookings...
            </p>
          </div>
        ) : isError ? (
          <div className="min-h-[calc(100vh-300px)] md:min-h-[calc(100vh-200px)] flex flex-col justify-center items-center">
            <div className="relative w-[150px] h-[200px]">
              <Image
                src="/images/robots/sad-robot.webp"
                alt="Sad robot"
                fill
                priority
                quality={100}
                className="object-contain"
              />
            </div>
            <p className="font-gilroy-medium text-sm text-center max-w-100 px-4 text-neutral-475 mt-3">
              Failed to load bookings. Please try again.
            </p>
            <p className="font-gilroy-regular text-xs text-center max-w-100 px-4 text-red-500 mt-2">
              {error instanceof Error ? error.message : "Unknown error"}
            </p>
          </div>
        ) : filteredBookings.length > 0 ? (
          <div className="w-full">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="mt-6">
                <BookingCard
                  booking={booking}
                  onAccept={handleAccept}
                  onDecline={handleDecline}
                  onFindCar={handleFindCar}
                  onEndTrip={handleEndTrip}
                  onMessage={handleMessage}
                  variant="user"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="min-h-[calc(100vh-300px)] md:min-h-[calc(100vh-200px)] flex flex-col justify-center items-center">
            <div className="relative w-[150px] h-[200px]">
              <Image
                src="/images/robots/sad-robot.webp"
                alt="Sad and confused robot"
                fill
                priority
                quality={100}
                className="object-contain"
              />
            </div>

            <p className="font-gilroy-medium text-sm text-center max-w-100 px-4 text-neutral-475 mt-3">
              {emptyStateConfig[selectedStatus].message}
            </p>

            <div className="max-w-80 w-full mt-4">
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
