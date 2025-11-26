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
  const handleDateChange = (date: string) => {
    if (!date) {
      onChange("");
      return;
    }

    // Check if date is available
    // if (!isDateAvailable(date, workingHours)) {
    //   alert("This date is not available. Please select another date.");
    //   return;
    // }

    onChange(date);
  };

  return (
    <div className="flex-1">
      <div
        className={`flex items-center justify-between border-[1.1px] ${
          error ? "border-red-500" : "border-neutral-150"
        } transition-all duration-200 hover:border-primary-dark rounded-lg px-4 py-3 cursor-pointer`}
      >
        <input
          type="date"
          value={value}
          min={minDate}
          onChange={(e) => handleDateChange(e.target.value)}
          className="flex-1 outline-none cursor-pointer font-gilroy-medium"
        />
        <Image
          src="/images/icons/calendar.svg"
          alt="Calendar Icon"
          width={24}
          height={24}
        />
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -2 }}
            className="text-sm font-source-sans text-red"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
