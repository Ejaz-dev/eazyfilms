"use client";

import { useState } from "react";

export default function Footer() {
  const [hovered, setHovered] = useState("");

  return (
    <footer className="border-t border-[#1a1a1a] px-4 md:px-6 py-8 mt-auto">
      <div className="max-w-[1800px] mx-auto flex justify-between items-center">
        <div className="w-16"></div>

        <div className="flex gap-8 items-center">
          <div className="relative">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#555] hover:text-white transition-colors block"
              onMouseEnter={function() { setHovered("ig"); }}
              onMouseLeave={function() { setHovered(""); }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <circle cx="12" cy="12" r="4"></circle>
                <circle cx="17.5" cy="6.5" r="1"></circle>
              </svg>
            </a>
            {hovered === "ig" && (
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-[#888]">
                Instagram
              </span>
            )}
          </div>

          <div className="relative">
            <a
              href="https://vimeo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#555] hover:text-white transition-colors block"
              onMouseEnter={function() { setHovered("vimeo"); }}
              onMouseLeave={function() { setHovered(""); }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"></path>
              </svg>
            </a>
            {hovered === "vimeo" && (
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-[#888]">
                Vimeo
              </span>
            )}
          </div>

          <div className="relative">
            <a
              href="mailto:hello@eazyfilms.com"
              className="text-[#555] hover:text-white transition-colors block"
              onMouseEnter={function() { setHovered("email"); }}
              onMouseLeave={function() { setHovered(""); }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <path d="M22 6L12 13L2 6"></path>
              </svg>
            </a>
            {hovered === "email" && (
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-[#888]">
                Email
              </span>
            )}
          </div>
        </div>

        <span className="text-[#333] text-xs w-16 text-right">© 2026</span>
      </div>
    </footer>
  );
}
