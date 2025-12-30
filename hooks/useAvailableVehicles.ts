import { useQuery } from "@tanstack/react-query";
import { getAvailableVehicles } from "@/services/vehicleService";

export function useAvailableVehicles() {
  return useQuery({
    queryKey: ["availableVehicles"],
    queryFn: () => getAvailableVehicles(),
    retry: 2,
    staleTime: 60 * 1000, // 1 minute
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}
