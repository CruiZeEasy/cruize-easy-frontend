"use client";
import { cars } from "@/data/carData";
import { CarCard } from "../shared/CarCard";
import { usePageTransition } from "@/hooks/usePageTransition";
import { PATHS } from "@/utils/path";
import { PageTransitionSpinner } from "../ui/PageTransitionSpinner";

export function OtherListings() {
  const { navigate, isNavigating } = usePageTransition();

  const handleRent = (id: number) => {
    navigate(PATHS.USER.BOOKING_OVERVIEW(id));
    console.log("Rent car:", id);
    // Add your rent logic here
  };

  const handleFavorite = (id: number) => {
    console.log("Toggle favorite:", id);
    // Add your favorite logic here
  };

  return (
    <>
      <section className="hidden lg:block">
        <h2 className="font-gilroy-bold sticky top-0 bg-neutral-100 z-10 py-2">
          Other Listings
        </h2>

        <div className="grid grid-cols-2 gap-4 mt-2">
          {cars.map((car) => (
            <CarCard
              key={car.id}
              {...car}
              onRentClick={handleRent}
              onFavoriteClick={handleFavorite}
            />
          ))}
        </div>
      </section>

      {/* Page Transition Spinner */}
      <PageTransitionSpinner isVisible={isNavigating} />
    </>
  );
}
