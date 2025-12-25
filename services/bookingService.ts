// import { apiClient } from "@/utils/apiClient";
// import { API_ROUTES } from "@/utils/apiRoutes";

// export interface CreateBookingPayload {
//   vehicleId: string;
//   startDateTime: string;
//   endDateTime: string;
//   dropOffLocation: {
//     address: string;
//     city: string;
//     state: string;
//     country: string;
//     postalCode: string;
//     coordinates: {
//       x: number;
//       y: number;
//       type: "Point";
//       coordinates: [number, number];
//     };
//     notes?: string;
//     latitude: number;
//     longitude: number;
//   } | null;
//   deliveryRequested: boolean;
//   idempotencyKey: string;
// }

// export interface BookingResponse {
//   success: boolean;
//   id: string;
//   vehicleId: string;
//   userId: string;
//   startDateTime: string;
//   endDateTime: string;
//   status: string;
//   totalPrice: number;
//   // Add other fields as needed based on your API response
// }

// export async function createBooking(data: CreateBookingPayload) {
//   return apiClient<BookingResponse>(API_ROUTES.BOOKINGS.CREATE, {
//     method: "POST",
//     body: JSON.stringify(data),
//   });
// }

// services/bookingService.ts
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

export interface LocationDetails {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  notes: string;
  latitude: number;
  longitude: number;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    bookingNumber: string;
    vehicleId: string;
    vehicleName: string;
    vehicleImage: string;
    startDateTime: string;
    endDateTime: string;
    totalDays: number;
    totalHours: number;
    pickupLocation: LocationDetails;
    dropOffLocation: LocationDetails;
    deliveryRequested: boolean;
    pricePerDay: number;
    subtotal: number;
    platformFee: number;
    insuranceFee: number;
    depositAmount: number;
    cautionFee: number;
    deliveryFee: number;
    totalAmount: number;
    status:
      | "PENDING"
      | "CONFIRMED"
      | "ACTIVE"
      | "COMPLETED"
      | "CANCELLED"
      | "REJECTED"
      | "DISPUTED";
    paymentStatus:
      | "PENDING"
      | "PAID"
      | "PARTIALLY_REFUNDED"
      | "REFUNDED"
      | "FAILED"
      | "PROCESSING";
    checkoutUrl: string;
    note: string;
    createdAt: string;
    expiresAt: string;
  };
}

export interface ConfirmPaymentPayload {
  paymentMethod: "WALLET";
  transactionPin: string;
}

export interface ConfirmPaymentResponse {
  success: boolean;
  message: string;
  bookingId: string;
  paymentStatus: string;
  transactionReference: string;
}

export async function createBooking(data: CreateBookingPayload) {
  return apiClient<BookingResponse>(API_ROUTES.BOOKINGS.CREATE, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getBookingDetails(bookingId: string) {
  return apiClient<BookingResponse>(`/api/v1/bookings/${bookingId}`, {
    method: "GET",
  });
}

export async function confirmBookingPayment(
  bookingId: string,
  data: ConfirmPaymentPayload
) {
  return apiClient<ConfirmPaymentResponse>(
    `/api/v1/bookings/${bookingId}/confirm-payment`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}
