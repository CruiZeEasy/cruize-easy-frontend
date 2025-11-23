import Image from "next/image";

export function Notifications() {
  return (
    <section className="mt-4 md:mt-6 hidden lg:block">
      <div className="rounded-[20px] mt-2 md:mt-0 p-4 h-56 bg-white">
        <div className="flex items-center pb-2 space-x-1 border-b border-b-neutral-165">
          <Image
            src="/images/icons/message-notif-dark.svg"
            alt="Message Notifs"
            width={24}
            height={24}
          />
          <h2 className="font-gilroy-bold hidden md:block">Notifications</h2>
        </div>

        <div className="mt-4">
          <div className="font-gilroy-semibold flex items-center justify-between text-sm">
            <h2>Today</h2>
            <button className="text-royal-blue hover:underline transition-all text-xs cursor-pointer">
              Mark as read
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
