import { ActivityCard } from "@/components/host/dashboard/ActivityCard";
import { HostHeader } from "@/components/host/HostHeader";
import { activityCards } from "@/data/hostActivityCards";
import Image from "next/image";

export default function HostProfilePage() {
  return (
    <div className="pb-28">
      <div className="sticky top-0 z-10 bg-white md:bg-neutral-100 shadow-sm md:shadow-none md:pt-2 md:px-10">
        <div className=" px-4 py-4 md:px-0 ">
          <HostHeader />
        </div>
      </div>

      <div className="p-4 md:px-12 mt-8 md:mt-10">
        <section className="flex flex-col md:flex-row space-x-4">
          <div className="flex items-start md:bg-white font-gilroy-medium md:px-4 md:py-8 space-x-4 rounded-[20px]">
            <div className="bg-neutral-250 rounded-full size-20 overflow-hidden relative flex-shrink-0 ">
              <Image
                src="/images/me.jpg"
                alt="Profile Image"
                fill
                className="object-cover"
              />
            </div>

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

          <div className="bg-neutral-150 h-[1px] w-full mt-4 md:hidden" />

          <div className="mt-4 md:mt-0 grid grid-cols-2 md:grid-cols-4 gap-4 flex-1 items-center bg-white rounded-[20px] p-4">
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
      </div>
    </div>
  );
}
