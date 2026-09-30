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
} from "lucide-react";
import { SITE_NAME, IMAGES } from "@/data/siteData";

export const metadata: Metadata = {
  title: "About Dr. Anil Pandey | Medical Background & Clinical Profile",
  description:
    "Learn about Dr. Anil Pandey's medical background, clinical qualifications, professional experience, and patient-centered healthcare approach.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Full-Width Hero Banner */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-950/85 border border-brand-400/50 text-brand-200 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>Professional Profile &amp; Clinical Background</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-lg [text-shadow:_0_2px_12px_rgba(0,0,0,0.8)]">
              About {SITE_NAME}
            </h1>
            <p className="text-base sm:text-xl text-brand-100/95 leading-relaxed drop-shadow-md font-medium [text-shadow:_0_1px_6px_rgba(0,0,0,0.7)]">
              Dedicated to delivering clinical excellence, patient-focused
              evaluations, and comprehensive medical management founded upon
              proven scientific principles and continuous professional growth.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Profile Introduction (Large Image + 3-5 Paragraphs) */}
      <section className="py-20 lg:py-28 bg-white border-b border-brand-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Large Professional Image */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 space-y-6">
                <div className="relative rounded-2xl overflow-hidden bg-brand-950 border-2 border-brand-300 shadow-2xl">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={IMAGES.aboutConsultation}
                      alt={`Clinical Practice of ${SITE_NAME}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-transparent to-transparent" />
                  </div>
                  <div className="p-6 bg-brand-950 border-t border-brand-800 text-white space-y-2">
                    <h3 className="text-xl font-bold text-white">
                      {SITE_NAME}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                      [Designation / Medical Field / Specialty]
                    </p>
                    <p className="text-xs text-brand-200/80">
                      [Hospital Affiliation, Department Lead &amp; Chamber Details]
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-brand-50/80 border border-brand-200 space-y-2 text-xs text-zinc-700">
                  <div className="font-bold text-brand-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-brand-700" />
                    <span>Verified Medical Practice</span>
                  </div>
                  <p>
                    Registrations, board licenses, and institutional credentials
                    are maintained in full compliance with healthcare regulatory
                    authorities.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Detailed Introduction Narrative */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" />
                  <span>Clinical Biography</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-brand-950">
                  A Career Dedicated to Healthcare Excellence
                </h2>
                <div className="space-y-4 text-base sm:text-lg text-zinc-600 leading-relaxed">
                  <p>
                    Dr. Anil Pandey has built a reputable medical practice
                    centered on clinical precision, deep empathy, and the highest
                    standards of patient safety. Over his medical career, Dr. Pandey
                    has prioritized meticulous diagnostic evaluations, preventive
                    healthcare roadmaps, and detailed patient counseling.
                  </p>
                  <p>
                    [Detailed biography placeholder: Insert Dr. Anil Pandey&apos;s
                    personal clinical philosophy, formative medical background,
                    specialized sub-disciplines, and ongoing hospital or research
                    commitments here.]
                  </p>
                  <p>
                    Whether addressing complex diagnostics or routine clinical
                    consultations, Dr. Pandey collaborates transparently with patients
                    to ensure complete clarity regarding symptoms, test investigations,
                    and personalized treatment options.
                  </p>
                  <p>
                    By combining cutting-edge clinical evidence with an approachable
                    consultation environment, Dr. Pandey aims to build long-term
                    health partnerships that foster genuine patient wellbeing.
                  </p>
                </div>
              </div>

              {/* Highlights Feature Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-100">
                <div className="p-4 rounded-xl bg-brand-50/70 border border-brand-100 space-y-1">
                  <div className="text-xs font-bold text-brand-800 uppercase tracking-wider">Clinical Philosophy</div>
                  <div className="text-sm font-bold text-brand-950">Evidence-Guided Decisions</div>
                  <p className="text-xs text-zinc-600">Rooted in proven medical literature and modern diagnostics.</p>
                </div>
                <div className="p-4 rounded-xl bg-brand-50/70 border border-brand-100 space-y-1">
                  <div className="text-xs font-bold text-brand-800 uppercase tracking-wider">Patient Engagement</div>
                  <div className="text-sm font-bold text-brand-950">Transparent Care Dialogue</div>
                  <p className="text-xs text-zinc-600">Clear explanations of medical findings and therapeutic choices.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Professional Journey Timeline */}
      <section className="py-20 lg:py-28 bg-brand-50/40 border-b border-brand-100/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-brand-100 text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200">
              Career Timeline
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-950">
              Professional Journey &amp; Milestones
            </h2>
            <p className="text-zinc-600 text-base">
              Chronological summary of clinical positions, hospital consultancies, and academic appointments.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Timeline Milestones */}
            <div className="lg:col-span-7">
              <div className="relative border-l-2 border-brand-300 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-10">
                {IMAGES.timeline.map((item, index) => (
                  <div key={index} className="relative group">
                    <span className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-5 h-5 rounded-full bg-brand-800 border-4 border-white shadow-md group-hover:bg-brand-600 transition-colors" />
                    <div className="inline-block px-3 py-1 rounded-md bg-brand-100 text-brand-900 text-xs font-bold mb-2">
                      {item.period}
                    </div>
                    <h3 className="text-xl font-bold text-brand-950 group-hover:text-brand-800 transition-colors">
                      {item.role}
                    </h3>
                    <div className="text-xs font-semibold text-brand-700 mt-0.5 mb-2 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>{item.organization}</span>
                    </div>
                    <p className="text-sm text-zinc-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hospital Facility Photo */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden bg-brand-950 border-2 border-brand-300 shadow-xl">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={IMAGES.hospitalCorridor}
                    alt="Clinical Facility"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-transparent to-transparent" />
                </div>
                <div className="p-5 bg-brand-950 text-white space-y-2">
                  <div className="font-bold text-base">Institutional Excellence</div>
                  <p className="text-xs text-brand-200/80">
                    Clinical appointments and hospital chamber consultations adhere to premier medical standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Qualifications & Background Section */}
      <section className="py-20 lg:py-28 bg-white border-b border-brand-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-brand-100 text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200">
              Academic Background
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-950">
              Qualifications &amp; Certifications
            </h2>
            <p className="text-zinc-600 text-base">
              Medical degrees, board certifications, and specialized clinical fellowships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-brand-50/40 rounded-2xl p-7 border border-brand-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center text-brand-800">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-brand-600 uppercase tracking-wider">
                Primary Medical Degree
              </div>
              <h3 className="text-xl font-bold text-brand-950">
                MBBS / Primary Qualification
              </h3>
              <p className="text-xs text-zinc-500 font-medium">
                [University / Medical College Placeholder, Year]
              </p>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Foundational clinical training, general medicine rotations, and acute patient care.
              </p>
            </div>

            <div className="bg-brand-50/40 rounded-2xl p-7 border border-brand-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center text-brand-800">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-brand-600 uppercase tracking-wider">
                Postgraduate Degree
              </div>
              <h3 className="text-xl font-bold text-brand-950">
                MD / MS / Specialization
              </h3>
              <p className="text-xs text-zinc-500 font-medium">
                [Postgraduate Institution Placeholder, Year]
              </p>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Specialized clinical residency, advanced diagnostic pathology, and inpatient management.
              </p>
            </div>

            <div className="bg-brand-50/40 rounded-2xl p-7 border border-brand-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center text-brand-800">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-brand-600 uppercase tracking-wider">
                Fellowship &amp; Board
              </div>
              <h3 className="text-xl font-bold text-brand-950">
                Clinical Fellowship / DNB
              </h3>
              <p className="text-xs text-zinc-500 font-medium">
                [National / International Board Placeholder]
              </p>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Advanced credentialing in targeted diagnostic procedures and specialized patient care protocols.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Areas of Expertise / Focus (Multiple Image-Supported Blocks) */}
      <section className="py-20 lg:py-28 bg-brand-50/40 border-b border-brand-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-brand-100 text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200">
              Specialized Care
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-950">
              Areas of Clinical Focus &amp; Expertise
            </h2>
            <p className="text-zinc-600 text-base">
              Explore specialized healthcare consulting disciplines delivered with precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group rounded-2xl overflow-hidden bg-white border border-brand-200 shadow-md hover:shadow-xl transition-all">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-950">
                <Image
                  src={IMAGES.diagnosticClinic}
                  alt="Clinical Diagnostics"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white font-bold text-lg">
                  Clinical Diagnostics &amp; Investigative Reviews
                </div>
              </div>
              <div className="p-6 space-y-3">
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Systematic medical history evaluation, physical assessments, and correlation of lab diagnostics for accurate baseline understanding.
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-brand-800">
                  <Activity className="w-4 h-4" />
                  <span>Comprehensive Diagnostic Protocols</span>
                </div>
              </div>
            </div>

            <div className="group rounded-2xl overflow-hidden bg-white border border-brand-200 shadow-md hover:shadow-xl transition-all">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-950">
                <Image
                  src={IMAGES.patientCare}
                  alt="Patient Centered Care"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white font-bold text-lg">
                  Personalized Disease Management &amp; Preventive Guidance
                </div>
              </div>
              <div className="p-6 space-y-3">
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Tailored management plans designed to address chronic condition monitoring, lifestyle adjustments, and therapeutic goals.
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-brand-800">
                  <HeartPulse className="w-4 h-4" />
                  <span>Evidence-Based Long-Term Outcomes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Professional Philosophy (Full-Width Photo Banner with Text Overlay) */}
      <section className="relative py-24 lg:py-32 overflow-hidden text-white">
        <div className="absolute inset-0 -z-30 w-full h-full">
          <Image
            src={IMAGES.aboutPhilosophy}
            alt="Healthcare Practice Philosophy"
            fill
            sizes="100vw"
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div
          className="absolute inset-0 -z-20 bg-gradient-to-r from-brand-950/92 via-brand-950/80 to-brand-900/60"
          aria-hidden="true"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-900/90 border border-brand-500/50 text-brand-200 text-xs sm:text-sm font-semibold backdrop-blur-md">
            <HeartPulse className="w-3.5 h-3.5 text-emerald-300" />
            <span>Guiding Clinical Philosophy</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight drop-shadow-md">
            &ldquo;Healthcare thrives when clinical precision meets genuine empathy.&rdquo;
          </h2>

          <p className="text-base sm:text-lg text-brand-100/90 leading-relaxed drop-shadow-sm font-normal max-w-2xl mx-auto">
            Every patient brings a unique medical narrative. True healing occurs
            when medical expertise is paired with dedicated listening, transparent
            explanations, and collaborative health roadmapping.
          </p>
        </div>
      </section>

      {/* 7. Why Patients Value the Approach (Large Image + Principles) */}
      <section className="py-20 lg:py-28 bg-white border-b border-brand-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Large Visual Photo */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden bg-brand-950 border-2 border-brand-300 shadow-xl">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={IMAGES.aboutWhyValue}
                    alt="Doctor Patient Healthcare Collaboration"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-transparent to-transparent" />
                </div>
                <div className="p-5 bg-brand-950 text-white flex items-center justify-between">
                  <div className="font-bold text-sm">Patient-Centric Trust</div>
                  <span className="text-xs text-emerald-300 font-medium">Ethical Practice</span>
                </div>
              </div>
            </div>

            {/* Right: 4 Value Principles */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-brand-100 text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200">
                Core Value
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-brand-950">
                Why Patients Value {SITE_NAME}&apos;s Clinical Practice
              </h2>

              <p className="text-base text-zinc-600 leading-relaxed">
                Patient satisfaction is rooted in clear communication, clinical
                thoroughness, and an environment of mutual trust.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-brand-50/60 border border-brand-100 flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-base font-bold text-brand-950">Attentive Clinical Listening</h3>
                    <p className="text-xs text-zinc-600 mt-0.5">Unrushed consultations where questions and concerns are addressed in detail.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-brand-50/60 border border-brand-100 flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-base font-bold text-brand-950">Evidence-Backed Treatment Roadmaps</h3>
                    <p className="text-xs text-zinc-600 mt-0.5">Clear therapeutic pathways aligned with modern medical guidelines.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-brand-50/60 border border-brand-100 flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-base font-bold text-brand-950">Confidential &amp; Supportive Environment</h3>
                    <p className="text-xs text-zinc-600 mt-0.5">Complete discretion and empathetic bedside manner for all patient visits.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Final CTA (Background Photo + Green Overlay) */}
      <section className="relative py-20 lg:py-24 overflow-hidden text-white">
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
          className="absolute inset-0 -z-20 bg-gradient-to-r from-brand-950/30 via-brand-950/20 to-brand-950/15"
          aria-hidden="true"
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-md">
            Schedule a Consultation with {SITE_NAME}
          </h2>
          <p className="text-base sm:text-lg text-brand-100 max-w-xl mx-auto drop-shadow-sm font-normal">
            Take a proactive step toward personalized healthcare today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <Link
              href="/appointment"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-brand-950 font-bold text-base shadow-xl hover:bg-brand-50 transition-colors"
            >
              <Calendar className="w-5 h-5 text-brand-800" />
              <span>Book an Appointment</span>
            </Link>
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-900/90 border border-brand-400/60 text-white font-semibold text-base hover:bg-brand-800 transition-colors shadow-lg"
            >
              <span>Consultation Booking</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
