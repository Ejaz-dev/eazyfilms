"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ExifDataProps {
  imageSrc: string;
}

interface ExifInfo {
  camera: string | null;
  lens: string | null;
  focalLength: string | null;
  aperture: string | null;
  shutter: string | null;
  iso: string | null;
}

export default function ExifData({ imageSrc }: ExifDataProps) {
  const [exif, setExif] = useState<ExifInfo | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function loadExif() {
    if (exif) {
      setIsOpen(!isOpen);
      return;
    }

    setIsLoading(true);
    
    try {
      const exifr = await import("exifr");
      const data = await exifr.parse(imageSrc, {
        pick: ["Make", "Model", "LensModel", "FocalLength", "FNumber", "ExposureTime", "ISO"],
      });

      if (data) {
        const camera = data.Make && data.Model 
          ? data.Make + " " + data.Model.replace(data.Make, "").trim()
          : null;
        
        let shutter = null;
        if (data.ExposureTime) {
          if (data.ExposureTime < 1) {
            shutter = "1/" + Math.round(1 / data.ExposureTime) + "s";
          } else {
            shutter = data.ExposureTime + "s";
          }
        }

        setExif({
          camera: camera,
          lens: data.LensModel || null,
          focalLength: data.FocalLength ? data.FocalLength + "mm" : null,
          aperture: data.FNumber ? "f/" + data.FNumber : null,
          shutter: shutter,
          iso: data.ISO ? "ISO " + data.ISO : null,
        });
        setIsOpen(true);
      } else {
        setExif({
          camera: null,
          lens: null,
          focalLength: null,
          aperture: null,
          shutter: null,
          iso: null,
        });
        setIsOpen(true);
      }
    } catch (error) {
      console.error("Failed to read EXIF:", error);
      setExif(null);
    }
    
    setIsLoading(false);
  }

  const hasData = exif && (exif.camera || exif.lens || exif.focalLength || exif.aperture || exif.shutter || exif.iso);

  return (
    <div className="relative">
      <motion.button
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all"
        onClick={loadExif}
        whileTap={{ scale: 0.95 }}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        )}
        <span className="text-sm font-medium">Info</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-full mb-2 right-0 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-xl p-4 min-w-[220px]"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {hasData ? (
              <div className="space-y-2 text-sm">
                {exif.camera && (
                  <div className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#666]">
                      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"></path>
                      <circle cx="12" cy="13" r="4"></circle>
                    </svg>
                    <span className="text-white">{exif.camera}</span>
                  </div>
                )}
                {exif.lens && (
                  <div className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#666]">
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="6"></circle>
                      <circle cx="12" cy="12" r="2"></circle>
                    </svg>
                    <span className="text-white/70 text-xs">{exif.lens}</span>
                  </div>
                )}
                <div className="flex gap-3 pt-2 border-t border-white/10 text-[#888]">
                  {exif.focalLength && <span>{exif.focalLength}</span>}
                  {exif.aperture && <span>{exif.aperture}</span>}
                  {exif.shutter && <span>{exif.shutter}</span>}
                  {exif.iso && <span>{exif.iso}</span>}
                </div>
              </div>
            ) : (
              <p className="text-[#666] text-sm">No EXIF data available</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}