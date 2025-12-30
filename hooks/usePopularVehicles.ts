import { useQuery } from "@tanstack/react-query";
import { getPopularVehicles } from "@/services/vehicleService";

export function usePopularVehicles(limit: number = 5) {
  return useQuery({
    queryKey: ["popularVehicles", limit],
    queryFn: () => getPopularVehicles(limit),
    retry: 2,
    staleTime: 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}
