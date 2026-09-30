import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Video, ShieldCheck, CheckCircle2 } from "lucide-react";
import { IMAGES } from "@/data/siteData";

export default function AppointmentCTA() {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
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

      {/* Controlled Dark Green Transparent Overlay */}
      <div
        className="absolute inset-0 -z-20 bg-gradient-to-r from-brand-950/90 via-brand-950/80 to-brand-900/70"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-brand-950/80 border border-brand-500/40 p-8 sm:p-12 lg:p-16 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-900/90 border border-brand-500/50 text-brand-200 text-xs font-semibold tracking-wide uppercase backdrop-blur-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Priority Clinical Scheduling</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Schedule Your Medical Consultation with Dr. Anil Pandey
              </h2>

              <p className="text-base sm:text-lg text-brand-100/90 max-w-2xl leading-relaxed">
                Take a proactive step towards personalized healthcare. Book an
                in-person clinic visit or arrange a remote digital consultation
                at your preferred time.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-brand-200">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Structured Clinical Assessment
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Flexible Time Slots
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Confidential Case Reviews
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full">
              <Link
                href="/appointment"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white text-brand-950 font-bold text-base shadow-lg hover:bg-brand-50 transition-all duration-200 hover:-translate-y-0.5 text-center"
              >
                <Calendar className="w-5 h-5 text-brand-800" />
                <span>Book an Appointment</span>
              </Link>
              <Link
                href="/consultation"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-brand-900/90 hover:bg-brand-900 text-white font-semibold text-base border border-brand-500/60 backdrop-blur-md transition-all duration-200 text-center hover:border-brand-300"
              >
                <Video className="w-5 h-5 text-brand-300" />
                <span>Consultation Booking</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
