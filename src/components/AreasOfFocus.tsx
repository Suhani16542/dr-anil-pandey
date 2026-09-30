import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Sparkles, Calendar } from "lucide-react";
import { IMAGES } from "@/data/siteData";

export default function AreasOfFocus() {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-brand-100/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-brand-100 text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200">
            Clinical Focus &amp; Services
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-950">
            Areas of Professional Focus
          </h2>
          <p className="text-base sm:text-lg text-zinc-600">
            Specialized consultation domains structured to deliver precise medical
            evaluations, personalized care pathways, and comprehensive second opinions.
          </p>
        </div>

        {/* Editorial Layout: Alternating Large Photo + Text Blocks */}
        <div className="space-y-16 lg:space-y-24">
          {IMAGES.focusAreas.map((area, index) => {
            const isEven = index % 2 === 1;
            return (
              <div
                key={area.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
              >
                {/* Image Column */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="relative rounded-2xl overflow-hidden bg-brand-950 border-2 border-brand-200/80 shadow-xl group">
                    <div className="relative aspect-[16/11] w-full overflow-hidden">
                      <Image
                        src={area.image}
                        alt={area.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent" />
                    </div>

                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3.5 py-1 rounded-full bg-brand-950/90 text-emerald-300 font-bold text-xs border border-brand-500/50 backdrop-blur-md shadow">
                        {area.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="text-xs text-brand-300 font-medium">Focus Domain 0{index + 1}</div>
                      <div className="text-base font-bold drop-shadow-sm">{area.title}</div>
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div
                  className={`lg:col-span-6 space-y-5 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                    <span>Clinical Specialty Overview</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-brand-950 leading-tight">
                    {area.title}
                  </h3>

                  <p className="text-base text-zinc-600 leading-relaxed">
                    {area.description}
                  </p>

                  {/* Bullet Points */}
                  <div className="space-y-2.5 pt-1">
                    {area.points.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-zinc-800">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action Link */}
                  <div className="pt-3">
                    <Link
                      href="/appointment"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-800 hover:bg-brand-900 text-white text-sm font-semibold shadow-md transition-all hover:shadow-lg"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book Consultation for this Focus Area</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
