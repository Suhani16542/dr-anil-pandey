"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Calendar,
  ShieldCheck,
  Activity,
  Maximize2,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Stethoscope,
  Building2,
  HeartPulse,
  FlaskConical,
} from "lucide-react";
import { IMAGES } from "@/data/siteData";

const CLINICAL_SCENES = [
  {
    id: "consultation",
    title: "Clinical Consultation & Case Review",
    location: "Consultation Suite 104",
    image: IMAGES.aboutConsultation,
    icon: Stethoscope,
    vitals: { hr: "72 BPM", spo2: "99%", bp: "120/80", temp: "98.6°F" },
  },
  {
    id: "diagnostics",
    title: "Diagnostic Facility & Patient Assessment",
    location: "Diagnostic Bay B",
    image: IMAGES.diagnosticClinic,
    icon: Building2,
    vitals: { hr: "74 BPM", spo2: "98%", bp: "118/78", temp: "98.4°F" },
  },
  {
    id: "doctor-workspace",
    title: "Medical Record Analysis & Evaluation",
    location: "Doctor's Private Office",
    image: IMAGES.doctorWorkspace,
    icon: HeartPulse,
    vitals: { hr: "70 BPM", spo2: "100%", bp: "122/80", temp: "98.6°F" },
  },
  {
    id: "laboratory",
    title: "Pathology & Advanced Diagnostics Lab",
    location: "Central Clinical Lab",
    image: IMAGES.medicalLab,
    icon: FlaskConical,
    vitals: { hr: "75 BPM", spo2: "99%", bp: "119/79", temp: "98.5°F" },
  },
];

