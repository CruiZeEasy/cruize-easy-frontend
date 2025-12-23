import { CarCardSkeleton } from "./CarCardSkeleton";

export function OtherListingsSkeleton() {
  return (
    <section className="hidden lg:block">
      <div className="flex items-center justify-between mb-2">
        <div className="h-6 bg-neutral-300 rounded w-32 animate-pulse" />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <CarCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
