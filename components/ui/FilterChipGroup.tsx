"use client";

import { useState } from "react";
import { FilterChip } from "./FilterChip";

interface FilterChipGroupProps {
  options: string[];
  allowMultiple?: boolean;
  onChange?: (selected: string[]) => void;
}

export function FilterChipGroup({
  options,
  allowMultiple = false,
  onChange,
}: FilterChipGroupProps) {
  const [selected, setSelected] = useState<string[]>(["All"]);

  const handleSelect = (option: string) => {
    let newSelected: string[];

    if (option === "All") {
      newSelected = ["All"];
    } else {
      if (allowMultiple) {
        // Multiple selection mode
        if (selected.includes(option)) {
          newSelected = selected.filter((item) => item !== option);
          if (newSelected.length === 0) newSelected = ["All"];
        } else {
          newSelected = selected.filter((item) => item !== "All");
          newSelected.push(option);
        }
      } else {
        // Single selection mode
        newSelected = [option];
      }
    }

    setSelected(newSelected);
    onChange?.(newSelected);
  };

  return (
    <div className="flex flex-wrap gap-4">
      {options.map((option) => (
        <FilterChip
          key={option}
          label={option}
          isActive={selected.includes(option)}
          onClick={() => handleSelect(option)}
        />
      ))}
    </div>
  );
}
