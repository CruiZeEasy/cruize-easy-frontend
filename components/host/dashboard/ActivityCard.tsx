// import { ActivityCardProps } from "@/data/hostActivityCards";
// import Image from "next/image";

// export function ActivityCard({ icon, label, value }: ActivityCardProps) {
//   return (
//     <div className="bg-white px-4 pt-4 pb-2 rounded-[16.5px] border border-neutral-75 shadow-[0_6px_18.61px_0_rgba(0,0,0,0.07)] lg:shadow-[0_6px_18.61px_0_rgba(0,0,0,0.07)]">
//       <div className="flex md:items-center space-x-2 md:space-x-4">
//         <div className="relative size-6 md:size-[38px]">
//           <Image
//             src={`/images/icons/${icon}.svg`}
//             alt={`${label} icon`}
//             fill
//             className="object-contain"
//           />
//         </div>

//         <div className="flex flex-col">
//           <span className="font-gilroy-bold text-sm md:text-3xl text-primary-dark">
//             {value}
//           </span>

//           <span className="md:hidden font-gilroy-medium text-xs text-black-transparent">
//             {label}
//           </span>
//         </div>
//       </div>

//       <div className="hidden md:flex justify-end -mt-1">
//         <span className="font-gilroy-medium text-sm md:text-base text-black-transparent">
//           {label}
//         </span>
//       </div>
//     </div>
//   );
// }

import { ActivityCardProps } from "@/data/hostActivityCards";
import Image from "next/image";
import clsx from "clsx";

interface ActivityCardWithVariantProps extends ActivityCardProps {
  variant?: "default" | "compact";
}

export function ActivityCard({
  icon,
  label,
  value,
  variant = "default",
}: ActivityCardWithVariantProps) {
  return (
    <div className="bg-white px-4 pt-4 pb-2 rounded-[16.5px] border border-neutral-75 shadow-[0_6px_18.61px_0_rgba(0,0,0,0.07)]">
      <div className="flex  space-x-2 md:space-x-4">
        <div
          className={clsx(
            "relative size-6",
            variant === "default" && "md:size-[38px]",
            variant === "compact" && "md:size-8"
          )}
        >
          <Image
            src={`/images/icons/${icon}.svg`}
            alt={`${label} icon`}
            fill
            className="object-contain"
          />
        </div>

        <div className="flex flex-col">
          <span
            className={clsx(
              "font-gilroy-bold text-primary-dark",
              variant === "default" && "text-sm md:text-3xl",
              variant === "compact" && "text-sm md:text-lg"
            )}
          >
            {value}
          </span>

          <span
            className={clsx(
              "font-gilroy-medium text-black-transparent",
              variant === "default" && "md:hidden text-xs",
              variant === "compact" && "text-xs md:text-sm"
            )}
          >
            {label}
          </span>
        </div>
      </div>

      {variant === "default" && (
        <div className="hidden md:flex justify-end -mt-1">
          <span className="font-gilroy-medium text-sm md:text-base text-black-transparent">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
