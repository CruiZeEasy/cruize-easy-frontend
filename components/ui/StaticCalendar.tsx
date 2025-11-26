"use client";

import clsx from "clsx";

interface StaticCalendarProps {
  className?: string;
}

export function StaticCalendar({ className }: StaticCalendarProps) {
  const today = new Date();
  const currentMonth = today.toLocaleString("default", { month: "long" });
  const currentYear = today.getFullYear();
  const currentDate = today.getDate();

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();

  // Get number of days in current month
  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();

  // Days of the week
  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

  // Create array of day numbers
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Calculate empty cells before first day (adjust for Monday start)
  const emptyDays = firstDay === 0 ? 6 : firstDay - 1;

  return (
    <div className={className}>
      {/* Month/Year Header */}
      <span className="font-gilroy-bold text-lg">{currentMonth}</span>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-2 mt-2">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className="text-sm text-center font-gilroy-medium text-neutral-450"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mt-4">
        {/* Empty cells before first day */}
        {Array.from({ length: emptyDays }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}

        {/* Day cells */}
        {days.map((day) => (
          <div
            key={day}
            className={`
               flex items-center justify-center text-xs font-gilroy-medium rounded-lg`}
          >
            <div
              className={clsx(
                "size-10 flex items-center justify-center rounded-full",
                day === currentDate && "bg-primary-dark text-white"
              )}
            >
              {day}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
