import React from "react";
import Image from "next/image";
import { Clock, GraduationCap, Activity, Award } from "lucide-react";
import { HIGHLIGHTS_DATA } from "@/data/siteData";

export default function ProfessionalHighlights() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Clock":
        return <Clock className="w-5 h-5 text-white" />;
      case "GraduationCap":
        return <GraduationCap className="w-5 h-5 text-white" />;
      case "Activity":
        return <Activity className="w-5 h-5 text-white" />;
      case "Award":
        return <Award className="w-5 h-5 text-white" />;
      default:
        return <Award className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-brand-50/60 border-b border-brand-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-brand-100 text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200">
            Professional Overview
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-950">
            Professional Highlights &amp; Practice Credentials
          </h2>
          <p className="text-base text-zinc-600">
            A snapshot of clinical standards, comprehensive medical education,
            and commitment to ongoing healthcare advancement.
          </p>
        </div>

        {/* Highlight Cards Grid with Realistic Clinical Photography */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HIGHLIGHTS_DATA.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl bg-white border border-brand-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-brand-400 hover:-translate-y-1.5 flex flex-col overflow-hidden"
            >
              {/* Card Image Header */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-950">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/40 to-transparent" />

                {/* Floating Metric & Icon */}
                <div className="absolute top-3 right-3">
                  {item.metric && (
                    <span className="px-2.5 py-1 rounded-full bg-brand-900/90 text-brand-200 font-bold text-xs border border-brand-500/50 backdrop-blur-sm shadow">
                      {item.metric}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-brand-800/90 border border-brand-500/60 flex items-center justify-center backdrop-blur-sm shadow">
                    {getIcon(item.iconName)}
                  </div>
                  <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-brand-950 mb-2 group-hover:text-brand-800 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-100 text-xs text-brand-700 font-medium flex items-center gap-1.5">
                  <span>[Editable Credentials Area]</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
