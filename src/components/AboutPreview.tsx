import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Stethoscope } from "lucide-react";
import ScrollReveal from "./animations/ScrollReveal";
import { SITE_NAME, IMAGES } from "@/data/siteData";

export default function AboutPreview() {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-brand-100/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Editorial Medical Image with subtle hover zoom */}
          <div className="lg:col-span-5">
            <ScrollReveal animation="fade-right" delay={100}>
              <div className="relative mx-auto max-w-md lg:max-w-none group">
                <div className="relative rounded-2xl overflow-hidden bg-brand-950 border border-brand-200/90 shadow-lg">
                  <div className="relative aspect-[4/3] sm:aspect-[5/4] w-full overflow-hidden">
                    <Image
                      src={IMAGES.aboutConsultation}
                      alt="Doctor Consultation and Patient Care"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/20 to-transparent" />
                  </div>

                  {/* Bottom Integrated Overlay Banner */}
                  <div className="p-4 bg-brand-950/95 border-t border-brand-800/80 flex items-center justify-between text-white">
                    <div>
                      <div className="font-bold text-sm sm:text-base text-white">{SITE_NAME}</div>
                      <div className="text-[11px] text-brand-300 font-medium mt-0.5">
                        Senior Medical Consultant &amp; Clinical Lead
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-brand-800/90 border border-brand-500/50 flex items-center justify-center text-brand-300 shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Floating Stat Badge */}
                <div className="absolute -bottom-4 right-3 sm:right-5 bg-white py-2 px-3.5 rounded-xl border border-brand-200 shadow-md flex items-center gap-2.5 animate-float max-w-[calc(100%-1.5rem)]">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 text-accent-600 flex items-center justify-center font-bold border border-brand-100 shrink-0">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-950 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-600 animate-pulse-ring" />
                      <span>Patient-First Care</span>
                    </div>
                    <div className="text-[10px] text-zinc-500 font-medium">Evidence-Guided Approach</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Editorial Philosophy & Compact Highlights */}
          <div className="lg:col-span-7 space-y-4 pt-4 lg:pt-0">
            <ScrollReveal animation="fade-left" delay={150}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-600" />
                <span>Practice Philosophy</span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={200}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-950 leading-tight">
                A Medical Practice Rooted in <span className="text-brand-600">Precision &amp; Compassion</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={250}>
              <div className="space-y-2.5 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                <p>
                  Dr. Anil Pandey delivers individualized healthcare through evidence-based clinical protocols, systematic diagnostic evaluations, and compassionate doctor-patient communication.
                </p>
                <p>
                  Every consultation considers full medical context rather than isolated symptoms, providing clear diagnostic roadmaps for informed healthcare decisions.
                </p>
              </div>
            </ScrollReveal>

            {/* Editorial 4-Point Feature List (Clean & Non-Boxy) */}
            <ScrollReveal animation="fade-up" delay={300}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-50 border border-brand-200 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-600" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-brand-950 block">Thorough Diagnostics</span>
                    <span className="text-[11px] text-zinc-500">Comprehensive physical &amp; lab review</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-50 border border-brand-200 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-600" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-brand-950 block">Evidence-Guided Plans</span>
                    <span className="text-[11px] text-zinc-500">Targeted therapeutic roadmaps</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-50 border border-brand-200 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-600" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-brand-950 block">Objective Second Opinions</span>
                    <span className="text-[11px] text-zinc-500">Unbiased evaluation of prospective care</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-50 border border-brand-200 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-600" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-brand-950 block">Structured Follow-Up</span>
                    <span className="text-[11px] text-zinc-500">Dedicated monitoring for sustained health</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Compact Action Buttons */}
            <ScrollReveal animation="fade-up" delay={350}>
              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-1.5 px-4.5 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all hover:shadow-md hover:-translate-y-0.5"
                >
                  <span>About Dr. Anil Pandey</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/appointment"
                  className="inline-flex items-center justify-center gap-1.5 px-4.5 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-white hover:bg-brand-50 text-brand-900 font-semibold text-xs sm:text-sm border border-brand-200 shadow-2xs transition-colors hover:border-accent-300"
                >
                  <span>Schedule Consultation</span>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
