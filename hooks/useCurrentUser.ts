import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/userService";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false, // don't spam login endpoint if unauthenticated
  });
}
