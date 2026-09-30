import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Video,
  ShieldCheck,
  Award,
  Sparkles,
  Clock,
} from "lucide-react";
import HeroVideo from "./HeroVideo";
import { SITE_NAME, IMAGES } from "@/data/siteData";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center overflow-hidden">
      {/* 1. Full-Width Real Medical / Clinical Background Photograph (Dominant Visual Element) */}
      <div className="absolute inset-0 -z-30 w-full h-full">
        <Image
          src={IMAGES.heroBg}
          alt="Dr. Anil Pandey Medical Consultation Clinic"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center w-full h-full"
        />
      </div>

      {/* 2. Single Ultra-Subtle Green/Dark Tint (15% - 20% opacity: Photo is completely visible and prominent) */}
      <div
        className="absolute inset-0 -z-20 bg-gradient-to-r from-brand-950/30 via-brand-950/15 to-brand-950/5"
        aria-hidden="true"
      />

      {/* 3. Hero Content Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Hero Text & CTAs (Crisp White with Drop Shadow for Readability) */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 animate-fade-up">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-950/85 border border-brand-400/50 text-brand-200 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-brand-300" />
              <span>Dedicated Clinical Excellence &amp; Patient Care</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] [text-shadow:_0_2px_12px_rgba(0,0,0,0.8)]">
                {SITE_NAME}
              </h1>
              <p className="text-lg sm:text-2xl font-semibold text-brand-100 [text-shadow:_0_2px_8px_rgba(0,0,0,0.7)]">
                [Specialization / Clinical Focus &amp; Senior Medical Consultant]
              </p>
            </div>

            {/* Professional Introductory Placeholder (2-3 lines) */}
            <p className="text-base sm:text-lg text-white max-w-2xl leading-relaxed font-medium [text-shadow:_0_1px_6px_rgba(0,0,0,0.7)]">
              Committed to providing comprehensive clinical evaluations,
              evidence-based treatment protocols, and compassionate
              patient-centered healthcare designed to support lasting wellbeing.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Link
                href="/appointment"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white text-brand-950 font-bold text-base shadow-2xl hover:bg-brand-50 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5 text-brand-800" />
                <span>Book an Appointment</span>
              </Link>
              <Link
                href="/consultation"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-brand-950/85 hover:bg-brand-900 text-white font-semibold text-base border border-brand-400/60 backdrop-blur-md transition-all duration-200 hover:border-brand-200 shadow-xl"
              >
                <Video className="w-5 h-5 text-brand-300" />
                <span>Consultation Booking</span>
              </Link>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 border-t border-white/30 w-full grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-white font-medium [text-shadow:_0_1px_4px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Confidential Consultations</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Board Certified Expert</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Flexible In-Clinic &amp; Online</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Video Element */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center animate-fade-up delay-100 w-full">
            <HeroVideo />
          </div>
        </div>
      </div>
    </section>
  );
}
