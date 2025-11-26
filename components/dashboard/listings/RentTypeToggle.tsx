"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

interface RentTypeToggleProps {
  value: "self-drive" | "driver";
  onChange: (value: "self-drive" | "driver") => void;
}

export function RentTypeToggle({ value, onChange }: RentTypeToggleProps) {
  return (
    <div className="text-sm">
      <span className="font-gilroy-medium ">Rent Type</span>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <button
          type="button"
          onClick={() => onChange("self-drive")}
          className={clsx(
            "py-3 px-4 rounded-lg font-gilroy-medium  transition-all cursor-pointer",
            value === "self-drive"
              ? "bg-primary text-white"
              : "bg-white outline outline-primary-dark  text-primary-dark hover:border-primary-dark"
          )}
        >
          Self Drive
        </button>
        <button
          type="button"
          onClick={() => onChange("driver")}
          className={clsx(
            "py-3 px-4 rounded-lg font-gilroy-medium  transition-all cursor-pointer",
            value === "driver"
              ? "bg-primary text-white"
              : "bg-white outline outline-primary-dark  text-primary-dark hover:border-primary-dark"
          )}
        >
          Driver
        </button>
      </div>

      <AnimatePresence>
        {value === "driver" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative mt-4 bg-primary-blush/40 rounded-lg p-3 text-center"
          >
            <div className="h-full w-3 bg-red-500 absolute top-0 left-0 rounded" />

            <p className="text-xs font-gilroy-regular text-neutral-720">
              Additional 50k/hr if you choose the option with a driver
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
