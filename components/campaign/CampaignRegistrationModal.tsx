"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Button } from "@/components/ui/Buttons";
import { FormInput } from "@/components/ui/FormInput";
import { FormCheckbox } from "@/components/ui/FormCheckbox";
import { FormTextArea } from "@/components/ui/FormTextArea";
import { Toast } from "@/components/ui/Toast";
import { useCampaignRegistration } from "@/hooks/useCampaign";
import {
  campaignRegistrationSchema,
  CampaignFormData,
} from "@/schemas/campaign/campaignSchema";
import clsx from "clsx";

interface CampaignRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 1 | 2;

export function CampaignRegistrationModal({
  isOpen,
  onClose,
}: CampaignRegistrationModalProps) {
  const [step, setStep] = useState<Step>(1);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [campaignLink, setCampaignLink] = useState("");

  const campaignMutation = useCampaignRegistration();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    trigger,
  } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignRegistrationSchema),
    mode: "onChange",
    defaultValues: {
      videoContentUrl: "",
      videoTitle: "",
      twitterHandle: "",
      facebookHandle: "",
      instagramHandle: "",
      tiktokHandle: "",
      motivation: "",
      agreedToTerms: false,
      contentRightsGranted: false,
      marketingConsent: false,
    },
  });

  const handleNextStep = async () => {
    const isValid = await trigger(["videoContentUrl", "videoTitle"]);
    if (isValid) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const onSubmit = async (data: CampaignFormData) => {
    try {
      const payload = {
        ...data,
        registrationSource: "dashboard",
        utmSource: "internal",
        utmMedium: "dashboard_promo",
        utmCampaign: "unilag_drivers_license_2025",
      };

      const response = await campaignMutation.mutateAsync(payload);

      if (response.success) {
        setCampaignLink(response.campaignLink);
        setRegistrationSuccess(true);
        reset();
      }
    } catch (error: any) {
      const message = error?.message || "Failed to register. Please try again.";
      setToast({ message, type: "error" });
    }
  };

  const handleClose = () => {
    setStep(1);
    if (registrationSuccess) {
      setRegistrationSuccess(false);
      setCampaignLink("");
    }
    onClose();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(campaignLink);
      setToast({ message: "Link copied to clipboard!", type: "success" });
    } catch {
      setToast({ message: "Failed to copy link", type: "error" });
    }
  };

  const stepTitles = {
    1: "Video Content",
    2: "Social Media & Submit",
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={handleClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-white rounded-[20px] shadow-xl z-50 max-h-[90dvh] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="shrink-0 flex items-center justify-between p-6 border-b border-neutral-150">
                <div>
                  <span className="font-modulus-semibold text-lg md:text-xl">
                    {registrationSuccess
                      ? "Registration Complete"
                      : "UNILAG Promo Registration"}
                  </span>
                  {!registrationSuccess && (
                    <p className="font-gilroy-medium text-neutral-450 text-sm mt-1">
                      Step {step} of 2 - {stepTitles[step]}
                    </p>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              {!registrationSuccess && (
                <div className="shrink-0 px-6 pt-4">
                  <div className="flex gap-2">
                    {[1, 2].map((s) => (
                      <div
                        key={s}
                        className={clsx(
                          "h-1 flex-1 rounded-full transition-all duration-300",
                          s <= step ? "bg-primary-dark" : "bg-neutral-200",
                        )}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="flex-1 min-h-0 p-6 overflow-y-auto">
                {registrationSuccess ? (
                  <SuccessView
                    campaignLink={campaignLink}
                    onCopy={copyToClipboard}
                    onClose={handleClose}
                  />
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <StepOne
                          key="step1"
                          register={register}
                          errors={errors}
                        />
                      )}
                      {step === 2 && (
                        <StepTwo
                          key="step2"
                          register={register}
                          control={control}
                          errors={errors}
                        />
                      )}
                    </AnimatePresence>
                  </form>
                )}
              </div>

              {/* Footer Buttons */}
              {!registrationSuccess && (
                <div className="shrink-0 flex flex-col gap-3 p-6  border-t border-neutral-150">
                  {step === 1 ? (
                    <Button
                      type="button"
                      variant="dark-primary"
                      fontFamily="gilroy-medium"
                      fullWidth
                      shadow="shadow-none"
                      onClick={handleNextStep}
                    >
                      Continue
                    </Button>
                  ) : (
                    <>
                      <Button
                        type="button"
                        variant="dark-primary"
                        fontFamily="gilroy-medium"
                        fullWidth
                        shadow="shadow-none"
                        onClick={handleSubmit(onSubmit)}
                        disabled={campaignMutation.isPending}
                        loading={campaignMutation.isPending}
                        loadingText="Submitting..."
                      >
                        Submit Application
                      </Button>

                      <Button
                        type="button"
                        variant="step-back"
                        fontFamily="gilroy-medium"
                        fullWidth
                        shadow="shadow-none"
                        onClick={handlePrevStep}
                      >
                        Back
                      </Button>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast */}
      {toast && (
        <div className="flex justify-center">
          <Toast {...toast} onClose={() => setToast(null)} />
        </div>
      )}
    </>
  );
}

// Step 1: Video Content
function StepOne({ register, errors }: { register: any; errors: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="bg-neutral-60 p-4 rounded-lg mb-6">
        <p className="font-gilroy-medium text-sm text-neutral-475">
          Share a video about CruizeEasy on any platform (TikTok, Instagram,
          YouTube, etc.) and paste the link below.
        </p>
      </div>

      <FormInput
        id="videoContentUrl"
        label="Video URL"
        placeholder="https://www.tiktok.com/@username/video/..."
        {...register("videoContentUrl")}
        error={errors.videoContentUrl?.message}
      />

      <FormInput
        id="videoTitle"
        label="Video Title"
        placeholder="Why I Love CruizeEasy - Best Car Rental!"
        {...register("videoTitle")}
        error={errors.videoTitle?.message}
      />
    </motion.div>
  );
}

// Step 2: Social Media, Motivation & Agreements
function StepTwo({
  register,
  control,
  errors,
}: {
  register: any;
  control: any;
  errors: any;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="bg-neutral-60 p-4 rounded-lg mb-6">
        <p className="font-gilroy-medium text-sm text-neutral-475">
          Provide at least one social media handle where you posted the content.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormInput
          id="twitterHandle"
          label="Twitter/X"
          placeholder="username"
          {...register("twitterHandle")}
          error={errors.twitterHandle?.message}
        />

        <FormInput
          id="instagramHandle"
          label="Instagram"
          placeholder="username"
          {...register("instagramHandle")}
          error={errors.instagramHandle?.message}
        />

        <FormInput
          id="tiktokHandle"
          label="TikTok"
          placeholder="username"
          {...register("tiktokHandle")}
          error={errors.tiktokHandle?.message}
        />

        <FormInput
          id="facebookHandle"
          label="Facebook"
          placeholder="username"
          {...register("facebookHandle")}
          error={errors.facebookHandle?.message}
        />
      </div>

      <FormTextArea
        id="motivation"
        label="Why do you want to join?"
        placeholder="Tell us why you're excited about CruizeEasy..."
        rows={3}
        {...register("motivation")}
        error={errors.motivation?.message}
      />

      {/* Agreements */}
      <div className="space-y-3 pt-4 border-t border-neutral-150">
        <Controller
          name="agreedToTerms"
          control={control}
          render={({ field }) => (
            <FormCheckbox
              id="agreedToTerms"
              label="I agree to the campaign terms and conditions"
              labelFontFamily="gilroy-medium"
              labelVariant="dark"
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              error={errors.agreedToTerms?.message}
              // linkText="View Terms"
              // linkHref="/terms"
            />
          )}
        />

        <Controller
          name="contentRightsGranted"
          control={control}
          render={({ field }) => (
            <FormCheckbox
              id="contentRightsGranted"
              label="I grant CruizeEasy rights to use my content for promotions"
              labelFontFamily="gilroy-medium"
              labelVariant="dark"
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              error={errors.contentRightsGranted?.message}
            />
          )}
        />

        <Controller
          name="marketingConsent"
          control={control}
          render={({ field }) => (
            <FormCheckbox
              id="marketingConsent"
              label="Send me updates about this campaign (optional)"
              labelFontFamily="gilroy-medium"
              labelVariant="light"
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
      </div>
    </motion.div>
  );
}

// Success View
function SuccessView({
  campaignLink,
  onCopy,
  onClose,
}: {
  campaignLink: string;
  onCopy: () => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center text-center py-4"
    >
      <div className="mb-8">
        <Image
          src="/images/robots/robot-with-speech-bubble.webp"
          alt="Success"
          width={110}
          height={100}
          quality={100}
          priority
        />
      </div>

      <div className="mb-8 flex flex-col items-center space-y-3">
        <h3 className="font-modulus-semibold text-[22px] md:text-[26px]">
          You're Registered! 🎉
        </h3>
        <p className="font-gilroy-medium text-sm text-neutral-550 max-w-[18rem]">
          Your application has been submitted successfully. We'll review your
          content and get back to you soon!
        </p>
      </div>

      <div className="w-full">
        <Button
          type="button"
          variant="dark-primary"
          fontFamily="gilroy-medium"
          fullWidth
          shadow="shadow-none"
          className="py-4"
          onClick={onClose}
        >
          Done
        </Button>
      </div>
    </motion.div>
  );
}
