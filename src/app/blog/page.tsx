"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  Sparkles,
  Search,
  ChevronRight,
  Clock,
  User,
  Tag,
  ArrowRight,
  FileText,
  AlertCircle,
  Stethoscope,
  CheckCircle2,
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

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(DEMO_BLOG_POSTS);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    let isMounted = true;
    async function loadBlogs() {
      try {
        const res = await fetch("/api/blogs");
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0 && isMounted) {
            const published = json.data.filter((p: BlogPost) => p.status === "Published");
            if (published.length > 0) {
              setPosts(published);
            }
          }
        }
      } catch {
        // Fallback gracefully to demo data
      }
    }

    loadBlogs();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean))),
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesCat = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/40">
      {/* 1. Header Banner */}
      <section className="pt-8 pb-6 sm:pt-10 sm:pb-8 bg-gradient-to-b from-brand-50/50 via-white to-slate-50/30 border-b border-brand-100/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <ScrollReveal animation="fade-down">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-500 font-medium mb-1">
              <Link href="/" className="hover:text-brand-700 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-brand-700 font-semibold">Medical Blog</span>
            </div>

            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/90 text-brand-800 text-xs font-semibold tracking-wide shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse-ring" />
              <BookOpen className="w-3.5 h-3.5 text-brand-600" />
              <span>Clinical Articles &amp; Patient Guidelines</span>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={100}>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-950 leading-tight">
              Medical Insights &amp; Health Articles by <span className="text-brand-600">{SITE_NAME}</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={150}>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-xl mx-auto leading-relaxed font-normal">
              Stay informed with preventive healthcare updates, diagnostic explanations, patient
              wellness protocols, and clinical recommendations published directly from the practice.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. Main Content & Blog Grid */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Controls Bar: Search & Category Filter */}
          <ScrollReveal animation="fade-up">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-3.5 rounded-2xl border border-brand-100 shadow-2xs">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-brand-600 text-white shadow-xs"
                        : "bg-slate-50 text-zinc-600 hover:bg-brand-50 hover:text-brand-900 border border-zinc-200/80"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search medical articles..."
                  className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-zinc-200 rounded-xl text-xs text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:bg-white transition-all shadow-2xs font-medium"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Articles Grid */}
          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-zinc-200 p-8 text-center max-w-md mx-auto shadow-xs">
              <AlertCircle className="w-10 h-10 text-zinc-400 mx-auto mb-3" />
              <h3 className="text-sm sm:text-base font-bold text-zinc-900 mb-1">No matching articles</h3>
              <p className="text-xs text-zinc-500 mb-4">
                No blog articles match &quot;{searchQuery}&quot;. Try adjusting your search query or category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-4 py-2 rounded-lg bg-brand-50 text-brand-700 text-xs font-semibold hover:bg-brand-100 transition-colors cursor-pointer"
              >
                Clear Search &amp; Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, idx) => (
                <ScrollReveal key={post._id || post.id || post.slug} delay={idx * 0.08} animation="fade-up">
                  <article className="group bg-white rounded-2xl overflow-hidden border border-brand-100/90 hover:border-accent-300 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col h-full">
                    {/* Cover Image */}
                    {post.coverImage && (
                      <div className="relative aspect-[16/10] w-full bg-brand-950 overflow-hidden">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-350 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 via-transparent to-transparent" />
                        <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-white/95 backdrop-blur-xs text-brand-900 font-bold text-[10px] shadow-xs border border-white">
                          {post.category}
                        </div>
                      </div>
                    )}

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                          {post.publishedAt && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-brand-600" />
                              <span>{formatDate(post.publishedAt)}</span>
                            </span>
                          )}
                          <span>•</span>
                          <span>4 min read</span>
                        </div>

                        <h2 className="font-bold text-base text-brand-950 group-hover:text-brand-700 transition-colors line-clamp-2 leading-snug">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h2>

                        {post.excerpt && (
                          <p className="text-xs text-zinc-600 line-clamp-3 leading-relaxed font-normal">
                            {post.excerpt}
                          </p>
                        )}
                      </div>

                      <div className="pt-3 border-t border-brand-50 flex items-center justify-between text-xs">
                        <span className="text-zinc-500 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-brand-600" />
                          <span className="font-medium text-zinc-700">{post.author}</span>
                        </span>

                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 text-brand-700 font-semibold group-hover:translate-x-0.5 transition-transform"
                        >
                          <span>Read Article</span>
                          <ArrowRight className="w-3.5 h-3.5 text-accent-600" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. Reassurance Consultation Banner */}
      <section className="py-12 bg-white border-t border-brand-100/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-800 text-xs font-semibold">
            <Stethoscope className="w-3.5 h-3.5 text-brand-600" />
            <span>Consultation Inquiries</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-brand-950">
            Need Dedicated Medical Advice on Your Health?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-lg mx-auto">
            Schedule a personalized consultation with Dr. Anil Pandey for individual case reviews and preventive care protocols.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/appointment"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>
            <Link
              href="/consultation"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-50 hover:bg-brand-50 text-brand-950 text-xs sm:text-sm font-semibold border border-zinc-200 transition-colors"
            >
              <Stethoscope className="w-4 h-4 text-accent-600" />
              <span>Consultation Booking</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
