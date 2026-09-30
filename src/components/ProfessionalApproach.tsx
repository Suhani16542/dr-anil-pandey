import React from "react";
import Image from "next/image";
import {
  HeartPulse,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { APPROACH_ITEMS, SITE_NAME } from "@/data/siteData";

export default function ProfessionalApproach() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "HeartPulse":
        return <HeartPulse className="w-5 h-5 text-white" />;
      case "CheckCircle2":
        return <CheckCircle2 className="w-5 h-5 text-white" />;
      case "MessageSquare":
        return <MessageSquare className="w-5 h-5 text-white" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-white" />;
      default:
        return <Stethoscope className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-brand-50/50 border-b border-brand-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-brand-100 text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200">
            Clinical Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-950">
            Why Choose {SITE_NAME}&apos;s Professional Practice
          </h2>
          <p className="text-base text-zinc-600">
            A patient-focused approach grounded in clinical rigor, ethical
            standards, and attentive personal care.
          </p>
        </div>

        {/* 4 Pillars Grid with Real Photographic Headers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {APPROACH_ITEMS.map((item, index) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-brand-200/80 shadow-sm hover:border-brand-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col overflow-hidden"
            >
              {/* Photo Header */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-950">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/30 to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-950/80 text-emerald-300 font-bold text-xs border border-brand-600/50 backdrop-blur-sm">
                    Pillar 0{index + 1}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-800/90 border border-brand-500/60 flex items-center justify-center backdrop-blur-sm shadow">
                    {getIcon(item.iconName)}
                  </div>
                  <span className="text-xs font-semibold text-white">
                    {item.title}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-zinc-100 text-[11px] text-zinc-400 font-mono">
                  [Clinical Standard]
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
