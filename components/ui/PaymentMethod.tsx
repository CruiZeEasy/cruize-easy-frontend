"use client";

import clsx from "clsx";
import Image from "next/image";

interface PaymentMethodProps {
  value: string;
  onChange: (value: "bank_transfer") => void;
  error?: string;
}

export function PaymentMethod({ value, onChange, error }: PaymentMethodProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-gilroy-medium text-sm">Bank</h3>

      <button
        type="button"
        onClick={() => onChange("bank_transfer")}
        className="w-full flex items-center justify-between p-4 rounded-lg bg-neutral-25 transition-all cursor-pointer"
      >
        <div className="flex items-center space-x-3">
          <Image
            src="/images/icons/wallet-dark.svg"
            alt="Bank"
            width={24}
            height={24}
          />

          <span className="font-gilroy-medium text-neutral-480">
            Bank transfer
          </span>
        </div>

        {/* Radio indicator */}
        <div
          className={clsx(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
            value === "bank_transfer"
              ? "border-primary bg-primary"
              : "border-neutral-300"
          )}
        >
          {value === "bank_transfer" && (
            <div className="w-2 h-2 bg-white rounded-full" />
          )}
        </div>
      </button>

      {error && (
        <p className="text-sm text-red mt-2 font-gilroy-medium">{error}</p>
      )}
    </div>
  );
}
