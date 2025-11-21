import { RentType, TransmissionType } from "@/constants/enums";

interface VehicleDocumentPayload {
  documentType: string;
  documentUrl: string;
  publicId: string;
  size: number;
  uploadedAt: string;
}

interface VehicleImagePayload {
  url: string;
  publicId: string;
  order: number;
  uploadedAt: string;
}

interface VehicleWorkingHoursPayload {
  day: string;
  isActive: boolean;
  startTime: string;
  endTime: string;
}

type VehicleStatus =
  | "DRAFT"
  | "AVAILABLE"
  | "RENTED"
  | "MAINTENANCE"
  | "INACTIVE"
  | "PENDING_APPROVAL";

export interface Vehicle {
  id: string;
  hostId: string;
  name: string;
  brand: string;
  description: string;
  color: string;
  licensePlate: string;
  vin: string;
  rentType: RentType;
  isTinted: boolean;

  pricePerDay: number;

  transmission: TransmissionType;

  seats: number;

  images: VehicleImagePayload[];

  fuelPrice: number;

  status: VehicleStatus;
  instantBooking: boolean;

  minimumRentalDays: number;
  maximumRentalDays: number;

  documents: VehicleDocumentPayload[];

  workingHours: VehicleWorkingHoursPayload[];

  averageRating: number;
  totalReviews: number;
  totalBookings: number;
  viewCount: number;
}

export interface CreateVehiclePayload {
  name: string;
  brand: string;
  description: string;
  color: string;
  licensePlate: string;
  rentType: RentType;
  vin: string;
  isTinted?: boolean;
  pricePerDay: string;
  transmission: TransmissionType;
  seats: number;
  fuelPrice: string;
  confirmPhoto: boolean;

  images: VehicleImagePayload[];
  documents: VehicleDocumentPayload[];

  workingHours: VehicleWorkingHoursPayload[];
}
