import { HostMobileSidebar } from "@/components/shared/HostMobileSidebar";
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
      <section className="flex items-center space-x-4 mt-8 md:mt-auto">
        <div className="bg-neutral-250 rounded-full size-20 overflow-hidden relative md:hidden">
          <Image
            src="/images/me.jpg"
            alt="Profile Image"
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="font-gilroy-bold text-3xl md:text-4xl">Welcome</h1>
          <span className="font-gilroy-medium">John Doe</span>
        </div>
      </section>
    </div>
  );
}
