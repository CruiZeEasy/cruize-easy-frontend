import { NotificationSection } from "@/components/host/notification/NotificationSection";
import { HostHeader } from "@/components/host/HostHeader";
import { notifications } from "@/data/notifications";

export default function HostNotificationPage() {
  return (
    <div className="pb-28 max-w-3xl mx-auto bg-white ">
      <div className="sticky top-0 z-10 bg-white md:border-b md:border-b-neutral-275 shadow-sm md:shadow-none md:pt-2 md:px-10">
        <div className=" px-4 py-4 md:px-0 ">
          <HostHeader />
        </div>
      </div>

      <section className="p-4 md:px-10 bg-white">
        {notifications.map((section, index) => (
          <NotificationSection key={index} {...section} />
        ))}
      </section>
    </div>
  );
}
