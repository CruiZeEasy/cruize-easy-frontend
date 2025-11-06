import { NotificationProps } from "@/data/notifications";
import { NotificationItem } from "./NotificationItem";

export function NotificationSection({ label, items }: NotificationProps) {
  return (
    <div>
      <div className="font-gilroy-semibold flex items-center justify-between mt-10">
        <h2>{label}</h2>
        <button className="text-royal-blue hover:underline transition-all text-sm cursor-pointer">
          Mark as read
        </button>
      </div>

      <div className="mt-6 divide-y divide-neutral-150 space-y-5">
        {items.map((n, idx) => (
          <NotificationItem key={idx} {...n} />
        ))}
      </div>
    </div>
  );
}
