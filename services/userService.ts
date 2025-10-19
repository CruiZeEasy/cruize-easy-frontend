import { apiClient } from "@/utils/apiClient";
import { API_ROUTES } from "@/utils/apiRoutes";

export async function getCurrentUser() {
  return apiClient(API_ROUTES.USER.ME, {
    method: "GET",
  });
}
