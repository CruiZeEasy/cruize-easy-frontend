"use client";
import { HostHeader } from "@/components/host/HostHeader";
import {
  BookingCard,
  type BookingStatus,
} from "@/components/host/bookings/BookingCard";
import { mockBookings } from "@/data/hostBookings";
import { useState } from "react";

export default function HostBookingsPage() {
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus | "all">(
    "upcoming"
  );

  // Filter bookings based on selected status
  const filteredBookings =
    selectedStatus === "all"
      ? mockBookings
      : mockBookings.filter((booking) => booking.status === selectedStatus);

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

  return (
    <div className="pb-28 max-w-2xl mx-auto">
      <div className="sticky top-0 z-10 bg-white md:pt-6">
        <div className=" px-4 py-4 md:px-0 md:pb-0 ">
          <HostHeader />

          <section className="mt-4">
            <div className="grid grid-cols-3 border-b border-b-neutral-275 ">
              <button className="font-gilroy-medium text-neutral-475 relative py-4 cursor-pointer">
                <span>Upcoming</span>
                <div className="bg-yellow-500 absolute bottom-0 left-0 w-full h-[5px] rounded-tr-[240px] rounded-tl-[240px]" />
              </button>
              <button className="font-gilroy-medium text-neutral-475 relative py-4 cursor-pointer">
                <span>Ongoing</span>
                <div className="absolute bottom-0 left-0 w-full h-[5px] rounded-tr-[240px] rounded-tl-[240px]" />
              </button>
              <button className="font-gilroy-medium text-neutral-475 relative py-4 cursor-pointer">
                <span>Completed</span>
                <div className="absolute bottom-0 left-0 w-full h-[5px] rounded-tr-[240px] rounded-tl-[240px]" />
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Status Filter Tabs For Booking Page */}
      {/* <section className="p-4 md:px-0 mt-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["all", "upcoming", "ongoing", "completed"].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status as BookingStatus | "all")}
              className={`px-4 py-2 rounded-full font-gilroy-semibold text-sm whitespace-nowrap transition-colors ${
                selectedStatus === status
                  ? "bg-primary-dark text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </section> */}

      {/* Status Filter Tabs For Booking Page */}

      {/* Bookings List */}
      <section className="p-4 md:px-0 space-y-4 min-h-screen">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div className="mt-5 ">
              <BookingCard
                key={booking.id}
                booking={booking}
                onAccept={handleAccept}
                onDecline={handleDecline}
                onFindCar={handleFindCar}
                onMessage={handleMessage}
              />
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500 font-gilroy-medium">
            No {selectedStatus !== "all" && selectedStatus} bookings found
          </div>
        )}
      </section>
    </div>
  );
}
