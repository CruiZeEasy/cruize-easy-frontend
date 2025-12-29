import { useQuery } from "@tanstack/react-query";
import { getMyBookings } from "@/services/bookingService";
import { MyBookingsQueryParams } from "@/types/booking";

export function useMyBookings(params?: MyBookingsQueryParams) {
  return useQuery({
    queryKey: ["myBookings", params],
    queryFn: () => getMyBookings(params),
    retry: 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}
