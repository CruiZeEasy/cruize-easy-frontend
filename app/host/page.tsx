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
          <span className="font-gilroy-medium">User host name</span>
        </div>
      </section>

      {/* My Earnings Section */}
      <section className="rounded-[20px] mt-6 p-4 bg-white">
        <div className="flex justify-between items-center">
          <span className="font-gilroy-medium text-xs text-black-transparent md:hidden">
            Total Balance
          </span>
          <span className="font-gilroy-bold text-sm hidden md:block">
            My Earnings
          </span>
          <span className="font-gilroy-medium text-xs text-black-transparent">
            {new Date().toLocaleString("en-US", { month: "long" })}
          </span>
        </div>

        <div className="mt-8 flex items-end justify-between">
          <div>
            <h2 className="font-gilroy-bold text-4xl text-neutral-700">
              <span className="font-source-sans font-bold text-[2.5rem]">
                ₦
              </span>
              0.00
            </h2>
            <span className="font-gilroy-medium text-xs text-black-transparent">
              Total Earnings this month
            </span>
          </div>

          <Button
            variant="dark-primary"
            fontFamily="gilroy-medium"
            shadow="shadow-none"
            className="py-3 px-6 text-xs"
          >
            Create Wallet
          </Button>
        </div>
      </section>
    </div>
  );
}
