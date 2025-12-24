import { CarCardProps } from "@/components/shared/CarCard";
import { formatNGN } from "./formatters/formatNGN";
import { Vehicle } from "@/types/vehicle";

export function transformVehicleForDisplay(vehicle: Vehicle): CarCardProps {
  const primaryImage =
    vehicle.images?.find((img) => img.order === 0)?.url ||
    vehicle.images?.[0]?.url ||
    vehicle.primaryImageUrl;

  const formattedPrice = formatNGN(vehicle.pricePerDay);

  const isExternalImage =
    primaryImage?.startsWith("http://") || primaryImage?.startsWith("https://");
  const imageSrc = isExternalImage ? primaryImage : "/images/cars/default.webp";

  return {
    id: vehicle.id,
    src: imageSrc,
    title: `${vehicle.brand} ${vehicle.name}`,
    price: `${formattedPrice}/`,
    rating: vehicle.averageRating || 0,
    fuel: vehicle.fuelType || "N/A",
    transmission: vehicle.transmission === "AUTOMATIC" ? "Auto" : "Manual",
    capacity: `${vehicle.seats} People`,
    isExternalImage,
    isFavorite: false,
  };
}
