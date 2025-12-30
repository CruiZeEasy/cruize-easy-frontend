import { useQuery } from "@tanstack/react-query";
import { getRecentVehicles } from "@/services/vehicleService";

export function useRecentVehicles(limit: number = 5) {
  return useQuery({
    queryKey: ["recentVehicles", limit],
    queryFn: () => getRecentVehicles(limit),
    retry: 2,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}
