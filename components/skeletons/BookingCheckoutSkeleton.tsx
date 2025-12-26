import React from "react";
import { HostHeader } from "../host/HostHeader";

export function BookingCheckoutSkeleton() {
  return (
    <>
      <div className="pb-28">
        <div className="sticky top-0 z-40 bg-white lg:pt-2 lg:mx-12 md:border-b md:border-b-neutral-275 shadow-sm md:shadow-none">
          <div className="px-4 py-4 lg:px-0">
            <HostHeader />
          </div>
        </div>

        <div className="px-4 lg:px-12 lg:py-4 mt-8 lg:mt-10">
          <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
            {/* Header Skeleton */}
            <div>
              <div className="h-8 w-48 bg-neutral-300 rounded mb-2" />
              <div className="h-4 w-32 bg-neutral-300 rounded" />
            </div>

            {/* Vehicle Info Skeleton */}
            <div className="bg-white rounded-[20px] md:p-4">
              <div className="flex gap-4">
                <div className="w-32 h-24 bg-neutral-300 rounded-lg shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-6 w-48 bg-neutral-300 rounded" />
                  <div className="h-4 w-24 bg-neutral-300 rounded" />
                  <div className="h-6 w-20 bg-neutral-300 rounded-full" />
                </div>
              </div>
            </div>

            {/* Booking Details Skeleton */}
            <div className="bg-white rounded-[20px] md:p-4 space-y-4">
              <div className="h-5 w-36 bg-neutral-300 rounded" />

              {/* Dates section */}
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-neutral-300 rounded shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-16 bg-neutral-300 rounded" />
                      <div className="h-4 w-40 bg-neutral-300 rounded" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Locations section */}
              <div className="pt-4 border-t border-neutral-275 space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-neutral-300 rounded shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-24 bg-neutral-300 rounded" />
                      <div className="h-4 w-56 bg-neutral-300 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown Skeleton */}
            <div className="bg-white rounded-[20px] md:p-4">
              <div className="h-5 w-32 bg-neutral-300 rounded mb-4" />

              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="h-4 w-24 bg-neutral-300 rounded" />
                    <div className="h-4 w-20 bg-neutral-300 rounded" />
                  </div>
                ))}

                <div className="pt-3 border-t border-neutral-275 flex items-center justify-between">
                  <div className="h-5 w-16 bg-neutral-300 rounded" />
                  <div className="h-6 w-28 bg-neutral-300 rounded" />
                </div>
              </div>
            </div>

            {/* Payment Button Skeleton */}
            <div className="flex justify-end">
              <div className="h-12 w-40 bg-neutral-300 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
