"use client";

import { HostHeader } from "@/components/host/HostHeader";
import { HostCarCard } from "@/components/shared/HostCarCard";
import { Button } from "@/components/ui/Buttons";
import { Gallery } from "@/components/ui/Gallery";
import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";
import { StaticCalendar } from "@/components/ui/StaticCalendar";
import { vehicle } from "@/data/carData";
import { usePageTransition } from "@/hooks/usePageTransition";
import { PATHS } from "@/utils/path";
import Image from "next/image";

export default function BookingOverviewPage() {
  const { navigate, isNavigating } = usePageTransition();

  const handleDelete = (id: number) => {
    console.log("Delete car:", id);
  };

  const handleCardClick = (id: number) => {
    console.log("View car details:", id);
  };

  const galleryImages = [
    "/images/cars/1.webp",
    "/images/cars/2.webp",
    "/images/cars/3.webp",
    "/images/cars/4.webp",
    "/images/cars/4.webp",
    "/images/cars/4.webp",
    "/images/cars/4.webp",
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
          <section className="grid lg:grid-cols-5 gap-x-8 gap-y-6">
            {/* Left Column - Sticky on desktop */}
            <div className="space-y-6 lg:col-span-2 lg:sticky lg:top-24 lg:self-start">
              <HostCarCard
                key={vehicle.id}
                id={vehicle.id}
                name={vehicle.title}
                imageUrl={`https://res.cloudinary.com/ds3on5hx3/image/upload/v1763740597/cruizeeasy/vehicles/691933220d6886041e482b81/images/g2dlfo1twyxthkzg7azt.png`}
                transmission={vehicle.transmission}
                seats={4}
                variant="user"
                onDelete={handleDelete}
                onClick={handleCardClick}
              />

              <div className="hidden lg:block">
                <Gallery images={galleryImages} />
              </div>
            </div>

            {/* Right Column - Scrolls naturally */}
            <div className="lg:col-span-3 space-y-6">
              <div>
                <p className="font-gilroy-medium text-neutral-475 text-sm">
                  Mercedes-Benz GLE is a clean and reliable 4-seater SUV with a
                  smooth manual transmission and a big 90-liter tank.{" "}
                  <span className="text-primary-dark hover:underline transition-all cursor-pointer">
                    See more
                  </span>
                </p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-neutral-250 rounded-full size-10 overflow-hidden relative">
                      <Image
                        src={"/images/me.jpg"}
                        alt="Profile Image"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    <div className="flex flex-col font-gilroy-medium">
                      <span className="text-sm">Tunde Adebayo</span>
                      <span className="text-xs text-neutral-475">Host</span>
                    </div>
                  </div>
                  <div className="flex items-stretch space-x-2">
                    <button className="bg-primary-dark p-1.5 rounded-[6.15px] flex-shrink-0 hover:opacity-90 transition-opacity cursor-pointer">
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
                        navigate(`${PATHS.USER.HOST_PROFILE(1)}?vehicleId=${2}`)
                      }
                    >
                      View Profile
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="font-gilroy-bold">456k/</span>
                    <span className="font-gilroy-medium text-neutral-450">
                      day
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="font-gilroy-medium text-neutral-450">
                      4.5
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
                <Gallery images={galleryImages} />
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
                  onClick={() => navigate(PATHS.USER.BOOKING_DETAILS(22))}
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
