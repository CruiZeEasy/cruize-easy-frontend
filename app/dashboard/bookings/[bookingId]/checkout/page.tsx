"use client";

import { HostHeader } from "@/components/host/HostHeader";
import { Button } from "@/components/ui/Buttons";
import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";
import { Toast } from "@/components/ui/Toast";
import { usePageTransition } from "@/hooks/usePageTransition";
import {
  confirmBookingPayment,
  getBookingDetails,
} from "@/services/bookingService";
import { formatNGN } from "@/utils/formatters/formatNGN";
import { PATHS } from "@/utils/path";
import { useQuery, useMutation } from "@tanstack/react-query";
import { MapPin, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

import { format } from "date-fns";
import { PaymentPinModal } from "@/components/dashboard/bookings/PaymentPinModal";

export default function BookingCheckoutPage() {
  const params = useParams();
  const bookingId = params.bookingId as string;
  const { navigate, isNavigating } = usePageTransition();

  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBookingDetails(bookingId),
    enabled: !!bookingId,
  });

  console.log(booking);

  const paymentMutation = useMutation({
    mutationFn: (pin: string) =>
      confirmBookingPayment(booking?.data.id!, {
        paymentMethod: "WALLET",
        transactionPin: pin,
      }),
    onSuccess: () => {
      setIsPinModalOpen(false);
      navigate(`/dashboard/bookings/${bookingId}/success`);
    },
    onError: (err: any) => {
      setToast({
        message: err.message || "Payment failed. Please try again.",
        type: "error",
      });
      setIsPinModalOpen(false);
    },
  });

  // Loading state
  if (isLoading) {
    return (
      <>
        <div className="pb-28">
          <div className="sticky top-0 z-40 bg-white lg:pt-2 lg:mx-12 md:border-b md:border-b-neutral-275 shadow-sm md:shadow-none">
            <div className="px-4 py-4 lg:px-0">
              <HostHeader />
            </div>
          </div>

          <div className="px-4 lg:px-12 lg:py-4 mt-8 lg:mt-10">
            <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
              <div className="h-64 bg-neutral-300 rounded-[20px]" />
              <div className="h-96 bg-neutral-300 rounded-[20px]" />
            </div>
          </div>
        </div>
      </>
    );
  }

  // Error state
  if (error || !booking) {
    return (
      <>
        <div className="pb-28">
          <div className="sticky top-0 z-40 bg-white lg:pt-2 lg:mx-12 md:border-b md:border-b-neutral-275 shadow-sm md:shadow-none">
            <div className="px-4 py-4 lg:px-0">
              <HostHeader />
            </div>
          </div>

          <div className="px-4 lg:px-12 lg:py-4 mt-8 lg:mt-10">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="font-gilroy-medium text-neutral-450 text-lg mb-2">
                Booking not found
              </p>
              <p className="font-gilroy-regular text-neutral-450 text-sm mb-4">
                The booking you're looking for doesn't exist
              </p>
              <Button
                variant="dark-primary"
                fontFamily="gilroy-medium"
                shadow="shadow-none"
                onClick={() => navigate(PATHS.USER.HOME)}
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: format(date, "MMM dd, yyyy"),
      time: format(date, "hh:mm a"),
    };
  };

  const pickupDateTime = formatDateTime(booking.data.startDateTime);
  const returnDateTime = formatDateTime(booking.data.endDateTime);

  const priceBreakdown = [
    { label: "Subtotal", amount: booking.data.subtotal },
    { label: "Platform Fee", amount: booking.data.platformFee },
    { label: "Insurance Fee", amount: booking.data.insuranceFee },
    { label: "Caution Fee", amount: booking.data.cautionFee },
    ...(booking.data.deliveryRequested
      ? [{ label: "Delivery Fee", amount: booking.data.deliveryFee }]
      : []),
  ];

  return (
    <>
      <div className="pb-28">
        <div className="sticky top-0 z-40 bg-white lg:pt-2 lg:mx-12 md:border-b md:border-b-neutral-275 shadow-sm md:shadow-none">
          <div className="px-4 py-4 lg:px-0">
            <HostHeader />
          </div>
        </div>

        <div className="px-4 lg:px-12 lg:py-4 mt-8 lg:mt-10">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <h1 className="font-gilroy-bold text-2xl">Review & Payment</h1>
              <p className="font-gilroy-medium text-neutral-475 text-sm mt-1">
                Booking #{booking.data.bookingNumber}
              </p>
            </div>

            {/* Vehicle Info */}
            <div className="bg-white rounded-[20px] md:p-4">
              <div className="flex gap-4">
                <div className="relative w-32 h-24 shrink-0">
                  <Image
                    src={booking.data.vehicleImage || "/images/cars/1.webp"}
                    fill
                    alt={booking.data.vehicleName}
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-gilroy-bold text-lg">
                    {booking.data.vehicleName}
                  </h3>
                  <p className="font-gilroy-medium text-neutral-475 text-sm mt-1">
                    {formatNGN(booking.data.pricePerDay)}/day
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-gilroy-medium rounded-full">
                      {booking.data.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="bg-white rounded-[20px] md:p-4 space-y-4">
              <h3 className="font-gilroy-bold text-base">Booking Details</h3>

              {/* Dates */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary-dark mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="font-gilroy-medium text-sm text-neutral-475">
                      Pickup
                    </p>
                    <p className="font-gilroy-bold text-sm mt-1">
                      {pickupDateTime.date} at {pickupDateTime.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary-dark mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="font-gilroy-medium text-sm text-neutral-475">
                      Return
                    </p>
                    <p className="font-gilroy-bold text-sm mt-1">
                      {returnDateTime.date} at {returnDateTime.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary-dark mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="font-gilroy-medium text-sm text-neutral-475">
                      Duration
                    </p>
                    <p className="font-gilroy-bold text-sm mt-1">
                      {booking.data.totalDays} day
                      {booking.data.totalDays !== 1 ? "s" : ""} (
                      {booking.data.totalHours} hours)
                    </p>
                  </div>
                </div>
              </div>

              {/* Locations */}
              <div className="pt-4 border-t border-neutral-275 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-dark mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="font-gilroy-medium text-sm text-neutral-475">
                      Pickup Location
                    </p>
                    <p className="font-gilroy-medium text-sm mt-1">
                      {booking.data.pickupLocation.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-dark mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="font-gilroy-medium text-sm text-neutral-475">
                      Dropoff Location
                    </p>
                    <p className="font-gilroy-medium text-sm mt-1">
                      {booking.data.dropOffLocation.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-white rounded-[20px] md:p-4">
              <h3 className="font-gilroy-bold text-base mb-4">
                Price Breakdown
              </h3>

              <div className="space-y-3">
                {priceBreakdown.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between"
                  >
                    <span className="font-gilroy-medium text-sm text-neutral-475">
                      {item.label}
                    </span>
                    <span className="font-gilroy-medium text-sm">
                      {formatNGN(item.amount)}
                    </span>
                  </div>
                ))}

                <div className="pt-3 border-t border-neutral-275 flex items-center justify-between">
                  <span className="font-gilroy-bold text-base">Total</span>
                  <span className="font-gilroy-bold text-lg">
                    {formatNGN(booking.data.totalAmount)}
                  </span>
                </div>
              </div>

              {booking.data.note && (
                <div className="mt-4 pt-4 border-t border-neutral-275">
                  <p className="font-gilroy-medium text-sm text-neutral-475 italic">
                    Note: {booking.data.note}
                  </p>
                </div>
              )}
            </div>

            {/* Payment Button */}
            <div className="flex justify-end">
              <Button
                variant="dark-primary"
                fontFamily="gilroy-medium"
                shadow="shadow-none"
                className="py-3 px-8"
                onClick={() => setIsPinModalOpen(true)}
                disabled={booking.data.status !== "PENDING"}
              >
                Make Payment
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment PIN Modal */}
      <PaymentPinModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onConfirm={(pin) => paymentMutation.mutate(pin)}
        isLoading={paymentMutation.isPending}
        totalAmount={booking.data.totalAmount}
      />

      {/* Toast */}
      {toast && (
        <div className="flex justify-center">
          <Toast {...toast} onClose={() => setToast(null)} />
        </div>
      )}

      <PageTransitionSpinner isVisible={isNavigating} />
    </>
  );
}
