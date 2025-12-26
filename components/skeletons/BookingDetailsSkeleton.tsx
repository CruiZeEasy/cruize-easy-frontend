import { HostHeader } from "@/components/host/HostHeader";

export function BookingDetailsSkeleton() {
  return (
    <div className="pb-28">
      <div className="sticky top-0 z-40 bg-white lg:pt-2 lg:mx-12 md:border-b md:border-b-neutral-275 shadow-sm md:shadow-none">
        <div className="px-4 py-4 lg:px-0">
          <HostHeader />
        </div>
      </div>

      <div className="px-4 lg:px-12 lg:py-4 mt-8 lg:mt-10">
        <section className="grid lg:grid-cols-2 gap-x-8 animate-pulse">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Vehicle Image & Name */}
            <div className="space-y-4 bg-white md:p-4 rounded-[20px]">
              <div className="relative w-full h-[278px] bg-neutral-300 rounded-[20px]" />
              <div className="h-6 w-48 bg-neutral-300 rounded" />
            </div>

            {/* Pickup Location */}
            <div className="bg-white rounded-[20px] md:p-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-neutral-300 rounded mt-1 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-32 bg-neutral-300 rounded" />
                  <div className="h-4 w-full bg-neutral-300 rounded" />
                  <div className="h-4 w-3/4 bg-neutral-300 rounded" />
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white rounded-[20px] md:p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-neutral-300 rounded" />
                  <div className="h-5 w-32 bg-neutral-300 rounded" />
                </div>
                <div className="w-5 h-5 bg-neutral-300 rounded" />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-white rounded-[20px] mt-6 lg:mt-0 md:p-4">
            {/* Rent Type */}
            <div className="space-y-2">
              <div className="h-4 w-20 bg-neutral-300 rounded" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-12 bg-neutral-300 rounded-lg" />
                <div className="h-12 bg-neutral-300 rounded-lg" />
              </div>
            </div>

            {/* Pickup Date and Time */}
            <div className="mt-6 space-y-2">
              <div className="h-4 w-40 bg-neutral-300 rounded" />
              <div className="flex items-center gap-4">
                <div className="flex-1 h-11 bg-neutral-300 rounded-lg" />
                <div className="hidden md:block w-12 h-4 bg-neutral-300 rounded" />
                <div className="flex-1 h-11 bg-neutral-300 rounded-lg" />
              </div>
            </div>

            {/* Return Date and Time */}
            <div className="mt-6 space-y-2">
              <div className="h-4 w-40 bg-neutral-300 rounded" />
              <div className="flex items-center gap-4">
                <div className="flex-1 h-11 bg-neutral-300 rounded-lg" />
                <div className="hidden md:block w-12 h-4 bg-neutral-300 rounded" />
                <div className="flex-1 h-11 bg-neutral-300 rounded-lg" />
              </div>
            </div>

            {/* Dropoff Location */}
            <div className="mt-6 space-y-2">
              <div className="h-4 w-32 bg-neutral-300 rounded" />
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-neutral-300 rounded" />
                <div className="h-4 w-40 bg-neutral-300 rounded" />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-12 lg:mt-6">
              <div className="h-12 w-full bg-neutral-300 rounded-lg" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
