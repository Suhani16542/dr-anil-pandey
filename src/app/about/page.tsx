import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  CheckCircle2,
  Calendar,
  Sparkles,
  BookOpen,
  ShieldCheck,
  Building2,
  HeartPulse,
  Activity,
  ArrowRight,
  Award,
  Clock,
  Stethoscope,
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { SITE_NAME, IMAGES } from "@/data/siteData";

export const metadata: Metadata = {
  title: "About Dr. Anil Pandey | Medical Background & Clinical Profile",
  description:
    "Learn about Dr. Anil Pandey's medical background, clinical qualifications, professional experience, and patient-centered healthcare approach.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Compact Hero Banner Matching Home Page */}
      <section className="relative py-12 sm:py-14 lg:py-16 overflow-hidden flex items-center">
        <div className="absolute inset-0 -z-30 w-full h-full">
          <Image
            src={IMAGES.heroBg}
            alt="Medical Consultation Practice"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div
          className="absolute inset-0 -z-20 bg-gradient-to-r from-brand-950/80 via-brand-950/60 to-brand-900/40"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white w-full">
          <div className="max-w-3xl space-y-3 sm:space-y-3.5">
            <ScrollReveal animation="fade-down" delay={50}>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-950/80 border border-brand-400/40 text-brand-100 text-xs font-semibold tracking-wide backdrop-blur-md shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse-ring" />
                <Sparkles className="w-3 h-3 text-brand-300" />
                <span>Professional Profile &amp; Clinical Leadership</span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={120}>
              <h1 className="text-2xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-white leading-tight [text-shadow:_0_2px_12px_rgba(0,0,0,0.85)]">
                About {SITE_NAME}
              </h1>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={180}>
              <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-medium max-w-2xl [text-shadow:_0_1px_6px_rgba(0,0,0,0.75)]">
                Dedicated to delivering clinical excellence, patient-focused evaluations, and comprehensive medical management founded upon proven scientific principles.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. Editorial Biography Section (Image Left + Story Right) */}
      <section className="py-12 sm:py-16 bg-white border-b border-brand-100/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left: Professional Doctor Portrait */}
            <div className="lg:col-span-5">
              <ScrollReveal animation="fade-right" delay={100}>
                <div className="relative mx-auto max-w-md lg:max-w-none group">
                  <div className="relative rounded-2xl overflow-hidden bg-brand-950 border border-brand-200/90 shadow-lg">
                    <div className="relative aspect-[4/3] sm:aspect-[5/4] w-full overflow-hidden">
                      <Image
                        src={IMAGES.aboutConsultation}
                        alt={`Clinical Practice of ${SITE_NAME}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/20 to-transparent" />
                    </div>

                    <div className="p-4 bg-brand-950 border-t border-brand-800 text-white flex items-center justify-between">
                      <div>
                        <div className="font-bold text-sm sm:text-base">{SITE_NAME}</div>
                        <div className="text-[11px] text-brand-300 mt-0.5 font-medium">
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
                        <span>Verified Practice</span>
                      </div>
                      <div className="text-[10px] text-zinc-500 font-medium">Board Certified &amp; Licensed</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Detailed Introduction Narrative */}
            <div className="lg:col-span-7 space-y-4 pt-4 lg:pt-0">
              <ScrollReveal animation="fade-left" delay={150}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-600" />
                  <span>Clinical Biography</span>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-left" delay={200}>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-950 leading-tight">
                  A Career Dedicated to <span className="text-brand-600">Healthcare Excellence</span>
                </h2>
              </ScrollReveal>

              <ScrollReveal animation="fade-left" delay={250}>
                <div className="space-y-2.5 text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                  <p>
                    Dr. Anil Pandey has built a reputable medical practice centered on clinical precision, deep empathy, and the highest standards of patient safety. Over his career, Dr. Pandey has prioritized meticulous diagnostic evaluations, preventive healthcare roadmaps, and detailed patient counseling.
                  </p>
                  <p>
                    Whether addressing complex diagnostics or routine clinical consultations, Dr. Pandey collaborates transparently with patients to ensure complete clarity regarding symptoms, test investigations, and personalized treatment options.
                  </p>
                  <p>
                    By combining cutting-edge clinical evidence with an approachable consultation environment, Dr. Pandey aims to build long-term health partnerships that foster genuine patient wellbeing.
                  </p>
                </div>
              </ScrollReveal>

              {/* Highlights Feature Bar */}
              <ScrollReveal animation="fade-up" delay={300}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-brand-50 border border-brand-200 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-600" />
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-brand-950 block">Evidence-Guided Decisions</span>
                      <span className="text-[11px] text-zinc-500">Rooted in proven medical literature and modern diagnostics</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-brand-50 border border-brand-200 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-600" />
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-brand-950 block">Transparent Care Dialogue</span>
                      <span className="text-[11px] text-zinc-500">Clear explanations of medical findings &amp; choices</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Action Buttons */}
              <ScrollReveal animation="fade-up" delay={350}>
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <Link
                    href="/appointment"
                    className="inline-flex items-center justify-center gap-1.5 px-4.5 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all hover:shadow-md hover:-translate-y-0.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Appointment</span>
                  </Link>
                  <Link
                    href="/consultation"
                    className="inline-flex items-center justify-center gap-1.5 px-4.5 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-white hover:bg-brand-50 text-brand-900 font-semibold text-xs sm:text-sm border border-brand-200 shadow-2xs transition-colors hover:border-accent-300"
                  >
                    <span>Consultation Booking</span>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Qualifications & Academic Background */}
      <section className="py-12 sm:py-16 bg-slate-50/70 border-b border-brand-100/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10 sm:mb-12">
            <ScrollReveal animation="fade-down" delay={50}>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-600 animate-pulse-ring" />
                Academic Background
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-up" delay={120}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-950">
                Qualifications &amp; Certifications
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={180}>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Medical degrees, board certifications, and specialized clinical fellowships.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="bg-white rounded-xl p-5 border border-brand-200/90 shadow-2xs flex flex-col justify-between h-full card-interactive">
                <div className="space-y-2.5">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-700">
                    <GraduationCap className="w-4 h-4 text-accent-600" />
                  </div>
                  <div className="text-[10px] font-bold text-accent-700 uppercase tracking-wider">
                    Primary Medical Degree
                  </div>
                  <h3 className="text-base font-bold text-brand-950">
                    MBBS / Primary Qualification
                  </h3>
                  <p className="text-[11px] text-zinc-500 font-medium">
                    [Recognized Medical University / College]
                  </p>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Foundational clinical training, general medicine rotations, and acute patient care.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <div className="bg-white rounded-xl p-5 border border-brand-200/90 shadow-2xs flex flex-col justify-between h-full card-interactive">
                <div className="space-y-2.5">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-700">
                    <GraduationCap className="w-4 h-4 text-accent-600" />
                  </div>
                  <div className="text-[10px] font-bold text-accent-700 uppercase tracking-wider">
                    Postgraduate Specialization
                  </div>
                  <h3 className="text-base font-bold text-brand-950">
                    MD / MS / Specialization
                  </h3>
                  <p className="text-[11px] text-zinc-500 font-medium">
                    [Postgraduate Medical Institution]
                  </p>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Specialized clinical residency, advanced diagnostic pathology, and inpatient management.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={300}>
              <div className="bg-white rounded-xl p-5 border border-brand-200/90 shadow-2xs flex flex-col justify-between h-full card-interactive">
                <div className="space-y-2.5">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-700">
                    <GraduationCap className="w-4 h-4 text-accent-600" />
                  </div>
                  <div className="text-[10px] font-bold text-accent-700 uppercase tracking-wider">
                    Fellowship &amp; Board
                  </div>
                  <h3 className="text-base font-bold text-brand-950">
                    Clinical Fellowship / DNB
                  </h3>
                  <p className="text-[11px] text-zinc-500 font-medium">
                    [National / International Medical Board]
                  </p>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Advanced credentialing in targeted diagnostic procedures and specialized patient care protocols.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. Professional Journey Timeline */}
      <section className="py-12 sm:py-16 bg-white border-b border-brand-100/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10 sm:mb-14">
            <ScrollReveal animation="fade-down" delay={50}>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-600 animate-pulse-ring" />
                Career Timeline
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-up" delay={120}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-950">
                Professional Journey &amp; Milestones
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={180}>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Chronological summary of clinical positions, hospital consultancies, and academic appointments.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Timeline Milestones */}
            <div className="lg:col-span-7 space-y-6">
              <div className="relative border-l-2 border-brand-300 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-7">
                {IMAGES.timeline.map((item, index) => (
                  <ScrollReveal
                    key={index}
                    animation="fade-right"
                    delay={index * 120}
                  >
                    <div className="relative group">
                      <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-brand-600 border-2 border-white shadow-xs group-hover:bg-accent-600 transition-colors flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      </span>

                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-brand-100 text-brand-900 text-[11px] font-bold mb-1 border border-brand-200/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-600" />
                        <span>{item.period}</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-brand-950 group-hover:text-brand-700 transition-colors">
                        {item.role}
                      </h3>

                      <div className="text-xs font-semibold text-brand-700 mt-0.5 mb-1.5 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-accent-600" />
                        <span>{item.organization}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Hospital Facility Photo */}
            <div className="lg:col-span-5">
              <ScrollReveal animation="fade-left" delay={200}>
                <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden bg-brand-950 border border-brand-200 shadow-xl group">
                  <div className="relative aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={IMAGES.hospitalCorridor}
                      alt="Clinical Facility"
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-950/30 to-transparent" />
                  </div>
                  <div className="p-4 sm:p-5 bg-brand-950 text-white space-y-2">
                    <div className="font-bold text-sm sm:text-base">Institutional Excellence</div>
                    <p className="text-xs text-brand-200/90 leading-relaxed">
                      Clinical appointments and hospital chamber consultations adhere to premier medical standards.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Areas of Expertise / Clinical Focus (2-Column Visual Cards) */}
      <section className="py-12 sm:py-16 bg-slate-50/70 border-b border-brand-100/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <ScrollReveal animation="fade-down" delay={50}>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-600" />
                <span>Specialized Care</span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={120}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-950">
                Areas of Clinical Focus &amp; Expertise
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={180}>
              <p className="text-xs sm:text-sm text-zinc-600">
                Explore specialized healthcare consulting disciplines delivered with precision.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal animation="fade-right" delay={150}>
              <div className="group rounded-2xl overflow-hidden bg-white border border-brand-200 shadow-xs hover:shadow-md transition-all">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-950">
                  <Image
                    src={IMAGES.diagnosticClinic}
                    alt="Clinical Diagnostics"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white font-bold text-sm sm:text-base">
                    Clinical Diagnostics &amp; Case Reviews
                  </div>
                </div>
                <div className="p-5 space-y-2.5">
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    Systematic medical history evaluation, physical assessments, and correlation of lab diagnostics for accurate baseline understanding.
                  </p>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-accent-700">
                    <Activity className="w-3.5 h-3.5 text-accent-600" />
                    <span>Comprehensive Diagnostic Protocols</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={200}>
              <div className="group rounded-2xl overflow-hidden bg-white border border-brand-200 shadow-xs hover:shadow-md transition-all">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-950">
                  <Image
                    src={IMAGES.patientCare}
                    alt="Patient Centered Care"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white font-bold text-sm sm:text-base">
                    Disease Management &amp; Preventive Care
                  </div>
                </div>
                <div className="p-5 space-y-2.5">
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    Tailored management plans designed to address chronic condition monitoring, lifestyle adjustments, and therapeutic goals.
                  </p>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-accent-700">
                    <HeartPulse className="w-3.5 h-3.5 text-accent-600" />
                    <span>Evidence-Based Long-Term Outcomes</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 6. Compact Final CTA Matching Home Page */}
      <section className="relative py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 -z-30 w-full h-full">
          <Image
            src={IMAGES.finalCtaBg}
            alt="Consultation Facility"
            fill
            sizes="100vw"
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div
          className="absolute inset-0 -z-20 bg-gradient-to-r from-brand-950/40 via-brand-950/30 to-brand-950/20"
          aria-hidden="true"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 relative z-10 text-white">
          <ScrollReveal animation="fade-down" delay={50}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-900/90 border border-brand-500/50 text-brand-200 text-xs font-semibold backdrop-blur-md shadow-md">
              <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse-ring" />
              <Clock className="w-3.5 h-3.5 text-accent-400" />
              <span>Appointments Available This Week</span>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={120}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white drop-shadow-md leading-tight">
              Schedule a Consultation with {SITE_NAME}
            </h2>
            <p className="text-xs sm:text-sm text-brand-100 max-w-xl mx-auto leading-relaxed drop-shadow-sm font-normal mt-2">
              Take a proactive step toward personalized healthcare today.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
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
                <span>Consultation Booking</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
