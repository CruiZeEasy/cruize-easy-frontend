export function PopularCarDesktopSkeleton() {
  return (
    <div className="rounded-[20px] p-4 bg-white hidden lg:block animate-pulse">
      <div className="h-6 bg-neutral-300 rounded w-32 mb-4" />

      <div className="grid xl:grid-cols-2 gap-x-4 items-center">
        <span className="flex justify-end xl:hidden mb-4">
          <div className="w-6 h-6 bg-neutral-300 rounded" />
        </span>

        <div className="h-[247px] bg-neutral-300 rounded-[20px]" />

        <div className="flex flex-col justify-between">
          <div>
            <span className="flex justify-end mb-2">
              <div className="w-6 h-6 bg-neutral-300 rounded hidden xl:block" />
            </span>

            <div className="flex justify-between items-center mt-2">
              <div className="flex flex-col space-y-2">
                <div className="h-6 bg-neutral-300 rounded w-40" />
                <div className="h-5 bg-neutral-300 rounded w-24" />
              </div>

              <div className="flex items-center space-x-2">
                <div className="h-4 bg-neutral-300 rounded w-8" />
                <div className="w-5 h-5 bg-neutral-300 rounded" />
              </div>
            </div>

            <div className="flex items-center justify-between space-x-4 mt-6 border-b border-neutral-270 pb-2">
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
                <div className="h-4 bg-neutral-300 rounded w-20" />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="h-12 bg-neutral-300 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PopularCarMobileSkeleton() {
  return (
    <div className="flex gap-4 mt-2 overflow-x-auto pb-4 scrollbar-hide lg:hidden">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="bg-white border border-neutral-160 shadow-[0_10px_48.8px_0_rgba(0,0,0,0.18)] p-4 rounded-lg shrink-0 w-[280px] animate-pulse"
        >
          <span className="flex justify-end">
            <div className="w-6 h-6 bg-neutral-300 rounded mb-4" />
          </span>

          <div className="w-full max-w-[300px] h-[193px] bg-neutral-300 rounded mb-2" />

          <div className="pb-2 text-sm">
            <div className="flex items-center justify-between w-full mb-4">
              <div className="h-5 bg-neutral-300 rounded w-32" />
              <div className="flex items-center space-x-2">
                <div className="h-4 bg-neutral-300 rounded w-8" />
                <div className="w-5 h-5 bg-neutral-300 rounded" />
              </div>
            </div>

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

            <div className="h-px mt-4 bg-neutral-270" />

            <div className="flex items-center justify-between mt-4 gap-4">
              <div className="h-6 bg-neutral-300 rounded w-24" />
              <div className="h-10 bg-neutral-300 rounded w-28" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
