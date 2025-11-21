import Image from "next/image";

export function HostCarsSection() {
  return (
    <div className="md:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3  gap-4">
        <div className="relative h-[302px] sm:h-[377px] rounded-[20px] overflow-hidden bg-[url('/images/cars/1.webp')] bg-cover bg-center p-4">
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
              <span className="text-white text-xl">GLE AMG 63S</span>
              <span className="text-sm">
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

                  <span>Automatic</span>
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
                    4 <span className="hidden sm:inline">Persons</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-[302px] sm:h-[377px] rounded-[20px] overflow-hidden bg-[url('/images/cars/2.webp')] bg-cover bg-center p-4">
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
              <span className="text-white text-xl">GLE AMG 63S</span>
              <span className="text-sm">
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

                  <span>Automatic</span>
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
                    4 <span className="hidden sm:inline">Persons</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-[302px] sm:h-[377px] rounded-[20px] overflow-hidden bg-[url('/images/cars/3.webp')] bg-cover bg-center p-4">
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
              <span className="text-white text-xl">GLE AMG 63S</span>
              <span className="text-sm">
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

                  <span>Automatic</span>
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
                    4 <span className="hidden sm:inline">Persons</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
