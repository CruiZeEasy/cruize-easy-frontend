import { HostMobileSidebar } from "@/components/shared/HostMobileSidebar";
import { Button } from "@/components/ui/Buttons";
import Image from "next/image";

export default function HostHomePage() {
  return (
    <div>
      <div className="flex items-baseline justify-between md:hidden">
        <Image
          src="/images/logo/cruize-easy-logo-dark.svg"
          alt="Cruize Easy Logo Icon"
          width={155}
          height={32}
          priority
        />
        <HostMobileSidebar />
      </div>

      {/* Greeting Section */}
      <section className="flex items-center space-x-4 mt-10 md:mt-0">
        <div className="bg-neutral-250 rounded-full size-20 overflow-hidden md:hidden relative ">
          <Image
            src="/images/me.jpg"
            alt="Profile Image"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-1">
          <h1 className="font-gilroy-bold text-4xl md:text-5xl">Welcome</h1>
          <span className="font-gilroy-medium">Joshua Bamidele</span>
        </div>
      </section>

      <div className="bg-neutral-150 h-[1px] w-full mt-4 md:hidden" />

      {/* My Earnings Section */}
      <section className="mt-4 md:mt-6">
        <h2 className="font-gilroy-bold text-sm  md:hidden">My Earnings</h2>
        <div className="rounded-[20px] mt-2 p-4 bg-white border border-neutral-150 shadow-[0_6px_17.9px_0_rgba(0,0,0,0.1)]">
          <div className="flex justify-between items-center">
            <span className="font-gilroy-medium text-xs text-black-transparent md:hidden">
              Total Balance
            </span>
            <h2 className="font-gilroy-bold text-sm hidden md:block">
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
              0.00
            </span>

            <div className="flex justify-between items-center mt-1 md:-mt-2">
              <span className="font-gilroy-medium text-xs text-black-transparent invisible md:visible">
                Total Earnings this month
              </span>
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

      <section className="mt-6">
        <h2 className="font-gilroy-bold text-sm px-4">My Activity</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 mt-2">
          <div className="bg-white px-4 pt-4 pb-2 rounded-[16.5px] border border-neutral-75 shadow-[0_6px_18.61px_0_rgba(0,0,0,0.07)]">
            <div className="flex md:items-center space-x-2 md:space-x-4">
              <div className="relative size-6 md:size-[38px]">
                <Image
                  src={`/images/icons/profile-2user-dark.svg`}
                  alt="User 2 Profile Icon"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col">
                <span className="font-gilroy-bold text-sm md:text-3xl text-primary-dark">
                  0
                </span>

                <span className="md:hidden font-gilroy-medium text-xs  text-black-transparent">
                  Rating
                </span>
              </div>
            </div>

            <div className="hidden md:flex justify-end -mt-1">
              <span className="font-gilroy-medium text-sm md:text-base text-black-transparent">
                Rating
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
