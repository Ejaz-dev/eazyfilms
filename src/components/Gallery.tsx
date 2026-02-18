"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Comments from "./Comments";

interface ImageData {
  id: number;
  src: string;
}

interface GalleryProps {
  images: ImageData[];
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  useEffect(function() {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (showComments) {
          setShowComments(false);
        } else {
          setSelectedImage(null);
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return function() {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showComments]);

  useEffect(function() {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setShowComments(false);
    }
  }, [selectedImage]);

  function handleImageLoad(id: number) {
    setLoadedImages(function(prev) {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  }

  return (
    <>
      <div className="masonry">
        {images.map(function(img, index) {
          return (
            <motion.div
              key={img.id}
              className="masonry-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div
                className="rounded-lg overflow-hidden cursor-pointer group relative"
                onClick={function() { setSelectedImage(img); }}
              >
                <Image
                  src={img.src}
                  alt=""
                  width={800}
                  height={600}
                  className={"w-full h-auto transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:brightness-110 " + (loadedImages.has(img.id) ? "opacity-100" : "opacity-0")}
                  onLoad={function() { handleImageLoad(img.id); }}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  priority={index < 4}
                />
                {!loadedImages.has(img.id) && (
                  <div className="absolute inset-0 bg-[#161616] animate-pulse"></div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={function() { setSelectedImage(null); }}
            ></motion.div>

            <div className="relative z-10 flex h-full">
              <motion.div 
                className="flex items-center justify-center"
                animate={{ 
                  width: showComments ? "60%" : "100%",
                  paddingLeft: showComments ? "2rem" : "0",
                  paddingRight: showComments ? "1rem" : "0",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
              >
                <motion.img
                  src={selectedImage.src}
                  alt=""
                  className="max-h-[90vh] max-w-full object-contain rounded-lg shadow-2xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  onClick={function(e) { e.stopPropagation(); }}
                />
              </motion.div>

              <AnimatePresence>
                {showComments && (
                  <motion.div
                    className="w-[40%] h-full"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ type: "spring", stiffness: 200, damping: 30 }}
                  >
                    <Comments imageId={selectedImage.id} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="absolute top-5 right-5 z-50 flex gap-2">
              <AnimatePresence>
                {showComments && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="h-10 px-4 flex items-center gap-2 rounded-full bg-white/10 border border-white/10 text-white text-sm hover:bg-white/20 transition-all backdrop-blur-sm"
                    onClick={function() { setShowComments(false); }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6"></path>
                    </svg>
                    Hide
                  </motion.button>
                )}
              </AnimatePresence>

              {!showComments && (
                <motion.button
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="h-10 px-4 flex items-center gap-2 rounded-full bg-white/10 border border-white/10 text-white text-sm hover:bg-white/20 transition-all backdrop-blur-sm"
                  onClick={function() { setShowComments(true); }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"></path>
                  </svg>
                  Comments
                </motion.button>
              )}

              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-sm"
                onClick={function() { setSelectedImage(null); }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"></path>
                </svg>
              </motion.button>
            </div>

            {!showComments && (
              <motion.p
                className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/30 text-xs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.3 }}
              >
                Press Esc to close
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}