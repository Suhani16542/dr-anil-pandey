import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Video, Clock, CheckCircle } from "lucide-react";
import { SITE_NAME, IMAGES } from "@/data/siteData";

export default function FinalCTA() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Full-Bleed Realistic Medical Facility Background Photograph */}
      <div className="absolute inset-0 -z-30 w-full h-full">
        <Image
          src={IMAGES.finalCtaBg}
          alt="Dr. Anil Pandey Consultation Clinic"
          fill
          sizes="100vw"
          className="object-cover object-center w-full h-full"
        />
      </div>

      {/* Controlled Subtle Transparent Overlay (15–25% opacity: Background photograph is clearly visible) */}
      <div
        className="absolute inset-0 -z-20 bg-gradient-to-r from-brand-950/30 via-brand-950/20 to-brand-950/15"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-900/90 border border-brand-500/50 text-brand-200 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-md">
          <Clock className="w-4 h-4 text-emerald-300" />
          <span>Appointments Available This Week</span>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-md leading-tight">
            Ready to Book an Appointment with {SITE_NAME}?
          </h2>
          <p className="text-base sm:text-lg text-brand-100/90 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            Experience comprehensive healthcare consultations tailored to your
            schedule. Choose between in-person clinical visits or convenient
            online video sessions.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/appointment"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-brand-50 text-brand-950 font-bold text-base shadow-xl hover:shadow-2xl transition-all duration-200 hover:-translate-y-0.5"
          >
            <Calendar className="w-5 h-5 text-brand-800" />
            <span>Book an Appointment</span>
          </Link>
          <Link
            href="/consultation"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-900/80 hover:bg-brand-900 text-white font-bold text-base border border-brand-400/60 backdrop-blur-md shadow-lg transition-all duration-200 hover:border-brand-200"
          >
            <Video className="w-5 h-5 text-brand-300" />
            <span>Consultation Booking</span>
          </Link>
        </div>

        {/* Small Reassurance Notes */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-brand-200 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            Prompt appointment confirmation
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            Strict patient confidentiality
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            Clear medical report evaluation
          </span>
        </div>
      </div>
    </section>
  );
}
