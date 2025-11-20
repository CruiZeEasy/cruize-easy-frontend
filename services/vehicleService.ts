import { RentType, TransmissionType } from "@/constants/enums";
import { apiClient } from "@/utils/apiClient";
import { API_ROUTES } from "@/utils/apiRoutes";

interface VehicleImagePayload {
  url: string;
  publicId: string;
  order: number;
  uploadedAt: string;
}

interface VehicleDocumentPayload {
  documentType: string;
  documentUrl: string;
  publicId: string;
  size: number;
  uploadedAt: string;
}

interface WorkingHoursPayload {
  day: string;
  isActive: boolean;
  startTime: string;
  endTime: string;
}

export async function createVehicle(data: {
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

  workingHours: WorkingHoursPayload[];
}) {
  return apiClient(API_ROUTES.VEHICLES.CREATE, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
