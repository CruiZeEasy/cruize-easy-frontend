"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface ImageUploadProps {
  defaultImage?: string;
  onImageSelect?: (file: File | null) => void;
  disabled?: boolean;
  error?: string;
}

export const ImageUpload = React.forwardRef<HTMLInputElement, ImageUploadProps>(
  ({ defaultImage, onImageSelect, disabled = false, error }, ref) => {
    const [preview, setPreview] = useState<string | null>(defaultImage || null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (file: File | null) => {
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB");
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Call parent callback
      onImageSelect?.(file);
    };

    const handleClick = () => {
      if (!disabled) {
        fileInputRef.current?.click();
      }
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) {
        setIsDragging(true);
      }
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (!disabled && e.dataTransfer.files?.[0]) {
        handleFileChange(e.dataTransfer.files[0]);
      }
    };

    return (
      <div className="flex flex-col items-center">
        {/* Image Upload Area */}
        <motion.div
          whileHover={{ scale: disabled ? 1 : 1.02 }}
          whileTap={{ scale: disabled ? 1 : 0.98 }}
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={clsx(
            "relative cursor-pointer transition-all duration-200",
            isDragging && "scale-105",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {/* Profile Image Circle */}
          <div className="bg-neutral-250 rounded-full size-20 overflow-hidden relative">
            {preview ? (
              <Image
                src={preview}
                alt="Profile Preview"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center" />
            )}
          </div>

          {/* Half Eclipse Decoration */}
          <Image
            src="/images/shapes/eclipse-1.svg"
            alt="Eclipse Shape"
            width={50}
            height={50}
            className="absolute -top-2 -right-2 w-12 h-auto pointer-events-none"
          />

          {/* Edit Icon */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute -right-2 -bottom-[10px] w-5 h-5 rounded-full flex items-center justify-center "
          >
            <Image
              src="/images/icons/edit-icon.svg"
              alt="Edit Icon"
              width={20}
              height={20}
              className="w-4 h-auto"
            />
          </motion.div>

          {/* Drag Overlay */}
          <AnimatePresence>
            {isDragging && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-primary-dark/10 rounded-full border-2 border-dashed border-primary-dark flex items-center justify-center"
              >
                <i className="fa fa-upload text-primary-dark text-lg" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Hidden File Input */}
        <input
          ref={(el) => {
            if (typeof ref === "function") ref(el);
            else if (ref)
              (ref as React.RefObject<HTMLInputElement | null>).current = el;
            fileInputRef.current = el;
          }}
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          className="hidden"
          disabled={disabled}
        />

        {/* Helper Text */}
        <p className="text-xs text-neutral-500 mt-3 text-center">
          Click to upload or drag and drop
          <br />
          <span className="text-neutral-400">PNG, JPG (max. 5MB)</span>
        </p>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              className="text-sm font-source-sans text-red mt-2"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

ImageUpload.displayName = "ImageUpload";
