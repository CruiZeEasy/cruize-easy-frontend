"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Buttons";
import { useCampaignModal } from "@/stores/CampaignModal";
import { useCampaignStatus } from "@/hooks/useCampaign";

export function CampaignPromoCard() {
  const { open } = useCampaignModal();
  const { data: campaignData, isLoading } = useCampaignStatus();

  const isRegistered = campaignData?.registered === true;

  return (
    <section>
      <h2 className="font-gilroy-bold text-sm md:hidden">Campaign</h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-[20px] mt-2 md:mt-0 p-4 bg-white border border-neutral-150 md:border-none shadow-[0_6px_17.9px_0_rgba(0,0,0,0.1)] md:shadow-none"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-gilroy-bold hidden md:block">Active Campaign</h2>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Campaign Image/Icon */}
          <div className="relative w-full md:w-32 h-24 md:h-20 rounded-xl overflow-hidden bg-neutral-75 shrink-0">
            {/* <Image
              src="/images/campaign/unilag-promo.png"
              alt="UNILAG Promo"
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            /> */}
            {/* Fallback gradient if no image */}
            <div className="absolute inset-0 bg-linear-to-br from-primary-dark to-primary flex items-center justify-center">
              <span className="text-white text-3xl">🎓</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-primary-pale text-primary-dark text-[10px] font-gilroy-bold px-2 py-0.5 rounded-full">
                LIMITED TIME
              </span>
            </div>

            <h3 className="font-gilroy-bold text-base md:text-lg truncate">
              UNILAG Student Driver's License Promo
            </h3>

            <p className="font-gilroy-medium text-neutral-450 text-sm mt-1 line-clamp-2">
              {isRegistered
                ? "You're registered! We'll review your content and get back to you soon."
                : "Create content about CruizeEasy and win a FREE Driver's License!"}
            </p>
          </div>

          {/* CTA Button - Only show if not registered */}
          {!isRegistered && (
            <div className="shrink-0 mt-2 md:mt-0">
              <Button
                variant="dark-primary"
                fontFamily="gilroy-medium"
                shadow="shadow-none"
                className="py-3 px-6 text-sm w-full md:w-auto"
                onClick={open}
                disabled={isLoading}
                loading={isLoading}
              >
                Apply Now
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
