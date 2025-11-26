"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

interface GalleryProps {
  images: string[];
}

export function Gallery({ images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) return null;

  const hasMoreImages = images.length > 4;
  const remainingCount = images.length - 4;

  return (
    <div>
      <h2 className="font-gilroy-bold text-sm">Gallery</h2>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 gap-3 bg-white p-4 rounded-[20px] mt-2">
        {images.slice(0, 4).map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={clsx(
              "relative aspect-square rounded-[10px] overflow-hidden cursor-pointer transition-all hover:scale-102"
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
                <span className="text-white font-gilroy-medium">
                  +{remainingCount}
                </span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
