"use client";
import Image from "next/image";
import { Button } from "../ui/Buttons";

export interface CarCardProps {
  id: number;
  src: string;
  title: string;
  price: string;
  rating: number;
  fuel: string;
  transmission: string;
  capacity: string;
  onRentClick?: (id: number) => void;
  onFavoriteClick?: (id: number) => void;
  isFavorite?: boolean;
}

export function CarCard({
  id,
  src,
  title,
  price,
  rating,
  fuel,
  transmission,
  capacity,
  onRentClick,
  onFavoriteClick,
  isFavorite = false,
}: CarCardProps) {
  const handleRentClick = () => {
    onRentClick?.(id);
  };

  const handleFavoriteClick = () => {
    onFavoriteClick?.(id);
  };

  return (
    <div className="bg-white border border-neutral-160 lg:border-none shadow-[0_10px_48.8px_0_rgba(0,0,0,0.18)] lg:shadow-none p-4 rounded-lg flex-shrink-0">
      {/* Favorite Button */}
      <span className="flex justify-end">
        <button
          onClick={handleFavoriteClick}
          className="transition duration-200 hover:scale-105 active:scale-95 cursor-pointer mb-4"
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

      {/* Car Image */}
      <div className="flex justify-center mb-2">
        <div className="relative w-[300px] h-[193px]">
          <Image
            src={`/images/cars/${src}.webp`}
            fill
            alt={`${title} car`}
            quality={100}
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Details */}
      <div className="pb-2 text-sm">
        {/* Title and Rating */}
        <div className="flex items-center justify-between w-full min-w-0 mb-4">
          <span className="font-gilroy-bold truncate flex-1">{title}</span>
          <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
            <span className="font-gilroy-medium text-neutral-450">
              {rating}
            </span>
            <Image
              src="/images/icons/star-1.svg"
              alt="Star"
              width={20}
              height={20}
            />
          </div>
        </div>

        {/* Specs */}
        <div className="flex items-center justify-between space-x-2 mt-4">
          <div className="flex items-center space-x-2 min-w-0">
            <Image
              src="/images/icons/gas-station.svg"
              alt="Fuel"
              width={20}
              height={20}
              className="flex-shrink-0"
            />
            <span className="font-gilroy-medium text-neutral-450 truncate">
              {fuel}
            </span>
          </div>
          <div className="flex items-center space-x-2 min-w-0">
            <Image
              src="/images/icons/steering-wheel.svg"
              alt="Transmission"
              width={20}
              height={20}
              className="flex-shrink-0"
            />
            <span className="font-gilroy-medium text-neutral-450 truncate">
              {transmission}
            </span>
          </div>
          <div className="flex items-center space-x-2 min-w-0">
            <Image
              src="/images/icons/user-profile.svg"
              alt="Capacity"
              width={20}
              height={20}
              className="flex-shrink-0"
            />
            <span className="font-gilroy-medium text-neutral-450 truncate">
              {capacity}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] mt-4 bg-neutral-270" />

        {/* Price and Button */}
        <div className="flex items-center justify-between mt-4 gap-4 min-w-0">
          <div className="flex flex-col justify-end">
            <div className="text-base whitespace-nowrap">
              <span className="font-gilroy-bold">{price}</span>
              <span className="font-gilroy-medium text-neutral-450">day</span>
            </div>
          </div>
          <Button
            variant="primary"
            fontFamily="gilroy-medium"
            onClick={handleRentClick}
            className="flex-shrink-0"
          >
            Rent Now
          </Button>
        </div>
      </div>
    </div>
  );
}
