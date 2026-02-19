"use client";

import { useState, useEffect } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(function() {
    function onMouseMove(e: MouseEvent) {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    }

    function onMouseEnter() {
      setIsVisible(true);
    }

    function onMouseLeave() {
      setIsVisible(false);
    }

    function checkHover(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer");
      
      setIsHovering(!!isClickable);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousemove", checkHover);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);

    return function() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousemove", checkHover);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isVisible]);

  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <>
      <div
        className={"custom-cursor " + (isHovering ? "hover" : "")}
        style={{
          left: position.x + "px",
          top: position.y + "px",
          opacity: isVisible ? 1 : 0,
        }}
      ></div>
      <div
        className="custom-cursor-dot"
        style={{
          left: position.x + "px",
          top: position.y + "px",
          opacity: isVisible && !isHovering ? 1 : 0,
        }}
      ></div>
    </>
  );
}