import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Building2, Calendar, ArrowRight, ShieldCheck, MapPin } from "lucide-react";
import ScrollReveal from "./animations/ScrollReveal";
import { IMAGES } from "@/data/siteData";

export default function ProfessionalJourney() {
  return (
    <section className="py-12 sm:py-16 bg-slate-50/70 border-b border-brand-100/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10 sm:mb-14">
          <ScrollReveal animation="fade-down" delay={50}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-600 animate-pulse-ring" />
              Career Timeline
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="fade-up" delay={120}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-950">
              Professional Journey &amp; Experience
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={180}>
            <p className="text-sm sm:text-base text-zinc-600">
              A track record of clinical leadership, hospital consultancies, and steadfast commitment to patient welfare.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Sleek Vertical Timeline */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative border-l-2 border-brand-300 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-7">
              {IMAGES.timeline.map((item, index) => (
                <ScrollReveal
                  key={index}
                  animation="fade-right"
                  delay={index * 120}
                >
                  <div className="relative group">
                    {/* Teal & Red Pulse Timeline Marker */}
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

            <ScrollReveal animation="fade-up" delay={350}>
              <div className="pt-2 pl-3 sm:pl-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-accent-700 hover:text-accent-800 underline decoration-accent-400 decoration-1 underline-offset-4"
                >
                  <span>View Full Academic &amp; Clinical Background</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Hospital / Medical Facility Image Feature Card */}
          <div className="lg:col-span-5">
            <ScrollReveal animation="fade-left" delay={200}>
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden bg-brand-950 border border-brand-200 shadow-xl group">
                <div className="relative aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={IMAGES.hospitalCorridor}
                    alt="Modern Hospital and Clinical Facility"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-950/30 to-transparent" />
                </div>

                <div className="p-4 sm:p-5 bg-brand-950 text-white space-y-2.5">
                  <div className="flex items-center gap-1.5 text-accent-400 text-xs font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Clinical Standard of Care</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold">
                    Committed to Healthcare Integrity
                  </h4>
                  <p className="text-xs text-brand-200/90 leading-relaxed">
                    Hospital affiliations, chamber consultancies, and digital sessions
                    are conducted with unwavering adherence to regulatory standards and patient privacy.
                  </p>
                  <div className="pt-2 border-t border-brand-800/80">
                    <Link
                      href="/appointment"
                      className="inline-flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-colors shadow-xs border border-brand-400/40"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book an In-Clinic Appointment</span>
                    </Link>
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
