"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#0a0a0a]/90 backdrop-blur-xl py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight"
          style={{ fontFamily: "'Clash Display', sans-serif" }}
        >
          eazy<span className="text-[#555]">films</span>
        </Link>
        <div className="flex items-center gap-6 md:gap-8">
          {["Work", "Film", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-xs md:text-sm text-[#888] hover:text-white transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}