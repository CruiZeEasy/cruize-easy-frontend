import { HostCarCard } from "@/components/shared/HostCarCard";
import { HostCarCardSkeleton } from "@/components/skeletons/HostCarCardSkeleton";
import { useHostVehicles } from "@/hooks/useHostVehicles";
import { transformVehicleForDisplay } from "@/utils/vehicleTransformers";
import Image from "next/image";

export function HostCarsSection() {
  const { data: vehicles, isLoading } = useHostVehicles();

  const handleDelete = (id: string) => {
    console.log("Delete car:", id);
    // Add your delete logic here
  };

  const handleCardClick = (id: string) => {
    console.log("View car details:", id);
    // Add your navigation logic here
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
    <div className="md:px-10">
      {vehicles && vehicles.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
          {vehicles.map((vehicle) => {
            const vehicleData = transformVehicleForDisplay(vehicle);

            console.log(vehicleData);
            return (
              <HostCarCard
                key={vehicle.id}
                {...vehicleData}
                onDelete={handleDelete}
                onClick={handleCardClick}
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
        </div>
      )}
    </div>
  );
}
