import { apiClient } from "@/utils/apiClient";
import { API_ROUTES } from "@/utils/apiRoutes";

export async function createVehicle(data: {
  name: string;
  brand: string;
  description: string;
  color: string;
  licensePlate: string;
  rentType: "SELF_DRIVE" | "DRIVER";
  vin: string;
  isTinted?: boolean;
  pricePerDay: string;
  transmission: "AUTOMATIC" | "MANUAL" | "ELECTRIC";
  seats: number;
  fuelPrice: string;
  confirmPhoto: boolean;
}) {
  return apiClient(API_ROUTES.VEHICLES.CREATE, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function uploadVehicleDocuments(vehicleId: string, files: File[]) {
  const formData = new FormData();
  files.forEach((file) => formData.append("documents", file));

  return apiClient(API_ROUTES.VEHICLES.UPLOAD_DOCUMENT(vehicleId), {
    method: "POST",
    body: formData,
    timeout: 60000,
  });
}

export async function uploadVehicleImages(vehicleId: string, files: File[]) {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));

  return apiClient(API_ROUTES.VEHICLES.UPLOAD_IMAGE(vehicleId), {
    method: "POST",
    body: formData,
    timeout: 60000,
  });
}
