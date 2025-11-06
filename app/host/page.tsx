import { ActivityCard } from "@/components/host/dashboard/ActivityCard";
import { HostMobileSidebar } from "@/components/shared/HostMobileSidebar";
import { Button } from "@/components/ui/Buttons";
import { activityCards } from "@/data/hostActivityCards";
import Image from "next/image";

export default function HostHomePage() {
  return (
    <div className="pb-28">
      <div className="sticky top-0 z-10 flex items-baseline justify-between w-full bg-white p-4 md:hidden shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
        <Image
          src="/images/logo/cruize-easy-logo-dark.svg"
          alt="Cruize Easy Logo Icon"
          width={155}
          height={32}
          priority
        />
        <HostMobileSidebar />
      </div>

      <div className="p-4 md:p-0">
        {/* Greeting Section */}
        <section className=" flex items-center space-x-4 mt-10 md:mt-0">
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
          <h2 className="font-gilroy-bold text-sm md:hidden">My Earnings</h2>
          <div className="rounded-[20px] mt-2 md:mt-0 p-4 bg-white border border-neutral-150 shadow-[0_6px_17.9px_0_rgba(0,0,0,0.1)]">
            <div className="flex justify-between items-center">
              <span className="font-gilroy-medium text-xs text-black-transparent md:hidden">
                Total Balance
              </span>
              <h2 className="font-gilroy-bold hidden md:block">My Earnings</h2>
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

        {/* My Activity Section */}
        <section className="mt-6">
          <h2 className="font-gilroy-bold text-sm md:text-base md:px-4">
            My Activity
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
            {activityCards.map((card) => (
              <ActivityCard
                key={card.id}
                icon={card.icon}
                label={card.label}
                value={0}
              />
            ))}
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

              <p className="font-gilroy-medium text-xs text-center w-[15rem] text-neutral-475 mt-2 md:mt-4">
                You currently don&apos;t have any booking history, get started
                by adding your first car
              </p>

              <div className=" w-80 max-w-full mt-3">
                <Button
                  variant="dark-primary"
                  fontFamily="gilroy-medium"
                  shadow="shadow-none"
                  className="py-4 md:px-6 text-xs"
                  fullWidth
                >
                  Add Car
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
