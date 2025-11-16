"use client";

import { Button } from "@/components/ui/Buttons";
import {
  CompleteProfileFormData,
  completeProfileSchema,
} from "@/schemas/profile/completeProfileSchema";
import { Controller, useForm } from "react-hook-form";
import { fadeUp } from "@/config/animation";
import { FormInput } from "@/components/ui/FormInput";
import { FormSelect } from "@/components/ui/FormSelect";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { genderOptions } from "@/utils/selectOptions";
import Image from "next/image";
import { motion } from "framer-motion";
import { normalizeString } from "@/utils/stringUtils";
import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";
import { Toast } from "@/components/ui/Toast";
import { updateUserProfile, uploadProfileImage } from "@/services/userService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePageTransition } from "@/hooks/usePageTransition";
import { useState } from "react";
import { getNextOnboardingPath } from "@/utils/getNextOnboardingPath";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getUserProfileImageSignature,
  uploadToCloudinary,
} from "@/utils/uploadToCloudinary";
import { compressImages } from "@/utils/compressImage";

export default function CompleteProfilePage() {
  const queryClient = useQueryClient();
  const { navigate, isNavigating } = usePageTransition();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CompleteProfileFormData>({
    resolver: zodResolver(completeProfileSchema),
  });

  const completeProfileMutation = useMutation({
    mutationFn: async (data: CompleteProfileFormData) => {
      // const compressedProfileImage = await compressImages([data.profileImage]);
      // const profileImageFile = compressedProfileImage[0];

      const profileImgSig = await getUserProfileImageSignature();

      const profileImageUrl = await uploadToCloudinary(
        data.profileImage,
        profileImgSig
      );

      const payload = {
        username: normalizeString(data.username),
        phoneN0: `+234${data.phoneNumber}`,
        gender: data.gender,
        profileImageUrl: profileImageUrl.url,
        profileCompleted: true,
      };

      return updateUserProfile(payload);
    },
    onSuccess: async (data) => {
      queryClient.setQueryData(["currentUser"], data);

      setToast({ message: "Profile completed successfully!", type: "success" });

      setTimeout(async () => {
        const nextPath = getNextOnboardingPath(data);
        navigate(nextPath);
      }, 1500);
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
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex flex-col items-center py-12"
      >
        <motion.div variants={fadeUp} transition={{ duration: 0.25 }}>
          <Image
            src="/images/robots/happy-robot.webp"
            alt="gpt robot happy raising right arm"
            width={144}
            height={100}
            quality={100}
            priority
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.25 }}
          className="mb-6 flex flex-col items-center text-center space-y-2"
        >
          <h1 className="font-modulus-semibold text-[26px] block">
            Complete your Profile
          </h1>
          <p className="font-gilroy-medium text-sm text-neutral-550 max-w-[19rem]">
            Don't worry only you can see your personal data, no one else will be
            able to see it.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit((data) =>
            completeProfileMutation.mutate(data)
          )}
          variants={fadeUp}
          transition={{ duration: 0.25 }}
          className="w-full"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.25 }}
            className="flex justify-center mb-12"
          >
            <Controller
              name="profileImage"
              control={control}
              render={({ field: { onChange } }) => (
                <ImageUpload
                  onImageSelect={onChange}
                  disabled={completeProfileMutation.isPending}
                  error={errors.profileImage?.message}
                />
              )}
            />
          </motion.div>

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
              placeholderVariant="light"
              disabled={completeProfileMutation.isPending}
              {...register("username")}
              error={errors.username?.message}
            />

            <FormInput
              id="phoneNumber"
              label="Phone Number"
              variant="phone"
              placeholder="812 345 6789"
              labelFontFamily="gilroy-medium"
              placeholderVariant="light"
              disabled={completeProfileMutation.isPending}
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
                  options={genderOptions}
                  value={value}
                  placeholderVariant="light"
                  onChange={onChange}
                  disabled={completeProfileMutation.isPending}
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
              disabled={completeProfileMutation.isPending}
              loading={completeProfileMutation.isPending}
              loadingText="Setting Up Account..."
            >
              Complete Profile
            </Button>
          </motion.div>
        </motion.form>

        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </motion.div>

      <PageTransitionSpinner isVisible={isNavigating} />
    </>
  );
}
