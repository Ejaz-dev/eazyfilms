"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Comments from "./Comments";
import LikeButton from "./LikeButton";
import ShareButton from "./ShareButton";

interface ImageData {
  id: number;
  src: string;
  title: string;
  category: string;
}

interface GalleryProps {
  images: ImageData[];
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [showComments, setShowComments] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(images.map(function(img) { return img.category; })))];

  const filteredImages = activeCategory === "All" 
    ? images 
    : images.filter(function(img) { return img.category === activeCategory; });

  const navigateImage = useCallback(function(direction: "prev" | "next") {
    if (!selectedImage) return;
    
    const currentIndex = filteredImages.findIndex(function(img) { return img.id === selectedImage.id; });
    let newIndex;
    
    if (direction === "next") {
      newIndex = currentIndex + 1 >= filteredImages.length ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex - 1 < 0 ? filteredImages.length - 1 : currentIndex - 1;
    }
    
    setSelectedImage(filteredImages[newIndex]);
    setSelectedIndex(newIndex);
    setShowComments(false);
  }, [selectedImage, filteredImages]);

  useEffect(function() {
    function handleKeyDown(e: KeyboardEvent) {
      if (!selectedImage) return;
      
      if (e.key === "Escape") {
        if (showComments) {
          setShowComments(false);
        } else {
          setSelectedImage(null);
        }
      } else if (e.key === "ArrowRight") {
        navigateImage("next");
      } else if (e.key === "ArrowLeft") {
        navigateImage("prev");
      }
    }
    
    window.addEventListener("keydown", handleKeyDown);
    return function() {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, showComments, navigateImage]);

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

  function openImage(img: ImageData, index: number) {
    setSelectedImage(img);
    setSelectedIndex(index);
  }

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map(function(category) {
          return (
            <button
              key={category}
              onClick={function() { setActiveCategory(category); }}
              className={"px-4 py-2 rounded-full text-sm transition-all " + (activeCategory === category ? "bg-white text-black" : "bg-white/5 text-[#888] hover:bg-white/10 hover:text-white")}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="masonry">
        {filteredImages.map(function(img, index) {
          return (
            <motion.div
              key={img.id}
              className="masonry-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              layout
            >
              <div
                className="rounded-lg overflow-hidden cursor-pointer group relative"
                onClick={function() { openImage(img, index); }}
              >
                <div className="relative">
                  {!loadedImages.has(img.id) && (
                    <div className="absolute inset-0 bg-[#161616] animate-pulse">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#161616] via-[#222] to-[#161616] shimmer"></div>
                    </div>
                  )}
                  <Image
                    src={img.src}
                    alt={img.title}
                    width={800}
                    height={600}
                    className={"w-full h-auto transition-all duration-700 ease-out group-hover:scale-[1.03] " + (loadedImages.has(img.id) ? "opacity-100" : "opacity-0")}
                    onLoad={function() { handleImageLoad(img.id); }}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    priority={index < 4}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsLCgwMDQsNEBANDA4ODwwQEREREQ4PEB8TGBMUFxQUFP/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIRAAAgEDBAMBAAAAAAAAAAAAAQIDBAURAAYSIQcTMUH/xAAVAQEBAAAAAAAAAAAAAAAAAAAFBv/EABsRAAICAwEAAAAAAAAAAAAAAAECAAMEESFB/9oADAMBEQCEQwEPwDW7BtnZ9svFPNBYbVFNDIskbikhBVgQQQQvYI61lPkjxBZ7FuO4Wu2W2OmtlvqHgggDNwjRTpVcsSSPg+nXB+aD/9k="
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-medium text-sm">{img.title}</p>
                    <p className="text-white/60 text-xs mt-1">{img.category}</p>
                  </div>
                </div>
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
                className="flex items-center justify-center relative"
                animate={{
                  width: showComments ? "60%" : "100%",
                  paddingLeft: showComments ? "2rem" : "0",
                  paddingRight: showComments ? "1rem" : "0",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
              >
                <button
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-sm z-20"
                  onClick={function() { navigateImage("prev"); }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6"></path>
                  </svg>
                </button>

                <motion.img
                  key={selectedImage.id}
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className={"object-contain rounded-lg shadow-2xl " + (showComments ? "max-h-[85vh] max-w-full" : "max-w-[85vw] max-h-[85vh]")}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onClick={function(e) { e.stopPropagation(); }}
                />

                <button
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-sm z-20"
                  onClick={function() { navigateImage("next"); }}
                  style={{ display: showComments ? "none" : "flex" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"></path>
                  </svg>
                </button>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center" style={{ display: showComments ? "none" : "block" }}>
                  <motion.h2
                    className="text-white text-xl font-medium mb-1"
                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {selectedImage.title}
                  </motion.h2>
                  <motion.p
                    className="text-white/50 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {selectedImage.category} · {selectedIndex + 1} of {filteredImages.length}
                  </motion.p>
                </div>
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
              <LikeButton imageId={selectedImage.id} />
              <ShareButton imageId={selectedImage.id} imageTitle={selectedImage.title} />
              
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
                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-xs z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Use arrow keys to navigate · Press Esc to close
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}