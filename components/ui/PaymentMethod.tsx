"use client";

import clsx from "clsx";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export interface PaymentOption {
  value: string;
  label: string;
  icon?: string;
}

interface PaymentMethodProps {
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  options?: PaymentOption[];
}

export function PaymentMethod({
  value,
  onChange,
  error,
  options = [
    {
      value: "PAYSTACK",
      label: "Bank transfer",
      icon: "/images/icons/wallet-dark.svg",
    },
  ],
}: PaymentMethodProps) {
  return (
    <div className="space-y-2">
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <div key={option.value} className="space-y-2">
            <h3 className="font-gilroy-medium text-sm">{option.label}</h3>

            <button
              type="button"
              onClick={() => onChange(option.value)}
              className="w-full flex items-center justify-between p-4 rounded-lg bg-neutral-25 transition-all cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                {option.icon && (
                  <Image
                    src={option.icon}
                    alt={option.label}
                    width={24}
                    height={24}
                  />
                )}
                <span className="font-gilroy-medium text-neutral-480">
                  {option.label}
                </span>
              </div>

              <div
                className={clsx(
                  "size-6 rounded-full border flex items-center justify-center transition-all",
                  isSelected ? "border-primary-dark" : "border-neutral-300"
                )}
              >
                {isSelected && (
                  <div className="size-3 bg-primary-dark rounded-full" />
                )}
              </div>
            </button>
          </div>
        );
      })}

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
