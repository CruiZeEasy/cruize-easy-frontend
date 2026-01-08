// components/landing/LandingCarCard.tsx
"use client";

import Image from "next/image";
import { Button } from "../ui/Buttons";
import { motion } from "framer-motion";

export interface LandingCarCardProps {
  id: string;
  src: string;
  title: string;
  price: string;
  rating: number | string;
  fuel: string;
  transmission: string;
  capacity: string;
  index?: number;
  inView?: boolean;
  onRentClick?: (id: string) => void;
  onFavoriteClick?: (id: string) => void;
  isFavorite?: boolean;
  isExternalImage?: boolean;
}

export function LandingCarCard({
  id,
  src,
  title,
  price,
  rating,
  fuel,
  transmission,
  capacity,
  index = 0,
  inView = true,
  onRentClick,
  onFavoriteClick,
  isFavorite = false,
  isExternalImage = false,
}: LandingCarCardProps) {
  const imageSrc = isExternalImage ? src : `/images/cars/${src}.webp`;

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="bg-white border-neutral-160 shadow-[0_10px_48.8px_0_rgba(0,0,0,0.18)] p-4 rounded-lg shrink-0 
        transition-transform duration-300 hover:scale-[1.02]"
    >
      {/* Favorite button */}
      <span className="flex justify-end">
        <button
          onClick={() => onFavoriteClick?.(id)}
          className="transition duration-200 hover:scale-105 active:scale-95 cursor-pointer mb-4 sm:mb-0"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Image
            src={
              isFavorite
                ? "/images/icons/heart-filled.svg"
                : "/images/icons/heart.svg"
            }
            width={24}
            height={24}
            alt="Favorite icon"
            className="size-6"
          />
        </button>
      </span>

      {/* Car image */}
      <div className="flex mx-auto relative h-[193px] w-[300px] justify-center mb-2 bg-neutral-100 rounded overflow-hidden">
        <Image
          src={imageSrc}
          fill
          alt={`${title} car`}
          quality={75}
          className="object-cover"
          unoptimized={isExternalImage}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/images/cars/default.webp";
          }}
        />
      </div>

      {/* Details */}
      <div className="pb-2">
        {/* Desktop price (top right) */}
        <div className="hidden sm:flex justify-end text-[18px]">
          <span className="font-gilroy-bold">{price}</span>
          <span className="font-gilroy-medium text-neutral-450">day</span>
        </div>

        {/* Title + Rating */}
        <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto space-x-4 sm:-mt-2">
          <span className="font-gilroy-bold text-base sm:text-[22px]">
            {title}
          </span>
          <div className="flex items-center space-x-2">
            <span className="font-gilroy-medium text-neutral-450 text-[18px]">
              {typeof rating === "number" && rating > 0
                ? rating.toFixed(1)
                : rating || "New"}
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
            {/* Specs row */}
            <div className="flex items-center justify-between sm:justify-start space-x-4 mt-4 sm:mt-0">
              <div className="flex items-center space-x-2">
                <Image
                  src="/images/icons/gas-station.svg"
                  alt="Fuel"
                  width={20}
                  height={20}
                />
                <span className="font-gilroy-medium text-neutral-450">
                  {fuel}
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
                  {transmission}
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
                  {capacity}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px mt-4 sm:mt-0 sm:w-64 bg-neutral-270" />

            {/* Mobile price + button */}
            <div className="flex items-stretch justify-between sm:hidden mt-4">
              <div className="flex flex-col flex-1 justify-end">
                <div className="text-[18px]">
                  <span className="font-gilroy-bold">{price}</span>
                  <span className="font-gilroy-medium text-neutral-450">
                    day
                  </span>
                </div>
              </div>
              <Button
                variant="primary"
                fontFamily="gilroy-medium"
                className="py-3"
                onClick={() => onRentClick?.(id)}
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
            onClick={() => onRentClick?.(id)}
          >
            Rent Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
``;
