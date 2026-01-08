"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "../ui/Buttons";
import { cars } from "@/data/carData";
import { LandingCarCard } from "../shared/LandingCarCard";
import { transformVehicleForDisplay } from "@/utils/vehicleTransformers";

export function PopularCarsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  const handleRent = (id: string) => {
    console.log("Rent car:", id);
    // Navigate to signup or car details
  };

  const handleFavorite = (id: string) => {
    console.log("Toggle favorite:", id);
  };

  return (
    <section ref={ref} className="container mb-12 sm:mb-20">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:items-center lg:text-center space-y-6 lg:mb-12"
      >
        <h2 className="text-[18px] lg:text-4xl font-gilroy-bold text-neutral-900">
          Popular Cars
        </h2>
        <p className="text-neutral-600 font-gilroy-medium hidden lg:block">
          Choose from our selection of premium vehicles for your next adventure.
        </p>
      </motion.div>

      {/* Cars Grid */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide lg:grid lg:grid-cols-2">
        {cars.map((car, index) => {
          // const vehicleData = transformVehicleForDisplay(car);
          return (
            <LandingCarCard
              key={car.id}
              id={car.id}
              src={car.src}
              title={car.title}
              price={car.price}
              rating={car.rating}
              fuel={car.fuel}
              transmission={car.transmission}
              capacity={car.capacity}
              index={index}
              inView={inView}
              onRentClick={handleRent}
              onFavoriteClick={handleFavorite}
            />
          );
        })}
      </div>

      {/* View all cars button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: cars.length * 0.15 }}
        className="flex justify-center mt-12 sm:mt-20"
      >
        <Button variant="primary" className="py-4 w-48">
          View all Cars
        </Button>
      </motion.div>
    </section>
  );
}
