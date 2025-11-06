import { BackButton } from "../ui/BackButton";

export function HostHeader() {
  return (
    <div className="flex items-center justify-between">
      <BackButton variant="mobile" showOnDesktop />

      <span className="font-modulus-semibold">Notification</span>

      <div className="font-gilroy-semibold text-sm bg-primary-dark text-white rounded-lg py-2 px-4">
        3 new
      </div>
    </div>
  );
}
