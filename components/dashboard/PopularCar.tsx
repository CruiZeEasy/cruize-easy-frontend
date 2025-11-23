import Image from "next/image";
import React from "react";
import { Button } from "../ui/Buttons";

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

export function PopularCar() {
  return (
    <section>
      <h2 className="font-gilroy-bold text-sm md:hidden">Popular Car</h2>

      {/* Desktop Version  */}
      <div className="rounded-[20px] p-4 bg-white hidden md:block">
        <h2 className="font-gilroy-bold hidden md:block">Popular Cars</h2>

        <div className="mt-4 grid grid-cols-2 gap-x-4 items-center">
          <div className="relative h-[247px] overflow-hidden rounded-[20px]">
            <Image
              src={`/images/cars/1.webp`}
              fill
              alt={`Car Image`}
              quality={100}
              className=" object-cover object-center"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
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

              <div className="flex justify-between items-center mt-2">
                <div className="flex flex-col">
                  <span className="font-gilroy-bold text-base sm:text-[22px]">
                    GLE AMG 63S
                  </span>

                  <div>
                    <span className="font-gilroy-bold ">456k/</span>
                    <span className="font-gilroy-medium text-neutral-450">
                      day
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="font-gilroy-medium text-neutral-450">
                    4.5
                  </span>
                  <Image
                    src="/images/icons/star-1.svg"
                    alt="Star"
                    width={20}
                    height={20}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between space-x-4 mt-6 font-gilroy-medium text-neutral-450 border-b border-neutral-270 pb-2">
                <div className="flex items-center space-x-2">
                  <Image
                    src="/images/icons/gas-station.svg"
                    alt="Fuel"
                    width={20}
                    height={20}
                  />
                  <span>90L</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Image
                    src="/images/icons/steering-wheel.svg"
                    alt="Transmission"
                    width={20}
                    height={20}
                  />
                  <span>Manual</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Image
                    src="/images/icons/user-profile.svg"
                    alt="Capacity"
                    width={20}
                    height={20}
                  />
                  <span>2 Persons</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button
                type="button"
                variant="dark-primary"
                fontFamily="gilroy-medium"
                rounded="full"
                fullWidth
                shadow="shadow-none"
                className="py-3"
              >
                Rent Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version */}

      <div
        className="
          flex gap-4 mt-2 overflow-x-auto pb-4 scrollbar-hide md:hidden
        "
      >
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white border-[#e4e4e4] shadow-[0_10px_48.8px_0_rgba(0,0,0,0.18)] p-4 rounded-lg flex-shrink-0 
              "
          >
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
            <div className="pb-2 text-sm">
              <div className="flex justify-between w-full">
                <span className="font-gilroy-bold">{car.title}</span>
                <div className="flex items-center space-x-2">
                  <span className="font-gilroy-medium text-neutral-450">
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
                  <div className="flex items-center justify-between space-x-4 mt-4">
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
                  <div className="h-[1px] mt-4 bg-neutral-270" />

                  {/* Price + button */}
                  <div className="flex items-stretch justify-between sm:hidden mt-4">
                    <div className="flex flex-col flex-1 justify-end">
                      <div className="text-base">
                        <span className="font-gilroy-bold ">{car.price}</span>
                        <span className="font-gilroy-medium text-neutral-450">
                          day
                        </span>
                      </div>
                    </div>
                    <Button variant="primary" fontFamily="gilroy-medium">
                      Rent Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
