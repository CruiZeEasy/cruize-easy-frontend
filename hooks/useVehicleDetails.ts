import { useQuery } from "@tanstack/react-query";
import { getVehicleDetails } from "@/services/vehicleService";

export function useVehicleDetails(vehicleId: string) {
  return useQuery({
    queryKey: ["vehicleDetails", vehicleId],
    queryFn: () => getVehicleDetails(vehicleId),
    enabled: !!vehicleId,
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
