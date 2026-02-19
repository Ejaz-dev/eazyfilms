"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

interface LikeButtonProps {
  imageId: number;
}

export default function LikeButton({ imageId }: LikeButtonProps) {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(function() {
    let storedUserId = localStorage.getItem("eazyfilms-user-id");
    if (!storedUserId) {
      storedUserId = "user-" + Math.random().toString(36).substring(2, 15);
      localStorage.setItem("eazyfilms-user-id", storedUserId);
    }
    setUserId(storedUserId);
  }, []);

  useEffect(function() {
    if (!userId) return;

    async function fetchLikes() {
      const { data, error } = await supabase
        .from("likes")
        .select("*")
        .eq("image_id", imageId);

      if (!error && data) {
        setLikes(data.length);
        const userLiked = data.some(function(like) {
          return like.user_id === userId;
        });
        setHasLiked(userLiked);
      }
    }

    fetchLikes();

    const channel = supabase
      .channel("likes-channel-" + imageId)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "likes",
          filter: "image_id=eq." + imageId,
        },
        function() {
          fetchLikes();
        }
      )
      .subscribe();

    return function() {
      supabase.removeChannel(channel);
    };
  }, [imageId, userId]);

  async function handleLike() {
    if (!userId) return;

    setIsAnimating(true);
    setTimeout(function() { setIsAnimating(false); }, 600);

    if (hasLiked) {
      setHasLiked(false);
      setLikes(function(l) { return Math.max(0, l - 1); });

      await supabase
        .from("likes")
        .delete()
        .eq("image_id", imageId)
        .eq("user_id", userId);
    } else {
      setHasLiked(true);
      setLikes(function(l) { return l + 1; });

      await supabase
        .from("likes")
        .insert({ image_id: imageId, user_id: userId });
    }
  }

  return (
    <motion.button
      className={"flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm transition-all " + (hasLiked ? "bg-red-500/20 border-red-500/30 text-red-400" : "bg-white/10 border-white/10 text-white hover:bg-white/20")}
      onClick={handleLike}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        <motion.svg
          key={hasLiked ? "filled" : "empty"}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={hasLiked ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: isAnimating ? [1, 1.3, 1] : 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </motion.svg>
      </AnimatePresence>
      <span className="text-sm font-medium">{likes}</span>
    </motion.button>
  );
}