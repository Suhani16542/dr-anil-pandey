import React from "react";
import Image from "next/image";
import { Clock, GraduationCap, Activity, Award, ArrowUpRight } from "lucide-react";
import ScrollReveal from "./animations/ScrollReveal";
import { HIGHLIGHTS_DATA } from "@/data/siteData";

export default function ProfessionalHighlights() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Clock":
        return <Clock className="w-4 h-4 text-white" />;
      case "GraduationCap":
        return <GraduationCap className="w-4 h-4 text-white" />;
      case "Activity":
        return <Activity className="w-4 h-4 text-white" />;
      case "Award":
        return <Award className="w-4 h-4 text-white" />;
      default:
        return <Award className="w-4 h-4 text-white" />;
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-50/80 border-b border-brand-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10 sm:mb-12">
          <ScrollReveal animation="fade-down" delay={50}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-600 animate-pulse-ring" />
              Practice Credentials &amp; Standards
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="fade-up" delay={120}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-950">
              Clinical Highlights &amp; Qualifications
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={180}>
            <p className="text-sm sm:text-base text-zinc-600">
              High standards of medical education, specialized certifications, and consistent dedication to healthcare quality.
            </p>
          </ScrollReveal>
        </div>

        {/* Visual Clinical Gallery Layout (2x2 Asymmetric & Clean) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {HIGHLIGHTS_DATA.map((item, index) => (
            <ScrollReveal
              key={item.id}
              animation="fade-up"
              delay={index * 120}
            >
              <div className="group relative rounded-2xl bg-white border border-brand-200/90 shadow-xs overflow-hidden flex flex-col sm:flex-row items-stretch hover:shadow-md transition-all duration-300">
                {/* Visual Image Block */}
                <div className="relative sm:w-2/5 aspect-[16/10] sm:aspect-auto min-h-[160px] overflow-hidden bg-brand-950 shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-brand-950/85 via-brand-950/30 to-transparent" />

                  {/* Icon on Image */}
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-accent-600/90 border border-accent-400/60 flex items-center justify-center backdrop-blur-sm shadow-xs">
                    {getIcon(item.iconName)}
                  </div>

                  {item.metric && (
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-brand-950/90 text-brand-200 font-bold text-xs border border-brand-500/50 backdrop-blur-md shadow">
                        {item.metric}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Block */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-[10px] font-bold text-accent-700 uppercase tracking-wider block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-brand-950 group-hover:text-brand-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-600 leading-relaxed mt-1.5">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                      Verified Standard
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-brand-600 transition-colors" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