export default function VideoSection() {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [seconds, setSeconds] = useState(0);

  const scene = CLINICAL_SCENES[currentSceneIndex];

  // Auto-advance scenes continuously when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSceneIndex((prev) => (prev + 1) % CLINICAL_SCENES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Video timecode counter
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const formatTime = (totalSeconds: number) => {
    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const secs = String(totalSeconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const nextScene = () => {
    setCurrentSceneIndex((prev) => (prev + 1) % CLINICAL_SCENES.length);
  };

  const prevScene = () => {
    setCurrentSceneIndex((prev) => (prev - 1 + CLINICAL_SCENES.length) % CLINICAL_SCENES.length);
  };

  return (
    <section id="video-section" className="py-16 lg:py-24 bg-white border-b border-brand-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Real Continuously Looping Medical & Clinic Video Feed */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden bg-brand-950 border-2 border-brand-400/40 shadow-2xl group">
              {/* Top Live Video Header Bar */}
              <div className="px-4 py-2.5 bg-brand-950/95 border-b border-brand-800/80 flex items-center justify-between text-xs text-brand-200 z-20 relative">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-semibold tracking-wide uppercase text-[11px] text-brand-100">
                    Live Clinic Consultation Feed
                  </span>
                </div>
                <div className="flex items-center gap-3 text-brand-300 text-[11px]">
                  <span className="font-mono text-emerald-400 bg-brand-900/90 px-2 py-0.5 rounded border border-brand-700/60">
                    REC {formatTime(seconds)}
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 text-emerald-300">
                    <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> 1080p 60FPS
                  </span>
                </div>
              </div>

              {/* Main Cinematic Motion Area */}
              <div className="relative aspect-video w-full overflow-hidden bg-brand-950 flex items-center justify-center">
                {/* Scene Backgrounds with Smooth Crossfade and Zoom Pan Animation */}
                {CLINICAL_SCENES.map((s, idx) => (
                  <div
                    key={s.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      idx === currentSceneIndex ? "opacity-100 scale-105" : "opacity-0 scale-100"
                    }`}
                    style={{
                      transition: "opacity 1000ms ease-in-out, transform 5000ms ease-out",
                    }}
                  >
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover object-center"
                      priority={idx === 0}
                    />
                  </div>
                ))}

                {/* Subtle Cinematic Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-transparent to-brand-950/30 pointer-events-none" />

                {/* Top-Left Scene Information Tag */}
                <div className="absolute top-3 left-3 flex items-center gap-2 z-20 pointer-events-none">
                  <div className="px-3 py-1.5 rounded-lg bg-brand-950/85 backdrop-blur-md border border-brand-500/40 flex items-center gap-2 text-xs text-white shadow-lg">
                    <scene.icon className="w-3.5 h-3.5 text-emerald-400" />
                    <div>
                      <div className="font-bold text-white leading-tight">{scene.title}</div>
                      <div className="text-[10px] text-emerald-300 font-mono">{scene.location}</div>
                    </div>
                  </div>
                </div>

                {/* Top-Right Live Patient Telemetry HUD */}
                <div className="absolute top-3 right-3 hidden sm:flex items-center gap-2 z-20 pointer-events-none">
                  <div className="px-3 py-1.5 rounded-lg bg-brand-950/85 backdrop-blur-md border border-emerald-500/30 text-[10px] text-emerald-300 font-mono space-y-0.5 shadow-lg">
                    <div className="flex items-center gap-1.5 text-white font-semibold">
                      <HeartPulse className="w-3 h-3 text-red-400 animate-pulse" />
                      <span>PULSE: {scene.vitals.hr}</span>
                    </div>
                    <div className="text-zinc-300">SpO2: {scene.vitals.spo2} • BP: {scene.vitals.bp}</div>
                  </div>
                </div>

                {/* Animated ECG Heartbeat Oscilloscope Waveform at the Bottom */}
                <div className="absolute bottom-14 left-0 right-0 h-8 opacity-70 pointer-events-none overflow-hidden z-10 flex items-center">
                  <div className="w-full flex items-center justify-center">
                    <svg
                      viewBox="0 0 500 40"
                      className="w-full h-8 stroke-emerald-400 fill-none"
                      style={{ strokeWidth: "1.8", filter: "drop-shadow(0 0 4px #34d399)" }}
                    >
                      <path d="M0,20 L100,20 L110,20 L115,5 L120,35 L125,10 L130,25 L135,20 L250,20 L260,20 L265,5 L270,35 L275,10 L280,25 L285,20 L400,20 L410,20 L415,5 L420,35 L425,10 L430,25 L435,20 L500,20" />
                    </svg>
                  </div>
                </div>

                {/* Large Center Play Icon when paused */}
                {!isPlaying && (
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-800/90 text-white border-2 border-brand-300 flex items-center justify-center shadow-2xl backdrop-blur-sm z-30 hover:scale-110 transition-transform"
                    aria-label="Play Live Stream"
                  >
                    <Play className="w-8 h-8 fill-white ml-1 text-white" />
                  </button>
                )}

                {/* Interactive Player Controls HUD */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-brand-950/95 via-brand-950/80 to-transparent z-20">
                  {/* Active Scene Indicator Steps */}
                  <div className="flex items-center gap-1.5 mb-2.5">
                    {CLINICAL_SCENES.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSceneIndex(i)}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                          i === currentSceneIndex
                            ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                            : "bg-brand-900/80 hover:bg-brand-700"
                        }`}
                        title={`Switch to Scene ${i + 1}`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-1.5 rounded-lg bg-brand-800/90 hover:bg-brand-700 text-white transition-colors"
                        title={isPlaying ? "Pause Stream" : "Resume Stream"}
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4 fill-white" />
                        ) : (
                          <Play className="w-4 h-4 fill-white" />
                        )}
                      </button>

                      <button
                        onClick={prevScene}
                        className="p-1.5 rounded-lg bg-brand-900/80 hover:bg-brand-800 text-white transition-colors"
                        title="Previous Clinical Scene"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <button
                        onClick={nextScene}
                        className="p-1.5 rounded-lg bg-brand-900/80 hover:bg-brand-800 text-white transition-colors"
                        title="Next Clinical Scene"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-1.5 rounded-lg bg-brand-800/80 hover:bg-brand-700 text-white transition-colors flex items-center gap-1.5 px-2.5"
                        title={isMuted ? "Unmute Audio" : "Mute Audio"}
                      >
                        {isMuted ? (
                          <>
                            <VolumeX className="w-4 h-4 text-emerald-400" />
                            <span className="text-[11px] hidden sm:inline">Muted</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-4 h-4 text-emerald-400" />
                            <span className="text-[11px] hidden sm:inline">Audio On</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-brand-300 text-[11px] font-medium hidden sm:inline flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-400" />
                        Live Doctor Stream Active
                      </span>
                      <button
                        onClick={() => {
                          const elem = document.getElementById("video-section");
                          if (elem?.requestFullscreen) elem.requestFullscreen();
                        }}
                        className="p-1.5 rounded-lg bg-brand-800/80 hover:bg-brand-700 text-white transition-colors"
                        title="Fullscreen"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Status Info */}
            <div className="mt-2.5 flex items-center justify-between text-xs text-zinc-500 px-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-700" />
                Live Doctor Consultation &amp; Clinical Facility Stream
              </span>
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <RotateCcw className="w-3 h-3 animate-spin" style={{ animationDuration: "6s" }} /> Continuous 24/7 Loop
              </span>
            </div>
          </div>

          {/* Right Column: Supporting Content */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-brand-50 text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200">
              Professional Presence
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-950">
              Insights &amp; Clinical Philosophy from Dr. Anil Pandey
            </h2>

            <p className="text-base text-zinc-600 leading-relaxed">
              In this introductory presentation, Dr. Anil Pandey shares key
              insights on modern diagnostic methods, patient-centric
              evaluations, and how systematic consultation leads to better
              health management.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-brand-50/70 border border-brand-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-brand-950">
                    Holistic Assessment Framework
                  </div>
                  <div className="text-xs text-zinc-600 mt-0.5">
                    Understanding patient history, lifestyle factors, and root causes.
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-brand-50/70 border border-brand-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-brand-950">
                    Collaborative Treatment Planning
                  </div>
                  <div className="text-xs text-zinc-600 mt-0.5">
                    Transparent discussions regarding diagnostic tests and care.
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/appointment"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-semibold text-sm shadow-md transition-all duration-200 hover:shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>Consult with Dr. Anil Pandey</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
