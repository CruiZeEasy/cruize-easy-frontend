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
    </div>
  );
}
