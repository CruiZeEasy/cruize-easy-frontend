"use client";

import { HostHeader } from "@/components/host/HostHeader";
import { HostCarCard } from "@/components/shared/HostCarCard";
import { BookingOverviewPageSkeleton } from "@/components/skeletons/BookingOverviewPageSkeleton";
import { Button } from "@/components/ui/Buttons";
import { Gallery } from "@/components/ui/Gallery";
import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";
import { StaticCalendar } from "@/components/ui/StaticCalendar";
import { usePageTransition } from "@/hooks/usePageTransition";
import { useVehicleDetails } from "@/hooks/useVehicleDetails";
import { getOptimizedImage } from "@/utils/cloudinary";
import { sentenceCase } from "@/utils/formatters";
import { formatNGN } from "@/utils/formatters/formatNGN";
import { PATHS } from "@/utils/path";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function BookingOverviewPage() {
  const params = useParams();
  const vehicleId = params.id as string;

  const { navigate, isNavigating } = usePageTransition();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const {
    data: vehicleDetails,
    isLoading,
    error,
  } = useVehicleDetails(vehicleId);

  const primaryImage =
    vehicleDetails?.images?.[0]?.url || vehicleDetails?.primaryImageUrl;

  const handleDelete = (id: string) => {
    console.log("Delete car:", id);
  };

  const handleCardClick = (id: string) => {
    console.log("View car details:", id);
  };

  // Prepare gallery images from vehicle data
  const galleryImages =
    vehicleDetails?.images
      ?.sort((a, b) => a.order - b.order)
      .map((img) => img.url) || [];

  // Loading state
  if (isLoading) {
    return <BookingOverviewPageSkeleton />;
  }

  // Error state
  if (error || !vehicleDetails) {
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
                Vehicle not found
              </p>
              <p className="font-gilroy-regular text-neutral-450 text-sm mb-4">
                The vehicle you're looking for doesn't exist or has been removed
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

  // Description logic
  const description = sentenceCase(vehicleDetails.description);
  const descriptionLimit = 150;
  const shouldTruncate = description.length > descriptionLimit;
  const displayDescription =
    isDescriptionExpanded || !shouldTruncate
      ? description
      : `${description.slice(0, descriptionLimit)}...`;

  return (
    <>
      <div className="pb-28">
        <div className="sticky top-0 z-40 bg-white lg:pt-2 lg:mx-12 md:border-b md:border-b-neutral-275 shadow-sm md:shadow-none">
          <div className="px-4 py-4 lg:px-0">
            <HostHeader />
          </div>
        </div>

        <div className="px-4 lg:px-12 lg:py-4 mt-8 lg:mt-10">
          <section className="grid lg:grid-cols-5 gap-x-8 gap-y-6">
            {/* Left Column - Sticky on desktop */}
            <div className="space-y-6 lg:col-span-2 lg:sticky lg:top-24 lg:self-start">
              <HostCarCard
                key={vehicleDetails.id}
                id={vehicleDetails.id}
                title={`${vehicleDetails.brand} ${vehicleDetails.name}`}
                src={primaryImage!}
                transmission={
                  vehicleDetails.transmission === "AUTOMATIC"
                    ? "Auto"
                    : "Manual"
                }
                capacity={`${vehicleDetails.seats} People`}
                fuel={vehicleDetails.fuelType || "N/A"}
                location={
                  vehicleDetails.pickupLocation
                    ? `${vehicleDetails.pickupLocation.address}, ${vehicleDetails.pickupLocation.city}`
                    : "Location not specified"
                }
                variant="user"
                onDelete={handleDelete}
                onClick={handleCardClick}
              />

              <div className="hidden lg:block">
                {galleryImages.length > 0 && <Gallery images={galleryImages} />}
              </div>
            </div>

            {/* Right Column - Scrolls naturally */}
            <div className="lg:col-span-3 space-y-6">
              <div>
                <p className="font-gilroy-medium text-neutral-475 text-sm">
                  {displayDescription}{" "}
                  {shouldTruncate && (
                    <span
                      onClick={() =>
                        setIsDescriptionExpanded(!isDescriptionExpanded)
                      }
                      className="text-primary-dark hover:underline transition-all cursor-pointer"
                    >
                      {isDescriptionExpanded ? "See less" : "See more"}
                    </span>
                  )}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-neutral-250 rounded-full size-10 overflow-hidden relative">
                      <Image
                        src={
                          getOptimizedImage(
                            vehicleDetails.hostProfileImage,
                            70
                          ) || "/images/me.jpg"
                        }
                        alt={vehicleDetails.hostName}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    <div className="flex flex-col font-gilroy-medium">
                      <span className="text-sm">{vehicleDetails.hostName}</span>
                      <span className="text-xs text-neutral-475">Host</span>
                    </div>
                  </div>
                  <div className="flex items-stretch space-x-2">
                    <button className="bg-primary-dark p-1.5 rounded-[6.15px] shrink-0 hover:opacity-90 transition-opacity cursor-pointer">
                      <Image
                        src={`/images/icons/messages-light.svg`}
                        height={20}
                        width={20}
                        alt="Message Icon"
                        priority
                      />
                    </button>

                    <Button
                      type="button"
                      variant="dark-primary"
                      fontFamily="gilroy-medium"
                      fullWidth
                      shadow="shadow-none"
                      className="py-2"
                      onClick={() =>
                        navigate(
                          `${PATHS.USER.HOST_PROFILE(vehicleDetails.hostId)}`
                        )
                      }
                    >
                      View Profile
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="font-gilroy-bold">
                      {formatNGN(vehicleDetails.pricePerDay)}/
                    </span>
                    <span className="font-gilroy-medium text-neutral-450">
                      day
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="font-gilroy-medium text-neutral-450">
                      {vehicleDetails.averageRating.toFixed(1)}
                    </span>
                    <Image
                      src="/images/icons/star-1.svg"
                      alt="Star"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </div>

              <div className="lg:hidden">
                {galleryImages.length > 0 && <Gallery images={galleryImages} />}
              </div>

              {/* Calendar */}
              <StaticCalendar />

              {/* Request Booking Button */}
              <div className="lg:flex lg:justify-end mt-12 lg:mt-0">
                <Button
                  variant="dark-primary"
                  fontFamily="gilroy-medium"
                  shadow="shadow-none"
                  fullWidth
                  className="lg:py-3 lg:px-6 lg:max-w-fit"
                  onClick={() =>
                    navigate(PATHS.USER.BOOKING_DETAILS(vehicleId))
                  }
                >
                  Request Booking
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Page Transition Spinner */}
      <PageTransitionSpinner isVisible={isNavigating} />
    </>
  );
}
