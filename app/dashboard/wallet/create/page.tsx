"use client";

import { HostHeader } from "@/components/host/HostHeader";
import { Button } from "@/components/ui/Buttons";
import { FormCheckbox } from "@/components/ui/FormCheckbox";
import { FormInput } from "@/components/ui/FormInput";
import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";
import { Toast } from "@/components/ui/Toast";
import { fadeUp } from "@/config/animation";
import { useInitializeKYC } from "@/hooks/useKyc";
import { usePageTransition } from "@/hooks/usePageTransition";
import { useUserProfile } from "@/hooks/useUserProfile";
import {
  CreateWalletFormData,
  createWalletSchema,
} from "@/schemas/wallet/createWalletSchema";
import { createWallet } from "@/services/walletService";
import { PATHS } from "@/utils/path";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function UserCreateWalletPage() {
  const { data: user } = useUserProfile();
  const { navigate, isNavigating } = usePageTransition();
  const initializeKYC = useInitializeKYC();

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateWalletFormData>({
    resolver: zodResolver(createWalletSchema),
  });

  useEffect(() => {
    // Check if wallet is already active
    if (user?.walletStatus === "ACTIVE") {
      navigate(PATHS.USER.HOME);
      return;
    }

    // Check if KYC is completed
    if (user && !user.isKyc) {
      setToast({
        message: "KYC verification required. Redirecting to verification...",
        type: "error",
      });

      // Initiate KYC after a delay
      const timer = setTimeout(() => {
        initializeKYC.mutate(undefined, {
          onError: (error: any) => {
            setToast({
              message: error.message || "Failed to initialize KYC",
              type: "error",
            });
            // Navigate away after error
            setTimeout(() => navigate(PATHS.USER.HOME), 2000);
          },
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [user]);

  const createWalletMutation = useMutation({
    mutationFn: async (data: CreateWalletFormData) => {
      return createWallet(data);
    },

    onSuccess: () => {
      navigate(PATHS.USER.VERIFY_WALLET_OTP);
    },

    onError: (err: any) => {
      setToast({
        message: err.message || "Something went wrong.",
        type: "error",
      });
    },
  });

  if (user && !user.isKyc) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <h2 className="font-gilroy-bold text-xl mb-2">
              KYC Verification Required
            </h2>
            <p className="text-neutral-550 mb-4">
              Please complete your KYC to proceed
            </p>
            <div className="animate-pulse">Redirecting...</div>
          </div>
        </div>

        {toast && (
          <div className="flex justify-center">
            <Toast {...toast} onClose={() => setToast(null)} />
          </div>
        )}

        <PageTransitionSpinner isVisible={isNavigating} />
      </>
    );
  }

  return (
    <>
      <div className="pb-28 max-w-3xl mx-auto bg-white ">
        <div className="sticky top-0 z-10 bg-white md:border-b md:border-b-neutral-275 shadow-sm md:shadow-none md:pt-2 md:px-10">
          <div className=" px-4 py-4 md:px-0 ">
            <HostHeader />
          </div>
        </div>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="p-4 md:px-10 mt-10 bg-white font-gilroy-medium"
        >
          <div className="flex flex-col">
            <span className="font-gilroy-bold text-lg md:text-xl">
              Create Your Wallet
            </span>
            <span className="text-neutral-550 text-sm w-full max-w-104 mt-1">
              This secure wallet is for receiving payment from your vehicle
              rentals
            </span>
          </div>

          <form
            onSubmit={handleSubmit((data) => createWalletMutation.mutate(data))}
            className="mt-6 space-y-6"
          >
            <FormInput
              id="transactionPin"
              label="Create 5-digit PIN"
              placeholder="Input 5-digit PIN"
              labelFontFamily="gilroy-medium"
              placeholderVariant="light"
              variant="pin"
              disabled={createWalletMutation.isPending}
              {...register("transactionPin")}
              error={errors.transactionPin?.message}
            />

            <div className="space-y-2">
              <FormInput
                id="confirmPin"
                label="Confirm 5-digit PIN"
                placeholder="Input 5-digit PIN"
                labelFontFamily="gilroy-medium"
                placeholderVariant="light"
                variant="pin"
                disabled={createWalletMutation.isPending}
                {...register("confirmPin")}
                error={errors.confirmPin?.message}
              />

              <span className="text-neutral-550 text-sm w-full max-w-104">
                Choose a secure and memorable PIN for withdrawal
              </span>
            </div>

            <FormCheckbox
              id="agree"
              label="By creating the wallet you agree to the wallet"
              labelFontFamily="gilroy-medium"
              labelVariant="light"
              linkText="Terms & Conditions"
              linkHref="#"
              disabled={createWalletMutation.isPending}
              {...register("agree")}
              error={errors.agree?.message}
            />

            <Button
              type="submit"
              variant="dark-primary"
              fontFamily="inter"
              fullWidth
              shadow="shadow-none"
              className="mt-12 md:mt-6"
              disabled={createWalletMutation.isPending}
              loading={createWalletMutation.isPending}
              loadingText="Creating Wallet..."
            >
              Create Wallet
            </Button>
          </form>
        </motion.section>

        {toast && (
          <div className="flex justify-center">
            <Toast {...toast} onClose={() => setToast(null)} />
          </div>
        )}
      </div>

      <PageTransitionSpinner isVisible={isNavigating} />
    </>
  );
}
