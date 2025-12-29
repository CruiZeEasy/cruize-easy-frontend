import Image from "next/image";
import { Button } from "@/components/ui/Buttons";
import { BookingData } from "@/types/booking";
import { format } from "date-fns";
import { formatName } from "@/utils/formatters";
import { getUIStatus } from "@/utils/bookingHelpers";

export type BookingStatus = "upcoming" | "ongoing" | "completed";

interface BookingCardProps {
  booking: BookingData;
  variant?: "host" | "user";
  onAccept?: (bookingId: string) => void;
  onDecline?: (bookingId: string) => void;
  onFindCar?: (bookingId: string) => void;
  onEndTrip?: (bookingId: string) => void;
  onMessage?: (bookingId: string) => void;
}

// Helper function to format date/time
function formatDateTime(dateTime: string) {
  const date = new Date(dateTime);
  return {
    date: format(date, "MMM d"),
    time: format(date, "h:mm a"),
  };
}

export function BookingCard({
  booking,
  variant = "host",
  onAccept,
  onDecline,
  onFindCar,
  onEndTrip,
  onMessage,
}: BookingCardProps) {
  const uiStatus = getUIStatus(booking.status);
  const pickupDateTime = formatDateTime(booking.startDateTime);
  const dropoffDateTime = formatDateTime(booking.endDateTime);
  const primaryImage = booking.images[0]?.url || "/images/placeholder-car.png";

  const displayName =
    variant === "host" ? booking.renterName : booking.hostName;
  const carName = `${booking.vehicleBrand} ${booking.vehicleName}`;

  return (
    <div className="p-3 rounded-[19.21px] shadow-[0_4.8px_4.8px_0_rgba(0,0,0,0.25)]">
      {/* Mobile Layout (< md) */}
      <div className="flex md:hidden flex-col">
        <div className="flex items-start gap-3">
          <div className="relative w-[100px] h-[100px] shrink-0">
            <Image
              src={primaryImage}
              fill
              alt={carName}
              quality={75}
              className="object-cover rounded-[8.88px]"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-2">
              <div className="flex flex-col min-w-0">
                <span className="font-gilroy-bold text-xl truncate">
                  {formatName(displayName)}
                </span>
                <span className="font-gilroy-medium text-black/45 text-xs">
                  Booked {variant === "host" ? "your" : "a"}{" "}
                  {formatName(carName)}
                </span>
              </div>

              <button
                onClick={() => onMessage?.(booking.id)}
                className="bg-primary-dark p-1.5 rounded-[6.15px] shrink-0 hover:opacity-90 transition-opacity"
              >
                <Image
                  src="/images/icons/messages-light.svg"
                  height={20}
                  width={20}
                  alt="Message Icon"
                  priority
                />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 font-gilroy-medium">
          <div className="flex flex-col shrink-0 text-xs">
            <span>
              {pickupDateTime.date}, {pickupDateTime.time}
            </span>
            <span className="font-gilroy-regular text-black/40">Pick up</span>
          </div>

          <div className="bg-primary-soft flex-1 h-px mx-3" />

          <div className="flex flex-col shrink-0 text-xs text-right">
            <span>
              {dropoffDateTime.date}, {dropoffDateTime.time}
            </span>
            <span className="font-gilroy-regular text-black/40">Drop off</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-4">
          {uiStatus === "upcoming" ? (
            <>
              {variant === "host" && (
                <>
                  <Button
                    variant="green"
                    fontFamily="gilroy-bold"
                    shadow="shadow-none"
                    className="py-3 px-5 text-xs flex-1 max-w-[120px]"
                    onClick={() => onAccept?.(booking.id)}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="dark-primary"
                    fontFamily="gilroy-bold"
                    shadow="shadow-none"
                    className="py-3 px-5 text-xs flex-1 max-w-[120px]"
                    onClick={() => onDecline?.(booking.id)}
                  >
                    Decline
                  </Button>
                </>
              )}
            </>
          ) : uiStatus === "ongoing" ? (
            variant === "host" ? (
              <Button
                variant="dark-primary"
                fontFamily="gilroy-bold"
                shadow="shadow-none"
                className="py-3 px-5 text-xs flex-1 max-w-[120px]"
                onClick={() => onFindCar?.(booking.id)}
              >
                Find Car
              </Button>
            ) : (
              <Button
                variant="dark-primary"
                fontFamily="gilroy-bold"
                shadow="shadow-none"
                className="py-3 px-5 text-xs flex-1 max-w-[120px]"
                onClick={() => onEndTrip?.(booking.id)}
              >
                End Trip
              </Button>
            )
          ) : (
            <span className="font-gilroy-bold text-green text-xs">
              Completed
            </span>
          )}
        </div>
      </div>

      {/* Desktop Layout (>= md) */}
      <div className="hidden md:flex items-stretch">
        <div className="relative w-[170px] h-auto flex-1 max-w-[170px]">
          <Image
            src={primaryImage}
            fill
            alt={carName}
            quality={75}
            className="object-cover rounded-[8.88px]"
          />
        </div>

        <div className="ml-8 flex-1">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="font-gilroy-bold text-2xl">
                {formatName(displayName)}
              </span>
              <span className="font-gilroy-medium text-black/45 text-base">
                Booked {variant === "host" ? "your" : "a"} {formatName(carName)}
              </span>
            </div>

            <button
              onClick={() => onMessage?.(booking.id)}
              className="bg-primary-dark p-2 rounded-[6.15px] shrink-0 hover:opacity-90 transition-opacity"
            >
              <Image
                src="/images/icons/messages-light.svg"
                height={27.96}
                width={27.96}
                alt="Message Icon"
                priority
                className="size-[27.96px]"
              />
            </button>
          </div>

          <div className="flex justify-between font-gilroy-medium mt-2">
            <div className="flex items-center justify-between w-68 space-x-2">
              <div className="flex flex-col shrink-0 text-sm">
                <span>
                  {pickupDateTime.date}, {pickupDateTime.time}
                </span>
                <span className="font-gilroy-regular text-black/40 text-center">
                  Pick up
                </span>
              </div>
              <div className="bg-primary-soft w-full h-px -mt-4" />
              <div className="flex flex-col shrink-0 text-sm">
                <span>
                  {dropoffDateTime.date}, {dropoffDateTime.time}
                </span>
                <span className="font-gilroy-regular text-black/40 text-center">
                  Drop off
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 mt-2">
            {uiStatus === "upcoming" ? (
              <>
                {variant === "host" && (
                  <>
                    <Button
                      variant="green"
                      fontFamily="gilroy-bold"
                      shadow="shadow-none"
                      className="py-3 px-6 text-xs"
                      onClick={() => onAccept?.(booking.id)}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="dark-primary"
                      fontFamily="gilroy-bold"
                      shadow="shadow-none"
                      className="py-3 px-6 text-xs"
                      onClick={() => onDecline?.(booking.id)}
                    >
                      Decline
                    </Button>
                  </>
                )}
              </>
            ) : uiStatus === "ongoing" ? (
              variant === "host" ? (
                <Button
                  variant="dark-primary"
                  fontFamily="gilroy-bold"
                  shadow="shadow-none"
                  className="py-3 px-5 text-xs flex-1 max-w-[120px]"
                  onClick={() => onFindCar?.(booking.id)}
                >
                  Find Car
                </Button>
              ) : (
                <Button
                  variant="dark-primary"
                  fontFamily="gilroy-bold"
                  shadow="shadow-none"
                  className="py-3 px-5 text-xs flex-1 max-w-[120px]"
                  onClick={() => onEndTrip?.(booking.id)}
                >
                  End Trip
                </Button>
              )
            ) : (
              <span className="font-gilroy-bold text-green py-2">
                Completed
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
