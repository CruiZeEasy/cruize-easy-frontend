"use client";
import { CarCard, CarCardProps } from "@/components/shared/CarCard";
import { CarCardSkeleton } from "@/components/skeletons/CarCardSkeleton";
import { Vehicle } from "@/types/vehicle";
import { PATHS } from "@/utils/path";
import { transformVehicleForDisplay } from "@/utils/vehicleTransformers";

interface ListingsForYouProps {
  navigate: (path: string) => void;
  vehicles: Vehicle[];
  isLoading: boolean;
}

export function ListingsForYou({
  navigate,
  vehicles,
  isLoading,
}: ListingsForYouProps) {
  const handleRent = (id: string) => {
    navigate(PATHS.USER.BOOKING_OVERVIEW(id));
  };

  const handleFavorite = (id: string) => {
    console.log("Toggle favorite:", id);
    // Add your favorite logic here
  };

  // Show skeleton loaders while loading
  if (isLoading) {
    return (
      <section>
        <h2 className="font-gilroy-bold sticky top-0 z-10 py-2 bg-white">
          Listings For You
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <CarCardSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  // Show empty state if no vehicles
  if (!vehicles || vehicles.length === 0) {
    return (
      <section>
        <h2 className="font-gilroy-bold sticky top-0 z-10 py-2 bg-white">
          Listings For You
        </h2>

        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="font-gilroy-medium text-neutral-450 text-lg mb-2">
            No vehicles available at the moment
          </p>
          <p className="font-gilroy-regular text-neutral-450 text-sm">
            Check back later for new listings
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="font-gilroy-bold sticky top-0 z-10 py-2 bg-white">
        Listings For You
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        {vehicles.map((vehicle) => {
          const carProps = transformVehicleForDisplay(vehicle);
          return (
            <CarCard
              key={vehicle.id}
              {...carProps}
              onRentClick={handleRent}
              onFavoriteClick={handleFavorite}
            />
          );
        })}
      </div>
    </section>
  );
}
