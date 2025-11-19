"use client";

import React from "react";
import { RadioButton } from "@/components/ui/RadioButton";
import { TimePicker } from "@/components/ui/TimePicker";

interface DayScheduleProps {
  day: string;
  isActive: boolean;
  startTime: string;
  endTime: string;
  onToggle: () => void;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
  disabled?: boolean;
}

export const DaySchedule: React.FC<DayScheduleProps> = ({
  day,
  isActive,
  startTime,
  endTime,
  onToggle,
  onStartTimeChange,
  onEndTimeChange,
  disabled = false,
}) => {
  return (
    <div className="shadow-[0_1.62px_6.5px_0_rgba(0,0,0,0.25)] rounded-[17.86px] space-y-4 p-4">
      <div className="flex items-center">
        <span className="font-gilroy-bold flex-1 text-sm">{day}</span>
        <RadioButton
          checked={isActive}
          onChange={onToggle}
          disabled={disabled}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TimePicker
          value={startTime}
          onChange={onStartTimeChange}
          disabled={!isActive || disabled}
        />
        <TimePicker
          value={endTime}
          onChange={onEndTimeChange}
          disabled={!isActive || disabled}
        />
      </div>
    </div>
  );
};
