import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Sparkles, Calendar, ArrowRight } from "lucide-react";
import ScrollReveal from "./animations/ScrollReveal";
import { IMAGES } from "@/data/siteData";

export default function AreasOfFocus() {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-brand-100/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10 sm:mb-14">
          <ScrollReveal animation="fade-down" delay={50}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-600 animate-pulse-ring" />
              Clinical Focus &amp; Services
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="fade-up" delay={120}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-950">
              Areas of Professional Focus
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={180}>
            <p className="text-sm sm:text-base text-zinc-600">
              Specialized consultation domains structured to deliver precise medical
              evaluations, personalized care pathways, and comprehensive second opinions.
            </p>
          </ScrollReveal>
        </div>

        {/* Alternating Editorial Presentation: Seamless Rows */}
        <div className="space-y-12 sm:space-y-16">
          {IMAGES.focusAreas.map((area, index) => {
            const isEven = index % 2 === 1;
            return (
              <ScrollReveal
                key={area.id}
                animation={isEven ? "fade-left" : "fade-right"}
                delay={index * 100}
              >
                <div
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-2 group"
                >
                  {/* Image Column */}
                  <div
                    className={`lg:col-span-5 ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="relative rounded-2xl overflow-hidden bg-brand-950 border border-brand-200 shadow-md">
                      <div className="relative aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden">
                        <Image
                          src={area.image}
                          alt={area.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent" />
                      </div>

                      {/* Floating Badge */}
                      <div className="absolute top-3.5 left-3.5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-950/90 text-brand-200 font-bold text-xs border border-brand-500/50 backdrop-blur-md shadow">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                          {area.badge}
                        </span>
                      </div>

                      <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                        <div className="text-[11px] text-brand-300 font-medium">Domain 0{index + 1}</div>
                        <div className="text-sm sm:text-base font-bold drop-shadow-sm">{area.title}</div>
                      </div>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div
                    className={`lg:col-span-7 space-y-3.5 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-700 uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-accent-600" />
                      <span>{area.badge}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-brand-950 leading-snug">
                      {area.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      {area.description}
                    </p>

                    {/* Bullet Points */}
                    <div className="space-y-2 pt-1">
                      {area.points.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-accent-600 shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm font-medium text-zinc-800">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Compact CTA */}
                    <div className="pt-3">
                      <Link
                        href="/appointment"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-all hover:shadow-md hover:-translate-y-0.5"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Consultation for this Area</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
