"use client";

import { HostHeader } from "@/components/host/HostHeader";
import { Button } from "@/components/ui/Buttons";
import { FormInput } from "@/components/ui/FormInput";
import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";
import { PaymentMethod } from "@/components/ui/PaymentMethod";
import { Toast } from "@/components/ui/Toast";
import { fadeUp } from "@/config/animation";
import { usePageTransition } from "@/hooks/usePageTransition";
import {
  FundWalletFormData,
  fundWalletSchema,
} from "@/schemas/wallet/fundWalletSchema";
import { formatNumber } from "@/utils/formatters";
import { PATHS } from "@/utils/path";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function WalletFundPage() {
  const { navigate, isNavigating } = usePageTransition();

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FundWalletFormData>({
    resolver: zodResolver(fundWalletSchema),
    defaultValues: {
      paymentMethod: "PAYSTACK",
    },
  });

  const fundWalletMutationn = useMutation({
    mutationFn: async (data: FundWalletFormData) => {
      // return createWallet(data);s

      return data;
    },

    onSuccess: (data) => {
      console.log(data);
      // navigate(PATHS.USER.VERIFY_WALLET_OTP);
    },

    onError: (err: any) => {
      setToast({
        message: err.message || "Something went wrong.",
        type: "error",
      });
    },
  });

  return (
    <>
      <div className="pb-28 max-w-3xl mx-auto bg-white min-h-dvh">
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
          <form
            onSubmit={handleSubmit((data) => fundWalletMutationn.mutate(data))}
            className="space-y-6"
          >
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <FormInput
                  id="amount"
                  label="Amount (₦)"
                  labelFontFamily="gilroy-medium"
                  type="text"
                  inputMode="numeric"
                  placeholder="100"
                  placeholderVariant="light"
                  value={
                    field.value ? formatNumber(field.value.toString()) : ""
                  }
                  onChange={(e) => {
                    const raw = e.target.value.replace(/,/g, "");
                    field.onChange(raw);
                  }}
                  error={errors.amount?.message}
                />
              )}
            />

            <Controller
              name="paymentMethod"
              control={control}
              render={({ field }) => (
                <PaymentMethod
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.paymentMethod?.message}
                />
              )}
            />

            <Button
              type="submit"
              variant="dark-primary"
              fontFamily="inter"
              fullWidth
              shadow="shadow-none"
              className="mt-12 md:mt-6"
              disabled={fundWalletMutationn.isPending}
              loading={fundWalletMutationn.isPending}
              loadingText="Processing Payment..."
            >
              Fund Wallet
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
