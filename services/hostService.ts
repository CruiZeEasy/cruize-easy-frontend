// import { Host } from "@/types/host";
// import { apiClient } from "@/utils/apiClient";
// import { API_ROUTES } from "@/utils/apiRoutes";

// export async function getHostProfile() {
//   return apiClient<Host>(API_ROUTES.HOST.ME, {
//     method: "GET",
//   });
// }

import { Host } from "@/types/host";
import { apiClient } from "@/utils/apiClient";
import { API_ROUTES } from "@/utils/apiRoutes";

export async function getHostProfile() {
  return apiClient<Host>(API_ROUTES.HOST.ME, {
    method: "GET",
  });
}

// New function for public host profile
export async function getHostProfileById(hostId: string) {
  return apiClient<Host>(API_ROUTES.HOST.GET_HOST_PROFILE_BY_ID(hostId), {
    method: "GET",
  });
}

// New function for host vehicles by ID
export async function getHostVehiclesByHostId(hostId: string) {
  return apiClient<Host>(API_ROUTES.HOST.GET_HOST_VEHICLES_BY_ID(hostId), {
    method: "GET",
  });
}
