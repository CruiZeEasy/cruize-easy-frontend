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
import { UserRoles } from "@/constants/roles";

export default function CompleteProfilePage() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const { navigate, isNavigating } = usePageTransition();

  // const {
  //   register,
  //   handleSubmit,
  //   control,
  //   formState: { errors },
  // } = useForm<CompleteProfileFormData>({
  //   resolver: zodResolver(completeProfileSchema),
  //   defaultValues: {
  //     username: "",
  //     phoneNumber: "",
  //     gender: undefined,
  //     profileImage: undefined,
  //   },
  // });

  const schema = completeProfileSchema(UserRoles.USER);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CompleteProfileFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: CompleteProfileFormData) => {
    setLoading(true);
    setToast(null);

    try {
      // Prepare FormData
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("phoneNumber", `+234${data.phoneNumber}`);
      formData.append("gender", data.gender);
      if (data.profileImage) formData.append("profileImage", data.profileImage);

      console.log("🧾 FormData contents:");
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const mockSuccess = true;

      if (mockSuccess) {
        setToast({
          message: "Profile completed successfully!",
          type: "success",
        });

        // setTimeout(() => {
        //   navigate(PATHS.HOME);
        // }, 1500);
      } else {
        throw new Error("Failed to complete profile");
      }
    } catch (error: any) {
      setToast({
        message: error.message || "Something went wrong. Please try again.",
        type: "error",
      });
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
            src="/images/robots/robot-1.png"
            alt="Happy Robot"
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
