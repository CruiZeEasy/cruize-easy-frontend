"use client";

import { ListingsForYou } from "@/components/dashboard/listings/ListingsForYou";
import { HostHeader } from "@/components/host/HostHeader";
import { Button } from "@/components/ui/Buttons";
import { FormInput } from "@/components/ui/FormInput";
import { PageTransitionSpinner } from "@/components/ui/PageTransitionSpinner";
import { useAvailableVehicles } from "@/hooks/useAvailableVehicles";
import { usePageTransition } from "@/hooks/usePageTransition";
import { useFilterModal } from "@/stores/FilterModal";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function CarListingsPage() {
  const { open } = useFilterModal();

  const {
    data: vehicles,
    isLoading: vehiclesLoading,
    error,
    refetch,
  } = useAvailableVehicles();

  const { navigate, isNavigating } = usePageTransition();

  return (
    <>
      <div className="pb-28">
        <div className="sticky top-0 z-40 bg-white md:pt-2">
          <div className="px-4 py-4 md:px-0">
            <HostHeader />

            <div className="flex space-x-2 mt-4 md:mx-12">
              <button
                className="bg-primary-dark flex items-center justify-center rounded-md px-2.5 md:px-2 cursor-pointer shrink-0"
                onClick={open}
              >
                <Image
                  src="/images/icons/filter-search-light.svg"
                  alt="Filter Search"
                  width={24}
                  height={24}
                />
              </button>

              <FormInput
                id="search"
                label=""
                placeholder="Search here"
                variant="search"
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 px-4 md:p-0 md:px-12 min-w-0">
          {error ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="font-gilroy-medium text-red-500 text-lg mb-4">
                Failed to load vehicles
              </p>
              <Button
                variant="dark-primary"
                fontFamily="gilroy-medium"
                shadow="shadow-none"
                onClick={() => refetch()}
              >
                Try Again
              </Button>
            </div>
          ) : (
            <ListingsForYou
              navigate={navigate}
              vehicles={vehicles || []}
              isLoading={vehiclesLoading}
            />
          )}
        </div>
      </div>

      {/* Page Transition Spinner */}
      <PageTransitionSpinner isVisible={isNavigating} />
    </>
  );
}
