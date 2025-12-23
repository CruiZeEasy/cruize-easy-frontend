"use client";

import Image from "next/image";
import { Button } from "../ui/Buttons";
import { CarCard } from "../shared/CarCard";
import { usePageTransition } from "@/hooks/usePageTransition";
import { PageTransitionSpinner } from "../ui/PageTransitionSpinner";
import { PATHS } from "@/utils/path";
import { usePopularVehicles } from "@/hooks/usePopularVehicles";

import {
  PopularCarDesktopSkeleton,
  PopularCarMobileSkeleton,
} from "../skeletons/PopularCarSkeleton";
import { transformVehicleForDisplay } from "@/utils/vehicleTransformers";
import { formatName } from "@/utils/formatters";

export function PopularCar() {
  const { navigate, isNavigating } = usePageTransition();
  const { data: vehicles, isLoading } = usePopularVehicles(5);

  const handleRent = (id: number) => {
    navigate(PATHS.USER.BOOKING_OVERVIEW(id));
  };

  const handleFavorite = (id: number) => {
    console.log("Toggle favorite:", id);
  };

  // Get the top vehicle for desktop featured view
  const topVehicle = vehicles?.[0];
  const topVehicleData = topVehicle
    ? transformVehicleForDisplay(topVehicle)
    : null;

  // Loading states
  if (isLoading) {
    return (
      <>
        <section>
          <h2 className="font-gilroy-bold text-sm xl:hidden">Popular Car</h2>
          <PopularCarDesktopSkeleton />
          <PopularCarMobileSkeleton />
        </section>
      </>
    );
  }

  // Empty state
  if (!vehicles || vehicles.length === 0) {
    return (
      <section>
        <h2 className="font-gilroy-bold text-sm xl:hidden">Popular Car</h2>
        <div className="rounded-[20px] p-8 bg-white mt-2 text-center">
          <p className="font-gilroy-medium text-neutral-450">
            No popular vehicles available at the moment
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section>
        <h2 className="font-gilroy-bold text-sm xl:hidden">Popular Car</h2>

        {/* Desktop Version - Featured Top Vehicle */}
        {topVehicleData && (
          <div className="rounded-[20px] p-4 bg-white hidden lg:block mt-2 xl:mt-0">
            <h2 className="font-gilroy-bold hidden xl:block">Popular Cars</h2>

            <div className="mt-4 grid xl:grid-cols-2 gap-x-4 items-center">
              <span className="flex justify-end xl:hidden mb-4">
                <button
                  onClick={() => handleFavorite(topVehicleData.id)}
                  className="transition duration-20 hover:scale-[1.05] active:scale-95 cursor-pointer"
                >
                  <Image
                    src="/images/icons/heart.svg"
                    width={24}
                    height={24}
                    alt="heart icon"
                    className="size-6"
                  />
                </button>
              </span>

              <div className="relative h-[247px] overflow-hidden rounded-[20px] bg-neutral-100">
                <Image
                  src={topVehicleData.src}
                  fill
                  alt={topVehicleData.title}
                  quality={100}
                  className="object-cover object-center"
                  unoptimized={topVehicleData.isExternalImage}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/cars/default.webp";
                  }}
                />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <span className="flex justify-end">
                    <button
                      onClick={() => handleFavorite(topVehicleData.id)}
                      className="transition duration-20 hover:scale-[1.05] active:scale-95 cursor-pointer hidden xl:block"
                    >
                      <Image
                        src="/images/icons/heart.svg"
                        width={24}
                        height={24}
                        alt="heart icon"
                        className="size-6"
                      />
                    </button>
                  </span>

                  <div className="flex justify-between items-center mt-2">
                    <div className="flex flex-col">
                      <span className="font-gilroy-bold text-base sm:text-[22px]">
                        {formatName(topVehicleData.title)}
                      </span>

                      <div>
                        <span className="font-gilroy-bold">
                          {topVehicleData.price}
                        </span>
                        <span className="font-gilroy-medium text-neutral-450">
                          day
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="font-gilroy-medium text-neutral-450">
                        {topVehicleData.rating > 0
                          ? topVehicleData.rating.toFixed(1)
                          : "New"}
                      </span>
                      <Image
                        src="/images/icons/star-1.svg"
                        alt="Star"
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between space-x-4 mt-6 font-gilroy-medium text-neutral-450 border-b border-neutral-270 pb-2">
                    <div className="flex items-center space-x-2">
                      <Image
                        src="/images/icons/gas-station.svg"
                        alt="Fuel"
                        width={20}
                        height={20}
                      />
                      <span>{topVehicleData.fuel}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Image
                        src="/images/icons/steering-wheel.svg"
                        alt="Transmission"
                        width={20}
                        height={20}
                      />
                      <span>{topVehicleData.transmission}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Image
                        src="/images/icons/user-profile.svg"
                        alt="Capacity"
                        width={20}
                        height={20}
                      />
                      <span>{topVehicleData.capacity}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    type="button"
                    variant="dark-primary"
                    fontFamily="gilroy-medium"
                    rounded="full"
                    fullWidth
                    shadow="shadow-none"
                    className="py-3"
                    onClick={() => handleRent(topVehicleData.id)}
                  >
                    Rent Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Version - Horizontal Scroll */}
        <div className="flex gap-4 mt-2 overflow-x-auto pb-4 scrollbar-hide lg:hidden">
          {vehicles.map((vehicle) => {
            const vehicleData = transformVehicleForDisplay(vehicle);
            return (
              <CarCard
                key={vehicle.id}
                {...vehicleData}
                onRentClick={handleRent}
                onFavoriteClick={handleFavorite}
              />
            );
          })}
        </div>
      </section>

      {/* Page Transition Spinner */}
      <PageTransitionSpinner isVisible={isNavigating} />
    </>
  );
}
