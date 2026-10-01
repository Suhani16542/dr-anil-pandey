import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Video, Clock, CheckCircle } from "lucide-react";
import ScrollReveal from "./animations/ScrollReveal";
import { SITE_NAME, IMAGES } from "@/data/siteData";

export default function FinalCTA() {
  return (
    <section className="relative py-12 sm:py-16 overflow-hidden">
      {/* Full-Bleed Medical Facility Background Photograph */}
      <div className="absolute inset-0 -z-30 w-full h-full">
        <Image
          src={IMAGES.finalCtaBg}
          alt="Dr. Anil Pandey Consultation Clinic"
          fill
          sizes="100vw"
          className="object-cover object-center w-full h-full"
        />
      </div>

      {/* Controlled Subtle Transparent Overlay */}
      <div
        className="absolute inset-0 -z-20 bg-gradient-to-r from-brand-950/40 via-brand-950/30 to-brand-950/20"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
        <ScrollReveal animation="fade-down" delay={50}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/90 border border-brand-500/50 text-brand-200 text-xs font-semibold backdrop-blur-md shadow-md">
            <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse-ring" />
            <Clock className="w-3.5 h-3.5 text-accent-400" />
            <span>Appointments Available This Week</span>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={120}>
          <div className="space-y-2.5">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white drop-shadow-md leading-tight">
              Ready to Book an Appointment with {SITE_NAME}?
            </h2>
            <p className="text-sm sm:text-base text-brand-100/95 max-w-xl mx-auto leading-relaxed drop-shadow-sm">
              Experience comprehensive healthcare consultations tailored to your
              schedule. Choose between in-person clinical visits or convenient
              online video sessions.
            </p>
          </div>
        </ScrollReveal>

        {/* Action Buttons with Navbar primary teal color */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <Link
              href="/appointment"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-200 hover:-translate-y-0.5 border border-brand-400/40"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>Book an Appointment</span>
            </Link>
            <Link
              href="/consultation"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-white/95 hover:bg-white text-brand-950 font-semibold text-xs sm:text-sm border border-white shadow-xs transition-all duration-200 hover:border-accent-300"
            >
              <Video className="w-4 h-4 text-accent-600" />
              <span>Consultation Booking</span>
            </Link>
          </div>
        </ScrollReveal>

        {/* Small Reassurance Notes */}
        <ScrollReveal animation="fade-up" delay={280}>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-brand-200 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-accent-400" />
              Prompt confirmation
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-accent-400" />
              Strict patient confidentiality
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-accent-400" />
              Clear medical assessment
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
