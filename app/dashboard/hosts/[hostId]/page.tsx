"use client";

import { PublicHostCarsSection } from "@/components/dashboard/bookings/PublicHostCarsSection";
import { ActivityCard } from "@/components/host/dashboard/ActivityCard";
import { HostHeader } from "@/components/host/HostHeader";
import { activityCards } from "@/data/hostActivityCards";
import { usePublicHostProfile } from "@/hooks/usePublicHostProfile";
import { getOptimizedImage } from "@/utils/cloudinary";
import { formatName } from "@/utils/formatters";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function PublicHostProfilePage() {
  const params = useParams();
  const hostId = params?.hostId as string;

  const { data: hostProfile, isLoading: profileLoading } =
    usePublicHostProfile(hostId);

  // Show loading state
  if (profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-soft"></div>
      </div>
    );
  }

  // Show error state if no profile found
  if (!hostProfile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-neutral-475 text-lg">Host profile not found</p>
      </div>
    );
  }

  return (
    <div className="pb-28">
      <div className="sticky top-0 z-40 bg-white md:pt-2 md:mx-12">
        <div className="px-4 py-4 md:px-0">
          <HostHeader />
        </div>
      </div>

      <div className="md:px-12 md:py-4 mt-8 md:mt-10">
        <section className="flex flex-col xl:flex-row space-x-4 p-4 md:p-0">
          <div className="flex items-start xl:bg-white font-gilroy-medium xl:px-4 xl:py-8 space-x-4 rounded-[20px]">
            <div className="bg-neutral-250 rounded-full size-20 overflow-hidden relative">
              <Image
                src={
                  getOptimizedImage(hostProfile.profileImageUrl!, 10) ||
                  "/images/me.jpg"
                }
                alt="Host Profile"
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <span className="text-base md:text-lg capitalize">
                  {formatName(hostProfile.fullName)}
                </span>
                {hostProfile.status === "ACTIVE" && (
                  <Image
                    src="/images/icons/verification-badge.png"
                    alt="Verification Badge"
                    width={20}
                    height={20}
                  />
                )}
              </div>
              <span className="text-neutral-475 text-sm my-1">Host</span>
              <span className="text-neutral-475 text-sm">
                Host since{" "}
                {new Date(hostProfile.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="bg-neutral-150 h-px w-full mt-4 xl:hidden" />

          <div className="mt-4 xl:mt-0 grid grid-cols-2 lg:grid-cols-4 gap-4 flex-1 items-center bg-white rounded-[20px] p-4">
            {activityCards.map((card) => {
              let value: number = 0;

              if (card.label === "Cars") value = hostProfile.totalVehicles;
              else if (card.label === "Rating")
                value = hostProfile.averageRating;
              else if (card.label === "Reviews")
                value = hostProfile.totalReviews;
              else if (card.label === "Trips")
                value = hostProfile.totalBookings;

              return (
                <ActivityCard
                  key={card.id}
                  icon={card.icon}
                  label={card.label}
                  value={value}
                  variant="compact"
                  isLoading={profileLoading}
                />
              );
            })}
          </div>
        </section>

        <section className="md:bg-white rounded-[20px] pb-4 mt-6">
          <div className="px-4 md:px-0 mt-4">
            <PublicHostCarsSection
              hostId={hostId}
              vehicles={hostProfile?.vehicles}
              isLoading={profileLoading}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
