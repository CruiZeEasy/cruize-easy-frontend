"use client";
import Image from "next/image";
import { Button } from "../ui/Buttons";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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

export function PopularCarsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

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
      <div
        className="
          flex gap-4 overflow-x-auto pb-4 scrollbar-hide
          lg:grid lg:grid-cols-2
        "
      >
        {cars.map((car, i) => (
          <motion.div
            key={car.id}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="bg-white border-neutral-160 shadow-[0_10px_48.8px_0_rgba(0,0,0,0.18)] p-4 rounded-lg flex-shrink-0 
              transition-transform duration-300 hover:scale-[1.02]"
          >
            {/* Favorite button */}
            <span className="flex justify-end">
              <button className="transition duration-20 hover:scale-[1.05] active:scale-95 cursor-pointer mb-4 sm:mb-0">
                <Image
                  src="/images/icons/heart.svg"
                  width={24}
                  height={24}
                  alt="heart icon"
                  className="size-6"
                />
              </button>
            </span>

            {/* Car image */}
            <div className="flex justify-center mb-2">
              <Image
                src={`/images/cars/${car.src}.webp`}
                width={300}
                height={193}
                alt={`${car.title} car`}
                quality={75}
                sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 500px"
              />
            </div>

            {/* Details */}
            <div className="pb-2">
              <div className="hidden sm:flex justify-end text-[18px]">
                <span className="font-gilroy-bold ">{car.price}</span>
                <span className="font-gilroy-medium text-neutral-450">day</span>
              </div>

              <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto space-x-4 sm:-mt-2">
                <span className="font-gilroy-bold text-base sm:text-[22px]">
                  {car.title}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="font-gilroy-medium text-neutral-450 text-[18px]">
                    {car.rating}
                  </span>
                  <Image
                    src="/images/icons/star-1.svg"
                    alt="Star"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
              {/* Specs + Button */}
              <div className="flex items-stretch justify-between">
                <div className="flex flex-col justify-between flex-1">
                  <div className="flex items-center justify-between sm:justify-start space-x-4 mt-4 sm:mt-0">
                    <div className="flex items-center space-x-2">
                      <Image
                        src="/images/icons/gas-station.svg"
                        alt="Fuel"
                        width={20}
                        height={20}
                      />
                      <span className="font-gilroy-medium text-neutral-450">
                        {car.fuel}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Image
                        src="/images/icons/steering-wheel.svg"
                        alt="Transmission"
                        width={20}
                        height={20}
                      />
                      <span className="font-gilroy-medium text-neutral-450">
                        {car.transmission}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Image
                        src="/images/icons/user-profile.svg"
                        alt="Capacity"
                        width={20}
                        height={20}
                      />
                      <span className="font-gilroy-medium text-neutral-450">
                        {car.capacity}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-[1px] mt-4 sm:mt-0 sm:w-[16rem] bg-neutral-270" />

                  {/* Mobile price + button */}
                  <div className="flex items-stretch justify-between sm:hidden mt-4">
                    <div className="flex flex-col flex-1 justify-end">
                      <div className="text-[18px]">
                        <span className="font-gilroy-bold ">{car.price}</span>
                        <span className="font-gilroy-medium text-neutral-450">
                          day
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      fontFamily="gilroy-medium"
                      className="py-3"
                    >
                      Rent Now
                    </Button>
                  </div>
                </div>

                {/* Desktop button */}
                <Button
                  variant="primary"
                  fontFamily="gilroy-medium"
                  className="py-3 ml-4 w-44 hidden sm:block"
                >
                  Rent Now
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
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
