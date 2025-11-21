import { CreateVehiclePayload } from "@/types/vehicle";
import { apiClient } from "@/utils/apiClient";
import { API_ROUTES } from "@/utils/apiRoutes";

export async function createVehicle(data: CreateVehiclePayload) {
  return apiClient(API_ROUTES.VEHICLES.CREATE, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getHostVehicles() {
  return apiClient(API_ROUTES.VEHICLES.ME, {
    method: "GET",
  });
}
