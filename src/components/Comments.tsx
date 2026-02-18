"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Comment {
  id: string;
  text: string;
  author: string;
  timestamp: number;
}

interface CommentsProps {
  imageId: number;
}

export default function Comments({ imageId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [author, setAuthor] = useState("");
  const [hasSetName, setHasSetName] = useState(false);
  const commentsEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(function() {
    const stored = localStorage.getItem("eazyfilms-comments-" + imageId);
    if (stored) {
      setComments(JSON.parse(stored));
    }
    const savedName = localStorage.getItem("eazyfilms-username");
    if (savedName) {
      setAuthor(savedName);
      setHasSetName(true);
    }
  }, [imageId]);

  useEffect(function() {
    if (commentsEndRef.current) {
      commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newComment.trim() || !author.trim()) return;

    if (!hasSetName) {
      localStorage.setItem("eazyfilms-username", author.trim());
      setHasSetName(true);
    }

    const comment: Comment = {
      id: Date.now().toString(),
      text: newComment.trim(),
      author: author.trim(),
      timestamp: Date.now(),
    };

    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    localStorage.setItem("eazyfilms-comments-" + imageId, JSON.stringify(updatedComments));
    setNewComment("");
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  function formatTime(timestamp: number) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "just now";
    if (minutes < 60) return minutes + "m ago";
    if (hours < 24) return hours + "h ago";
    if (days < 7) return days + "d ago";
    return date.toLocaleDateString();
  }

  function getInitials(name: string) {
    return name.split(" ").map(function(n) { return n[0]; }).join("").toUpperCase().slice(0, 2);
  }

  function getAvatarColor(name: string) {
    const colors = [
      "from-violet-500 to-purple-500",
      "from-blue-500 to-cyan-500",
      "from-emerald-500 to-teal-500",
      "from-orange-500 to-amber-500",
      "from-pink-500 to-rose-500",
      "from-indigo-500 to-blue-500",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#0c0c0c] to-[#0a0a0a]">
      <div className="p-5 border-b border-white/5">
        <div className="flex items-center justify-between">
          <h3 className="text-white text-lg font-semibold tracking-tight" style={{ fontFamily: "'Clash Display', sans-serif" }}>
            Comments
          </h3>
          <span className="text-[#666] text-xs bg-white/5 px-2 py-1 rounded-full">
            {comments.length} {comments.length === 1 ? "comment" : "comments"}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 scrollbar-thin">
        {comments.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#444]">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"></path>
              </svg>
            </div>
            <p className="text-[#555] text-sm font-medium mb-1">No comments yet</p>
            <p className="text-[#444] text-xs">Be the first to share your thoughts</p>
          </div>
        )}
        
        <AnimatePresence>
          {comments.map(function(comment, index) {
            return (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="group py-3 px-3 rounded-xl hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex gap-3">
                  <div className={"w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center flex-shrink-0 " + getAvatarColor(comment.author)}>
                    <span className="text-white text-xs font-semibold">{getInitials(comment.author)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium text-sm">{comment.author}</span>
                      <span className="text-[#555] text-xs">{formatTime(comment.timestamp)}</span>
                    </div>
                    <p className="text-[#aaa] text-sm mt-1 leading-relaxed break-words">{comment.text}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={commentsEndRef}></div>
      </div>

      <div className="p-4 border-t border-white/5 bg-[#0a0a0a]/80 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-3">
          {!hasSetName && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="relative"
            >
              <input
                type="text"
                value={author}
                onChange={function(e) { setAuthor(e.target.value); }}
                placeholder="Enter your name..."
                className="w-full bg-white/5 text-white text-sm px-4 py-3 rounded-xl border border-white/10 focus:border-white/20 focus:bg-white/[0.07] focus:outline-none transition-all placeholder:text-[#555]"
              />
            </motion.div>
          )}
          
          <div className="flex gap-2 items-end">
            {(hasSetName || author.trim()) && (
              <div className={"w-9 h-9 rounded-full bg-gradient-to-br flex items-center justify-center flex-shrink-0 " + getAvatarColor(author || "A")}>
                <span className="text-white text-xs font-semibold">{getInitials(author || "A")}</span>
              </div>
            )}
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={newComment}
                onChange={function(e) { setNewComment(e.target.value); }}
                placeholder="Write a comment..."
                disabled={!author.trim()}
                className="w-full bg-white/5 text-white text-sm px-4 py-3 pr-12 rounded-xl border border-white/10 focus:border-white/20 focus:bg-white/[0.07] focus:outline-none transition-all placeholder:text-[#555] disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!newComment.trim() || !author.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg bg-white text-black hover:bg-white/90 transition-all disabled:opacity-30 disabled:hover:bg-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path>
                </svg>
              </button>
            </div>
          </div>
          
          {hasSetName && (
            <button
              type="button"
              onClick={function() { setHasSetName(false); localStorage.removeItem("eazyfilms-username"); }}
              className="text-[#555] text-xs hover:text-white/60 transition-colors"
            >
              Commenting as <span className="text-white/60">{author}</span> · Change
            </button>
          )}
        </form>
      </div>
    </div>
  );
}