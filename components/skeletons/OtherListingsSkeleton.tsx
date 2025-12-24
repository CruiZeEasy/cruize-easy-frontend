import { CarCardSkeleton } from "./CarCardSkeleton";

export function OtherListingsSkeleton() {
  return (
    <section className="hidden lg:block">
      <div className="grid grid-cols-2 gap-4 mt-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <CarCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
