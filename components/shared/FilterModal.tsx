"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Buttons";
import { FilterChipGroup } from "../ui/FilterChipGroup";
import { PriceRangeSlider } from "../ui/PricingRangeSlider";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterModal({ isOpen, onClose }: FilterModalProps) {
  const vehicleTypes = ["All", "Bus", "Suv", "Car", "Luxury"];
  const transmissionTypes = ["All", "Manual", "Automatic", "Electric"];
  const brands = ["All", "Benz", "Toyota", "Car"];

  const handlePriceChange = (min: number, max: number) => {
    console.log("Price range:", min, max);
    // Add your price filter logic here
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl bg-white p-6 rounded-[20px] font-gilroy-medium shadow-xl z-50 max-h-[85vh] overflow-hidden"
          >
            <div className="flex justify-center">
              <span className="font-modulus-semibold md:text-[20px]">
                Filter
              </span>
            </div>

            <div className="overflow-y-auto max-h-[calc(85vh-140px)] space-y-6">
              <div>
                <span>Type</span>

                <div className="mt-2">
                  <FilterChipGroup options={vehicleTypes} />
                </div>
              </div>
              <div>
                <span>Pricing Range (Hourly)</span>

                <div className="">
                  <PriceRangeSlider
                    min={20}
                    max={1000}
                    step={10}
                    defaultMin={20}
                    defaultMax={50}
                    onChange={handlePriceChange}
                  />
                </div>
              </div>

              {/* Reviews Goes Here Soon */}
              <div>
                <span>Transmission</span>

                <div className="mt-2">
                  <FilterChipGroup options={transmissionTypes} />
                </div>
              </div>
              <div>
                <span>Brand</span>

                <div className="mt-2">
                  <FilterChipGroup options={brands} />
                </div>
              </div>

              {/* <div className="min-h-screen"></div> */}
            </div>

            <div className="flex justify-center pt-6">
              <Button
                type="submit"
                variant="dark-primary"
                fontFamily="inter"
                fullWidth
                shadow="shadow-none"
                className="max-w-sm"
                onClick={onClose}
              >
                Apply Filter
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
