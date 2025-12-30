"use client";

import { ActivityCard } from "@/components/host/dashboard/ActivityCard";
import { MobileSidebar } from "@/components/shared/MobileSidebar";
import { Button } from "@/components/ui/Buttons";
import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";
import { activityCards } from "@/data/hostActivityCards";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useHostProfile } from "@/hooks/useHostProfile";
import { usePageTransition } from "@/hooks/usePageTransition";
import { getOptimizedImage } from "@/utils/cloudinary";
import { formatName } from "@/utils/formatters";
import { PATHS } from "@/utils/path";
import Image from "next/image";

export default function HostHomePage() {
  const { data: user } = useCurrentUser();
  const { data: host, isLoading: hostLoading } = useHostProfile();
  const { navigate, isNavigating } = usePageTransition();

  const isWalletActive = host?.walletStatus === "ACTIVE";

  return (
    <>
      <div className="pb-28">
        <div className="sticky top-0 z-10 flex items-baseline justify-between w-full bg-white p-4 md:hidden shadow-sm">
          <Image
            src="/images/logo/cruize-easy-logo-dark.svg"
            alt="Cruize Easy Logo Icon"
            width={155}
            height={32}
            priority
          />
          <MobileSidebar role="host" />
        </div>

        <div className="p-4 md:py-6 md:px-12">
          {/* Greeting Section */}
          <section className=" flex items-center space-x-4 mt-10 md:mt-0">
            <div className="bg-neutral-250 rounded-full size-20 overflow-hidden md:hidden relative ">
              <Image
                src={getOptimizedImage(user?.profileImageUrl!, 10)}
                alt="Profile Image"
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="space-y-1">
              <h1 className="font-gilroy-bold text-4xl md:text-5xl">Welcome</h1>
              <span className="font-gilroy-medium">
                {formatName(user?.fullName!)}
              </span>
            </div>
          </section>

          <div className="bg-neutral-150 h-px w-full mt-4 md:hidden" />

          {/* My Earnings Section */}
          <section className="mt-4 md:mt-6">
            <h2 className="font-gilroy-bold text-sm md:hidden">My Earnings</h2>
            <div className="rounded-[20px] mt-2 md:mt-0 p-4 bg-white border border-neutral-150 md:border-none shadow-[0_6px_17.9px_0_rgba(0,0,0,0.1)] md:shadow-none">
              <div className="flex justify-between items-center">
                <span className="font-gilroy-medium text-xs text-black-transparent md:hidden">
                  Total Balance
                </span>
                <h2 className="font-gilroy-bold hidden md:block">
                  My Earnings
                </h2>
                <span className="font-gilroy-medium text-xs text-black-transparent">
                  {new Date().toLocaleString("en-US", { month: "long" })}
                </span>
              </div>

              <div className="mt-8">
                <span className="font-gilroy-bold text-4xl text-neutral-700">
                  <span className="font-source-sans font-bold text-[2.5rem]">
                    ₦
                  </span>
                  {hostLoading ? (
                    <span className="bg-neutral-300 w-20 h-7 inline-block rounded animate-pulse" />
                  ) : (
                    host?.totalEarnings?.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  )}
                </span>

                <div className="flex justify-between items-center mt-1 md:-mt-2">
                  <span className="font-gilroy-medium text-xs text-black-transparent invisible md:visible">
                    Total Earnings this month
                  </span>
                  {isWalletActive ? (
                    <Button
                      variant="dark-primary"
                      fontFamily="gilroy-medium"
                      shadow="shadow-none"
                      className="py-3 md:px-6 text-xs"
                      onClick={() => window.alert("View wallet clicked on")}
                    >
                      View Wallet
                    </Button>
                  ) : (
                    <Button
                      variant="dark-primary"
                      fontFamily="gilroy-medium"
                      shadow="shadow-none"
                      className="py-3 md:px-6 text-xs"
                      onClick={() => navigate(PATHS.HOST.CREATE_WALLET)}
                    >
                      Create Wallet
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* My Activity Section */}
          <section className="mt-6">
            <h2 className="font-gilroy-bold text-sm md:text-base md:px-4">
              My Activity
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
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
                    isLoading={hostLoading}
                  />
                );
              })}
            </div>
          </section>

          {/* Bookings Section */}
          <section className="mt-6">
            <h2 className="font-gilroy-bold text-sm md:hidden">Bookings</h2>
            <div className="bg-white rounded-[20px] mt-2 md:mt-0 p-4">
              <h2 className="font-gilroy-bold hidden md:block">Bookings</h2>

              <div className="flex flex-col justify-center items-center">
                <div className="relative w-[97px] h-[117px] md:w-[131px] md:h-[159px]">
                  <Image
                    src="/images/robots/sad-robot.webp"
                    alt="Sad and confused robot"
                    fill
                    priority
                    quality={100}
                    className="object-contain"
                  />
                </div>

                <p className="font-gilroy-medium text-xs text-center w-60 text-neutral-475 mt-2 md:mt-4">
                  You currently don&apos;t have any booking history, get started
                  by adding your first car
                </p>

                <div className="max-w-80 w-full mt-4">
                  <Button
                    variant="dark-primary"
                    fontFamily="gilroy-medium"
                    shadow="shadow-none"
                    className="py-4 md:px-6 text-xs"
                    fullWidth
                    onClick={() => navigate(PATHS.HOST.ADD_CAR)}
                  >
                    Add Car
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Page Transition Spinner */}
      <PageTransitionSpinner isVisible={isNavigating} />
    </>
  );
}
