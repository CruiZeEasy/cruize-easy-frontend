import { useQuery } from "@tanstack/react-query";
import { getHostProfileById } from "@/services/hostService";

export function usePublicHostProfile(hostId: string) {
  return useQuery({
    queryKey: ["publicHostProfile", hostId],
    queryFn: () => getHostProfileById(hostId),
    retry: false,
    enabled: !!hostId, // Only fetch if hostId is provided
  });
}
