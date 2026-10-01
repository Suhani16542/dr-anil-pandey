import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, GraduationCap, ArrowRight, HeartPulse, Award, CheckCircle2 } from "lucide-react";
import ScrollReveal from "./animations/ScrollReveal";
import { SITE_NAME, IMAGES } from "@/data/siteData";

export default function ProfessionalProfile() {
  return (
    <section className="py-12 sm:py-16 bg-slate-50/70 border-b border-brand-100/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Editorial Introduction & Clean Expertise Points */}
          <div className="lg:col-span-7 space-y-4 order-2 lg:order-1">
            <ScrollReveal animation="fade-right" delay={100}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-600" />
                <span>Professional Profile</span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-right" delay={150}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-950 leading-tight">
                Dedicated Leadership in <span className="text-brand-600">Clinical Excellence</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-right" delay={200}>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Dr. Anil Pandey’s clinical leadership reflects an enduring dedication to superior diagnostic precision, patient safety, and compassionate care rooted in established international guidelines.
              </p>
            </ScrollReveal>

            {/* Clean Editorial Expertise Points (No bulky card borders) */}
            <div className="space-y-3.5 pt-2">
              <ScrollReveal animation="fade-up" delay={250}>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-brand-100/80 flex items-center justify-center text-brand-700 shrink-0 mt-0.5 border border-brand-200">
                    <GraduationCap className="w-4 h-4 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-brand-950">
                      Comprehensive Medical Qualifications &amp; Fellowships
                    </h3>
                    <p className="text-[11px] text-zinc-600 mt-0.5 leading-relaxed">
                      Advanced postgraduate clinical credentials, certified specialty training, and hospital affiliations.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={300}>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-brand-100/80 flex items-center justify-center text-brand-700 shrink-0 mt-0.5 border border-brand-200">
                    <HeartPulse className="w-4 h-4 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-brand-950">
                      Patient-Centered Clinical Protocol
                    </h3>
                    <p className="text-[11px] text-zinc-600 mt-0.5 leading-relaxed">
                      Structured evaluations prioritizing accurate differential diagnosis, preventive strategies, and clear patient guidance.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={350}>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-brand-100/80 flex items-center justify-center text-brand-700 shrink-0 mt-0.5 border border-brand-200">
                    <BookOpen className="w-4 h-4 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-brand-950">
                      Continuing Medical Education &amp; Clinical Mentorship
                    </h3>
                    <p className="text-[11px] text-zinc-600 mt-0.5 leading-relaxed">
                      Continuous engagement with modern clinical trials, medical conferences, and multidisciplinary case reviews.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Sleek Horizontal Experience Stat Indicator Ribbon */}
            <ScrollReveal animation="fade-up" delay={400}>
              <div className="p-3 rounded-xl bg-white border border-brand-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-accent-600 shrink-0" />
                  <span className="font-bold text-brand-950">15+ Years Experience</span>
                </div>
                <div className="h-4 w-px bg-zinc-200 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                  <span className="font-medium text-zinc-700">Board Certified</span>
                </div>
                <div className="h-4 w-px bg-zinc-200 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
                  <span className="font-medium text-zinc-700">Active Senior Consultant</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Profile CTA */}
            <ScrollReveal animation="fade-up" delay={450}>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-700 hover:text-accent-800 underline decoration-accent-400 decoration-1 underline-offset-4"
                >
                  <span>Read Full Biography &amp; Practice Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Doctor Portrait Photo */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <ScrollReveal animation="fade-left" delay={150}>
              <div className="relative mx-auto max-w-md lg:max-w-none group">
                <div className="relative rounded-2xl overflow-hidden bg-brand-950 border border-brand-200/90 shadow-lg">
                  <div className="relative aspect-[4/3] sm:aspect-[5/4] w-full overflow-hidden">
                    <Image
                      src={IMAGES.doctorProfile}
                      alt={`${SITE_NAME} Professional Clinical Practice`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/15 to-transparent" />
                  </div>

                  <div className="p-4 bg-brand-950 border-t border-brand-800 text-white flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm sm:text-base">{SITE_NAME}</div>
                      <div className="text-[11px] text-brand-300 mt-0.5">
                        Senior Consultant Physician
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-brand-800 text-brand-200 text-xs font-semibold border border-brand-600 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse-ring" />
                      Active Practice
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
