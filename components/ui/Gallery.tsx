// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import clsx from "clsx";

// interface GalleryProps {
//   images: string[];
// }

// export function Gallery({ images }: GalleryProps) {
//   const [selectedImage, setSelectedImage] = useState(0);

//   if (!images || images.length === 0) return null;

//   const hasMoreImages = images.length > 4;
//   const remainingCount = images.length - 4;

//   return (
//     <div>
//       <h2 className="font-gilroy-bold text-sm">Gallery</h2>

//       {/* Thumbnail Grid */}
//       <div className="grid grid-cols-4 gap-3 bg-white p-4 rounded-[20px] mt-2">
//         {images.slice(0, 4).map((image, index) => (
//           <button
//             key={index}
//             onClick={() => setSelectedImage(index)}
//             className={clsx(
//               "relative aspect-square rounded-[10px] overflow-hidden cursor-pointer transition-all hover:scale-102"
//             )}
//           >
//             <Image
//               src={image}
//               alt={`Gallery image ${index + 1}`}
//               fill
//               className="object-cover"
//             />

//             {index === 3 && hasMoreImages && (
//               <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
//                 <span className="text-white font-gilroy-medium">
//                   +{remainingCount}
//                 </span>
//               </div>
//             )}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryProps {
  images: string[];
}

export function Gallery({ images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) return null;

  const hasMoreImages = images.length > 4;
  const remainingCount = images.length - 4;

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") closeLightbox();
  };

  return (
    <>
      <div>
        <h2 className="font-gilroy-bold text-sm">Gallery</h2>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-4 gap-3 bg-white p-4 rounded-[20px] mt-2">
          {images.slice(0, 4).map((image, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className={clsx(
                "relative aspect-square rounded-[10px] overflow-hidden cursor-pointer transition-all hover:scale-105"
              )}
            >
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
              />

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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-[110] p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close gallery"
            >
              <Image
                src="/images/icons/close-light.svg"
                alt="Close"
                width={24}
                height={24}
              />
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 z-[110] text-white font-gilroy-medium text-sm bg-black/50 px-4 py-2 rounded-full">
              {selectedImage + 1} / {images.length}
            </div>

            {/* Previous Button */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-[110] p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Previous image"
              >
                <Image
                  src="/images/icons/chevron-left-light.svg"
                  alt="Previous"
                  width={24}
                  height={24}
                />
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
                alt={`Gallery image ${selectedImage + 1}`}
                fill
                className="object-contain"
                quality={100}
                priority
              />
            </motion.div>

            {/* Next Button */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-[110] p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Next image"
              >
                <Image
                  src="/images/icons/chevron-right-light.svg"
                  alt="Next"
                  width={24}
                  height={24}
                />
              </button>
            )}

            {/* Thumbnail Navigation (Bottom) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[110] flex gap-2 max-w-full overflow-x-auto px-4 py-2 bg-black/50 rounded-[10px]">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(index);
                  }}
                  className={clsx(
                    "relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all",
                    selectedImage === index
                      ? "ring-2 ring-white scale-110"
                      : "opacity-60 hover:opacity-100"
                  )}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
