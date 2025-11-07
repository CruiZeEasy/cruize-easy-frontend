import { HostHeader } from "@/components/host/HostHeader";
import { Button } from "@/components/ui/Buttons";
import Image from "next/image";

export default function HostBookingsPage() {
  return (
    <div className="pb-28 max-w-2xl mx-auto">
      <div className="sticky top-0 z-10 bg-white md:pt-6">
        <div className=" p-4 shadow-sm ">
          <HostHeader />
        </div>
      </div>

      <section className="p-4 md:px-0 mt-10 ">
        <div className="p-3 rounded-[19.21px] shadow-[0_4.8px_4.8px_0_rgba(0,0,0,0.25)] flex items-stretch ">
          <div className="relative w-[170px] h-auto flex-1 max-w-[170px]">
            <Image
              src={`/images/cars/land-rover.png`}
              fill
              alt={`land-rover car`}
              quality={75}
              className="object-cover rounded-[8.88px]"
            />
          </div>

          <div className="ml-4 md:ml-8 flex-1">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="font-gilroy-bold text-2xl">John Doe</span>
                <span className="font-gilroy-medium text-black/45 text-sm md:text-base ">
                  Booked your Mercerdes Gle
                </span>
              </div>

              <div className="bg-primary-dark p-1.5 md:p-2 rounded-[6.15px] flex-shrink-0 ">
                <Image
                  src={`/images/icons/messages-light.svg`}
                  height={27.96}
                  width={27.96}
                  alt="Message Icon"
                  priority
                  className="size-[23px] md:size-[27.96px]"
                />
              </div>
            </div>

            <div className="flex justify-between font-gilroy-medium mt-2">
              <div className="flex items-center justify-between w-full md:w-[17rem] space-x-2">
                <div className="flex flex-col flex-shrink-0 text-xs md:text-sm">
                  <span>Apr 3, 12pm</span>
                  <span className="font-gilroy-regular text-black/40 text-center">
                    Pick up
                  </span>
                </div>
                <div className="bg-primary-soft w-full h-[1px] -mt-4" />
                <div className="flex flex-col flex-shrink-0 text-xs md:text-sm">
                  <span>Apr 5, 3pm</span>
                  <span className="font-gilroy-regular text-black/40 text-center">
                    Drop off
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 mt-2">
              <Button
                variant="green"
                fontFamily="gilroy-bold"
                shadow="shadow-none"
                className="py-3 px-6 text-xs"
              >
                Accept
              </Button>
              <Button
                variant="dark-primary"
                fontFamily="gilroy-bold"
                shadow="shadow-none"
                className="py-3 px-6 text-xs"
              >
                Decline
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
