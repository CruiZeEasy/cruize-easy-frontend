import { apiClient } from "@/utils/apiClient";
import { API_ROUTES } from "@/utils/apiRoutes";

export interface KYCResponse {
  success: boolean;
  widgetId: string;
  appId: string;
  publicKey: string;
  dojUrl: string;
  environment: string;
  userData: {
    last_name: string;
    email: string;
    phone: string;
    first_name: string;
  };
  metadata: {
    user_id: string;
    session_id: string;
  };
}

export async function initializeKYC() {
  return apiClient<KYCResponse>(API_ROUTES.KYC.INITIALIZE, {
    method: "POST",
  });
}
