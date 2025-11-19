"use client";

import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  disabled?: boolean;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate hours (1-12) and minutes (00, 15, 30, 45)
  const hours = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const minutes = ["00", "15", "30", "45"];
  const periods = ["AM", "PM"];

  const [selectedHour, selectedMinute, selectedPeriod] = value
    ? value.split(/[:\s]/)
    : ["09", "00", "AM"];

  const handleTimeChange = (
    hour?: string,
    minute?: string,
    period?: string
  ) => {
    const newHour = hour || selectedHour;
    const newMinute = minute || selectedMinute;
    const newPeriod = period || selectedPeriod;
    onChange(`${newHour}:${newMinute} ${newPeriod}`);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={clsx(
          "bg-neutral-60 px-2 sm:px-4 py-2 border-[1.62px] border-neutral-460/15 rounded-lg flex items-center space-x-2 w-full cursor-pointer",
          "transition-all duration-200",
          !disabled && "hover:border-primary-dark",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <Image
          src="/images/icons/clock.svg"
          alt="clock icon"
          width={20}
          height={20}
          priority
        />
        <span className="font-gilroy-medium flex-1 text-left">{value}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-2 bg-white border border-neutral-200 shadow-lg rounded-lg overflow-hidden w-full"
          >
            <div className="grid grid-cols-3 gap-2 p-3">
              {/* Hours */}
              <div className="space-y-1">
                <p className="text-xs font-gilroy-medium text-neutral-500 mb-2">
                  Hour
                </p>
                <div className="max-h-32 overflow-y-auto">
                  {hours.map((hour) => (
                    <button
                      key={hour}
                      type="button"
                      onClick={() => {
                        handleTimeChange(hour, undefined, undefined);
                      }}
                      className={clsx(
                        "w-full text-center py-1.5 rounded font-gilroy-medium text-sm",
                        selectedHour === hour
                          ? "bg-primary-dark text-white"
                          : "hover:bg-neutral-100"
                      )}
                    >
                      {hour}
                    </button>
                  ))}
                </div>
              </div>

              {/* Minutes */}
              <div className="space-y-1">
                <p className="text-xs font-gilroy-medium text-neutral-500 mb-2">
                  Min
                </p>
                <div className="max-h-32 overflow-y-auto">
                  {minutes.map((minute) => (
                    <button
                      key={minute}
                      type="button"
                      onClick={() => {
                        handleTimeChange(undefined, minute, undefined);
                      }}
                      className={clsx(
                        "w-full text-center py-1.5 rounded font-gilroy-medium text-sm",
                        selectedMinute === minute
                          ? "bg-primary-dark text-white"
                          : "hover:bg-neutral-100"
                      )}
                    >
                      {minute}
                    </button>
                  ))}
                </div>
              </div>

              {/* AM/PM */}
              <div className="space-y-1">
                <p className="text-xs font-gilroy-medium text-neutral-500 mb-2">
                  Period
                </p>
                <div>
                  {periods.map((period) => (
                    <button
                      key={period}
                      type="button"
                      onClick={() => {
                        handleTimeChange(undefined, undefined, period);
                        setIsOpen(false);
                      }}
                      className={clsx(
                        "w-full text-center py-1.5 rounded font-gilroy-medium text-sm",
                        selectedPeriod === period
                          ? "bg-primary-dark text-white"
                          : "hover:bg-neutral-100"
                      )}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
