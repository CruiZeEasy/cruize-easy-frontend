import { NotificationSection } from "@/components/host/dashboard/notification/NotificationSection";
import { HostHeader } from "@/components/host/HostHeader";
import { notifications } from "@/data/notifications";

export default function HostNotificationPage() {
  return (
    <div className="pb-28 max-w-2xl mx-auto ">
      {/* <HostHeader /> */}

      <div className="sticky top-0 bg-white z-10 p-4 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
        <HostHeader />
      </div>

      <section className="p-4 md:px-0">
        {notifications.map((section, index) => (
          <NotificationSection key={index} {...section} />
        ))}
      </section>
    </div>
  );
}
