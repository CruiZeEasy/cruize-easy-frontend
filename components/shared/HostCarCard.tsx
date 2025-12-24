"use client";

import { getOptimizedImage } from "@/utils/cloudinary";
import { capitalize } from "@/utils/formatters/capitalize";
import clsx from "clsx";
import Image from "next/image";

interface HostCarCardProps {
  id: string;
  name: string;
  imageUrl?: string;
  location?: string;
  fuelCapacity?: string;
  transmission: string;
  seats: number;
  variant?: "host" | "user";
  onDelete?: (id: string) => void;
  onClick?: (id: string) => void;
}

export function HostCarCard({
  id,
  name,
  imageUrl,
  location = "Jl. Sultan Iskandar Muda, Jakarta selatan",
  fuelCapacity = "90L",
  transmission,
  seats,
  variant = "host",
  onDelete,
  onClick,
}: HostCarCardProps) {
  const isExternalImage =
    imageUrl?.startsWith("http://") || imageUrl?.startsWith("https://");
  const imageSrc = isExternalImage
    ? getOptimizedImage(imageUrl!, 70)
    : "/images/cars/default.webp";

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(id);
  };

  const handleClick = () => {
    onClick?.(id);
  };

  return (
    <div
      //   onClick={handleClick}
      className="relative h-[302px] sm:h-[377px] rounded-[20px] overflow-hidden bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
      <div className="absolute inset-0 bg-black/50 z-10" />

      <div
        className={clsx(
          "relative z-20 flex flex-col justify-between h-full",
          variant === "user" && "justify-end"
        )}
      >
        <div
          className={clsx(
            "flex items-center justify-between",
            variant === "user" && "hidden"
          )}
        >
          <div />
          {onDelete && (
            <button
              // onClick={handleDelete}
              className="cursor-pointer hover:scale-110 transition-transform"
              aria-label="Delete car"
            >
              <Image
                src="/images/icons/thrash-light.svg"
                alt="Delete"
                width={24}
                height={24}
              />
            </button>
          )}
        </div>

        <div className="font-gilroy-medium text-neutral-260 flex flex-col">
          <span className="text-white text-xl uppercase truncate">{name}</span>
          <span className="text-sm">{location}</span>

          <div className="mt-4 flex items-center space-x-4 text-sm">
            {/* Fuel */}
            <div className="flex items-center space-x-2">
              <div className="bg-white/20 p-2 rounded-md shrink-0">
                <Image
                  src="/images/icons/gas-station-light.svg"
                  alt="Fuel"
                  width={20}
                  height={20}
                />
              </div>
              <span>{fuelCapacity}</span>
            </div>

            {/* Transmission */}
            <div className="flex items-center space-x-2">
              <div className="bg-white/20 p-2 rounded-md shrink-0">
                <Image
                  src="/images/icons/steering-wheel-light.svg"
                  alt="Transmission"
                  width={20}
                  height={20}
                />
              </div>
              <span>{capitalize(transmission)}</span>
            </div>

            {/* Capacity */}
            <div className="flex items-center space-x-2">
              <div className="bg-white/20 p-2 rounded-md shrink-0">
                <Image
                  src="/images/icons/user-profile-2-light.svg"
                  alt="Capacity"
                  width={20}
                  height={20}
                />
              </div>
              <span>
                {seats} <span className="hidden sm:inline">People</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
