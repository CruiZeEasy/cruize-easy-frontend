"use client";

import { useState } from "react";

interface PriceRangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultMin?: number;
  defaultMax?: number;
  onChange?: (min: number, max: number) => void;
}

export function PriceRangeSlider({
  min = 20,
  max = 1000,
  step = 10,
  defaultMin = 20,
  defaultMax = 50,
  onChange,
}: PriceRangeSliderProps) {
  const [minValue, setMinValue] = useState(defaultMin);
  const [maxValue, setMaxValue] = useState(defaultMax);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxValue - step);
    setMinValue(value);
    onChange?.(value, maxValue);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minValue + step);
    setMaxValue(value);
    onChange?.(minValue, value);
  };

  // Calculate percentage positions for styling
  const minPercent = ((minValue - min) / (max - min)) * 100;
  const maxPercent = ((maxValue - min) / (max - min)) * 100;

  const formatPrice = (value: number) => {
    if (value >= 1000) return `${value / 1000}m`;
    return `${value}k`;
  };

  return (
    <div className="w-full">
      {/* Price Display */}
      <div className="flex justify-end mb-4">
        <span className="text-sm font-gilroy-medium text-neutral-450">
          {formatPrice(minValue)} - {formatPrice(maxValue)}
        </span>
      </div>

      {/* Slider Container */}
      <div className="relative h-2">
        {/* Background Track */}
        <div className="absolute w-full h-2 bg-neutral-160 rounded-full" />

        {/* Active Range Track */}
        <div
          className="absolute h-2 bg-primary-dark rounded-full"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
        />

        {/* Min Range Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={handleMinChange}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-dark [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md"
        />

        {/* Max Range Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-dark [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md"
        />
      </div>

      {/* Scale Labels */}
      <div className="flex justify-between mt-4 text-xs font-gilroy-medium text-neutral-450">
        <span>{formatPrice(min)}</span>
        <span>{formatPrice(50)}</span>
        <span>{formatPrice(100)}</span>
        <span>{formatPrice(200)}</span>
        <span>{formatPrice(400)}</span>
        <span>{formatPrice(600)}</span>
        <span>{formatPrice(800)}</span>
        <span>{formatPrice(max)}</span>
      </div>
    </div>
  );
}
