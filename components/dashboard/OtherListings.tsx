// "use client";
// import { cars } from "@/data/carData";
// import { CarCard } from "../shared/CarCard";
// import { usePageTransition } from "@/hooks/usePageTransition";
// import { PATHS } from "@/utils/path";
// import { PageTransitionSpinner } from "../ui/PageTransitionSpinner";

// export function OtherListings() {
//   const { navigate, isNavigating } = usePageTransition();

//   const handleRent = (id: number) => {
//     navigate(PATHS.USER.BOOKING_OVERVIEW(id));
//     console.log("Rent car:", id);
//     // Add your rent logic here
//   };

//   const handleFavorite = (id: number) => {
//     console.log("Toggle favorite:", id);
//     // Add your favorite logic here
//   };

//   return (
//     <>
//       <section className="hidden lg:block">
//         <h2 className="font-gilroy-bold sticky top-0 bg-neutral-100 z-10 py-2">
//           Other Listings
//         </h2>

//         <div className="grid grid-cols-2 gap-4 mt-2">
//           {cars.map((car) => (
//             <CarCard
//               key={car.id}
//               {...car}
//               onRentClick={handleRent}
//               onFavoriteClick={handleFavorite}
//             />
//           ))}
//         </div>
//       </section>

//       {/* Page Transition Spinner */}
//       <PageTransitionSpinner isVisible={isNavigating} />
//     </>
//   );
// }

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

  const handleRent = (id: number) => {
    navigate(PATHS.USER.BOOKING_OVERVIEW(id));
  };

  const handleFavorite = (id: number) => {
    console.log("Toggle favorite:", id);
  };

  // Loading state
  if (isLoading) {
    return <OtherListingsSkeleton />;
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
