import Image from "next/image";
import clsx from "clsx";

interface NotificationItemProps {
  icon: string;
  title: string;
  message: string;
  read?: boolean;
}

export function NotificationItem({
  icon,
  title,
  message,
  read,
}: NotificationItemProps) {
  return (
    <div className={clsx("flex space-x-4 pb-5", read && "opacity-60")}>
      <div className="bg-primary-pale flex flex-shrink-0 items-center justify-center size-14 rounded-full">
        <Image
          src={`/images/icons/${icon}-dark.svg`}
          alt={title}
          width={20}
          height={20}
        />
      </div>
      <div className="space-y-1">
        <h2
          className={clsx(
            "font-gilroy-bold text-sm",
            read && "text-neutral-475"
          )}
        >
          {title}
        </h2>
        <p className="font-gilroy-medium text-xs text-neutral-475">{message}</p>
      </div>
    </div>
  );
}
