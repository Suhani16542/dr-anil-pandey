import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, ShieldCheck, Stethoscope } from "lucide-react";
import { SITE_NAME, IMAGES } from "@/data/siteData";

export default function AboutPreview() {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-brand-100/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Large Professional Healthcare Image */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative background border frame */}
              <div
                className="absolute -inset-3 rounded-3xl bg-brand-100/70 -rotate-1 pointer-events-none"
                aria-hidden="true"
              />
              <div className="relative rounded-2xl overflow-hidden bg-brand-950 border-2 border-brand-300 shadow-2xl">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={IMAGES.aboutConsultation}
                    alt="Doctor Consultation and Patient Care"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/20 to-transparent" />
                </div>

                {/* Bottom Overlay Info Card */}
                <div className="p-5 bg-brand-950/95 border-t border-brand-800 flex items-center justify-between text-white">
                  <div>
                    <div className="font-bold text-base text-white">{SITE_NAME}</div>
                    <div className="text-xs text-brand-300 font-medium mt-0.5">
                      [Senior Medical Consultant &amp; Clinical Lead]
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-brand-800 border border-brand-500/60 flex items-center justify-center text-emerald-300 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Floating Stat Badge */}
              <div className="absolute -bottom-6 right-2 sm:right-6 bg-white p-3.5 sm:p-4 rounded-xl border border-brand-200 shadow-xl flex items-center gap-3 max-w-[calc(100%-1rem)]">
                <div className="w-11 h-11 rounded-lg bg-brand-100 text-brand-800 flex items-center justify-center font-bold">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-brand-950">Patient-First Care</div>
                  <div className="text-xs text-zinc-500">Comprehensive Clinical Attention</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Introduction Content (3-4 Paragraphs & Highlights) */}
          <div className="lg:col-span-7 space-y-6 pt-6 lg:pt-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-brand-50 text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200">
              Introduction
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-950 leading-[1.15]">
              A Dedicated Medical Approach Rooted in Precision &amp; Compassion
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-zinc-600 leading-relaxed">
              <p>
                Dr. Anil Pandey is committed to providing thorough, patient-first
                healthcare built upon evidence-guided medical protocols, rigorous
                diagnostic assessments, and open, empathetic clinical dialogue.
              </p>
              <p>
                With deep clinical immersion across multifaceted case scenarios,
                Dr. Pandey combines modern medical guidelines with an attentive,
                reassuring bedside manner. Every clinical consultation is designed
                to understand the full patient context rather than isolated symptoms.
              </p>
              <p>
                Patients receive comprehensive explanations regarding diagnoses,
                investigative findings, and personalized care roadmaps—empowering
                them with the knowledge and confidence required for informed
                health choices.
              </p>
            </div>

            {/* Structured Care Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-brand-50/50 border border-brand-100">
                <CheckCircle className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-zinc-800">
                  Detailed Medical Evaluations &amp; Diagnostics
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-brand-50/50 border border-brand-100">
                <CheckCircle className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-zinc-800">
                  Evidence-Guided Long-Term Care Protocols
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-brand-50/50 border border-brand-100">
                <CheckCircle className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-zinc-800">
                  Unbiased Second Medical Opinions
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-brand-50/50 border border-brand-100">
                <CheckCircle className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-zinc-800">
                  Dedicated Post-Consultation Follow-Up
                </span>
              </div>
            </div>

            {/* Highlights & CTA */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-semibold text-sm shadow-md transition-all duration-200 hover:shadow-lg"
              >
                <span>About Dr. Anil Pandey</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/appointment"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-brand-50 text-brand-900 font-semibold text-sm border border-brand-200 transition-colors"
              >
                <span>Schedule Consultation</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
