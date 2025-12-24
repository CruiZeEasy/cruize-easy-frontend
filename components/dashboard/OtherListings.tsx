"use client";
import { CarCard } from "../shared/CarCard";
import { usePageTransition } from "@/hooks/usePageTransition";
import { PATHS } from "@/utils/path";
import { PageTransitionSpinner } from "../ui/PageTransitionSpinner";
import { useRecentVehicles } from "@/hooks/useRecentVehicles";
import { transformVehicleForDisplay } from "@/utils/vehicleTransformers";
import { OtherListingsSkeleton } from "../skeletons/OtherListingsSkeleton";

export function OtherListings() {
  const { navigate, isNavigating } = usePageTransition();
  const { data: vehicles, isLoading } = useRecentVehicles(5);

  const handleRent = (id: string) => {
    navigate(PATHS.USER.BOOKING_OVERVIEW(id));
  };

  const handleFavorite = (id: string) => {
    console.log("Toggle favorite:", id);
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="hidden lg:block">
        <h2 className="font-gilroy-bold sticky top-0 bg-neutral-100 z-10 py-2">
          Recently Added
        </h2>
        <OtherListingsSkeleton />
      </section>
    );
  }

  // Empty state
  if (!vehicles || vehicles.length === 0) {
    return (
      <section className="hidden lg:block">
        <h2 className="font-gilroy-bold sticky top-0 bg-neutral-100 z-10 py-2">
          Recently Added
        </h2>
        <div className="rounded-lg p-8 bg-white mt-2 text-center">
          <p className="font-gilroy-medium text-neutral-450">
            No recent vehicles available
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="hidden lg:block">
        <h2 className="font-gilroy-bold sticky top-0 bg-neutral-100 z-10 py-2">
          Recently Added
        </h2>

        <div className="grid grid-cols-2 gap-4 mt-2">
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
