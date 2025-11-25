"use client";
import Image from "next/image";
import { Button } from "../ui/Buttons";
import { CarCard } from "../shared/CarCard";
import { cars } from "@/data/carData";
import { usePageTransition } from "@/hooks/usePageTransition";
import { PageTransitionSpinner } from "../ui/PageTransitionSpinner";
import { PATHS } from "@/utils/path";

export function PopularCar() {
  const { navigate, isNavigating } = usePageTransition();

  const handleRent = (id: number) => {
    navigate(PATHS.USER.BOOKING_OVERVIEW(id));
    console.log("Rent car:", id);
    // Add your rent logic here
  };

  const handleFavorite = (id: number) => {
    console.log("Toggle favorite:", id);
    // Add your favorite logic here
  };
  return (
    <>
      <section>
        <h2 className="font-gilroy-bold text-sm xl:hidden ">Popular Car</h2>

        {/* Desktop Version  */}
        <div className="rounded-[20px] p-4 bg-white hidden lg:block mt-2 xl:mt-0">
          <h2 className="font-gilroy-bold hidden xl:block">Popular Cars</h2>

          <div className="mt-4 grid xl:grid-cols-2 gap-x-4 items-center">
            <span className="flex justify-end xl:hidden mb-4">
              <button className="transition duration-20 hover:scale-[1.05] active:scale-95 cursor-pointer ">
                <Image
                  src="/images/icons/heart.svg"
                  width={24}
                  height={24}
                  alt="heart icon"
                  className="size-6"
                />
              </button>
            </span>
            <div className="relative h-[247px] overflow-hidden rounded-[20px]">
              <Image
                src={`/images/cars/1.webp`}
                fill
                alt={`Car Image`}
                quality={100}
                className=" object-cover object-center"
              />
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <span className="flex justify-end">
                  <button className="transition duration-20 hover:scale-[1.05] active:scale-95 cursor-pointer hidden xl:block">
                    <Image
                      src="/images/icons/heart.svg"
                      width={24}
                      height={24}
                      alt="heart icon"
                      className="size-6"
                    />
                  </button>
                </span>

                <div className="flex justify-between items-center mt-2">
                  <div className="flex flex-col">
                    <span className="font-gilroy-bold text-base sm:text-[22px]">
                      GLE AMG 63S
                    </span>

                    <div>
                      <span className="font-gilroy-bold ">456k/</span>
                      <span className="font-gilroy-medium text-neutral-450">
                        day
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="font-gilroy-medium text-neutral-450">
                      4.5
                    </span>
                    <Image
                      src="/images/icons/star-1.svg"
                      alt="Star"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between space-x-4 mt-6 font-gilroy-medium text-neutral-450 border-b border-neutral-270 pb-2">
                  <div className="flex items-center space-x-2">
                    <Image
                      src="/images/icons/gas-station.svg"
                      alt="Fuel"
                      width={20}
                      height={20}
                    />
                    <span>90L</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Image
                      src="/images/icons/steering-wheel.svg"
                      alt="Transmission"
                      width={20}
                      height={20}
                    />
                    <span>Manual</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Image
                      src="/images/icons/user-profile.svg"
                      alt="Capacity"
                      width={20}
                      height={20}
                    />
                    <span>2 Persons</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  type="button"
                  variant="dark-primary"
                  fontFamily="gilroy-medium"
                  rounded="full"
                  fullWidth
                  shadow="shadow-none"
                  className="py-3"
                  onClick={() => handleRent(22)}
                >
                  Rent Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Version */}

        <div
          className="
          flex gap-4 mt-2 overflow-x-auto pb-4 scrollbar-hide lg:hidden
        "
        >
          {cars.map((car) => (
            <CarCard
              key={car.id}
              {...car}
              onRentClick={handleRent}
              onFavoriteClick={handleFavorite}
            />
          ))}
        </div>
      </section>

      {/* Page Transition Spinner */}
      <PageTransitionSpinner isVisible={isNavigating} />
    </>
  );
}
