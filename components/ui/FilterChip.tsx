"use client";

import clsx from "clsx";

interface FilterChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function FilterChip({ label, isActive, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-6 py-2.5 rounded-lg font-gilroy-medium text-xs transition-all cursor-pointer",
        isActive
          ? "bg-primary text-white"
          : "bg-neutral-160 text-neutral-450 hover:bg-neutral-260"
      )}
    >
      {label}
    </button>
  );
}
