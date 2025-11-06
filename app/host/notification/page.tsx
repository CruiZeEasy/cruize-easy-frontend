import { NotificationSection } from "@/components/host/dashboard/notification/NotificationSection";
import { HostHeader } from "@/components/host/HostHeader";
import { notifications } from "@/data/notifications";

export default function HostNotificationPage() {
  return (
    <div className="pb-28 max-w-2xl mx-auto ">
      {/* <HostHeader /> */}

      <div className="sticky top-0 bg-white z-10 pb-4 mb-6 -mx-4 px-4 md:mx-0 md:px-0">
        <HostHeader />
      </div>

      <section>
        {notifications.map((section, index) => (
          <NotificationSection key={index} {...section} />
        ))}
      </section>
    </div>
  );
}
