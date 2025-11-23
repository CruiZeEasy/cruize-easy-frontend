"use client";
import { CarCard } from "../ui/CarCard";

interface CarProps {
  id: number;
  src: string;
  title: string;
  price: string;
  rating: number;
  fuel: string;
  transmission: string;
  capacity: string;
}

const cars: CarProps[] = [
  {
    id: 1,
    src: "1",
    title: "GLE AMG 63S",
    price: "456k/",
    rating: 4.5,
    fuel: "90L",
    transmission: "Manual",
    capacity: "4 Persons",
  },
  {
    id: 2,
    src: "2",
    title: "GLE AMG 63S",
    price: "456k/",
    rating: 4.5,
    fuel: "90L",
    transmission: "Manual",
    capacity: "4 Persons",
  },
  {
    id: 3,
    src: "3",
    title: "GLE AMG 63S",
    price: "456k/",
    rating: 4.5,
    fuel: "90L",
    transmission: "Manual",
    capacity: "4 Persons",
  },
  {
    id: 4,
    src: "4",
    title: "GLE AMG 63S",
    price: "456k/",
    rating: 4.5,
    fuel: "90L",
    transmission: "Manual",
    capacity: "4 Persons",
  },
];

export function OtherListings() {
  const handleRent = (id: number) => {
    console.log("Rent car:", id);
    // Add your rent logic here
  };

  const handleFavorite = (id: number) => {
    console.log("Toggle favorite:", id);
    // Add your favorite logic here
  };
  return (
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
  );
}
