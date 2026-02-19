"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface DownloadButtonProps {
  imageSrc: string;
  imageTitle: string;
}

export default function DownloadButton({ imageSrc, imageTitle }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  async function handleDownload() {
    setIsDownloading(true);
    
    try {
      const response = await fetch(imageSrc);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = imageTitle.toLowerCase().replace(/\s+/g, "-") + ".jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
    
    setIsDownloading(false);
  }

  return (
    <motion.button
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all"
      onClick={handleDownload}
      whileTap={{ scale: 0.95 }}
      disabled={isDownloading}
    >
      {isDownloading ? (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
      )}
      <span className="text-sm font-medium">Download</span>
    </motion.button>
  );
}