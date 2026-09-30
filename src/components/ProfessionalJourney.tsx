import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Building2, Calendar, ArrowRight, ShieldCheck } from "lucide-react";
import { IMAGES } from "@/data/siteData";

export default function ProfessionalJourney() {
  return (
    <section className="py-20 lg:py-28 bg-brand-50/50 border-b border-brand-100/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-brand-100 text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200">
            Career Timeline
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-950">
            Professional Journey &amp; Experience
          </h2>
          <p className="text-base sm:text-lg text-zinc-600">
            A track record of clinical leadership, hospital consultancies, and
            steadfast commitment to patient welfare.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Timeline Milestones */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative border-l-2 border-brand-300 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-10">
              {IMAGES.timeline.map((item, index) => (
                <div key={index} className="relative group">
                  {/* Timeline Dot */}
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

                  <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 pl-4 sm:pl-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-800 hover:text-brand-950 underline decoration-brand-400 decoration-2 underline-offset-4"
              >
                <span>View Full Academic &amp; Clinical Background</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Hospital / Medical Facility Image Feature Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden bg-brand-950 border-2 border-brand-300 shadow-2xl">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={IMAGES.hospitalCorridor}
                  alt="Modern Hospital and Clinical Facility"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-950/30 to-transparent" />
              </div>

              <div className="p-6 bg-brand-950 text-white space-y-3">
                <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Clinical Standard of Care</span>
                </div>
                <h4 className="text-lg font-bold">
                  Committed to Healthcare Integrity
                </h4>
                <p className="text-xs text-brand-200/90 leading-relaxed">
                  Hospital affiliations, chamber consultancies, and digital sessions
                  are conducted with unwavering adherence to regulatory standards and patient privacy.
                </p>
                <div className="pt-2 border-t border-brand-800">
                  <Link
                    href="/appointment"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-brand-800 hover:bg-brand-700 text-white text-xs font-bold transition-colors shadow"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book an In-Clinic Appointment</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
