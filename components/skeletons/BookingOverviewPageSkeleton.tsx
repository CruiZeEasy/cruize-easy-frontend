import { HostHeader } from "../host/HostHeader";

export function BookingOverviewPageSkeleton() {
  return (
    <div className="pb-28">
      <div className="sticky top-0 z-40 bg-white lg:pt-2 lg:mx-12 md:border-b md:border-b-neutral-275 shadow-sm md:shadow-none">
        <div className="px-4 py-4 lg:px-0">
          <HostHeader />
        </div>
      </div>

      <div className="px-4 lg:px-12 lg:py-4 mt-8 lg:mt-10">
        <section className="grid lg:grid-cols-5 gap-x-8 gap-y-6">
          {/* Left Column Skeleton */}
          <div className="space-y-6 lg:col-span-2 animate-pulse">
            {/* Car Card Skeleton */}
            <div className="h-[302px] sm:h-[377px] bg-neutral-300 rounded-[20px]" />

            {/* Gallery Skeleton - Desktop only */}
            <div className="hidden lg:block">
              <div className="h-4 w-16 bg-neutral-300 rounded mb-2" />
              <div className="grid grid-cols-4 gap-3 bg-white lg:p-4 rounded-[20px]">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-neutral-300 rounded-[10px]"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column Skeleton */}
          <div className="lg:col-span-3 space-y-6 animate-pulse">
            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 bg-neutral-300 rounded w-full" />
              <div className="h-4 bg-neutral-300 rounded w-3/4" />
            </div>

            {/* Host Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="size-10 bg-neutral-300 rounded-full" />
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-neutral-300 rounded" />
                  <div className="h-3 w-16 bg-neutral-300 rounded" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="size-9 bg-neutral-300 rounded-[6.15px]" />
                <div className="h-9 w-32 bg-neutral-300 rounded" />
              </div>
            </div>

            {/* Price and Rating */}
            <div className="flex items-center justify-between">
              <div className="h-6 w-32 bg-neutral-300 rounded" />
              <div className="h-5 w-16 bg-neutral-300 rounded" />
            </div>

            {/* Gallery Skeleton - Mobile only */}
            <div className="lg:hidden">
              <div className="h-4 w-16 bg-neutral-300 rounded mb-2" />
              <div className="grid grid-cols-4 gap-3 bg-white rounded-[20px]">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-neutral-300 rounded-[10px]"
                  />
                ))}
              </div>
            </div>

            {/* Calendar Skeleton */}
            <div>
              <div className="h-6 w-24 bg-neutral-300 rounded mb-2" />
              <div className="grid grid-cols-7 gap-2 mt-4">
                {[...Array(35)].map((_, i) => (
                  <div
                    key={i}
                    className="size-10 bg-neutral-300 rounded-full"
                  />
                ))}
              </div>
            </div>

            {/* Button Skeleton */}
            <div className="lg:flex lg:justify-end mt-12 lg:mt-0">
              <div className="h-12 lg:h-11 lg:w-48 bg-neutral-300 rounded" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
