import { HostHeader } from "@/components/host/HostHeader";
import Image from "next/image";

export default function HostNotificationPage() {
  return (
    <div className="mb-28">
      <HostHeader />

      <section>
        {/* Today */}
        <div>
          <div className="font-gilroy-semibold flex items-center justify-between mt-12">
            <h2>Today</h2>
            <button className="text-royal-blue hover:underline transition-all text-sm cursor-pointer">
              Mark as read
            </button>
          </div>

          <div className="mt-6 divide-y divide-neutral-150 space-y-5">
            <div className="flex space-x-4 pb-5">
              <div className="bg-primary-pale flex flex-shrink-0 items-center justify-center size-14 rounded-full">
                <Image
                  src="/images/icons/calendar-tick-dark.svg"
                  alt="Calendar Tick"
                  width={20}
                  height={20}
                />
              </div>

              <div className="space-y-1">
                <h2 className="font-gilroy-bold text-sm">
                  Car booked successfully
                </h2>
                <p className="font-gilroy-medium text-xs  text-neutral-475">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua
                </p>
              </div>
            </div>

            <div className="flex space-x-4 pb-5">
              <div className="bg-primary-pale flex flex-shrink-0 items-center justify-center size-14 rounded-full">
                <Image
                  src="/images/icons/clock-dark.svg"
                  alt="Calendar Tick"
                  width={20}
                  height={20}
                />
              </div>

              <div className="space-y-1">
                <h2 className="font-gilroy-bold text-sm">2 hours remain</h2>
                <p className="font-gilroy-medium text-xs  text-neutral-475">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="bg-primary-pale flex flex-shrink-0 items-center justify-center size-14 rounded-full">
                <Image
                  src="/images/icons/crown-dark.svg"
                  alt="Calendar Tick"
                  width={20}
                  height={20}
                />
              </div>

              <div className="space-y-1">
                <h2 className="font-gilroy-bold text-sm">Request accepted</h2>
                <p className="font-gilroy-medium text-xs  text-neutral-475">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Yesterday */}
        <div>
          <div className="font-gilroy-semibold flex items-center justify-between mt-12">
            <h2>Yesterday</h2>
            <button className="text-royal-blue hover:underline transition-all text-sm cursor-pointer">
              Mark as read
            </button>
          </div>

          <div className="mt-6 divide-y divide-neutral-150 space-y-5">
            <div className="flex space-x-4 pb-5">
              <div className="bg-primary-pale flex flex-shrink-0 items-center justify-center size-14 rounded-full">
                <Image
                  src="/images/icons/calendar-tick-dark.svg"
                  alt="Calendar Tick"
                  width={20}
                  height={20}
                />
              </div>

              <div className="space-y-1">
                <h2 className="font-gilroy-bold text-sm">
                  Car booked successfully
                </h2>
                <p className="font-gilroy-medium text-xs  text-neutral-475">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua
                </p>
              </div>
            </div>

            <div className="flex space-x-4 pb-5">
              <div className="bg-primary-pale flex flex-shrink-0 items-center justify-center size-14 rounded-full">
                <Image
                  src="/images/icons/clock-dark.svg"
                  alt="Calendar Tick"
                  width={20}
                  height={20}
                />
              </div>

              <div className="space-y-1">
                <h2 className="font-gilroy-bold text-sm">2 hours remain</h2>
                <p className="font-gilroy-medium text-xs  text-neutral-475">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="bg-primary-pale flex flex-shrink-0 items-center justify-center size-14 rounded-full">
                <Image
                  src="/images/icons/crown-dark.svg"
                  alt="Calendar Tick"
                  width={20}
                  height={20}
                />
              </div>

              <div className="space-y-1">
                <h2 className="font-gilroy-bold text-sm">Request accepted</h2>
                <p className="font-gilroy-medium text-xs  text-neutral-475">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
