import { HostCarCard } from "@/components/shared/HostCarCard";
import { HostCarCardSkeleton } from "@/components/skeletons/HostCarCardSkeleton";
import { Button } from "@/components/ui/Buttons";
import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";
import { usePageTransition } from "@/hooks/usePageTransition";
import { PATHS } from "@/utils/path";
import { transformVehicleForDisplay } from "@/utils/vehicleTransformers";
import Image from "next/image";

interface PublicHostCarsSectionProps {
  hostId: string;
  vehicles?: any[];
  isLoading: boolean;
}

export function PublicHostCarsSection({
  hostId,
  vehicles,
  isLoading,
}: PublicHostCarsSectionProps) {
  const { navigate, isNavigating } = usePageTransition();

  const handleCardClick = (id: string) => {
    // navigate(PATHS.VEHICLE.DETAILS(id));
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
                  onClick={handleCardClick}
                  hideDeleteButton // Hide delete button for public view
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
              This host hasn&apos;t listed any vehicles yet. Check back later to
              see their available cars.
            </p>

            <Button
              variant="dark-primary"
              fontFamily="gilroy-medium"
              shadow="shadow-none"
              className="py-4 md:px-6 text-xs max-w-80"
              fullWidth
              onClick={() => navigate(PATHS.HOME)}
            >
              Browse Other Cars
            </Button>
          </div>
        )}
      </div>

      {/* Page Transition Spinner */}
      <PageTransitionSpinner isVisible={isNavigating} />
    </>
  );
}
