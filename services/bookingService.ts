import { apiClient } from "@/utils/apiClient";
import { API_ROUTES } from "@/utils/apiRoutes";

export interface CreateBookingPayload {
  vehicleId: string;
  startDateTime: string;
  endDateTime: string;
  dropOffLocation: {
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    coordinates: {
      x: number;
      y: number;
      type: "Point";
      coordinates: [number, number];
    };
    notes?: string;
    latitude: number;
    longitude: number;
  } | null;
  deliveryRequested: boolean;
  idempotencyKey: string;
}

export interface BookingResponse {
  success: boolean;
  id: string;
  vehicleId: string;
  userId: string;
  startDateTime: string;
  endDateTime: string;
  status: string;
  totalPrice: number;
  // Add other fields as needed based on your API response
}

export async function createBooking(data: CreateBookingPayload) {
  return apiClient<BookingResponse>(API_ROUTES.BOOKINGS.CREATE, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
