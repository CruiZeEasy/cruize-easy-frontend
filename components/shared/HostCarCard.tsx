"use client";

import { getOptimizedImage } from "@/utils/cloudinary";
import { capitalize } from "@/utils/formatters/capitalize";
import clsx from "clsx";
import Image from "next/image";

interface HostCarCardProps {
  id: string;
  src: string;
  title: string;
  location?: string;
  fuel: string;
  transmission: string;
  capacity: string;
  variant?: "host" | "user";
  hideDeleteButton?: boolean;
  onDelete?: (id: string) => void;
  onClick?: (id: string) => void;
}

export function HostCarCard({
  id,
  src,
  title,
  location = "Jl. Sultan Iskandar Muda, Jakarta selatan",
  fuel,
  transmission,
  capacity,
  variant = "host",
  hideDeleteButton = false,
  onDelete,
  onClick,
}: HostCarCardProps) {
  const isExternalImage =
    src?.startsWith("http://") || src?.startsWith("https://");
  const imageSrc = isExternalImage
    ? getOptimizedImage(src!, 70)
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
          {!hideDeleteButton && onDelete && (
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
          <span className="text-white text-xl uppercase truncate">{title}</span>
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
              <span>{fuel}</span>
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
              <span>{capacity}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
