"use client";
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
    src: "/images/cars/1.png",
    title: "GLE AMG 63S",
    price: "456k/",
    rating: 4.5,
    fuel: "90L",
    transmission: "Manual",
    capacity: "4 Persons",
  },
  {
    id: 2,
    src: "/images/cars/2.png",
    title: "GLE AMG 63S",
    price: "456k/",
    rating: 4.5,
    fuel: "90L",
    transmission: "Manual",
    capacity: "4 Persons",
  },
  {
    id: 3,
    src: "/images/cars/3.png",
    title: "GLE AMG 63S",
    price: "456k/",
    rating: 4.5,
    fuel: "90L",
    transmission: "Manual",
    capacity: "4 Persons",
  },
  {
    id: 4,
    src: "/images/cars/4.png",
    title: "GLE AMG 63S",
    price: "456k/",
    rating: 4.5,
    fuel: "90L",
    transmission: "Manual",
    capacity: "4 Persons",
  },
];

export function PopularCarsSection() {
  return (
    <section className="container mb-12 sm:mb-20">
      <div className="flex flex-col lg:items-center lg:text-center space-y-6 lg:mb-12">
        <h2 className="text-[18px] lg:text-4xl font-gilroy-bold text-neutral-900">
          Popular Cars
        </h2>
        <p className=" text-neutral-600 font-gilroy-medium hidden lg:block">
          Choose from our selection of premium vehicles for your next adventure.
        </p>
      </div>

      <div
        className="
    flex gap-4 overflow-x-auto pb-4 
    scrollbar-hide 
    lg:grid  lg:grid-cols-2
  "
      >
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white border-[#e4e4e4] shadow-lg p-4 rounded-lg flex-shrink-0"
          >
            <span className="flex justify-end">
              <button className="transition duration-20 hover:scale-[1.02] active:scale-95 cursor-pointer mb-4 sm:mb-0">
                <Image
                  src="/images/icons/heart.svg"
                  width={50}
                  height={50}
                  alt="heart icon"
                  className="size-6"
                />
              </button>
            </span>
            <div className="flex justify-center mb-2">
              <Image src={car.src} width={300} height={100} alt="Car Image" />
            </div>

            <div className="pb-2">
              <div className="hidden sm:flex justify-end text-[18px]">
                <span className="font-gilroy-bold ">{car.price}</span>
                <span className="font-gilroy-medium text-neutral-450">day</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-between sm:justify-start  w-full sm:w-auto space-x-4 sm:-mt-2">
                  <span className="font-gilroy-bold text-base sm:text-[22px]">
                    {car.title}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="font-gilroy-medium text-neutral-450 text-[18px]">
                      {car.rating}
                    </span>
                    <Image
                      src="/images/icons/star-1.svg"
                      alt="Star-Icon"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-stretch justify-between">
                {/* Left side */}
                <div className="flex flex-col justify-between flex-1">
                  <div className="flex items-center justify-between sm:justify-start space-x-4 mt-4 sm:mt-0">
                    <div className="flex items-center space-x-2">
                      <Image
                        src="/images/icons/gas-station.svg"
                        alt="Gas-Icon"
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
                        alt="Steering-Icon"
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
                        alt="User-Icon"
                        width={20}
                        height={20}
                      />
                      <span className="font-gilroy-medium text-neutral-450">
                        {car.capacity}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-[1px] mt-4 sm:mt-0 sm:w-[16rem] bg-[#D3D3D3]" />

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

                {/* Button */}
                <Button
                  variant="primary"
                  fontFamily="gilroy-medium"
                  className="py-3 ml-4 w-44 hidden sm:block"
                >
                  Rent Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12 sm:mt-20">
        <Button variant="primary" className="py-4 w-48">
          View all Cars
        </Button>
      </div>
    </section>
  );
}
