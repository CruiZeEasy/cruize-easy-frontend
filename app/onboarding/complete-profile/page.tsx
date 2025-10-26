"use client";

import React, { useState } from "react";
import { fadeUp } from "@/config/animation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Buttons";
import { FormInput } from "@/components/ui/FormInput";
import { FormSelect } from "@/components/ui/FormSelect";
import { ImageUpload } from "@/components/ui/ImageUpload";
import Image from "next/image";
import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";
import { usePageTransition } from "@/hooks/usePageTransition";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  completeProfileSchema,
  CompleteProfileFormData,
} from "@/schemas/profile/completeProfileSchema";
import { PATHS } from "@/utils/path";
import { Toast } from "@/components/ui/Toast";
import { normalizeString } from "@/utils/stringUtils";
import { updateUserProfile, uploadProfileImage } from "@/services/userService";
import { APIError } from "@/utils/apiClient";

export default function CompleteProfilePage() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const { navigate, isNavigating } = usePageTransition();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CompleteProfileFormData>({
    resolver: zodResolver(completeProfileSchema),
  });

  const onSubmit = async (data: CompleteProfileFormData) => {
    setLoading(true);
    setToast(null);

    try {
      if (data.profileImage) {
        const uploadRes = await uploadProfileImage(data.profileImage);
        if (!uploadRes?.success) throw new Error("Failed to upload image");
      }

      const payload = {
        username: normalizeString(data.username),
        phoneN0: `+234${data.phoneNumber}`,
        gender: data.gender.toUpperCase() as "MALE" | "FEMALE",
        profileCompleted: true,
      };

      const res = await updateUserProfile(payload);

      if (res?.success) {
        setToast({
          message: "Profile completed successfully!",
          type: "success",
        });

        setTimeout(() => {
          navigate(PATHS.ONBOARDING.ALLOW_LOCATION);
        }, 1500);
      } else {
        throw new Error("Failed to complete profile");
      }
    } catch (error: any) {
      const message =
        error instanceof APIError
          ? error.message
          : error.message ||
            "Couldn't connect. Check your internet connection.";

      setToast({ message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex flex-col items-center pb-12"
      >
        {/* Image */}
        <motion.div variants={fadeUp} transition={{ duration: 0.25 }}>
          <Image
            src="/images/robots/happy-robot.png"
            alt="gpt robot happy raising right arm"
            width={250}
            height={250}
            className="w-36 h-auto"
            quality={100}
            priority
          />
        </motion.div>

        {/* Title + Description */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.25 }}
          className="mb-6 flex flex-col items-center text-center space-y-2"
        >
          <h1 className="font-modulus-semibold text-[26px] block">
            Complete your Profile
          </h1>

          <p className="font-gilroy-medium text-sm text-neutral-550 max-w-[19rem]">
            Don&apos;t worry only you can see your personal data, no one else
            will be able to see it.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          variants={fadeUp}
          transition={{ duration: 0.25 }}
          className="w-full"
        >
          {/* Image Upload */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.25 }}
            className="flex justify-center mb-12"
          >
            <Controller
              name="profileImage"
              control={control}
              render={({ field: { onChange, value } }) => (
                <ImageUpload
                  onImageSelect={onChange}
                  disabled={loading}
                  error={errors.profileImage?.message}
                />
              )}
            />
          </motion.div>

          {/* Inputs Grid */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 lg:px-20 xl:px-24"
          >
            <FormInput
              id="username"
              label="Username"
              type="text"
              autoComplete="username"
              placeholder="Username"
              labelFontFamily="gilroy-medium"
              disabled={loading}
              {...register("username")}
              error={errors.username?.message}
            />

            <FormInput
              id="phoneNumber"
              label="Phone Number"
              variant="phone"
              placeholder="812 345 6789"
              disabled={loading}
              {...register("phoneNumber")}
              error={errors.phoneNumber?.message}
            />

            <Controller
              name="gender"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormSelect
                  id="gender"
                  label="Gender"
                  labelFontFamily="gilroy-medium"
                  placeholder="Select Gender"
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                  ]}
                  value={value}
                  onChange={onChange}
                  disabled={loading}
                  error={errors.gender?.message}
                />
              )}
            />

            <Button
              type="submit"
              variant="dark-primary"
              fontFamily="inter"
              fullWidth
              shadow="shadow-none"
              className="p-4 sm:p-[21px] text-xs self-end mt-12 sm:mt-0"
              disabled={loading}
              loading={loading}
              loadingText="Setting Up Account..."
            >
              Complete Profile
            </Button>
          </motion.div>
        </motion.form>

        {/* Toast */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </motion.div>

      {/* Page Transition Spinner */}
      <PageTransitionSpinner isVisible={isNavigating} />
    </>
  );
}
