"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import clsx from "clsx";

interface ImageUploadProps {
  variant?: "profile" | "document" | "gallery";
  defaultImage?: string | File | File[];
  onImageSelect?: (file: File | null) => void;
  onImagesSelect?: (files: File[]) => void;
  disabled?: boolean;
  isLoading?: boolean;
  error?: string;
  label?: string;
  uploadLabel?: string;
  showUploadLabel?: boolean;
  accept?: string;
  labelFontFamily?: "gilroy-medium" | "gilroy-bold";
  fileType?: "image" | "pdf" | "both";
  minImages?: number;
  maxImages?: number;
}

export const ImageUpload = React.forwardRef<HTMLInputElement, ImageUploadProps>(
  (
    {
      variant = "profile",
      defaultImage,
      onImageSelect,
      onImagesSelect,
      disabled = false,
      error,
      label,
      isLoading = false,
      uploadLabel,
      showUploadLabel = true,
      accept,
      labelFontFamily = "gilroy-medium",
      fileType = "image",
      minImages = 9,
      maxImages = 12,
    },
    ref
  ) => {
    const [preview, setPreview] = useState<string | null>(() => {
      if (!defaultImage) return null;

      // Single File (document or profile)
      if (defaultImage instanceof File) return null; // we will generate preview in useEffect

      // Array of Files (gallery)
      if (Array.isArray(defaultImage)) return null; // gallery previews are handled separately

      // String (existing URL)
      if (typeof defaultImage === "string") return defaultImage;

      return null;
    });

    const [fileName, setFileName] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [images, setImages] = useState<
      Array<{ file: File; preview: string; id: string }>
    >([]);

    const [hasInitialized, setHasInitialized] = useState(false);
    const shouldNotifyParent = useRef(false);

    useEffect(() => {
      if (variant === "gallery" && shouldNotifyParent.current) {
        onImagesSelect?.(images.map((img) => img.file));
        shouldNotifyParent.current = false;
      }
    }, [images, variant, onImagesSelect]);

    // Single file (document or profile)
    useEffect(() => {
      if (variant !== "gallery" && defaultImage instanceof File) {
        const file = defaultImage;
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onloadend = () => setPreview(reader.result as string);
          reader.readAsDataURL(file);
        } else if (file.type === "application/pdf") {
          setPreview("pdf");
          setFileName(file.name);
        }
      }
    }, [defaultImage]);

    // Gallery (multiple images)
    useEffect(() => {
      if (variant === "gallery" && Array.isArray(defaultImage)) {
        const files = defaultImage as File[];

        if (files.length > 0 && !hasInitialized) {
          const previews: Array<{ file: File; preview: string; id: string }> =
            [];
          let loadedCount = 0;

          files.forEach((file) => {
            if (file.type.startsWith("image/")) {
              const reader = new FileReader();
              reader.onloadend = () => {
                previews.push({
                  file,
                  preview: reader.result as string,
                  id: `${file.name}-${file.size}-${file.lastModified}`,
                });
                loadedCount++;

                if (loadedCount === files.length) {
                  setImages(previews);
                  setHasInitialized(true);
                }
              };
              reader.readAsDataURL(file);
            } else {
              loadedCount++;
            }
          });
        }
      }
    }, [defaultImage, variant, hasInitialized]);

    useEffect(() => {
      if (
        variant === "gallery" &&
        Array.isArray(defaultImage) &&
        defaultImage.length === 0 &&
        images.length > 0
      ) {
        setHasInitialized(false);
        setImages([]);
      }
    }, [defaultImage, variant, images.length]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const getAcceptAttribute = () => {
      if (accept) return accept;
      switch (fileType) {
        case "pdf":
          return "application/pdf,.pdf";
        case "both":
          return "image/*,application/pdf,.pdf";
        case "image":
        default:
          return "image/*";
      }
    };

    const getFileValidation = () => {
      switch (fileType) {
        case "pdf":
          return {
            maxSize: 10 * 1024 * 1024,
            allowedTypes: ["application/pdf"],
            typeErrorMsg: "Please select a valid PDF file",
            sizeErrorMsg: "PDF size must be less than 10MB",
          };
        case "both":
          return {
            maxSize: 10 * 1024 * 1024,
            allowedTypes: ["image/", "application/pdf"],
            typeErrorMsg: "Please select a valid image or PDF file",
            sizeErrorMsg: "File size must be less than 10MB",
          };
        case "image":
        default:
          return {
            maxSize: 5 * 1024 * 1024,
            allowedTypes: ["image/"],
            typeErrorMsg: "Please select a valid image file",
            sizeErrorMsg: "Image size must be less than 5MB",
          };
      }
    };

    const handleFileChange = (files: FileList | null) => {
      if (!files) return;

      if (variant === "gallery") {
        handleMultipleFiles(files);
      } else {
        const file = files[0];
        if (!file) return;

        const validation = getFileValidation();
        const isValidType = validation.allowedTypes.some(
          (type) => file.type.startsWith(type) || file.type === type
        );

        if (!isValidType) {
          alert(validation.typeErrorMsg);
          return;
        }

        if (file.size > validation.maxSize) {
          alert(validation.sizeErrorMsg);
          return;
        }

        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result as string);
            setFileName(file.name);
          };
          reader.readAsDataURL(file);
        } else if (file.type === "application/pdf") {
          setPreview("pdf");
          setFileName(file.name);
        }

        onImageSelect?.(file);
      }
    };

    const handleMultipleFiles = (files: FileList) => {
      const validation = getFileValidation();
      const fileArray = Array.from(files);

      const availableSlots = maxImages - images.length;
      if (availableSlots === 0) {
        alert(`Maximum ${maxImages} images allowed`);
        return;
      }

      const filesToProcess = fileArray.slice(0, availableSlots);
      let processedCount = 0;
      const newImages: Array<{ file: File; preview: string; id: string }> = [];

      filesToProcess.forEach((file) => {
        const isValidType = validation.allowedTypes.some(
          (type) => file.type.startsWith(type) || file.type === type
        );

        if (!isValidType) {
          alert(validation.typeErrorMsg);
          processedCount++;
          return;
        }

        if (file.size > validation.maxSize) {
          alert(validation.sizeErrorMsg);
          processedCount++;
          return;
        }

        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onloadend = () => {
            newImages.push({
              file,
              preview: reader.result as string,
              id: `${Date.now()}-${Math.random()}`,
            });
            processedCount++;

            if (processedCount === filesToProcess.length) {
              shouldNotifyParent.current = true; //
              setImages((prev) => [...prev, ...newImages]);
            }
          };
          reader.readAsDataURL(file);
        } else {
          processedCount++;
        }
      });
    };

    const removeImage = (id: string) => {
      shouldNotifyParent.current = true;
      setImages((prev) => prev.filter((img) => img.id !== id));
    };

    const handleClick = () => {
      if (!disabled) {
        if (variant === "gallery" && images.length >= maxImages) {
          alert(`Maximum ${maxImages} images allowed`);
          return;
        }
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

      if (!disabled && e.dataTransfer.files) {
        handleFileChange(e.dataTransfer.files);
      }
    };

    const getHelperText = () => {
      switch (fileType) {
        case "pdf":
          return "PDF (max. 10MB)";
        case "both":
          return "PNG, JPG, PDF (max. 10MB)";
        case "image":
        default:
          return "PNG, JPG (max. 5MB)";
      }
    };

    // Gallery variant for multiple images
    if (variant === "gallery") {
      const hasMinImages = images.length >= minImages;

      return (
        <div className="w-full flex flex-col space-y-4 ">
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: disabled ? 1 : 1.02 }}
              whileTap={{ scale: disabled ? 1 : 0.98 }}
              onClick={handleClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`px-4 py-3 border-2 border-dashed rounded-[10px] w-fit flex flex-col items-center justify-center cursor-pointer transition-all ${
                isDragging
                  ? "border-blue-400 bg-blue-50/50"
                  : "border-neutral-400/40"
              } ${
                disabled || images.length >= maxImages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <Image
                src="/images/icons/add-photo.svg"
                alt="Add Photo"
                width={45}
                height={45}
                priority
              />
              <span className="text-xs mt-1 font-medium text-neutral-600">
                Add Photo
              </span>
            </motion.div>
          </div>

          <input
            ref={(el) => {
              if (typeof ref === "function") ref(el);
              else if (ref)
                (ref as React.RefObject<HTMLInputElement | null>).current = el;
              fileInputRef.current = el;
            }}
            type="file"
            accept={getAcceptAttribute()}
            multiple
            onChange={(e) => handleFileChange(e.target.files)}
            className="hidden"
            disabled={disabled || images.length >= maxImages}
          />

          {/* Image Count Status */}
          <div className="flex items-center justify-between text-sm font-gilroy-medium">
            <span
              className={
                images.length >= minImages
                  ? "text-green-600"
                  : "text-neutral-500"
              }
            >
              {images.length} / {maxImages} photos uploaded
            </span>
            {!hasMinImages && (
              <span className="text-orange-500">
                {minImages - images.length} more required
              </span>
            )}
          </div>

          {/* Image Grid */}
          <AnimatePresence mode="popLayout">
            {images.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="grid grid-cols-3 md:grid-cols-4 gap-3"
              >
                {images.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={false}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={clsx(
                      "relative aspect-square rounded-lg overflow-hidden group",
                      disabled && "opacity-75"
                    )}
                  >
                    <img
                      src={image.preview}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover"
                    />

                    {disabled && (
                      <div className="absolute inset-0 bg-black/10 flex items-center justify-center pointer-events-none">
                        <i className="fa-solid fa-lock text-white text-lg opacity-60"></i>
                      </div>
                    )}

                    {!disabled && (
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(image.id);
                        }}
                        className="absolute top-2 right-2 flex items-center justify-center bg-red size-6 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg md:opacity-0 md:group-hover:opacity-100 cursor-pointer"
                        aria-label="Remove image"
                      >
                        <i className="fa-solid fa-xmark text-xs"></i>
                      </motion.button>
                    )}

                    <div className="absolute top-2 left-2 bg-black/60 text-white text-xs font-gilroy-medium px-2 py-0.5 rounded-full">
                      {index + 1}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -2 }}
                className="text-sm font-medium text-red-500"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    // Profile variant
    if (variant === "profile") {
      return (
        <div className="flex flex-col items-center">
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
            <div className="bg-neutral-250 rounded-full size-20 overflow-hidden relative">
              {preview ? (
                <Image
                  src={preview}
                  alt="Profile Preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center" />
              )}
            </div>

            <Image
              src="/images/shapes/eclipse-1.svg"
              alt="Eclipse Shape"
              width={50}
              height={50}
              className="absolute -top-2 -right-2 w-12 h-auto pointer-events-none"
            />

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute -right-2 -bottom-[10px] w-5 h-5 rounded-full flex items-center justify-center"
            >
              <Image
                src="/images/icons/edit-icon.svg"
                alt="Edit Icon"
                width={20}
                height={20}
                className="w-4 h-auto"
              />
            </motion.div>

            {isLoading && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-full z-10">
                <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}

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

          <input
            ref={(el) => {
              if (typeof ref === "function") ref(el);
              else if (ref)
                (ref as React.RefObject<HTMLInputElement | null>).current = el;
              fileInputRef.current = el;
            }}
            type="file"
            accept={accept}
            onChange={(e) => handleFileChange(e.target.files)}
            className="hidden"
            disabled={disabled}
          />

          {showUploadLabel && (
            <p className="text-xs text-neutral-500 mt-3 text-center">
              Click to upload or drag and drop
              <br />
              <span className="text-neutral-400">PNG, JPG (max. 5MB)</span>
            </p>
          )}

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

    // Document variant
    return (
      <div className="w-full flex flex-col">
        {/* Label */}
        {label && (
          <label
            className={clsx(
              "text-sm mb-2",
              labelFontFamily === "gilroy-medium" && "font-gilroy-medium",
              labelFontFamily === "gilroy-bold" && "font-gilroy-bold"
            )}
          >
            {label}
          </label>
        )}

        <motion.div
          whileHover={{ scale: disabled ? 1 : 1.01 }}
          whileTap={{ scale: disabled ? 1 : 0.99 }}
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={clsx(
            "relative flex items-center justify-center h-50 bg-neutral-250/15 border-2 border-dashed rounded-[20px] cursor-pointer transition-all duration-200 overflow-hidden",
            isDragging ? "border-blue-400 bg-blue-50/50" : "border-neutral-200",
            disabled && "opacity-50 cursor-not-allowed",
            preview ? "p-0" : "p-6"
          )}
        >
          {preview ? (
            preview === "pdf" ? (
              // PDF preview with icon and filename
              <div className="flex flex-col items-center justify-center space-y-3 p-6 w-full">
                <Image
                  src="/images/icons/pdf-icon.webp"
                  alt="Document Preview"
                  width={50}
                  height={50}
                  priority
                />
                <span className="text-sm font-gilroy-medium text-neutral-500 text-center break-all px-4">
                  {fileName}
                </span>
              </div>
            ) : (
              // Image preview
              <Image
                src={preview}
                alt="Document Preview"
                fill
                className="object-cover"
              />
            )
          ) : (
            <div className="flex flex-col items-center space-y-3">
              <div className="border border-blue-400 rounded-full size-7 flex justify-center items-center">
                <span className="font-gilroy-light text-2xl text-blue-400 mt-1  md:mt-0">
                  +
                </span>
              </div>

              <div className="flex flex-col items-center space-y-1">
                <span className="font-gilroy-medium text-sm md:text-base text-neutral-425/75 text-center">
                  {uploadLabel || "Click to upload your vehicle document"}
                </span>
                <span className="text-xs text-neutral-400">
                  {getHelperText()}
                </span>
              </div>
            </div>
          )}
        </motion.div>

        <input
          ref={(el) => {
            if (typeof ref === "function") ref(el);
            else if (ref)
              (ref as React.RefObject<HTMLInputElement | null>).current = el;
            fileInputRef.current = el;
          }}
          type="file"
          accept={getAcceptAttribute()}
          onChange={(e) => handleFileChange(e.target.files)}
          className="hidden"
          disabled={disabled}
        />

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
