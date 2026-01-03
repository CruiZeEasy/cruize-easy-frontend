import { useQuery } from "@tanstack/react-query";
import {
  getHostProfileById,
  getHostVehiclesByHostId,
} from "@/services/hostService";

export function usePublicHostProfile(hostId: string) {
  return useQuery({
    queryKey: ["publicHostProfile", hostId],
    queryFn: () => getHostProfileById(hostId),
    retry: false,
    enabled: !!hostId, // Only fetch if hostId is provided
  });
}

export function usePublicHostVehicles(hostId: string) {
  return useQuery({
    queryKey: ["publicHostVehicles", hostId],
    queryFn: () => getHostVehiclesByHostId(hostId),
    retry: false,
    enabled: !!hostId, // Only fetch if hostId is provided
  });
}
