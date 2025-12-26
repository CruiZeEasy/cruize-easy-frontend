export function HostCarCardSkeleton() {
  return (
    <div className="relative h-[302px] sm:h-[377px] rounded-[20px] overflow-hidden bg-neutral-200 animate-pulse p-4">
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="relative z-20 flex flex-col justify-between h-full">
        <div className="flex items-center justify-between">
          <div className="w-6 h-6 bg-neutral-300 rounded" />
          <div className="w-6 h-6 bg-neutral-300 rounded" />
        </div>
        <div className="flex flex-col space-y-2">
          <div className="w-3/4 h-6 bg-neutral-300 rounded" />
          <div className="w-1/2 h-4 bg-neutral-300 rounded" />
          <div className="flex items-center space-x-2 mt-2">
            <div className="w-6 h-6 bg-neutral-300 rounded" />
            <div className="w-6 h-6 bg-neutral-300 rounded" />
            <div className="w-6 h-6 bg-neutral-300 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
