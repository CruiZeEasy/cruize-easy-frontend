"use client";

import Image from "next/image";
import { Button } from "../ui/Buttons";
import { formatName } from "@/utils/formatters";

export interface CarCardProps {
  id: string;
  src: string;
  title: string;
  price: string;
  rating: number;
  fuel: string;
  transmission: string;
  capacity: string;
  onRentClick?: (id: string) => void;
  onFavoriteClick?: (id: string) => void;
  isExternalImage?: boolean;
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

  // Check if src is a full URL (from API) or local path
  const isExternalImage =
    src.startsWith("http://") || src.startsWith("https://");
  const imageSrc = isExternalImage ? src : `/images/cars/${src}.webp`;

  return (
    <div className="bg-white border border-neutral-160 lg:border-none shadow-[0_10px_48.8px_0_rgba(0,0,0,0.18)] lg:shadow-none p-4 rounded-lg shrink-0">
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
        <div className="relative w-full max-w-[300px] h-[193px] bg-neutral-100 rounded overflow-hidden">
          <Image
            src={imageSrc}
            fill
            alt={`${title} car`}
            quality={100}
            className="object-cover object-center"
            unoptimized={isExternalImage} // Don't optimize external images
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              const target = e.target as HTMLImageElement;
              target.src = "/images/cars/default.webp";
            }}
          />
        </div>
      </div>

      {/* Details */}
      <div className="pb-2 text-sm">
        {/* Title and Rating */}
        <div className="flex items-center justify-between w-full min-w-0 mb-4">
          <span className="font-gilroy-bold truncate flex-1">
            {formatName(title)}
          </span>
          <div className="flex items-center space-x-2 shrink-0 ml-2">
            <span className="font-gilroy-medium text-neutral-450">
              {rating > 0 ? rating.toFixed(1) : "New"}
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
              className="shrink-0"
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
              className="shrink-0"
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
              className="shrink-0"
            />
            <span className="font-gilroy-medium text-neutral-450 truncate">
              {capacity}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mt-4 bg-neutral-270" />

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
            className="shrink-0"
          >
            Rent Now
          </Button>
        </div>
      </div>
    </div>
  );
}
