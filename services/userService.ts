import { User } from "@/types/user";
import { apiClient } from "@/utils/apiClient";
import { API_ROUTES } from "@/utils/apiRoutes";

export async function getCurrentUser() {
  return apiClient<User>(API_ROUTES.USER.ME, {
    method: "GET",
  });
}

export async function updateUserProfile(data: {
  fullName?: string;
  username?: string;
  phoneN0?: string;
  gender?: "MALE" | "FEMALE";
  profileCompleted?: boolean;
  profileImageUrl?: string;
  allowLocation?: boolean;
  emailNotificationsEnabled?: boolean;
}) {
  return apiClient(API_ROUTES.USER.ME, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
