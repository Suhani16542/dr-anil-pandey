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
  Stethoscope,
} from "lucide-react";
import HeroVideo from "./HeroVideo";
import ScrollReveal from "./animations/ScrollReveal";
import { SITE_NAME, IMAGES } from "@/data/siteData";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-14 lg:py-16 flex items-center">
      {/* 1. Full-Width Real Medical / Clinical Background Photograph */}
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

      {/* 2. Lightened Subtle Gradient Overlay for High Image Visibility */}
      <div
        className="absolute inset-0 -z-20 bg-gradient-to-r from-brand-950/70 via-brand-950/45 to-brand-950/20"
        aria-hidden="true"
      />

      {/* 3. Hero Content Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Hero Text & CTAs (Clean Alignment) */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-3 sm:space-y-3.5 text-left">
            {/* Eyebrow Badge with Medical Red Pulse Dot */}
            <ScrollReveal animation="fade-down" delay={50}>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-950/80 border border-brand-400/40 text-brand-100 text-xs font-semibold tracking-wide backdrop-blur-md shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse-ring" />
                <Sparkles className="w-3 h-3 text-brand-300" />
                <span>Dedicated Clinical Excellence &amp; Patient Care</span>
              </div>
            </ScrollReveal>

            {/* Main Heading & Subtitle */}
            <ScrollReveal animation="fade-up" delay={150}>
              <div className="space-y-0.5">
                <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-white leading-tight [text-shadow:_0_2px_12px_rgba(0,0,0,0.85)]">
                  {SITE_NAME}
                </h1>
                <p className="text-sm sm:text-base font-bold text-brand-200 flex items-center gap-1.5 [text-shadow:_0_2px_8px_rgba(0,0,0,0.7)]">
                  <Stethoscope className="w-4 h-4 text-brand-300" />
                  <span>Senior Medical Consultant &amp; Clinical Lead</span>
                </p>
              </div>
            </ScrollReveal>

            {/* Shortened 1-2 line Concise Description */}
            <ScrollReveal animation="fade-up" delay={250}>
              <p className="text-xs sm:text-sm text-white/95 max-w-lg leading-relaxed font-medium [text-shadow:_0_1px_6px_rgba(0,0,0,0.75)]">
                Comprehensive clinical evaluations, evidence-based diagnoses, and personalized patient-centered healthcare.
              </p>
            </ScrollReveal>

            {/* Compact Action Buttons with Navbar Teal Primary & Red Accent */}
            <ScrollReveal animation="fade-up" delay={350}>
              <div className="pt-0.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                <Link
                  href="/appointment"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 border border-brand-400/40 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
                  <Calendar className="w-3.5 h-3.5 text-white" />
                  <span>Book an Appointment</span>
                </Link>
                <Link
                  href="/consultation"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-white/95 hover:bg-white text-brand-950 font-semibold text-xs border border-white shadow-xs transition-all duration-200 hover:border-accent-300 hover:-translate-y-0.5 cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5 text-accent-600" />
                  <span>Consultation Booking</span>
                </Link>
              </div>
            </ScrollReveal>

            {/* Trust Highlights Bar */}
            <ScrollReveal animation="fade-up" delay={450}>
              <div className="pt-2 border-t border-white/20 w-full grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] sm:text-xs text-white font-medium [text-shadow:_0_1px_4px_rgba(0,0,0,0.6)]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-300 shrink-0" />
                  <span>Confidential Consultations</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-brand-300 shrink-0" />
                  <span>Board Certified Expert</span>
                </div>
                <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                  <Clock className="w-3.5 h-3.5 text-brand-300 shrink-0" />
                  <span>Flexible In-Clinic &amp; Online</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Interactive Hero Clinical Stream / Video Element */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center w-full">
            <ScrollReveal animation="fade-left" delay={200}>
              <HeroVideo />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
