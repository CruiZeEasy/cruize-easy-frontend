import { useMutation } from "@tanstack/react-query";
import { initializeKYC } from "@/services/kycService";

export function useInitializeKYC() {
  return useMutation({
    mutationFn: initializeKYC,
    onSuccess: (data) => {
      // Redirect to Dojah KYC widget
      window.location.href = data.dojUrl;
    },
  });
}
