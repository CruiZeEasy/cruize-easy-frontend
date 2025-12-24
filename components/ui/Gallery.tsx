"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { getOptimizedImage } from "@/utils/cloudinary";

interface GalleryProps {
  images: string[];
}

export function Gallery({ images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Auto-scroll thumbnail into view when selectedImage changes
  useEffect(() => {
    if (isLightboxOpen && thumbnailRefs.current[selectedImage]) {
      thumbnailRefs.current[selectedImage]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedImage, isLightboxOpen]);

  if (!mounted) return null;
  if (!images || images.length === 0) return null;

  const hasMoreImages = images.length > 4;
  const remainingCount = images.length - 4;

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => setIsLightboxOpen(false);

  const nextImage = () =>
    setSelectedImage((prev) => (prev + 1) % images.length);

  const prevImage = () =>
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") closeLightbox();
  };

  return (
    <>
      {/* Thumbnail grid */}
      <div>
        <h2 className="font-gilroy-bold text-sm">Gallery</h2>

        <div className="grid grid-cols-4 gap-3 bg-white lg:p-4 rounded-[20px] mt-2">
          {images.slice(0, 4).map((image, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className="relative aspect-square rounded-[10px] overflow-hidden cursor-pointer transition-all hover:scale-105"
            >
              <Image
                src={getOptimizedImage(image, 70)}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
              />

              {/* Show "+x" overlay */}
              {index === 3 && hasMoreImages && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-gilroy-semibold text-lg">
                    +{remainingCount}
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* LIGHTBOX PORTAL */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isLightboxOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/95 z-9999 flex items-center justify-center"
                onClick={closeLightbox}
                onKeyDown={handleKeyDown}
                tabIndex={0}
              >
                {/* Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeLightbox();
                  }}
                  className="absolute top-4 right-4 z-10000 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                {/* Counter */}
                <div className="absolute top-4 left-4 text-white bg-black/50 px-4 py-2 rounded-full font-gilroy-medium text-sm z-10000">
                  {selectedImage + 1} / {images.length}
                </div>

                {/* Prev */}
                {images.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10000 p-3 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer transition-colors"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                )}

                {/* Main Image */}
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-full max-w-7xl max-h-[90vh] mx-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={images[selectedImage]}
                    alt="Gallery"
                    fill
                    className="object-contain"
                    quality={100}
                    priority
                  />
                </motion.div>

                {/* Next */}
                {images.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10000 p-3 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer transition-colors"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                )}

                {/* Thumbnails */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10000 flex gap-2 max-w-full overflow-x-auto px-4 py-2 bg-black/50 rounded-[10px] scroll-smooth">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      ref={(el) => {
                        thumbnailRefs.current[index] = el;
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(index);
                      }}
                      className={clsx(
                        "relative w-16 h-16 rounded-lg overflow-hidden shrink-0 transition-all cursor-pointer",
                        selectedImage === index
                          ? "ring-2 ring-white scale-110"
                          : "opacity-60 hover:opacity-100"
                      )}
                    >
                      <Image
                        src={image}
                        alt="Thumbnail"
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
