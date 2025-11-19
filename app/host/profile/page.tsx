"use client";
import { ActivityCard } from "@/components/host/dashboard/ActivityCard";
import { HostHeader } from "@/components/host/HostHeader";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { activityCards } from "@/data/hostActivityCards";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

export default function HostProfilePage() {
  const [selectedStatus, setSelectedStatus] = useState<"about" | "cars">(
    "about"
  );
  return (
    <div className="pb-28">
      <div className="sticky md:relative top-0 z-10 bg-white md:bg-neutral-100 shadow-sm md:shadow-none md:pt-2 md:px-10">
        <div className=" px-4 py-4 md:px-0 ">
          <HostHeader />
        </div>
      </div>

      <div className="p-4 md:px-12 mt-8 md:mt-10">
        <section className="flex flex-col xl:flex-row space-x-4">
          <div className="flex items-start xl:bg-white font-gilroy-medium xl:px-4 xl:py-8 space-x-4 rounded-[20px]">
            <ImageUpload
              onImageSelect={() => {}}
              // error={errors.profileImage?.message}
              showUploadLabel={false}
              disabled={false}
            />

            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <span className="text-base md:text-lg">Bayo Autos</span>
                <span>
                  <Image
                    src="/images/icons/verification-badge.png"
                    alt="Verification Badge"
                    width={20}
                    height={20}
                  />
                </span>
              </div>

              <span className="text-neutral-475 text-sm my-1">Host</span>
              <span className="text-neutral-475 text-sm">
                Jl. Sultan Iskandar Muda, Jakarta selatan
              </span>
            </div>
          </div>

          <div className="bg-neutral-150 h-[1px] w-full mt-4 xl:hidden" />

          <div className="mt-4 xl:mt-0 grid grid-cols-2 lg:grid-cols-4 gap-4 flex-1 items-center bg-white rounded-[20px] p-4">
            {activityCards.map((card) => (
              <ActivityCard
                key={card.id}
                icon={card.icon}
                label={card.label}
                value={0}
                variant="compact"
              />
            ))}
          </div>
        </section>

        <section className="md:bg-white rounded-[20px] px-4 pb-4 mt-6">
          <div className="grid grid-cols-2 border-b border-b-neutral-275">
            {(
              [
                {
                  status: "about",
                  label: "About",
                },
                {
                  status: "cars",
                  label: "Cars",
                },
              ] as const
            ).map(({ status, label }) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
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

          <div className="mt-10 font-gilroy-medium space-y-4">
            <div className="grid md:grid-cols-2 pb-4 space-y-4 md:space-y-0 border-b border-neutral-275">
              <div className="flex flex-col md:px-10 pb-4 md:pb-0 border-b border-neutral-275 md:border-b-0">
                <span className="text-black/50 text-sm">Full Name</span>
                <span>Adewale Segun</span>
              </div>
              <div className="flex flex-col">
                <span className="text-black/50 text-sm">Host Name</span>
                <span>Bayo Autos</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 pb-4 space-y-4 md:space-y-0 border-b border-neutral-275">
              <div className="flex flex-col md:px-10 pb-4 md:pb-0 border-b border-neutral-275 md:border-b-0">
                <span className="text-black/50 text-sm">Phone Number</span>
                <span>0803 *** ****</span>
              </div>
              <div className="flex flex-col">
                <span className="text-black/50 text-sm">Email Address</span>
                <span>adewalesegun@gmail.com</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 pb-4 space-y-4 md:space-y-0 border-b border-neutral-275">
              <div className="flex flex-col md:px-10 pb-4 md:pb-0 border-b border-neutral-275 md:border-b-0">
                <span className="text-black/50 text-sm">Date of Birth</span>
                <span>24/06/21</span>
              </div>
              <div className="flex flex-col">
                <span className="text-black/50 text-sm">Gender</span>
                <span>Male</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
