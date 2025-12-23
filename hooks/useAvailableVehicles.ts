import { useQuery } from "@tanstack/react-query";
import { getAvailableVehicles } from "@/services/vehicleService";

export function useAvailableVehicles() {
  return useQuery({
    queryKey: ["availableVehicles"],
    queryFn: () => getAvailableVehicles(),
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}
