// "use client";

// import Image from "next/image";
// import { isDateAvailable } from "@/utils/availability";
// import { AnimatePresence, motion } from "framer-motion";

// interface DatePickerProps {
//   value: string;
//   onChange: (date: string) => void;
//   workingHours: Array<{
//     day: string;
//     isActive: boolean;
//     startTime: string;
//     endTime: string;
//   }>;
//   minDate?: string;
//   error?: string;
// }

// export function DatePicker({
//   value,
//   onChange,
//   workingHours,
//   minDate,
//   error,
// }: DatePickerProps) {
//   const handleDateChange = (date: string) => {
//     if (!date) {
//       onChange("");
//       return;
//     }

//     // Check if date is available
//     if (!isDateAvailable(date, workingHours)) {
//       alert("This date is not available. Please select another date.");
//       onChange(""); // Clear the invalid date
//       return;
//     }

//     onChange(date);
//   };

//   return (
//     <div className="flex-1">
//       <div
//         className={`bg-neutral-60 flex items-center justify-between border-[1.62px] border-neutral-460/15 transition-all duration-200 hover:border-primary-dark rounded-lg px-2 sm:px-4 py-2 cursor-pointer`}
//       >
//         <input
//           type="date"
//           value={value}
//           min={minDate}
//           onChange={(e) => handleDateChange(e.target.value)}
//           className="flex-1 outline-none cursor-pointer font-gilroy-medium bg-transparent [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden [&::-webkit-clear-button]:hidden"
//           onClick={(e) => e.currentTarget.showPicker?.()}
//         />
//         <Image
//           src="/images/icons/calendar.svg"
//           alt="Calendar Icon"
//           width={24}
//           height={24}
//           className="pointer-events-none"
//         />
//       </div>

//       {/* Error message */}
//       <AnimatePresence>
//         {error && (
//           <motion.div
//             initial={{ opacity: 0, y: -2 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -2 }}
//             className="text-sm font-source-sans text-red mt-1"
//           >
//             {error}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { isDateAvailable } from "@/utils/availability";
import { AnimatePresence, motion } from "framer-motion";

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  workingHours: Array<{
    day: string;
    isActive: boolean;
    startTime: string;
    endTime: string;
  }>;
  minDate?: string;
  error?: string;
}

export function DatePicker({
  value,
  onChange,
  workingHours,
  minDate,
  error,
}: DatePickerProps) {
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const date = e.target.value;

    if (!date) return;

    if (!isDateAvailable(date, workingHours)) {
      onChange(""); // or set an error state upstream
      alert("This date is not available. Please select another date.");
      return;
    }

    onChange(date);
  };

  return (
    <div className="flex-1">
      <div className="bg-neutral-60 flex items-center justify-between border-[1.62px] border-neutral-460/15 transition-all duration-200 hover:border-primary-dark rounded-lg px-2 sm:px-4 py-2 cursor-pointer">
        <div className="relative flex-1">
          <input
            type="date"
            value={value}
            min={minDate}
            onChange={(e) => onChange(e.target.value)}
            onBlur={handleBlur}
            className="relative z-10 w-full outline-none cursor-pointer font-gilroy-medium bg-transparent 
              [&::-webkit-calendar-picker-indicator]:hidden 
              [&::-webkit-inner-spin-button]:hidden 
              [&::-webkit-clear-button]:hidden"
            onClick={(e) => e.currentTarget.showPicker?.()}
          />

          {/* Fake placeholder (shows only when value is empty) */}
          {!value && (
            <span className="md:hidden absolute font-gilroy-medium left-0 top-0 h-full flex items-center  pointer-events-none">
              Select date
            </span>
          )}
        </div>
        <Image
          src="/images/icons/calendar.svg"
          alt="Calendar Icon"
          width={24}
          height={24}
          className="pointer-events-none"
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -2 }}
            className="text-sm font-source-sans text-red mt-1"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
