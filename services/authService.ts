import { apiClient } from "@/utils/apiClient";
import { API_ROUTES } from "@/utils/apiRoutes";

export async function registerUser(data: {
  fullName: string;
  email: string;
  password: string;
}) {
  return apiClient(API_ROUTES.AUTH.REGISTER, {
    method: "POST",
    body: JSON.stringify({
      ...data,
      role: "ROLE_ADMIN",
    }),
  });
}
