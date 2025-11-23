import { Notifications } from "@/components/dashboard/Notifications";
import { ListingsOverview } from "@/components/dashboard/ListingsOverview";
import { TopBrands } from "@/components/dashboard/TopBrands";
import { WalletSection } from "@/components/dashboard/WalletSection";
import { MobileSidebar } from "@/components/shared/MobileSidebar";
import { FormInput } from "@/components/ui/FormInput";
import Image from "next/image";

export default function UserDashboard() {
  return (
    <>
      <div className="pb-28 min-w-0">
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
          <section className="sticky top-0 z-10 md:pt-6 md:pb-4 hidden md:flex items-center justify-between bg-neutral-100">
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
            <div className="md:col-span-2  min-w-0">
              <WalletSection />

              <TopBrands />

              {/* <Map /> Future Update */}

              <Notifications />
            </div>

            <ListingsOverview />
          </div>
        </div>
      </div>
    </>
  );
}
