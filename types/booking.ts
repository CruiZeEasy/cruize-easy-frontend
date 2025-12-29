import { VehicleImagePayload } from "@/types/vehicle";

export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELLED"
  | "REJECTED"
  | "DISPUTED";

export type PaymentStatus =
  | "PENDING"
  | "PAID"
  | "PARTIALLY_REFUNDED"
  | "REFUNDED"
  | "FAILED"
  | "PROCESSING";

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

export interface BookingData {
  success: boolean;
  message: string;
  id: string;
  bookingNumber: string;
  vehicleId: string;
  vehicleName: string;
  vehicleBrand: string;
  images: VehicleImagePayload[];
  renterId: string;
  renterName: string;
  hostId: string;
  hostName: string;
  startDateTime: string;
  endDateTime: string;
  totalDays: number;
  totalHours: number;
  pickupLocation: LocationDetails;
  dropOffLocation: LocationDetails;
  deliveryRequested: boolean;
  deliveryFee: number;
  pricePerDay: number;
  subtotal: number;
  platformFee: number;
  insuranceFee: number;
  depositAmount: number;
  cautionFee: number | null;
  deliveryCharge: number;
  totalAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  paymentUrl: string | null;
  createdAt: string;
  confirmedAt: string | null;
  expectedPickupTime: string;
  actualPickupTime: string | null;
  expectedReturnTime: string;
  actualReturnTime: string | null;
  pickupConfirmedByRenter: string | null;
  pickupConfirmedByHost: string | null;
  returnConfirmedByRenter: string | null;
  returnConfirmedByHost: string | null;
  latePickupFee: number | null;
  latePickupHours: number | null;
  lateReturnFee: number | null;
  lateReturnHours: number | null;
  lateDeliveryFee: number | null;
  lateDeliveryHours: number | null;
  totalLateFees: number | null;
  expectedDeliveryTime: string | null;
  actualDeliveryTime: string | null;
  deliveryConfirmedByHost: string | null;
}

export interface MyBookingsQueryParams {
  status?: BookingStatus;
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
}

export interface MyBookingsResponse {
  success: boolean;
  message: string;
  data: {
    bookings: BookingData[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRevenue: number;
    pendingCount: number;
    confirmedCount: number;
    activeCount: number;
    completedCount: number;
    cancelledCount: number;
  };
  timestamp: string;
}
