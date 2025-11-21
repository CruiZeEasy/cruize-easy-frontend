import { useHostVehicles } from "@/hooks/useHostVehicles";
import { getOptimizedImage } from "@/utils/cloudinary";
import { capitalize } from "@/utils/formatters/capitalize";
import clsx from "clsx";
import Image from "next/image";

export function HostCarsSection() {
  const { data: vehicles, isLoading } = useHostVehicles();

  if (isLoading)
    return (
      <div className="md:px-10 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="relative h-[302px] sm:h-[377px] rounded-[20px] overflow-hidden bg-neutral-200 animate-pulse p-4"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black-transparent z-10" />
            <div className="relative z-20 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <div className="w-6 h-6 bg-neutral-300 rounded" />
                <div className="w-6 h-6 bg-neutral-300 rounded" />
              </div>
              <div className="flex flex-col space-y-2">
                <div className="w-3/4 h-6 bg-neutral-300 rounded" />
                <div className="w-1/2 h-4 bg-neutral-300 rounded" />
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-6 h-6 bg-neutral-300 rounded" />
                  <div className="w-6 h-6 bg-neutral-300 rounded" />
                  <div className="w-6 h-6 bg-neutral-300 rounded" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <div className="md:px-10">
      {vehicles && vehicles.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3  gap-4">
          {vehicles?.map((vehicle) => {
            const primaryImage = getOptimizedImage(vehicle.images[0].url, 70);
            return (
              <div
                key={vehicle.id}
                className={clsx(
                  "relative h-[302px] sm:h-[377px] rounded-[20px] overflow-hidden bg-cover bg-center p-4"
                )}
                style={{ backgroundImage: `url(${primaryImage})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black-transparent z-10" />

                <div className="relative z-20 flex flex-col justify-between h-full ">
                  <div className="flex items-center justify-between">
                    <div />
                    <button className="cursor-pointer">
                      <Image
                        src="/images/icons/thrash-light.svg"
                        alt="Thrash"
                        width={24}
                        height={24}
                      />
                    </button>
                  </div>

                  <div className="font-gilroy-medium text-neutral-260 flex flex-col">
                    <span className="text-white text-xl uppercase truncate">
                      {vehicle.name}
                    </span>
                    <span className="text-sm truncate">
                      Jl. Sultan Iskandar Muda, Jakarta selatan
                    </span>

                    <div className="mt-4 flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="bg-white/20 p-2 rounded-md flex-shrink-0">
                          <Image
                            src="/images/icons/gas-station-light.svg"
                            alt="Fuel"
                            width={20}
                            height={20}
                          />
                        </div>

                        <span>90L</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="bg-white/20 p-2 rounded-md flex-shrink-0">
                          <Image
                            src="/images/icons/steering-wheel-light.svg"
                            alt="Transmission"
                            width={20}
                            height={20}
                          />
                        </div>

                        <span>{capitalize(vehicle.transmission)}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="bg-white/20 p-2 rounded-md flex-shrink-0">
                          <Image
                            src="/images/icons/user-profile-2-light.svg"
                            alt="Capacity"
                            width={20}
                            height={20}
                          />
                        </div>

                        <span>
                          {vehicle.seats}{" "}
                          <span className="hidden sm:inline">
                            Person{vehicle.seats !== 1 && "s"}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div className="relative w-[150px] h-[200px]">
            <Image
              src="/images/robots/sad-robot.webp"
              alt="Sad and confused robot"
              fill
              priority
              quality={100}
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
