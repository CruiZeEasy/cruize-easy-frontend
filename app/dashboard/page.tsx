"use client";

import { Notifications } from "@/components/dashboard/Notifications";
import { ListingsOverview } from "@/components/dashboard/ListingsOverview";
import { TopBrands } from "@/components/dashboard/TopBrands";
import { WalletSection } from "@/components/dashboard/WalletSection";
import { MobileSidebar } from "@/components/shared/MobileSidebar";
import { FormInput } from "@/components/ui/FormInput";
import Image from "next/image";
import { useState } from "react";
import { FilterModal } from "@/components/shared/FilterModal";

export default function UserDashboard() {
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  return (
    <>
      <div className="pb-28 lg:pb-0 min-w-0">
        <div className="sticky top-0 z-10 flex items-baseline justify-between w-full bg-white p-4 md:hidden shadow-sm">
          <Image
            src="/images/logo/cruize-easy-logo-dark.svg"
            alt="Cruize Easy Logo Icon"
            width={155}
            height={32}
            priority
          />
          <MobileSidebar role="user" />
        </div>

        <div className="p-4 md:p-0 md:px-12 min-w-0">
          <section className="lg:sticky lg:top-0 z-10 md:pt-6 md:pb-4 hidden md:flex items-center justify-between bg-neutral-100">
            <h1 className="font-gilroy-bold text-4xl md:text-5xl hidden md:block">
              Welcome
            </h1>

            <div className="lg:flex hidden flex-col md:flex-row md:items-center w-full md:w-auto space-y-4 md:space-y-0 ">
              <button className="font-gilroy-medium flex items-center space-x-2 cursor-pointer mr-10">
                <Image
                  src="/images/icons/location.svg"
                  alt="Location"
                  width={20}
                  height={20}
                />
                <span className="text-black-transparent">Location</span>
              </button>
              <div className="flex space-x-2">
                <button
                  className="bg-primary-dark flex items-center justify-center rounded-[6px] px-2.5 md:px-2 cursor-pointer"
                  onClick={() => setIsFilterOpen(true)}
                >
                  <Image
                    src="/images/icons/filter-search-light.svg"
                    alt="Filter Search"
                    width={24}
                    height={24}
                  />
                </button>

                <FormInput
                  id="search"
                  label=""
                  placeholder="Search here"
                  variant="search"
                />
              </div>
            </div>
          </section>

          <section className="flex md:hidden  items-center space-x-4 mt-10 md:mt-0">
            <div className="bg-neutral-250 rounded-full size-20 overflow-hidden md:hidden relative ">
              <Image
                src={"/images/me.jpg"}
                alt="Profile Image"
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="space-y-1">
              <h1 className="font-gilroy-bold text-4xl md:text-5xl">Welcome</h1>
              <span className="font-gilroy-medium">Tunde Adebayo</span>
            </div>
          </section>

          <div className="bg-neutral-150 h-[1px] w-full mt-4 md:hidden" />

          <div className="mt-4 md:mt-6 lg:grid lg:grid-cols-5 gap-x-8 md:h-[calc(100vh-200px)]">
            <div className="md:col-span-2 min-w-0 md:overflow-y-auto md:pr-4">
              <WalletSection />
              <TopBrands />
              <Notifications />
            </div>

            <div className="md:col-span-3 mt-4 md:mt-0 min-w-0 space-y-6 overflow-y-auto">
              <ListingsOverview />
            </div>
          </div>
        </div>
      </div>

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </>
  );
}
