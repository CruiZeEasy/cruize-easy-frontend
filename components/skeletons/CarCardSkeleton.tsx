export function CarCardSkeleton() {
  return (
    <div className="bg-white border border-neutral-160 lg:border-none shadow-[0_10px_48.8px_0_rgba(0,0,0,0.18)] lg:shadow-none p-4 rounded-lg shrink-0 animate-pulse">
      {/* Favorite Button */}
      <span className="flex justify-end">
        <div className="w-6 h-6 bg-neutral-300 rounded mb-4" />
      </span>

      {/* Car Image */}
      <div className="flex justify-center mb-2">
        <div className="w-full max-w-[300px] h-[193px] bg-neutral-300 rounded" />
      </div>

      {/* Details */}
      <div className="pb-2 text-sm">
        {/* Title and Rating */}
        <div className="flex items-center justify-between w-full mb-4">
          <div className="h-5 bg-neutral-300 rounded w-32" />
          <div className="flex items-center space-x-2">
            <div className="h-4 bg-neutral-300 rounded w-8" />
            <div className="w-5 h-5 bg-neutral-300 rounded" />
          </div>
        </div>

        {/* Specs */}
        <div className="flex items-center justify-between space-x-2 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-neutral-300 rounded" />
            <div className="h-4 bg-neutral-300 rounded w-12" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-neutral-300 rounded" />
            <div className="h-4 bg-neutral-300 rounded w-16" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-neutral-300 rounded" />
            <div className="h-4 bg-neutral-300 rounded w-10" />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mt-4 bg-neutral-270" />

        {/* Price and Button */}
        <div className="flex items-center justify-between mt-4 gap-4">
          <div className="h-6 bg-neutral-300 rounded w-24" />
          <div className="h-10 bg-neutral-300 rounded w-28" />
        </div>
      </div>
    </div>
  );
}
