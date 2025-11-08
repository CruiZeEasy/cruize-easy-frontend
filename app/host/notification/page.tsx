import { NotificationSection } from "@/components/host/notification/NotificationSection";
import { HostHeader } from "@/components/host/HostHeader";
import { notifications } from "@/data/notifications";

export default function HostNotificationPage() {
  return (
    <div className="pb-28 max-w-2xl mx-auto ">
      <div className="sticky top-0 z-10 bg-white md:pt-6">
        <div className=" px-4 py-4 md:px-0 md:border-b md:border-b-neutral-275 shadow-sm md:shadow-none">
          <HostHeader />
        </div>
      </div>

      <section className="p-4 md:px-0">
        {notifications.map((section, index) => (
          <NotificationSection key={index} {...section} />
        ))}
      </section>
    </div>
  );
}
