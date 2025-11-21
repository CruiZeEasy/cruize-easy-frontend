import { useQuery } from "@tanstack/react-query";
import { getHostVehicles } from "@/services/vehicleService";

export function useHostVehicles() {
  return useQuery({
    queryKey: ["hostVehicles"],
    queryFn: getHostVehicles,
    retry: false, 
  });
}
