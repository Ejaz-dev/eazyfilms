"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ImageData {
  id: number;
  src: string;
}

interface GalleryProps {
  images: ImageData[];
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedImage]);

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  };

  return (
    <>
      {/* Masonry Grid */}
      <div className="masonry">
        {images.map((img, index) => (
          <motion.div
            key={img.id}
            className="masonry-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <div
              className="rounded overflow-hidden cursor-pointer group relative"
              onClick={() => setSelectedImage(img)}
            >
              <Image
                src={img.src}
                alt=""
                width={800}
                height={600}
                className={`w-full h-auto transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:brightness-110 ${
                  loadedImages.has(img.id) ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => handleImageLoad(img.id)}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={index < 4}
              />
              {!loadedImages.has(img.id) && (
                <div className="absolute inset-0 bg-[#161616] animate-pulse" />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Transparent blurry backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />

            {/* Close button */}
            <motion.button
              className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-colors"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              onClick={() => setSelectedImage(null)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Image */}
            <motion.img
              src={selectedImage.src}
              alt=""
              className="relative z-10 max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl cursor-default"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Hint text */}
            <motion.p
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              Click anywhere or press Esc to close
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}