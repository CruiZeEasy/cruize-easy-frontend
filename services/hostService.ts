import { Host } from "@/types/host";
import { apiClient } from "@/utils/apiClient";
import { API_ROUTES } from "@/utils/apiRoutes";

export async function getHostProfile() {
  return apiClient<Host>(API_ROUTES.HOST.ME, {
    method: "GET",
  });
}
