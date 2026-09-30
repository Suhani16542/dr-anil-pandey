import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, GraduationCap, ArrowRight, HeartPulse } from "lucide-react";
import { SITE_NAME, IMAGES } from "@/data/siteData";

export default function ProfessionalProfile() {
  return (
    <section className="py-20 lg:py-28 bg-brand-50/40 border-b border-brand-100/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text & Structured Supporting Points */}
          <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-brand-100 text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200">
              Professional Profile
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-950 leading-[1.15]">
              Dedicated Leadership in Healthcare &amp; Clinical Excellence
            </h2>

            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
              Dr. Anil Pandey’s professional journey reflects an enduring dedication
              to superior clinical diagnostics, high ethical standards, and patient
              safety. Through ongoing education and clinical application, Dr. Pandey
              maintains an approach that unites state-of-the-art medical insights
              with practical, accessible healthcare delivery.
            </p>

            {/* 4 Supporting Profile Points */}
            <div className="space-y-3.5 pt-2">
              <div className="p-4 rounded-xl bg-white border border-brand-200/80 shadow-sm flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-800 shrink-0 mt-0.5">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-950">
                    Comprehensive Medical Qualifications
                  </h3>
                  <p className="text-xs text-zinc-600 mt-0.5">
                    Rigorous primary medical training, recognized postgraduate degrees, and certified clinical fellowships.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-brand-200/80 shadow-sm flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-800 shrink-0 mt-0.5">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-950">
                    Patient-Centered Clinical Methodology
                  </h3>
                  <p className="text-xs text-zinc-600 mt-0.5">
                    Individualized evaluations emphasizing root-cause discovery, preventative strategies, and holistic wellness.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-brand-200/80 shadow-sm flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-800 shrink-0 mt-0.5">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-950">
                    Continuing Medical Research &amp; Mentorship
                  </h3>
                  <p className="text-xs text-zinc-600 mt-0.5">
                    Active participation in clinical seminars, peer reviews, and academic case-discussion forums.
                  </p>
                </div>
              </div>
            </div>

            {/* Profile CTAs */}
            <div className="pt-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-800 hover:text-brand-950 underline decoration-brand-400 decoration-2 underline-offset-4"
              >
                <span>Read Full Biography &amp; Credentials</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Large Professional Image with Overlay Badges */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div
                className="absolute -inset-3 rounded-3xl bg-brand-200/60 rotate-1 pointer-events-none"
                aria-hidden="true"
              />
              <div className="relative rounded-2xl overflow-hidden bg-brand-950 border-2 border-brand-300 shadow-2xl">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={IMAGES.doctorProfile}
                    alt={`${SITE_NAME} Professional Clinical Practice`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/15 to-transparent" />
                </div>

                <div className="p-5 bg-brand-950 border-t border-brand-800 text-white flex items-center justify-between">
                  <div>
                    <div className="font-bold text-base">{SITE_NAME}</div>
                    <div className="text-xs text-brand-300 mt-0.5">
                      [Hospital Affiliation &amp; Chamber Details]
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-brand-800 text-emerald-300 text-xs font-semibold border border-brand-600">
                    Active Practice
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
