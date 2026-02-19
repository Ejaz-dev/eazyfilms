"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Comments from "./Comments";
import LikeButton from "./LikeButton";
import ShareButton from "./ShareButton";
import DownloadButton from "./DownloadButton";
import ViewCounter from "./ViewCounter";
import ExifData from "./ExifData";
import { supabase } from "@/lib/supabase";

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
  const [sortBy, setSortBy] = useState<"default" | "popular">("default");
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const categories = ["All", ...Array.from(new Set(images.map(function(img) { return img.category; })))];

  useEffect(function() {
    async function fetchAllLikes() {
      const { data, error } = await supabase
        .from("likes")
        .select("image_id");

      if (!error && data) {
        const counts: Record<number, number> = {};
        data.forEach(function(like) {
          counts[like.image_id] = (counts[like.image_id] || 0) + 1;
        });
        setLikeCounts(counts);
      }
    }

    fetchAllLikes();
  }, []);

  let filteredImages = activeCategory === "All"
    ? images
    : images.filter(function(img) { return img.category === activeCategory; });

  if (sortBy === "popular") {
    filteredImages = [...filteredImages].sort(function(a, b) {
      return (likeCounts[b.id] || 0) - (likeCounts[a.id] || 0);
    });
  }

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
    setIsZoomed(false);
  }, [selectedImage, filteredImages]);

  useEffect(function() {
    if (selectedImage && filteredImages.length > 1) {
      const currentIndex = filteredImages.findIndex(function(img) { return img.id === selectedImage.id; });
      const nextIndex = currentIndex + 1 >= filteredImages.length ? 0 : currentIndex + 1;
      const prevIndex = currentIndex - 1 < 0 ? filteredImages.length - 1 : currentIndex - 1;

      const preloadNext = new window.Image();
      preloadNext.src = filteredImages[nextIndex].src;

      const preloadPrev = new window.Image();
      preloadPrev.src = filteredImages[prevIndex].src;
    }
  }, [selectedImage, filteredImages]);

  useEffect(function() {
    function handleKeyDown(e: KeyboardEvent) {
      if (!selectedImage) return;

      if (e.key === "Escape") {
        if (isZoomed) {
          setIsZoomed(false);
        } else if (showComments) {
          setShowComments(false);
        } else {
          setSelectedImage(null);
        }
      } else if (e.key === "ArrowRight" && !isZoomed) {
        navigateImage("next");
      } else if (e.key === "ArrowLeft" && !isZoomed) {
        navigateImage("prev");
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return function() {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, showComments, isZoomed, navigateImage]);

  useEffect(function() {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setShowComments(false);
      setIsZoomed(false);
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

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchMove(e: React.TouchEvent) {
    touchEndX.current = e.touches[0].clientX;
  }

  function handleTouchEnd() {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold && !isZoomed) {
      if (diff > 0) {
        navigateImage("next");
      } else {
        navigateImage("prev");
      }
    }
  }

  function handleImageClick(e: React.MouseEvent) {
    if (showComments) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
    setIsZoomed(!isZoomed);
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!isZoomed) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  }

  return (
    <>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-wrap gap-2">
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

        <div className="flex gap-2">
          <button
            onClick={function() { setSortBy("default"); }}
            className={"px-3 py-1.5 rounded-full text-xs transition-all " + (sortBy === "default" ? "bg-white/20 text-white" : "bg-white/5 text-[#666] hover:text-white")}
          >
            Recent
          </button>
          <button
            onClick={function() { setSortBy("popular"); }}
            className={"px-3 py-1.5 rounded-full text-xs transition-all flex items-center gap-1 " + (sortBy === "popular" ? "bg-white/20 text-white" : "bg-white/5 text-[#666] hover:text-white")}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            Popular
          </button>
        </div>
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
                    <div className="absolute inset-0 bg-[#161616]">
                      <div className="absolute inset-0 shimmer"></div>
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
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-white/60 text-xs">{img.category}</p>
                      {likeCounts[img.id] > 0 && (
                        <div className="flex items-center gap-1 text-white/60 text-xs">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                          <span>{likeCounts[img.id]}</span>
                        </div>
                      )}
                    </div>
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
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={function() { if (!isZoomed) setSelectedImage(null); else setIsZoomed(false); }}
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
                {!showComments && !isZoomed && (
                  <button
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-sm z-20"
                    onClick={function() { navigateImage("prev"); }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6"></path>
                    </svg>
                  </button>
                )}

                <motion.div
                  className={"relative overflow-hidden rounded-lg " + (isZoomed ? "cursor-zoom-out" : "cursor-zoom-in")}
                  onClick={handleImageClick}
                  onMouseMove={handleMouseMove}
                  style={{
                    maxWidth: showComments ? "100%" : "85vw",
                    maxHeight: "85vh",
                  }}
                >
                  <motion.img
                    key={selectedImage.id}
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    className="max-h-[85vh] w-auto object-contain"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{
                      opacity: 1,
                      scale: isZoomed ? 2.5 : 1,
                      transformOrigin: zoomPosition.x + "% " + zoomPosition.y + "%",
                    }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    draggable={false}
                  />
                </motion.div>

                {!showComments && !isZoomed && (
                  <button
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-sm z-20"
                    onClick={function() { navigateImage("next"); }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6"></path>
                    </svg>
                  </button>
                )}

                {!isZoomed && (
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center" style={{ display: showComments ? "none" : "block" }}>
                    <motion.h2
                      className="text-white text-xl font-medium mb-2"
                      style={{ fontFamily: "'Clash Display', sans-serif" }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {selectedImage.title}
                    </motion.h2>
                    <motion.div
                      className="flex items-center justify-center gap-4 text-white/50 text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span>{selectedImage.category}</span>
                      <span>·</span>
                      <span>{selectedIndex + 1} of {filteredImages.length}</span>
                      <span>·</span>
                      <ViewCounter imageId={selectedImage.id} />
                    </motion.div>
                  </div>
                )}
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

            {!isZoomed && (
              <div className="absolute top-5 left-5 z-50 flex gap-2">
                <ExifData imageSrc={selectedImage.src} />
              </div>
            )}

            {!isZoomed && (
              <div className="absolute top-5 right-5 z-50 flex gap-2 flex-wrap justify-end">
                <LikeButton imageId={selectedImage.id} />
                <ShareButton imageId={selectedImage.id} imageTitle={selectedImage.title} />
                <DownloadButton imageSrc={selectedImage.src} imageTitle={selectedImage.title} />

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
            )}

            {!showComments && !isZoomed && (
              <motion.p
                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-xs z-10 hidden md:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Use arrow keys to navigate · Click image to zoom · Press Esc to close
              </motion.p>
            )}

            {!showComments && !isZoomed && (
              <motion.p
                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-xs z-10 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Swipe to navigate · Tap image to zoom
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}