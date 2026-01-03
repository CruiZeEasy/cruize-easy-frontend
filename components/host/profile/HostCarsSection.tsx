// import { HostCarCard } from "@/components/shared/HostCarCard";
// import { HostCarCardSkeleton } from "@/components/skeletons/HostCarCardSkeleton";
// import { Button } from "@/components/ui/Buttons";
// import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";
// import { useHostVehicles } from "@/hooks/useHostVehicles";
// import { usePageTransition } from "@/hooks/usePageTransition";
// import { PATHS } from "@/utils/path";
// import { transformVehicleForDisplay } from "@/utils/vehicleTransformers";
// import Image from "next/image";

// export function HostCarsSection() {
//   const { data: vehicles, isLoading } = useHostVehicles();
//   const { navigate, isNavigating } = usePageTransition();

//   const handleDelete = (id: string) => {
//     console.log("Delete car:", id);
//     // Add your delete logic here
//   };

//   const handleCardClick = (id: string) => {
//     console.log("View car details:", id);
//     // Add your navigation logic here
//   };

//   if (isLoading) {
//     return (
//       <div className="md:px-10 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
//         {Array.from({ length: 3 }).map((_, i) => (
//           <HostCarCardSkeleton key={i} />
//         ))}
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="md:px-10">
//         {vehicles && vehicles.length > 0 ? (
//           <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
//             {vehicles.map((vehicle) => {
//               const vehicleData = transformVehicleForDisplay(vehicle);

//               return (
//                 <HostCarCard
//                   key={vehicle.id}
//                   {...vehicleData}
//                   onDelete={handleDelete}
//                   onClick={handleCardClick}
//                 />
//               );
//             })}
//           </div>
//         ) : (
//           <div className="flex flex-col justify-center items-center">
//             <div className="relative w-[150px] h-[200px]">
//               <Image
//                 src="/images/robots/sad-robot.webp"
//                 alt="Sad and confused robot"
//                 fill
//                 priority
//                 quality={100}
//                 className="object-contain"
//               />
//             </div>

//             <p className="font-gilroy-medium text-xs text-center w-60 text-neutral-475 mt-2 md:mt-4 mb-4">
//               You haven&apos;t added any cars yet. Get started by adding your
//               first car.
//             </p>

//             <Button
//               variant="dark-primary"
//               fontFamily="gilroy-medium"
//               shadow="shadow-none"
//               className="py-4 md:px-6 text-xs max-w-80"
//               fullWidth
//               onClick={() => navigate(PATHS.HOST.ADD_CAR)}
//             >
//               Add Car
//             </Button>
//           </div>
//         )}
//       </div>

//       {/* Page Transition Spinner */}
//       <PageTransitionSpinner isVisible={isNavigating} />
//     </>
//   );
// }

import { HostCarCard } from "@/components/shared/HostCarCard";
import { HostCarCardSkeleton } from "@/components/skeletons/HostCarCardSkeleton";
import { Button } from "@/components/ui/Buttons";
import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";
import { useHostVehicles } from "@/hooks/useHostVehicles";
import { usePageTransition } from "@/hooks/usePageTransition";
import { PATHS } from "@/utils/path";
import { transformVehicleForDisplay } from "@/utils/vehicleTransformers";
import Image from "next/image";

interface HostCarsSectionProps {
  // Optional props for public view (when viewing another host's profile)
  isPublicView?: boolean;
  hostId?: string;
  vehicles?: any[];
  isLoading?: boolean;
}

export function HostCarsSection({
  isPublicView = false,
  hostId,
  vehicles: externalVehicles,
  isLoading: externalLoading,
}: HostCarsSectionProps) {
  // Use hook only if not in public view
  const { data: ownVehicles, isLoading: ownLoading } = useHostVehicles();
  const { navigate, isNavigating } = usePageTransition();

  // Determine which data to use
  const vehicles = isPublicView ? externalVehicles : ownVehicles;
  const isLoading = isPublicView ? externalLoading : ownLoading;

  const handleDelete = (id: string) => {
    console.log("Delete car:", id);
    // Add your delete logic here
  };

  const handleCardClick = (id: string) => {
    if (isPublicView) {
      // navigate(PATHS.VEHICLE.DETAILS(id));
      console.log("View car details (public):", id);
    } else {
      console.log("View car details:", id);
      // Add your navigation logic for host view
    }
  };

  if (isLoading) {
    return (
      <div className="md:px-10 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <HostCarCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="md:px-10">
        {vehicles && vehicles.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
            {vehicles.map((vehicle) => {
              const vehicleData = transformVehicleForDisplay(vehicle);

              return (
                <HostCarCard
                  key={vehicle.id}
                  {...vehicleData}
                  onDelete={isPublicView ? undefined : handleDelete}
                  onClick={handleCardClick}
                  hideDeleteButton={isPublicView}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
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

            <p className="font-gilroy-medium text-xs text-center w-60 text-neutral-475 mt-2 md:mt-4 mb-4">
              {isPublicView
                ? "This host hasn't listed any vehicles yet. Check back later to see their available cars."
                : "You haven't added any cars yet. Get started by adding your first car."}
            </p>

            <Button
              variant="dark-primary"
              fontFamily="gilroy-medium"
              shadow="shadow-none"
              className="py-4 md:px-6 text-xs max-w-80"
              fullWidth
              onClick={() =>
                navigate(isPublicView ? PATHS.HOME : PATHS.HOST.ADD_CAR)
              }
            >
              {isPublicView ? "Browse Other Cars" : "Add Car"}
            </Button>
          </div>
        )}
      </div>

      {/* Page Transition Spinner */}
      <PageTransitionSpinner isVisible={isNavigating} />
    </>
  );
}
