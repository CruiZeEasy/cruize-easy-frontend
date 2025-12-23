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

export interface VehicleLocationPayload {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  notes?: string;
  coordinates: {
    x: number; // longitude
    y: number; // latitude
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  latitude: number;
  longitude: number;
}

type VehicleStatus =
  | "DRAFT"
  | "AVAILABLE"
  | "RENTED"
  | "MAINTENANCE"
  | "INACTIVE"
  | "PENDING_APPROVAL";

export interface Vehicle {
  id: number;
  hostId: string;
  hostName: string;
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

  fuelType: "PETROL"; // new field

  seats: number;

  images: VehicleImagePayload[];

  fuelPrice: number;

  primaryImageUrl: string; // new field

  status: VehicleStatus;
  instantBooking: boolean;

  minimumRentalDays: number;
  maximumRentalDays: number;

  documents: VehicleDocumentPayload[];

  workingHours: VehicleWorkingHoursPayload[];

  pickupLocation?: VehicleLocationPayload;

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

  pickupLocation: VehicleLocationPayload;
}

export interface VehicleDetailsResponse {
  success: boolean;
  id: string;
  hostId: string;
  hostName: string;
  hostProfileImage: string;
  name: string;
  brand: string;
  description: string;
  color: string;
  licensePlate: string;
  vin: string;
  rentType: RentType;
  isTinted: boolean;
  pricePerDay: number;
  pricePerHour: number;
  transmission: TransmissionType;
  fuelType: "PETROL";
  seats: number;
  images: VehicleImagePayload[];
  confirmPhoto: boolean;
  fuelPrice: number;
  primaryImageUrl: string;
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
  pickupLocation?: VehicleLocationPayload;
  createdAt: string;
  updatedAt: string;
  lastBookedAt?: string;
}
