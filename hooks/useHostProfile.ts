import { useQuery } from "@tanstack/react-query";
import { getHostProfile } from "@/services/hostService";

export function useHostProfile() {
  return useQuery({
    queryKey: ["hostProfile"],
    queryFn: getHostProfile,
    retry: false,
  });
}
