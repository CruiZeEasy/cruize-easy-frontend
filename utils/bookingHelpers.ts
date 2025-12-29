import { BookingStatus } from "@/components/shared/BookingCard";
import { BookingData } from "@/types/booking";

export function getUIStatus(apiStatus: BookingData["status"]): BookingStatus {
  switch (apiStatus) {
    case "PENDING":
    case "CONFIRMED":
      return "upcoming";
    case "ACTIVE":
      return "ongoing";
    case "COMPLETED":
      return "completed";
    default:
      return "upcoming";
  }
}

// Map UI status to API status for filtering
export function getApiStatus(
  uiStatus: BookingStatus
): BookingData["status"] | undefined {
  switch (uiStatus) {
    case "upcoming":
      return undefined; // Fetch all and filter client-side for PENDING & CONFIRMED
    case "ongoing":
      return "ACTIVE";
    case "completed":
      return "COMPLETED";
    default:
      return undefined;
  }
}
