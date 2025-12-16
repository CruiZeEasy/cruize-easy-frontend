import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/services/userService";

export function useUserProfile() {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    retry: false,
  });
}
