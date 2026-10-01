import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HeartPulse,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  Stethoscope,
  ArrowRight,
} from "lucide-react";
import ScrollReveal from "./animations/ScrollReveal";
import { SITE_NAME, IMAGES } from "@/data/siteData";

export default function ProfessionalApproach() {
  const trustPoints = [
    {
      id: "patient-centered",
      title: "Individualized Patient Focus",
      description: "Care pathways shaped around each patient's comprehensive medical profile, background history, and specific diagnostic requirements.",
      icon: HeartPulse,
    },
    {
      id: "evidence-based",
      title: "Evidence-Guided Clinical Decisions",
      description: "Diagnostics and recommendations benchmarked against contemporary international clinical literature and medical standards.",
      icon: CheckCircle2,
    },
    {
      id: "transparent",
      title: "Transparent & Empathetic Guidance",
      description: "Clear, understandable clinical discussions without confusing jargon, empowering patients to make confident healthcare choices.",
      icon: MessageSquare,
    },
    {
      id: "continuous-care",
      title: "Structured Continuity of Care",
      description: "Ongoing clinical oversight, structured follow-up evaluations, and seamless coordination for long-term health stabilization.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-brand-100/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Heading, Intro & 4 Editorial Trust Points */}
          <div className="lg:col-span-7 space-y-4">
            <ScrollReveal animation="fade-right" delay={50}>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-600 animate-pulse-ring" />
                <span>Clinical Standards</span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-right" delay={120}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-950 leading-tight">
                Why Choose <span className="text-brand-600">{SITE_NAME}&apos;s</span> Practice
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-right" delay={180}>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-xl">
                A patient-focused approach grounded in clinical rigor, ethical accountability, and attentive personal care throughout every phase of consultation.
              </p>
            </ScrollReveal>

            {/* 4 Distinct Trust Highlights (Editorial, Non-Card Layout) */}
            <div className="space-y-3.5 pt-2">
              {trustPoints.map((pt, idx) => {
                const IconComponent = pt.icon;
                return (
                  <ScrollReveal
                    key={pt.id}
                    animation="fade-up"
                    delay={200 + idx * 80}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-brand-50 border border-brand-200 flex items-center justify-center text-accent-600 shrink-0 mt-0.5">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-sm font-bold text-brand-950">
                          {pt.title}
                        </h3>
                        <p className="text-xs text-zinc-600 mt-0.5 leading-relaxed">
                          {pt.description}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* CTA Link */}
            <ScrollReveal animation="fade-up" delay={450}>
              <div className="pt-2">
                <Link
                  href="/appointment"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 hover:text-brand-900 group"
                >
                  <span className="underline decoration-brand-400 decoration-1 underline-offset-4">Learn More About Consultation Methodology</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Medical Care Photography & Clinical Assurance Badge */}
          <div className="lg:col-span-5">
            <ScrollReveal animation="fade-left" delay={150}>
              <div className="relative mx-auto max-w-md lg:max-w-none group">
                <div className="relative rounded-2xl overflow-hidden bg-brand-950 border border-brand-200 shadow-xl">
                  <div className="relative aspect-[4/3] sm:aspect-[14/11] w-full overflow-hidden">
                    <Image
                      src={IMAGES.patientCare}
                      alt="Compassionate Patient Care & Clinical Protocol"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/20 to-transparent" />
                  </div>

                  <div className="p-4 bg-brand-950 text-white flex items-center justify-between border-t border-brand-800">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-brand-300" />
                      <span className="text-xs sm:text-sm font-bold">Patient Trust &amp; Safety</span>
                    </div>
                    <span className="text-[11px] text-brand-300 font-semibold">100% Confidential</span>
                  </div>
                </div>

                {/* Floating Reassurance Chip */}
                <div className="absolute -bottom-3 left-3 sm:-left-4 bg-white py-2 px-3 rounded-xl border border-brand-200 shadow-md flex items-center gap-2 animate-float max-w-[calc(100%-1.5rem)]">
                  <div className="w-7 h-7 rounded-md bg-accent-50 text-accent-600 flex items-center justify-center font-bold border border-accent-100 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-brand-950">Ethical Healthcare</div>
                    <div className="text-[10px] text-zinc-500">Certified Medical Protocols</div>
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
