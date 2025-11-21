import { UpdateUserProfilePayload, User } from "@/types/user";
import { apiClient } from "@/utils/apiClient";
import { API_ROUTES } from "@/utils/apiRoutes";

export async function getCurrentUser() {
  return apiClient<User>(API_ROUTES.USER.ME, {
    method: "GET",
  });
}

export async function updateUserProfile(data: UpdateUserProfilePayload) {
  return apiClient(API_ROUTES.USER.ME, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
