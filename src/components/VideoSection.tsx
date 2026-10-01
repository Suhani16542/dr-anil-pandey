"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Video as VideoIcon,
  Play,
  Calendar,
  Sparkles,
  ChevronRight,
  Clock,
  Stethoscope,
  ArrowRight,
} from "lucide-react";
import { SITE_NAME } from "@/data/siteData";
import { VideoItem } from "@/types";
import { getVideoThumbnail } from "@/lib/videoUtils";
import VideoModal from "@/components/VideoModal";

export default function VideoSection() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchVideos() {
      try {
        const res = await fetch("/api/videos");
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && isMounted) {
            setVideos(json.data);
          }
        }
      } catch {
        // Fallback silently if API not yet ready
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchVideos();
    return () => {
      isMounted = false;
    };
  }, []);

  // Show up to 3 videos on the home page section
  const displayVideos = videos.slice(0, 3);

  return (
    <section id="videos" className="py-16 lg:py-20 bg-slate-50/70 border-b border-brand-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-50 text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200">
              <Sparkles className="w-3 h-3 text-brand-700" />
              <span>Clinical Videos</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-brand-950">
              Health Insights &amp; Clinical Presentations
            </h2>

            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Educational discussions, diagnostic overviews, and patient care guidance presented by {SITE_NAME}.
            </p>
          </div>

          <Link
            href="/videos"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-800 hover:text-brand-950 transition-colors shrink-0 group"
          >
            <span>View All Videos</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-brand-200 border-t-brand-700 animate-spin" />
            <span className="text-xs text-zinc-500">Checking video updates...</span>
          </div>
        ) : displayVideos.length === 0 ? (
          /* Clean, Compact Empty State for Home Page */
          <div className="bg-white rounded-2xl border border-zinc-200/80 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-700 mx-auto mb-4">
              <VideoIcon className="w-6 h-6 text-brand-700" />
            </div>

            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-zinc-600 text-[10px] font-semibold uppercase tracking-wider mb-2.5">
              <Clock className="w-3 h-3 text-brand-600" />
              <span>Dynamic Video Feed</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-brand-950 mb-2">
              No Videos Added Yet
            </h3>

            <p className="text-xs text-zinc-600 leading-relaxed mb-5 max-w-md mx-auto">
              Clinical guides and educational talks will appear here dynamically once published by the practice.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <Link
                href="/videos"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-2xs transition-colors"
              >
                <span>Browse Video Section</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/consultation"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-white hover:bg-brand-50 text-brand-950 text-xs font-semibold border border-zinc-200 transition-colors hover:border-accent-300"
              >
                <Stethoscope className="w-3.5 h-3.5 text-accent-600" />
                <span>Book Consultation</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Dynamic Video Cards (When available from backend) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayVideos.map((video) => {
              const thumbnail = getVideoThumbnail(video.videoUrl, video.thumbnailUrl);
              return (
                <div
                  key={video._id || video.id || video.videoUrl}
                  onClick={() => setActiveVideo(video)}
                  className="group bg-white rounded-xl overflow-hidden border border-zinc-200/80 hover:border-accent-300 shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-video w-full bg-brand-950 overflow-hidden">
                    <Image
                      src={thumbnail}
                      alt={video.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-350 ease-out"
                    />
                    <div className="absolute inset-0 bg-brand-950/20 group-hover:bg-brand-950/5 transition-colors" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-brand-800/90 group-hover:bg-brand-700 text-white flex items-center justify-center shadow-md transform group-hover:scale-110 transition-all border border-white/20">
                        <Play className="w-4 h-4 fill-white ml-0.5 text-white" />
                      </div>
                    </div>

                    {video.duration && (
                      <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/75 text-white font-mono text-[9px] font-semibold">
                        {video.duration}
                      </div>
                    )}

                    {video.category && (
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-brand-950/80 backdrop-blur-xs text-brand-300 text-[9px] font-semibold border border-brand-500/30">
                        {video.category}
                      </div>
                    )}
                  </div>

                  <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <h4 className="font-bold text-sm text-brand-950 group-hover:text-brand-800 transition-colors line-clamp-2 leading-snug">
                        {video.title}
                      </h4>
                      {video.description && (
                        <p className="text-xs text-zinc-500 mt-1 line-clamp-2 leading-relaxed">
                          {video.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs text-brand-700 font-semibold">
                      <span className="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>Play Video</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Video Modal Player */}
      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  );
}
