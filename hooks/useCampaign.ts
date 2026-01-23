import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  registerForCampaign,
  getCampaignStatus,
} from "@/services/campaignService";
import { CampaignRegistrationPayload } from "@/types/campaign";

export function useCampaignRegistration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CampaignRegistrationPayload) =>
      registerForCampaign(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaignStatus"] });
    },
  });
}

export function useCampaignStatus() {
  return useQuery({
    queryKey: ["campaignStatus"],
    queryFn: getCampaignStatus,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
