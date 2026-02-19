"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ShareButtonProps {
  imageId: number;
  imageTitle: string;
}

export default function ShareButton({ imageId, imageTitle }: ShareButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  function getShareUrl() {
    if (typeof window !== "undefined") {
      return window.location.origin + "/?image=" + imageId;
    }
    return "";
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      setTimeout(function() { setCopied(false); }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  function shareTwitter() {
    const url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(imageTitle + " | eazyfilms") + "&url=" + encodeURIComponent(getShareUrl());
    window.open(url, "_blank");
  }

  function shareFacebook() {
    const url = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(getShareUrl());
    window.open(url, "_blank");
  }

  return (
    <div className="relative">
      <motion.button
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all"
        onClick={function() { setShowMenu(!showMenu); }}
        whileTap={{ scale: 0.95 }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
        <span className="text-sm font-medium">Share</span>
      </motion.button>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            className="absolute bottom-full mb-2 right-0 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-xl min-w-[160px]"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <button
              className="w-full px-4 py-3 text-left text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-3"
              onClick={copyLink}
            >
              {copied ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-400">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-green-400">Copied!</span>
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  <span>Copy link</span>
                </>
              )}
            </button>
            <button
              className="w-full px-4 py-3 text-left text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-3"
              onClick={shareTwitter}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
              <span>Twitter</span>
            </button>
            <button
              className="w-full px-4 py-3 text-left text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-3"
              onClick={shareFacebook}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
              </svg>
              <span>Facebook</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}