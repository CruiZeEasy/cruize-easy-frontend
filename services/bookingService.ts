import { VehicleImagePayload, VehicleLocationPayload } from "@/types/vehicle";
import { apiClient } from "@/utils/apiClient";
import { API_ROUTES } from "@/utils/apiRoutes";
import {
  BookingStatus,
  MyBookingsQueryParams,
  MyBookingsResponse,
  PaymentStatus,
} from "@/types/booking";

export interface CreateBookingPayload {
  vehicleId: string;
  startDateTime: string;
  endDateTime: string;
  dropOffLocation: VehicleLocationPayload | null;
  deliveryRequested: boolean;
  idempotencyKey: string;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    bookingNumber: string;
    vehicleId: string;
    vehicleName: string;
    vehicleBrand: string;
    images: VehicleImagePayload[];
    startDateTime: string;
    endDateTime: string;
    totalDays: number;
    totalHours: number;
    pickupLocation: VehicleLocationPayload;
    dropOffLocation: VehicleLocationPayload;
    deliveryRequested: boolean;
    pricePerDay: number;
    subtotal: number;
    platformFee: number;
    insuranceFee: number;
    depositAmount: number;
    cautionFee: number;
    deliveryFee: number;
    totalAmount: number;
    status: BookingStatus;
    paymentStatus: PaymentStatus;
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
  return apiClient<BookingResponse>(
    API_ROUTES.BOOKINGS.GET_BOOKING_DETAILS(bookingId),
    {
      method: "GET",
    }
  );
}

export async function confirmBookingPayment(
  bookingId: string,
  data: ConfirmPaymentPayload
) {
  return apiClient<ConfirmPaymentResponse>(
    API_ROUTES.BOOKINGS.CONFIRM_PAYMENT(bookingId),
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

export async function getMyBookings(params?: MyBookingsQueryParams) {
  const queryParams = new URLSearchParams();

  if (params?.status) queryParams.append("status", params.status);
  if (params?.startDate) queryParams.append("startDate", params.startDate);
  if (params?.endDate) queryParams.append("endDate", params.endDate);
  if (params?.page !== undefined)
    queryParams.append("page", params.page.toString());
  if (params?.size !== undefined)
    queryParams.append("size", params.size.toString());
  if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
  if (params?.sortDirection)
    queryParams.append("sortDirection", params.sortDirection);

  const url = `${API_ROUTES.BOOKINGS.GET_BOOKINGS}${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;

  return apiClient<MyBookingsResponse>(url, {
    method: "GET",
  });
}
