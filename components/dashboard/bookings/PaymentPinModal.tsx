// components/booking/PaymentPinModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Buttons";
import { FormInput } from "@/components/ui/FormInput";

interface PaymentPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (pin: string) => void;
  isLoading: boolean;
  totalAmount: number;
}

export function PaymentPinModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  totalAmount,
}: PaymentPinModalProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (pin.length !== 5) {
      setError("PIN must be 5 digits");
      return;
    }

    setError("");
    onConfirm(pin);
  };

  const handleClose = () => {
    if (!isLoading) {
      setPin("");
      setError("");
      onClose();
    }
  };

  const formattedAmount = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(totalAmount);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[20px] p-6 w-full max-w-md shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-gilroy-bold text-lg">Confirm Payment</h3>
                <button
                  onClick={handleClose}
                  disabled={isLoading}
                  className="text-neutral-450 hover:text-black transition-colors disabled:opacity-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Amount Display */}
              <div className="bg-neutral-100 rounded-lg p-4 mb-6">
                <p className="font-gilroy-medium text-sm text-neutral-475 mb-1">
                  Total Amount
                </p>
                <p className="font-gilroy-bold text-2xl">{formattedAmount}</p>
              </div>

              {/* PIN Input */}
              <div className="mb-6">
                <FormInput
                  id="transactionPin"
                  label="Enter Transaction PIN"
                  placeholder="Enter 5-digit PIN"
                  labelFontFamily="gilroy-medium"
                  placeholderVariant="light"
                  variant="pin"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    setError("");
                  }}
                  disabled={isLoading}
                  error={error}
                  autoFocus
                />
                <p className="text-xs text-neutral-475 font-gilroy-medium mt-2">
                  Payment will be deducted from your wallet balance
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  fontFamily="gilroy-medium"
                  fullWidth
                  shadow="shadow-none"
                  onClick={handleClose}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  variant="dark-primary"
                  fontFamily="gilroy-medium"
                  fullWidth
                  shadow="shadow-none"
                  onClick={handleSubmit}
                  disabled={isLoading || pin.length !== 5}
                  loading={isLoading}
                  loadingText="Processing..."
                >
                  Confirm Payment
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
