// "use client";

// import React, { useState, useEffect } from "react";
// import { fadeUp } from "@/config/animation";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/Buttons";
// import { FormInput } from "@/components/ui/FormInput";
// import { FormSelect } from "@/components/ui/FormSelect";
// import { ImageUpload } from "@/components/ui/ImageUpload";
// import Image from "next/image";
// import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";
// import { usePageTransition } from "@/hooks/usePageTransition";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   completeProfileSchema,
//   CompleteProfileFormData,
// } from "@/schemas/profile/completeProfileSchema";
// import { PATHS } from "@/utils/path";
// import { Toast } from "@/components/ui/Toast";
// import { normalizeString } from "@/utils/stringUtils";
// import {
//   updateUserProfile,
//   uploadProfileImage,
//   getCurrentUser,
// } from "@/services/userService";
// import { APIError } from "@/utils/apiClient";
// import { getNextOnboardingPath } from "@/utils/getNextOnboardingPath";

// export default function CompleteProfilePage() {
//   const [loading, setLoading] = useState(false);
//   const [userLoading, setUserLoading] = useState(true);
//   const [redirecting, setRedirecting] = useState(false);
//   const [unauthorized, setUnauthorized] = useState(false);
//   const [toast, setToast] = useState<{
//     message: string;
//     type: "success" | "error";
//   } | null>(null);
//   const { navigate, isNavigating } = usePageTransition();

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm<CompleteProfileFormData>({
//     resolver: zodResolver(completeProfileSchema),
//   });

//   useEffect(() => {
//     if (unauthorized) return;

//     let isMounted = true;
//     async function fetchUser() {
//       try {
//         const currentUser = await getCurrentUser();
//         if (!isMounted) return;

//         const nextPath = getNextOnboardingPath(currentUser);
//         if (nextPath !== PATHS.ONBOARDING.COMPLETE_PROFILE) {
//           setRedirecting(true);
//           navigate(nextPath);
//           return;
//         }
//       } catch (err: any) {
//         if (err instanceof APIError && err.status === 401) {
//           // mark as unauthorized to stop retries
//           setUnauthorized(true);
//           return;
//         }

//         if (isMounted) {
//           const message =
//             err instanceof APIError
//               ? err.message
//               : "Couldn't connect. Check your internet connection.";
//           setToast({ message, type: "error" });
//         }
//       } finally {
//         if (isMounted) setUserLoading(false);
//       }
//     }

//     fetchUser();

//     return () => {
//       isMounted = false;
//     };
//   }, [navigate, unauthorized]);

//   const onSubmit = async (data: CompleteProfileFormData) => {
//     setLoading(true);
//     setToast(null);

//     try {
//       if (data.profileImage) {
//         const uploadRes = await uploadProfileImage(data.profileImage);
//         if (!uploadRes?.success) throw new Error("Failed to upload image");
//       }

//       const payload = {
//         username: normalizeString(data.username),
//         phoneN0: `+234${data.phoneNumber}`,
//         gender: data.gender.toUpperCase() as "MALE" | "FEMALE",
//         profileCompleted: true,
//       };

//       const res = await updateUserProfile(payload);

//       if (res?.success) {
//         setToast({
//           message: "Profile completed successfully!",
//           type: "success",
//         });

//         const user = await getCurrentUser();
//         console.log("Current User after profile completion:", user);
//         const nextPath = getNextOnboardingPath(user);

//         setTimeout(() => {
//           navigate(nextPath);
//         }, 1500);
//       } else {
//         throw new Error("Failed to complete profile");
//       }
//     } catch (error: any) {
//       const message =
//         error instanceof APIError
//           ? error.message
//           : error.message ||
//             "Couldn't connect. Check your internet connection.";
//       setToast({ message, type: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (userLoading || redirecting)
//     return <PageTransitionSpinner isVisible={true} />;

//   return (
//     <>
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={fadeUp}
//         transition={{ duration: 0.25, ease: "easeOut" }}
//         className="flex flex-col items-center py-12"
//       >
//         <motion.div variants={fadeUp} transition={{ duration: 0.25 }}>
//           <Image
//             src="/images/robots/happy-robot.webp"
//             alt="gpt robot happy raising right arm"
//             width={144}
//             height={100}
//             quality={100}
//             priority
//           />
//         </motion.div>

//         <motion.div
//           variants={fadeUp}
//           transition={{ duration: 0.25 }}
//           className="mb-6 flex flex-col items-center text-center space-y-2"
//         >
//           <h1 className="font-modulus-semibold text-[26px] block">
//             Complete your Profile
//           </h1>
//           <p className="font-gilroy-medium text-sm text-neutral-550 max-w-[19rem]">
//             Don't worry only you can see your personal data, no one else will be
//             able to see it.
//           </p>
//         </motion.div>

//         <motion.form
//           onSubmit={handleSubmit(onSubmit)}
//           variants={fadeUp}
//           transition={{ duration: 0.25 }}
//           className="w-full"
//         >
//           <motion.div
//             variants={fadeUp}
//             transition={{ duration: 0.25 }}
//             className="flex justify-center mb-12"
//           >
//             <Controller
//               name="profileImage"
//               control={control}
//               render={({ field: { onChange } }) => (
//                 <ImageUpload
//                   onImageSelect={onChange}
//                   disabled={loading}
//                   error={errors.profileImage?.message}
//                 />
//               )}
//             />
//           </motion.div>

//           <motion.div
//             variants={fadeUp}
//             transition={{ duration: 0.25 }}
//             className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 lg:px-20 xl:px-24"
//           >
//             <FormInput
//               id="username"
//               label="Username"
//               type="text"
//               autoComplete="username"
//               placeholder="Username"
//               labelFontFamily="gilroy-medium"
//               placeholderVariant="light"
//               disabled={loading}
//               {...register("username")}
//               error={errors.username?.message}
//             />

//             <FormInput
//               id="phoneNumber"
//               label="Phone Number"
//               variant="phone"
//               placeholder="812 345 6789"
//               labelFontFamily="gilroy-medium"
//               placeholderVariant="light"
//               disabled={loading}
//               {...register("phoneNumber")}
//               error={errors.phoneNumber?.message}
//             />

//             <Controller
//               name="gender"
//               control={control}
//               render={({ field: { onChange, value } }) => (
//                 <FormSelect
//                   id="gender"
//                   label="Gender"
//                   labelFontFamily="gilroy-medium"
//                   placeholder="Select Gender"
//                   options={[
//                     { value: "male", label: "Male" },
//                     { value: "female", label: "Female" },
//                   ]}
//                   value={value}
//                   placeholderVariant="light"
//                   onChange={onChange}
//                   disabled={loading}
//                   error={errors.gender?.message}
//                 />
//               )}
//             />

//             <Button
//               type="submit"
//               variant="dark-primary"
//               fontFamily="inter"
//               fullWidth
//               shadow="shadow-none"
//               className="p-4 sm:p-[21px] text-xs self-end mt-12 sm:mt-0"
//               disabled={loading}
//               loading={loading}
//               loadingText="Setting Up Account..."
//             >
//               Complete Profile
//             </Button>
//           </motion.div>
//         </motion.form>

//         {toast && (
//           <Toast
//             message={toast.message}
//             type={toast.type}
//             onClose={() => setToast(null)}
//           />
//         )}
//       </motion.div>

//       <PageTransitionSpinner isVisible={isNavigating} />
//     </>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Buttons";
import { FormInput } from "@/components/ui/FormInput";
import { FormSelect } from "@/components/ui/FormSelect";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";
import { Toast } from "@/components/ui/Toast";
import { fadeUp } from "@/config/animation";
import {
  completeProfileSchema,
  CompleteProfileFormData,
} from "@/schemas/profile/completeProfileSchema";
import { getNextOnboardingPath } from "@/utils/getNextOnboardingPath";
import { normalizeString } from "@/utils/stringUtils";
import { usePageTransition } from "@/hooks/usePageTransition";
import { updateUserProfile, uploadProfileImage } from "@/services/userService";

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

  const mutation = useMutation({
    mutationFn: async (data: CompleteProfileFormData) => {
      if (data.profileImage) {
        const uploadRes = await uploadProfileImage(data.profileImage);
        if (!uploadRes?.success) throw new Error("Image upload failed");
      }

      const payload = {
        username: normalizeString(data.username),
        phoneN0: `+234${data.phoneNumber}`,
        gender: data.gender.toUpperCase() as "MALE" | "FEMALE",
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
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
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
                  disabled={mutation.isPending}
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
              disabled={mutation.isPending}
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
              disabled={mutation.isPending}
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
                  placeholderVariant="light"
                  onChange={onChange}
                  disabled={mutation.isPending}
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
              disabled={mutation.isPending}
              loading={mutation.isPending}
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
