import { useQuery } from "@tanstack/react-query";
import { getAvailableVehicles } from "@/services/vehicleService";

export function useAvailableVehicles() {
  return useQuery({
    queryKey: ["availableVehicles"],
    queryFn: getAvailableVehicles,
    retry: false,
  });
}
