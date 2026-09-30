"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Video, Volume2, VolumeX, ShieldCheck, Activity, HeartPulse } from "lucide-react";
import { SITE_NAME, IMAGES } from "@/data/siteData";

const HERO_CLINICAL_SCENES = [
  {
    id: "consultation-room",
    title: "Clinical Consultation Suite",
    image: IMAGES.aboutConsultation,
    vitals: "HR: 72 BPM • SpO2: 99%",
  },
  {
    id: "doctor-desk",
    title: "Diagnostic & Health Analysis",
    image: IMAGES.doctorWorkspace,
    vitals: "BP: 120/80 • Room 104",
  },
  {
    id: "diagnostic-facility",
    title: "Modern Clinical Examination",
    image: IMAGES.diagnosticClinic,
    vitals: "Live Stream • 1080p 60FPS",
  },
];

export default function HeroVideo() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_CLINICAL_SCENES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const activeScene = HERO_CLINICAL_SCENES[currentIdx];

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none group">
      {/* Outer Glow & Ambient Reflection */}
      <div
        className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-brand-400/40 via-emerald-500/30 to-brand-300/40 blur-xl opacity-75 group-hover:opacity-100 transition duration-500 pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Video Container Frame */}
      <div className="relative rounded-2xl overflow-hidden bg-brand-950 border-2 border-brand-400/40 shadow-2xl backdrop-blur-md">
        {/* Subtle Top Status Bar */}
        <div className="px-4 py-2.5 bg-brand-950/95 border-b border-brand-800/80 flex items-center justify-between text-xs text-brand-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold tracking-wide uppercase text-[11px] text-brand-100">
              Doctor Consultation • Live Looping Stream
            </span>
          </div>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-brand-900/90 hover:bg-brand-850 border border-brand-700/60 text-brand-200 hover:text-white transition-colors text-[11px]"
            title={isMuted ? "Click to Unmute" : "Click to Mute"}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-emerald-400" />
                <span>Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Audio On</span>
              </>
            )}
          </button>
        </div>

        {/* Continuous Looping Cinematic Video Player Area */}
        <div className="relative aspect-[16/10] sm:aspect-video w-full overflow-hidden bg-brand-950 flex items-center justify-center">
          {HERO_CLINICAL_SCENES.map((scene, i) => (
            <div
              key={scene.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                i === currentIdx ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
              style={{
                transition: "opacity 1000ms ease-in-out, transform 4500ms ease-out",
              }}
            >
              <Image
                src={scene.image}
                alt={scene.title}
                fill
                className="object-cover object-center"
                priority={i === 0}
              />
            </div>
          ))}

          {/* Animated Clinical Visual Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-transparent to-brand-950/25 pointer-events-none" />

          {/* Live Animated ECG Pulse line */}
          <div className="absolute bottom-12 left-0 right-0 h-6 opacity-60 pointer-events-none overflow-hidden z-10 flex items-center">
            <svg
              viewBox="0 0 500 30"
              className="w-full h-6 stroke-emerald-400 fill-none"
              style={{ strokeWidth: "1.5", filter: "drop-shadow(0 0 3px #34d399)" }}
            >
              <path d="M0,15 L120,15 L125,5 L130,25 L135,8 L140,20 L145,15 L300,15 L305,5 L310,25 L315,8 L320,20 L325,15 L500,15" />
            </svg>
          </div>

          {/* Overlay Content / Badge */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between pointer-events-none z-10">
            <div className="space-y-1 bg-brand-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-brand-500/30">
              <div className="inline-flex items-center gap-1.5 text-emerald-300 text-[10px] font-semibold uppercase">
                <Sparkles className="w-3 h-3" />
                <span>{activeScene.title}</span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-white drop-shadow-sm">
                {SITE_NAME}
              </div>
              <div className="text-[11px] text-brand-200/90 flex items-center gap-1.5 font-mono">
                <HeartPulse className="w-3 h-3 text-red-400 animate-pulse" />
                <span>{activeScene.vitals}</span>
              </div>
            </div>

            <div className="w-9 h-9 rounded-full bg-brand-800/90 border border-brand-400/60 backdrop-blur-sm flex items-center justify-center text-white shadow-lg shrink-0">
              <Video className="w-4 h-4 text-emerald-200" />
            </div>
          </div>
        </div>

        {/* Bottom Reassurance Footer */}
        <div className="px-4 py-2 bg-brand-950/95 border-t border-brand-900 flex items-center justify-between text-[11px] text-brand-300/80">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Live Clinic &amp; Consultation Stream
          </span>
          <span className="text-emerald-400 font-mono text-[10px] flex items-center gap-1">
            <Activity className="w-3 h-3 animate-pulse" /> 1080p 60FPS
          </span>
        </div>
      </div>
    </div>
  );
}
