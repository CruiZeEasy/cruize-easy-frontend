"use client";

import { ActivityCard } from "@/components/host/dashboard/ActivityCard";
import { HostHeader } from "@/components/host/HostHeader";
import { HostCarsSection } from "@/components/host/profile/HostCarsSection";
import { Button } from "@/components/ui/Buttons";
import { FormInput } from "@/components/ui/FormInput";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Toast } from "@/components/ui/Toast";
import { activityCards } from "@/data/hostActivityCards";
import { defaultWorkingHours } from "@/data/workingHours";
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
import { PATHS } from "@/utils/path";
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

export default function PublicHostProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isCars = searchParams.get("tab") === "cars";
  const [selectedStatus, setSelectedStatus] = useState<"about" | "cars">(
    isCars ? "cars" : "about"
  );

  const workingHours = defaultWorkingHours; // temp

  // const workingHours = vehicleId
  //   ? host?.vehicles.find((v) => v.id === vehicleId)?.workingHours ||
  //     defaultWorkingHours
  //   : defaultWorkingHours;

  useEffect(() => {
    setSelectedStatus(isCars ? "cars" : "about");
  }, [isCars]);

  const handleTabSwitch = (status: "about" | "cars") => {
    const current = new URLSearchParams(searchParams.toString());

    if (status === "cars") {
      current.set("tab", "cars");
    } else {
      current.delete("tab");
    }

    router.push(`?${current.toString()}`, { scroll: false });
  };

  return (
    <div className="pb-28">
      <div className="sticky top-0 z-40 bg-white md:pt-2 md:mx-12 ">
        <div className="px-4 py-4 md:px-0">
          <HostHeader />
        </div>
      </div>

      <div className="md:px-12 md:py-4 mt-8 md:mt-10">
        <section className="flex flex-col xl:flex-row space-x-4 p-4 md:p-0">
          <div className="flex items-start xl:bg-white font-gilroy-medium xl:px-4 xl:py-8 space-x-4 rounded-[20px]">
            <div className="bg-neutral-250 rounded-full size-20 overflow-hidden relative">
              <Image
                src="/images/me.jpg"
                alt="Profile Preview"
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                {/* <span className="text-base md:text-lg">{user?.username}</span> */}
                <span className="text-base md:text-lg">Bayo Adebayo</span>
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
              let value = 0;
              // let value: number;
              // if (card.label === "Cars") value = host?.totalVehicles!;
              // else if (card.label === "Rating") value = host?.averageRating!;
              // else if (card.label === "Reviews") value = host?.totalReviews!;
              // else value = 0;

              return (
                <ActivityCard
                  key={card.id}
                  icon={card.icon}
                  label={card.label}
                  value={value}
                  variant="compact"
                  // isLoading={hostLoading}
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
              <div className="font-gilroy-medium md:px-10">
                <span className="text-neutral-975 text-base md:text-lg">
                  Working Hours
                </span>

                <div className="bg-neutral-262 h-[1px] w-full mt-2" />

                <div className="space-y-4 mt-6">
                  {workingHours.map((day) => (
                    <div
                      key={day.day}
                      className="text-sm flex items-center justify-between"
                    >
                      <span className="text-neutral-430">{day.day}</span>

                      {day.isActive ? (
                        <span>{`${day.startTime} - ${day.endTime}`}</span>
                      ) : (
                        <span className="text-neutral-475 italic">Closed</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <HostCarsSection />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
