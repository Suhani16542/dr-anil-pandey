"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { getEmbedUrl } from "@/lib/videoUtils";
import { VideoItem } from "@/types";

interface VideoModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (video) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [video, onClose]);

  if (!video) return null;

  const { type, embedUrl } = getEmbedUrl(video.videoUrl);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-overlay-fade"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-brand-950 rounded-2xl overflow-hidden shadow-2xl border border-brand-700/60 animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-brand-950/95 border-b border-brand-800">
          <div className="min-w-0 pr-4">
            <h3 className="text-sm sm:text-base font-bold text-white truncate">
              {video.title}
            </h3>
            {video.category && (
              <span className="text-[11px] text-brand-300 font-medium">
                {video.category}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-brand-900/80 hover:bg-brand-800 text-zinc-300 hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="Close video modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Frame */}
        <div className="relative aspect-video w-full bg-black">
          {type === "direct" ? (
            <video
              src={embedUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          ) : (
            <iframe
              src={embedUrl}
              title={video.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </div>

        {/* Video Description / Details Footer */}
        {video.description && (
          <div className="p-4 bg-brand-950 text-xs sm:text-sm text-zinc-300 border-t border-brand-900 max-h-32 overflow-y-auto leading-relaxed">
            <p>{video.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
