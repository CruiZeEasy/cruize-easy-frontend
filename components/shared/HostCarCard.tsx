"use client";

import { getOptimizedImage } from "@/utils/cloudinary";
import { capitalize } from "@/utils/formatters/capitalize";
import Image from "next/image";

interface HostCarCardProps {
  id: number;
  name: string;
  imageUrl: string;
  location?: string;
  fuelCapacity?: string;
  transmission: string;
  seats: number;
  onDelete?: (id: number) => void;
  onClick?: (id: number) => void;
}

export function HostCarCard({
  id,
  name,
  imageUrl,
  location = "Jl. Sultan Iskandar Muda, Jakarta selatan",
  fuelCapacity = "90L",
  transmission,
  seats,
  onDelete,
  onClick,
}: HostCarCardProps) {
  const optimizedImage = getOptimizedImage(imageUrl, 70);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when deleting
    onDelete?.(id);
  };

  //   Coming Soon
  const handleClick = () => {
    onClick?.(id);
  };

  return (
    <div
      //   onClick={handleClick}
      className="relative h-[302px] sm:h-[377px] rounded-[20px] overflow-hidden bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${optimizedImage})` }}
    >
      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="relative z-20 flex flex-col justify-between h-full">
        <div className="flex items-center justify-between">
          <div />
          {onDelete && (
            <button
              onClick={handleDelete}
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
          <span className="text-sm truncate">{location}</span>

          <div className="mt-4 flex items-center space-x-4 text-sm">
            {/* Fuel */}
            <div className="flex items-center space-x-2">
              <div className="bg-white/20 p-2 rounded-md flex-shrink-0">
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
              <div className="bg-white/20 p-2 rounded-md flex-shrink-0">
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
              <div className="bg-white/20 p-2 rounded-md flex-shrink-0">
                <Image
                  src="/images/icons/user-profile-2-light.svg"
                  alt="Capacity"
                  width={20}
                  height={20}
                />
              </div>
              <span>
                {seats}{" "}
                <span className="hidden sm:inline">
                  Person{seats !== 1 && "s"}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
