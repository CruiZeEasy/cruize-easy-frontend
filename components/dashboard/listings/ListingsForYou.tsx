"use client";
import { cars } from "@/data/carData";
import { CarCard } from "@/components/ui/CarCard";

export function ListingsForYou() {
  const handleRent = (id: number) => {
    console.log("Rent car:", id);
    // Add your rent logic here
  };

  const handleFavorite = (id: number) => {
    console.log("Toggle favorite:", id);
    // Add your favorite logic here
  };

  return (
    <section className="mt-6">
      <h2 className="font-gilroy-bold sticky top-0 z-10 py-2">
        Listings For You
      </h2>

      <div className="grid sm:grid-cols-2 gap-4 mt-2">
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
  );
}
