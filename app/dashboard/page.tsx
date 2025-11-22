import { Notifications } from "@/components/dashboard/Notifications";
import { PopularCarsSection } from "@/components/dashboard/PopularCarsSection";
import { TopBrands } from "@/components/dashboard/TopBrands";
import { MobileSidebar } from "@/components/shared/MobileSidebar";
import { Button } from "@/components/ui/Buttons";
import { FormInput } from "@/components/ui/FormInput";
import Image from "next/image";

export default function UserDashboard() {
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
          <MobileSidebar role="user" />
        </div>

        <div className="p-4 md:py-6 md:px-12">
          <section className="flex items-center justify-between">
            <h1 className="font-gilroy-bold text-4xl md:text-5xl hidden md:block">
              Welcome
            </h1>

            <div className="flex flex-col md:flex-row md:items-center w-full md:w-auto space-y-4 md:space-y-0">
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
                <div className="bg-primary-dark flex items-center justify-center rounded-[6px] px-2.5 md:px-2 cursor-pointer">
                  <Image
                    src="/images/icons/filter-search-light.svg"
                    alt="Filter Search"
                    width={24}
                    height={24}
                  />
                </div>

                <FormInput
                  id="search"
                  label=""
                  placeholder="Search here"
                  variant="search"
                />
              </div>
            </div>
          </section>

          <div className="mt-8 md:mt-6 grid md:grid-cols-5 gap-x-8">
            <div className="md:col-span-2">
              {/* My Wallets Section */}
              <section>
                <h2 className="font-gilroy-bold text-sm md:hidden">
                  Wallet Balance
                </h2>
                <div className="rounded-[20px] mt-2 md:mt-0 p-4 bg-white border border-neutral-150 shadow-[0_6px_17.9px_0_rgba(0,0,0,0.1)]">
                  <div className="flex justify-between items-center">
                    <span className="font-gilroy-medium text-xs text-black-transparent md:hidden">
                      {new Date().toLocaleString("en-US", { month: "long" })}
                    </span>
                    <h2 className="font-gilroy-bold hidden md:block">Wallet</h2>
                    <span className="font-gilroy-medium text-xs text-black-transparent hidden md:block ">
                      {new Date().toLocaleString("en-US", { month: "long" })}
                    </span>
                  </div>

                  <div className="mt-8">
                    <span className="font-gilroy-bold text-4xl text-neutral-700">
                      <span className="font-source-sans font-bold text-[2.5rem]">
                        ₦
                      </span>
                      0.00
                    </span>

                    <div className="flex justify-end items-center mt-1">
                      <Button
                        variant="dark-primary"
                        fontFamily="gilroy-medium"
                        shadow="shadow-none"
                        className="py-3 md:px-6 text-xs"
                      >
                        Create Wallet
                      </Button>
                    </div>
                  </div>
                </div>
              </section>

              <TopBrands />

              <Notifications />
            </div>

            <PopularCarsSection />
          </div>
        </div>
      </div>
    </>
  );
}
