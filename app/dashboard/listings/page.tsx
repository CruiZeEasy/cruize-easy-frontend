"use client";
import { ListingsForYou } from "@/components/dashboard/listings/ListingsForYou";
import { HostHeader } from "@/components/host/HostHeader";
import { FormInput } from "@/components/ui/FormInput";
import { useAvailableVehicles } from "@/hooks/useAvailableVehicles";
import { useFilterModal } from "@/stores/FilterModal";
import Image from "next/image";

export default function CarListingsPage() {
  const { open } = useFilterModal();
  const { data: vehicles, isLoading: vehiclesLoading } = useAvailableVehicles();

  return (
    <div className="pb-28">
      <div className="sticky top-0 z-40 bg-white md:pt-2">
        <div className="px-4 py-4 md:px-0">
          <HostHeader />

          <div className="flex space-x-2 mt-4 md:mx-12">
            <button
              className="bg-primary-dark flex items-center justify-center rounded-[6px] px-2.5 md:px-2 cursor-pointer flex-shrink-0"
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
        <ListingsForYou vehicles={vehicles!} isLoading={vehiclesLoading} />
      </div>
    </div>
  );
}
