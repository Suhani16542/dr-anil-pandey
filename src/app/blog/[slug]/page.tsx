"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  User,
  Clock,
  Tag,
  Stethoscope,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { SITE_NAME, IMAGES, DEMO_BLOG_POSTS } from "@/data/siteData";
import { BlogPost } from "@/types";
import ScrollReveal from "@/components/animations/ScrollReveal";

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
};

export default function SingleBlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadPost() {
      try {
        const res = await fetch(`/api/blogs/${slug}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data && isMounted) {
            setPost(json.data);
            return;
          }
        }
      } catch {
        // Fallback below
      }

      // Check demo fallback data
      const fallbackPost = DEMO_BLOG_POSTS.find((p) => p.slug === slug);
      if (fallbackPost && isMounted) {
        setPost(fallbackPost);
      }

      if (isMounted) setLoading(false);
    }

    loadPost();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="w-9 h-9 rounded-full border-3 border-brand-200 border-t-brand-600 animate-spin" />
        <span className="text-xs font-medium text-zinc-500">Loading medical article...</span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 mb-4 shadow-2xs">
          <BookOpen className="w-7 h-7" />
        </div>
        <h1 className="text-lg sm:text-xl font-bold text-brand-950 mb-2">Article Not Found</h1>
        <p className="text-xs text-zinc-600 mb-6">
          The requested medical article may not be published yet or the link might be outdated.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      {/* 1. Article Top Header */}
      <section className="bg-white border-b border-brand-100/80 py-10 lg:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium mb-4">
              <Link href="/" className="hover:text-brand-700 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              <Link href="/blog" className="hover:text-brand-700 transition-colors">
                Blog
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-brand-700 font-semibold truncate max-w-xs">{post.category}</span>
            </div>

            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                <span>{post.category}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-950 leading-tight">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
                  {post.excerpt}
                </p>
              )}

              {/* Author & Meta Row */}
              <div className="pt-4 border-t border-brand-50 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-brand-900 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                    AP
                  </div>
                  <div>
                    <div className="font-bold text-brand-950">{post.author}</div>
                    <div className="text-[11px] text-brand-600 font-medium">Medical Consultant</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {post.publishedAt && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-brand-600" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-brand-600" />
                    <span>4 min read</span>
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. Article Content Body */}
      <section className="py-10 sm:py-14 flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Image if present */}
          {post.coverImage && (
            <ScrollReveal animation="fade-up">
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-8 border border-brand-100 shadow-sm bg-brand-950">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          )}

          {/* Article Text Content */}
          <ScrollReveal animation="fade-up">
            <div className="bg-white rounded-2xl border border-brand-100/80 p-6 sm:p-10 shadow-2xs space-y-6">
              <div className="prose prose-zinc max-w-none text-xs sm:text-sm leading-relaxed text-zinc-700 whitespace-pre-line">
                {post.content}
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="pt-5 border-t border-brand-50 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-zinc-500 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-brand-600" />
                    <span>Tags:</span>
                  </span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-md bg-slate-100 text-zinc-700 text-xs font-medium border border-zinc-200/60"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Doctor Consultation CTA Card */}
          <ScrollReveal animation="fade-up">
            <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-brand-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm border border-brand-800">
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-brand-300 text-xs font-semibold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse-ring" />
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Clinical Care &amp; Consultation</span>
                </div>
                <h3 className="text-base sm:text-xl font-bold text-white">
                  Consult Directly with {SITE_NAME}
                </h3>
                <p className="text-xs text-brand-200/90 max-w-md leading-relaxed">
                  Receive structured diagnostic reviews, individual therapy guidance, and clinical case analysis.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2.5 shrink-0 w-full sm:w-auto">
                <Link
                  href="/appointment"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all hover:shadow-md hover:-translate-y-0.5 border border-brand-400/40"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment</span>
                </Link>
                <Link
                  href="/consultation"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 shadow-2xs transition-all hover:border-white/40 hover:-translate-y-0.5 backdrop-blur-xs"
                >
                  <Stethoscope className="w-4 h-4 text-accent-400" />
                  <span>Consultation</span>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
