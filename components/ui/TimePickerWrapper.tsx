"use client";

import { TimePicker } from "@/components/ui/TimePicker";
import { getAvailableTimeRange, isTimeInRange } from "@/utils/availability";

interface TimePickerWrapperProps {
  value: string;
  onChange: (time: string) => void;
  selectedDate: string;
  workingHours: Array<{
    day: string;
    isActive: boolean;
    startTime: string;
    endTime: string;
  }>;
  error?: string;
}

export function TimePickerWrapper({
  value,
  onChange,
  selectedDate,
  workingHours,
  error,
}: TimePickerWrapperProps) {
  const handleTimeChange = (time: string) => {
    if (!selectedDate) {
      alert("Please select a date first");
      return;
    }

    const timeRange = getAvailableTimeRange(selectedDate, workingHours);

    if (!timeRange) {
      alert("No available time for this date");
      return;
    }

    if (!isTimeInRange(time, timeRange.startTime, timeRange.endTime)) {
      alert(
        `Please select a time between ${timeRange.startTime} and ${timeRange.endTime}`
      );
      return;
    }

    onChange(time);
  };

  return (
    <div className="flex-1">
      <TimePicker
        value={value}
        onChange={handleTimeChange}
        disabled={!selectedDate}
      />
      {error && (
        <p className="text-xs text-red-500 mt-1 font-gilroy-medium">{error}</p>
      )}
    </div>
  );
}
