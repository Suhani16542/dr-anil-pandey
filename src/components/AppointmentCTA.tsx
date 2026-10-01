import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Video, ShieldCheck, CheckCircle2 } from "lucide-react";
import ScrollReveal from "./animations/ScrollReveal";
import { IMAGES } from "@/data/siteData";

export default function AppointmentCTA() {
  return (
    <section className="py-10 sm:py-14 relative overflow-hidden">
      {/* Real Healthcare Facility Background Photograph */}
      <div className="absolute inset-0 -z-30 w-full h-full">
        <Image
          src={IMAGES.ctaBg}
          alt="Modern Clinic Consultation Facility"
          fill
          sizes="100vw"
          className="object-cover object-center w-full h-full"
        />
      </div>

      {/* Controlled Dark Overlay */}
      <div
        className="absolute inset-0 -z-20 bg-gradient-to-r from-brand-950/95 via-brand-950/90 to-brand-900/80"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal animation="zoom-in" delay={100}>
          <div className="rounded-2xl bg-brand-950/85 border border-brand-500/30 p-6 sm:p-8 lg:p-10 backdrop-blur-md shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-900/90 border border-brand-500/40 text-brand-200 text-xs font-semibold tracking-wide uppercase backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse-ring" />
                  <ShieldCheck className="w-3.5 h-3.5 text-accent-400" />
                  <span>Priority Clinical Scheduling</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  Schedule Your Medical Consultation with Dr. Anil Pandey
                </h2>

                <p className="text-sm sm:text-base text-brand-100/90 max-w-2xl leading-relaxed">
                  Take a proactive step towards personalized healthcare. Book an
                  in-person clinic visit or arrange a remote digital consultation
                  at your preferred time.
                </p>

                <div className="pt-1 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-brand-200">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-400" />
                    Structured Clinical Assessment
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-400" />
                    Flexible Time Slots
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-400" />
                    Confidential Case Reviews
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full">
                <Link
                  href="/appointment"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all duration-200 hover:-translate-y-0.5 text-center border border-brand-400/40"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Book an Appointment</span>
                </Link>
                <Link
                  href="/consultation"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:py-2.5 rounded-lg bg-white/95 hover:bg-white text-brand-950 font-semibold text-xs sm:text-sm transition-all duration-200 text-center shadow-xs border border-white hover:border-accent-300"
                >
                  <Video className="w-4 h-4 text-accent-600" />
                  <span>Consultation Booking</span>
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
