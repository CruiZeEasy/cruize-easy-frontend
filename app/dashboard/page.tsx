import { MobileSidebar } from "@/components/shared/MobileSidebar";
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
          <div className="flex items-center justify-between">
            <h1 className="font-gilroy-bold text-4xl md:text-5xl hidden md:block">
              Welcome
            </h1>

            <div className="flex flex-col md:flex-row md:items-center w-full md:w-auto space-y-4 md:space-y-0">
              <button className="font-gilroy-medium flex items-center space-x-2 cursor-pointer mr-10">
                <Image
                  src="/images/icons/location.svg"
                  alt="Fuel"
                  width={20}
                  height={20}
                />
                <span className="text-black-transparent">Location</span>
              </button>
              <div className="flex items-stretch space-x-2">
                <div className="bg-primary-dark flex items-center justify-center rounded-[6px] px-2.5 md:px-2 cursor-pointer">
                  <Image
                    src="/images/icons/filter-search-light.svg"
                    alt="Fuel"
                    width={24}
                    height={24}
                  />
                </div>

                <input
                  type="search"
                  placeholder="Search here"
                  className="p-4 border border-primary-dark/25 placeholder:text-neutral-425 outline-none rounded-[20px] font-gilroy-medium  w-full md:w-64"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
