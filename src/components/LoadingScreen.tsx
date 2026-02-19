"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function() {
    const timer = setTimeout(function() {
      setIsLoading(false);
    }, 2000);

    return function() {
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <motion.h1
                className="text-4xl md:text-6xl font-semibold tracking-tight"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                eazy<span className="text-[#555]">films</span>
              </motion.h1>
              
              <motion.div
                className="absolute -bottom-4 left-0 h-[2px] bg-gradient-to-r from-white to-white/0"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
              ></motion.div>
            </motion.div>

            <motion.p
              className="text-[#555] text-sm mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Visual stories
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}