"use client";

import { ActivityCard } from "@/components/host/dashboard/ActivityCard";
import { HostHeader } from "@/components/host/HostHeader";
import { HostCarsSection } from "@/components/host/profile/HostCarsSection";
import { Button } from "@/components/ui/Buttons";
import { FormInput } from "@/components/ui/FormInput";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Toast } from "@/components/ui/Toast";
import { activityCards } from "@/data/hostActivityCards";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useHostProfile } from "@/hooks/useHostProfile";
import {
  EditProfileFormData,
  editProfileSchema,
} from "@/schemas/host/editProfileSchema";
import { updateUserProfile } from "@/services/userService";
import { getOptimizedImage } from "@/utils/cloudinary";
import {
  formatName,
  formatPhoneForDisplay,
  formatPhoneForInput,
} from "@/utils/formatters";
import { normalizeString } from "@/utils/stringUtils";
import {
  getUserProfileImageSignature,
  uploadToCloudinary,
} from "@/utils/uploadToCloudinary";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function HostProfilePage() {
  const queryClient = useQueryClient();
  const { data: user } = useCurrentUser();
  const { data: host, isLoading: hostLoading } = useHostProfile();

  const router = useRouter();
  const searchParams = useSearchParams();
  const isCars = searchParams.get("tab") === "cars";
  const [selectedStatus, setSelectedStatus] = useState<"about" | "cars">(
    isCars ? "cars" : "about"
  );

  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      fullName: user?.fullName,
      hostName: user?.username,
      phoneNumber: formatPhoneForInput(user?.phoneNo!),
    },
  });

  useEffect(() => {
    setSelectedStatus(isCars ? "cars" : "about");
  }, [isCars]);

  // Watch all form fields
  const watchedValues = watch();

  // Check if form has changes
  const hasChanges = useMemo(() => {
    const normalizedCurrentFullName = normalizeString(
      watchedValues.fullName || ""
    );
    const normalizedOriginalFullName = normalizeString(user?.fullName || "");

    const normalizedCurrentHostName = normalizeString(
      watchedValues.hostName || ""
    );
    const normalizedOriginalHostName = normalizeString(user?.username || "");

    const currentPhone = watchedValues.phoneNumber || "";
    const originalPhone = formatPhoneForInput(user?.phoneNo!) || "";

    return (
      normalizedCurrentFullName !== normalizedOriginalFullName ||
      normalizedCurrentHostName !== normalizedOriginalHostName ||
      currentPhone !== originalPhone
    );
  }, [watchedValues, user]);

  const handleTabSwitch = (status: "about" | "cars") => {
    if (status === "cars") {
      router.push("?tab=cars", { scroll: false });
    } else {
      router.push("/host/profile", { scroll: false });
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      reset({
        fullName: user?.fullName,
        hostName: user?.username,
        phoneNumber: formatPhoneForInput(user?.phoneNo!),
      });
    }
    setIsEditing(!isEditing);
  };

  const uploadProfileImageMutation = useMutation({
    mutationFn: async (file: File) => {
      const profileImgSig = await getUserProfileImageSignature();
      const profileImageUrl = await uploadToCloudinary(file, profileImgSig);

      const payload = { profileImageUrl: profileImageUrl.url };

      return updateUserProfile(payload);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["currentUser"], data);
      queryClient.invalidateQueries({ queryKey: ["hostProfile"] });

      setToast({
        message: "Profile image updated successfully!",
        type: "success",
      });
    },
    onError: (err: any) => {
      setToast({
        message: err.message || "Failed to upload profile image",
        type: "error",
      });
    },
  });

  const editProfileMutation = useMutation({
    mutationFn: async (data: EditProfileFormData) => {
      const payload = {
        fullName: normalizeString(data.fullName),
        username: normalizeString(data.hostName),
        phoneN0: `+234${data.phoneNumber}`,
      };

      return updateUserProfile(payload);
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueryData(["currentUser"], data);
      queryClient.invalidateQueries({ queryKey: ["hostProfile"] });

      setToast({ message: "Profile updated successfully!", type: "success" });
      setIsEditing(false);
    },
    onError: (err: any) => {
      setToast({
        message: err.message || "Something went wrong.",
        type: "error",
      });
    },
  });

  return (
    <div className="pb-28">
      <div className="sticky top-0 z-40 bg-white md:pt-2 md:mx-12">
        <div className="px-4 py-4 md:px-0">
          <HostHeader />
        </div>
      </div>

      {/* p-4 */}
      <div className="md:px-12 md:py-4 mt-8 md:mt-10">
        <section className="flex flex-col xl:flex-row space-x-4 p-4 md:p-0">
          <div className="flex items-start xl:bg-white font-gilroy-medium xl:px-4 xl:py-8 space-x-4 rounded-[20px]">
            <ImageUpload
              defaultImage={getOptimizedImage(user?.profileImageUrl!, 10)}
              onImageSelect={(file) => {
                if (!file) return;
                uploadProfileImageMutation.mutate(file);
              }}
              showUploadLabel={false}
              isLoading={uploadProfileImageMutation.isPending}
              disabled={uploadProfileImageMutation.isPending}
            />

            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <span className="text-base md:text-lg">{user?.username}</span>
                <Image
                  src="/images/icons/verification-badge.png"
                  alt="Verification Badge"
                  width={20}
                  height={20}
                />
              </div>
              <span className="text-neutral-475 text-sm my-1">Host</span>
              <span className="text-neutral-475 text-sm">
                Jl. Sultan Iskandar Muda, Jakarta selatan
              </span>
            </div>
          </div>

          <div className="bg-neutral-150 h-[1px] w-full mt-4 xl:hidden" />

          <div className="mt-4 xl:mt-0 grid grid-cols-2 lg:grid-cols-4 gap-4 flex-1 items-center bg-white rounded-[20px] p-4">
            {activityCards.map((card) => {
              let value: number;
              if (card.label === "Cars") value = host?.totalVehicles!;
              else if (card.label === "Rating") value = host?.averageRating!;
              else if (card.label === "Reviews") value = host?.totalReviews!;
              else value = 0;

              return (
                <ActivityCard
                  key={card.id}
                  icon={card.icon}
                  label={card.label}
                  value={value}
                  variant="compact"
                  isLoading={hostLoading}
                />
              );
            })}
          </div>
        </section>

        <section className="md:bg-white rounded-[20px] pb-4 mt-6">
          <div className="sticky z-30 top-[73px] md:top-[70px] bg-white px-4">
            <div className="grid grid-cols-2 border-b border-neutral-275">
              {(
                [
                  { status: "about", label: "About" },
                  { status: "cars", label: "Cars" },
                ] as const
              ).map(({ status, label }) => (
                <button
                  key={status}
                  onClick={() => handleTabSwitch(status)}
                  className="font-gilroy-medium text-sm text-neutral-475 relative py-4 cursor-pointer transition-colors hover:text-black"
                >
                  <span>{label}</span>
                  <div
                    className={clsx(
                      "bg-primary-soft absolute bottom-0 left-0 w-full h-[5px] rounded-tr-[240px] rounded-tl-[240px] transition-opacity",
                      selectedStatus === status ? "opacity-100" : "opacity-0"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="px-4 md:px-0 mt-10">
            {selectedStatus === "about" ? (
              <form
                onSubmit={handleSubmit((data) =>
                  editProfileMutation.mutate(data)
                )}
                className="font-gilroy-medium space-y-4"
              >
                <div className="grid md:grid-cols-2 md:gap-x-4 pb-4 md:px-10 space-y-4 md:space-y-0 border-b border-neutral-275">
                  <div className="flex flex-col pb-4 md:pb-0 border-b border-neutral-275 md:border-b-0">
                    {isEditing ? (
                      <FormInput
                        id="fullName"
                        label="Full Name"
                        type="text"
                        placeholder="Full Name"
                        labelFontFamily="gilroy-medium"
                        placeholderVariant="light"
                        {...register("fullName")}
                        error={errors.fullName?.message}
                        disabled={
                          editProfileMutation.isPending ||
                          uploadProfileImageMutation.isPending
                        }
                      />
                    ) : (
                      <>
                        <span className="text-black/50 text-sm">Full Name</span>
                        <span className="capitalize">
                          {formatName(user?.fullName!)}
                        </span>
                      </>
                    )}
                  </div>

                  <div className="flex flex-col">
                    {isEditing ? (
                      <FormInput
                        id="hostName"
                        label="Host Name"
                        type="text"
                        placeholder="Host Name"
                        labelFontFamily="gilroy-medium"
                        placeholderVariant="light"
                        {...register("hostName")}
                        error={errors.hostName?.message}
                        disabled={
                          editProfileMutation.isPending ||
                          uploadProfileImageMutation.isPending
                        }
                      />
                    ) : (
                      <>
                        <span className="text-black/50 text-sm">Host Name</span>
                        <span>{user?.username}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 md:gap-x-4 md:px-10 pb-4 space-y-4 md:space-y-0 border-b border-neutral-275">
                  <div className="flex flex-col pb-4 md:pb-0 border-b border-neutral-275 md:border-b-0">
                    {isEditing ? (
                      <FormInput
                        id="phoneNumber"
                        label="Phone Number"
                        variant="phone"
                        placeholder="812 345 6789"
                        labelFontFamily="gilroy-medium"
                        placeholderVariant="light"
                        {...register("phoneNumber")}
                        error={errors.phoneNumber?.message}
                        disabled={
                          editProfileMutation.isPending ||
                          uploadProfileImageMutation.isPending
                        }
                      />
                    ) : (
                      <>
                        <span className="text-black/50 text-sm">
                          Phone Number
                        </span>
                        <span>{formatPhoneForDisplay(user?.phoneNo!)}</span>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-black/50 text-sm">Email Address</span>
                    <span>{user?.email}</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 pb-4 space-y-4 md:gap-x-4 md:px-10  md:space-y-0 border-b border-neutral-275">
                  <div className="flex flex-col pb-4 md:pb-0 border-b border-neutral-275 md:border-b-0">
                    <span className="text-black/50 text-sm">Date of Birth</span>
                    <span>{user?.dateOfBirth || "--/--/--"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-black/50 text-sm">Gender</span>
                    <span className="capitalize">{user?.gender}</span>
                  </div>
                </div>

                <div className="md:flex md:justify-center md:gap-4">
                  {isEditing ? (
                    <div className="w-full flex justify-center mt-12 md:mt-6 gap-4 md:px-10">
                      <Button
                        type="button"
                        onClick={handleEditToggle}
                        variant="step-back"
                        fontFamily="inter"
                        fullWidth
                        shadow="shadow-none"
                        disabled={
                          editProfileMutation.isPending ||
                          uploadProfileImageMutation.isPending
                        }
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="dark-primary"
                        fontFamily="inter"
                        fullWidth
                        shadow="shadow-none"
                        loading={editProfileMutation.isPending}
                        disabled={
                          !hasChanges ||
                          editProfileMutation.isPending ||
                          uploadProfileImageMutation.isPending
                        }
                        loadingText="Saving Changes..."
                      >
                        Save Changes
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleEditToggle}
                      variant="dark-primary"
                      fontFamily="inter"
                      fullWidth
                      shadow="shadow-none"
                      className="mt-12 md:mt-6 w-full md:max-w-md"
                    >
                      Edit Profile
                    </Button>
                  )}
                </div>
              </form>
            ) : (
              <HostCarsSection />
            )}
          </div>
        </section>
      </div>

      <div className="flex justify-center">
        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </div>
    </div>
  );
}
