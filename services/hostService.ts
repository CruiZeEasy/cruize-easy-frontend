import { apiClient } from "@/utils/apiClient";
import { API_ROUTES } from "@/utils/apiRoutes";

export async function getHostProfile() {
  return apiClient(API_ROUTES.HOST.ME, {
    method: "GET",
  });
}
