"use client";
import { HostHeader } from "@/components/host/HostHeader";
import { HostCarCard } from "@/components/shared/HostCarCard";
import { vehicle } from "@/data/carData";

export default function BookingOverviewPage() {
  const handleDelete = (id: number) => {
    console.log("Delete car:", id);
    // Add your delete logic here
  };

  const handleCardClick = (id: number) => {
    console.log("View car details:", id);
    // Add your navigation logic here
  };
  return (
    <div className="pb-28">
      <div className="sticky top-0 z-40 bg-white md:pt-2 md:mx-12">
        <div className="px-4 py-4 md:px-0">
          <HostHeader />
        </div>
      </div>

      <div className="px-4 md:px-12 md:py-4 mt-8 md:mt-10">
        <section className="grid md:grid-cols-3">
          <div>
            <HostCarCard
              key={vehicle.id}
              id={vehicle.id}
              name={vehicle.title}
              imageUrl={`https://res.cloudinary.com/ds3on5hx3/image/upload/v1763740597/cruizeeasy/vehicles/691933220d6886041e482b81/images/g2dlfo1twyxthkzg7azt.png`}
              transmission={vehicle.transmission}
              seats={4}
              onDelete={handleDelete}
              onClick={handleCardClick}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
