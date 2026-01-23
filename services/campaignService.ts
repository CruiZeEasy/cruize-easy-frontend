import {
  CampaignRegistrationPayload,
  CampaignRegistrationResponse,
  CampaignStatusResponse,
} from "@/types/campaign";
import { apiClient } from "@/utils/apiClient";
import { API_ROUTES } from "@/utils/apiRoutes";

export async function registerForCampaign(data: CampaignRegistrationPayload) {
  return apiClient<CampaignRegistrationResponse>(API_ROUTES.CAMPAIGN.REGISTER, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getCampaignStatus() {
  return apiClient<CampaignStatusResponse>(API_ROUTES.CAMPAIGN.STATUS, {
    method: "GET",
  });
}
