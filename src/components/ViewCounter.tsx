"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface ViewCounterProps {
  imageId: number;
}

export default function ViewCounter({ imageId }: ViewCounterProps) {
  const [views, setViews] = useState(0);
  const [hasViewed, setHasViewed] = useState(false);

  useEffect(function() {
    async function fetchAndTrackViews() {
      const { data, error } = await supabase
        .from("views")
        .select("*")
        .eq("image_id", imageId);

      if (!error && data) {
        setViews(data.length);
      }

      const viewedKey = "eazyfilms-viewed-" + imageId;
      const alreadyViewed = sessionStorage.getItem(viewedKey);

      if (!alreadyViewed) {
        await supabase.from("views").insert({ image_id: imageId });
        sessionStorage.setItem(viewedKey, "true");
        setViews(function(v) { return v + 1; });
      }
    }

    fetchAndTrackViews();
  }, [imageId]);

  function formatViews(count: number) {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count.toString();
  }

  return (
    <div className="flex items-center gap-1.5 text-white/50 text-sm">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
      <span>{formatViews(views)}</span>
    </div>
  );
}