import { Host, PublicHostProfile } from "@/types/host";
import { apiClient } from "@/utils/apiClient";
import { API_ROUTES } from "@/utils/apiRoutes";

export async function getHostProfile() {
  return apiClient<Host>(API_ROUTES.HOST.ME, {
    method: "GET",
  });
}

// New function for public host profile
export async function getHostProfileById(hostId: string) {
  return apiClient<PublicHostProfile>(
    API_ROUTES.HOST.GET_HOST_PROFILE_BY_ID(hostId),
    {
      method: "GET",
    }
  );
}
