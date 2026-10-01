"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Info,
  ShieldCheck,
  Sparkles,
  Calendar,
  Clock,
  Video as VideoIcon,
  ArrowRight,
  User,
  Phone,
  Mail,
  Stethoscope,
  ChevronRight,
  Lock,
  Building2,
  FileText,
  HeartPulse,
  Activity,
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { SITE_NAME, CONSULTATION_OPTIONS, IMAGES, CONSULTATION_STEPS } from "@/data/siteData";

export default function ConsultationPage() {
  const [selectedOption, setSelectedOption] = useState("in-person");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("10:00 AM");
  const [clientInfo, setClientInfo] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
  });
  const [isBooked, setIsBooked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const availableSlots = [
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:30 AM",
    "02:00 PM",
    "03:30 PM",
    "04:30 PM",
    "05:30 PM",
  ];

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: clientInfo.name,
          phone: clientInfo.phone,
          email: clientInfo.email,
          consultationOption: selectedOption,
          preferredDate: selectedDate,
          preferredTimeSlot: selectedTimeSlot,
          notes: clientInfo.notes,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit consultation booking.");
      }

      setIsBooked(true);
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setIsBooked(false);
    setErrorMessage("");
    setClientInfo({ name: "", phone: "", email: "", notes: "" });
  };

  const getModeIcon = (id: string) => {
    switch (id) {
      case "online-video":
        return <VideoIcon className="w-6 h-6 text-brand-600" />;
      case "second-opinion":
        return <FileText className="w-6 h-6 text-brand-600" />;
      default:
        return <Stethoscope className="w-6 h-6 text-brand-600" />;
    }
  };

  const currentOptionData =
    CONSULTATION_OPTIONS.find((opt) => opt.id === selectedOption) ||
    CONSULTATION_OPTIONS[0];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/40">
      {/* 1. COMPACT LIGHT PAGE HEADER */}
      <section className="pt-8 pb-6 sm:pt-10 sm:pb-8 bg-gradient-to-b from-brand-50/50 via-white to-slate-50/30 border-b border-brand-100/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <ScrollReveal animation="fade-down">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-500 font-medium mb-1">
              <Link href="/" className="hover:text-brand-700 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-brand-700 font-semibold">Consultation Booking</span>
            </div>

            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/90 text-brand-800 text-xs font-semibold tracking-wide shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse-ring" />
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Personalized Clinical Consultation</span>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={100}>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-950 leading-tight">
              Book a Consultation with <span className="text-brand-600">{SITE_NAME}</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={150}>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-xl mx-auto leading-relaxed font-normal">
              Select your consultation format, pick an available appointment slot, and receive
              dedicated, evidence-guided medical attention tailored to your needs.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. STANDALONE SECTION: SELECT CONSULTATION MODE (Alag Section) */}
      <section className="py-10 sm:py-14 bg-white border-b border-brand-100/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <ScrollReveal animation="fade-down">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-600" />
                <span>Step 1 of 2</span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={100}>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-950">
                Select Your Consultation Mode
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={150}>
              <p className="text-xs sm:text-sm text-zinc-600">
                Click to choose the consultation format that best matches your healthcare requirements.
              </p>
            </ScrollReveal>
          </div>

          {/* 3 Spacious Mode Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {CONSULTATION_OPTIONS.map((opt, idx) => {
              const isSelected = selectedOption === opt.id;
              return (
                <ScrollReveal key={opt.id} animation="fade-up" delay={idx * 100}>
                  <div
                    onClick={() => {
                      setSelectedOption(opt.id);
                    }}
                    className={`cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300 flex flex-col justify-between h-full group ${
                      isSelected
                        ? "border-brand-600 bg-brand-50/50 shadow-md ring-2 ring-brand-600/20 scale-[1.01]"
                        : "border-zinc-200 bg-white hover:border-brand-300 hover:shadow-sm"
                    }`}
                  >
                    <div>
                      {/* Top Badges & Icon */}
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                            isSelected
                              ? "bg-brand-600 text-white shadow-xs"
                              : "bg-brand-50 text-brand-700 group-hover:bg-brand-100"
                          }`}
                        >
                          {getModeIcon(opt.id)}
                        </div>
                        <div className="text-right">
                          <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-brand-100/80 text-brand-900">
                            {opt.badge}
                          </span>
                          <div className="text-[11px] text-zinc-500 font-medium mt-1">
                            {opt.duration}
                          </div>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-base sm:text-lg font-bold text-brand-950 mb-2 leading-snug">
                        {opt.title}
                      </h3>
                      <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                        {opt.description}
                      </p>
                    </div>

                    {/* Bottom Selected Indicator */}
                    <div className="mt-5 pt-3.5 border-t border-zinc-100 flex items-center justify-between text-xs font-bold">
                      <span className={isSelected ? "text-brand-800" : "text-zinc-500"}>
                        {isSelected ? "Selected Mode" : "Click to Select"}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? "border-brand-600 bg-brand-600 text-white"
                            : "border-zinc-300 group-hover:border-brand-400"
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. STANDALONE SECTION: CONSULTATION FORM (Alag Form Section) */}
      <section id="booking-form" className="py-10 sm:py-16 bg-slate-50/70 border-b border-brand-100/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-1.5">
            <ScrollReveal animation="fade-down">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-600" />
                <span>Step 2 of 2</span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={100}>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-950">
                Complete Your Booking Details
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={150}>
              <p className="text-xs sm:text-sm text-zinc-600">
                You are booking for:{" "}
                <strong className="text-brand-900 font-bold underline">
                  {currentOptionData.title}
                </strong>
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal animation="fade-up" delay={200}>
            <div className="bg-white rounded-2xl border border-brand-200/90 shadow-lg p-5 sm:p-8 lg:p-10 relative">
              {/* Card Header with Selected Option Highlight */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-zinc-100 gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-700">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-brand-950">
                      {currentOptionData.title}
                    </h3>
                    <p className="text-[11px] text-zinc-500">
                      Duration: {currentOptionData.duration} | {currentOptionData.badge}
                    </p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-800 bg-brand-50 px-3 py-1 rounded-full border border-brand-200 self-start sm:self-auto">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent-600" />
                  <span>Confidential Booking</span>
                </div>
              </div>

              {errorMessage && (
                <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5 shadow-2xs">
                  <Info className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Booking Error:</span> {errorMessage}
                  </div>
                </div>
              )}

              {isBooked ? (
                /* Success Feedback State */
                <div className="rounded-xl border border-brand-200 bg-brand-50/70 p-6 sm:p-10 text-center space-y-4 shadow-sm">
                  <div className="w-14 h-14 rounded-full bg-brand-600 text-white mx-auto flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-extrabold text-brand-950">
                      Consultation Booking Recorded!
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="font-bold text-brand-900">{clientInfo.name}</span>. Your consultation slot has been registered. Our clinic desk will reach out with session instructions.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-brand-200 text-xs text-left max-w-sm mx-auto space-y-1.5 text-zinc-700 shadow-2xs">
                    <div className="font-bold text-brand-900 border-b border-zinc-100 pb-1.5 flex items-center justify-between">
                      <span>Booking Summary</span>
                      <span className="text-[10px] text-accent-600 font-semibold">Status: Slot Reserved</span>
                    </div>
                    <div><strong>Selected Mode:</strong> {currentOptionData.title}</div>
                    <div><strong>Date:</strong> {selectedDate || "Next Available"}</div>
                    <div><strong>Time Slot:</strong> {selectedTimeSlot}</div>
                    <div><strong>Patient Name:</strong> {clientInfo.name}</div>
                    <div><strong>Contact Phone:</strong> {clientInfo.phone}</div>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all hover:shadow-md cursor-pointer"
                  >
                    <span>Book Another Consultation</span>
                  </button>
                </div>
              ) : (
                /* Booking Form */
                <form onSubmit={handleBookingSubmit} className="space-y-5">
                  {/* Date & Time Slot Picker */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-900 flex items-center gap-1.5 pb-1 border-b border-brand-50">
                      <Calendar className="w-3.5 h-3.5 text-accent-600" />
                      <span>Select Preferred Date &amp; Time Slot <span className="text-accent-600">*</span></span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 bg-slate-50/60 p-3.5 rounded-xl border border-brand-100">
                      <div className="sm:col-span-5 space-y-1">
                        <label
                          htmlFor="consultDate"
                          className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider"
                        >
                          Preferred Date <span className="text-accent-600">*</span>
                        </label>
                        <input
                          type="date"
                          id="consultDate"
                          required
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-zinc-300 bg-white focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 outline-none text-xs text-zinc-900 shadow-2xs font-medium"
                        />
                      </div>

                      <div className="sm:col-span-7 space-y-1">
                        <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider">
                          Available Consultation Slots <span className="text-accent-600">*</span>
                        </label>
                        <div className="grid grid-cols-4 gap-1.5">
                          {availableSlots.map((slot) => {
                            const isChosen = selectedTimeSlot === slot;
                            return (
                              <button
                                type="button"
                                key={slot}
                                onClick={() => setSelectedTimeSlot(slot)}
                                className={`py-1.5 px-1 text-[10px] font-semibold rounded-md border text-center transition-all cursor-pointer ${
                                  isChosen
                                    ? "bg-brand-600 text-white border-brand-600 shadow-2xs font-bold"
                                    : "bg-white text-zinc-700 border-zinc-200 hover:border-brand-300 hover:bg-brand-50/50"
                                }`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Patient Information */}
                  <div className="space-y-2.5 pt-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-900 flex items-center gap-1.5 pb-1 border-b border-brand-50">
                      <User className="w-3.5 h-3.5 text-accent-600" />
                      <span>Patient Contact Details <span className="text-accent-600">*</span></span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label
                          htmlFor="clientName"
                          className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider"
                        >
                          Full Name <span className="text-accent-600">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                          <input
                            type="text"
                            id="clientName"
                            required
                            placeholder="e.g. S. Verma"
                            value={clientInfo.name}
                            onChange={(e) =>
                              setClientInfo({ ...clientInfo, name: e.target.value })
                            }
                            className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-zinc-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 outline-none text-xs text-zinc-900 bg-slate-50/40 focus:bg-white transition-all shadow-2xs font-medium"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="clientPhone"
                          className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider"
                        >
                          Phone Number <span className="text-accent-600">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                          <input
                            type="tel"
                            id="clientPhone"
                            required
                            placeholder="+91 98765 43210"
                            value={clientInfo.phone}
                            onChange={(e) =>
                              setClientInfo({ ...clientInfo, phone: e.target.value })
                            }
                            className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-zinc-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 outline-none text-xs text-zinc-900 bg-slate-50/40 focus:bg-white transition-all shadow-2xs font-medium"
                          />
                        </div>
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label
                          htmlFor="clientEmail"
                          className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider"
                        >
                          Email Address <span className="text-accent-600">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                          <input
                            type="email"
                            id="clientEmail"
                            required
                            placeholder="patient@example.com"
                            value={clientInfo.email}
                            onChange={(e) =>
                              setClientInfo({ ...clientInfo, email: e.target.value })
                            }
                            className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-zinc-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 outline-none text-xs text-zinc-900 bg-slate-50/40 focus:bg-white transition-all shadow-2xs font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Clinical Notes */}
                  <div className="space-y-1 pt-1">
                    <label
                      htmlFor="clientNotes"
                      className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider"
                    >
                      Reason for Consultation / Health History (Optional)
                    </label>
                    <textarea
                      id="clientNotes"
                      rows={3}
                      placeholder="Briefly describe symptoms, ongoing medications, or specific questions for Dr. Anil Pandey..."
                      value={clientInfo.notes}
                      onChange={(e) =>
                        setClientInfo({ ...clientInfo, notes: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 outline-none text-xs text-zinc-900 bg-slate-50/40 focus:bg-white transition-all shadow-2xs resize-y font-medium"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 border border-brand-400/40 disabled:opacity-60 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Reserving Consultation Slot...</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4 text-brand-200" />
                          <span>Confirm Consultation Booking</span>
                          <ArrowRight className="w-4 h-4 ml-1 text-accent-400" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Security Guarantee Note */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 border-t border-zinc-100 gap-1.5">
                    <span className="flex items-center gap-1 text-zinc-600">
                      <Lock className="w-3.5 h-3.5 text-accent-600" />
                      <span>100% Confidential Medical Case Assessment</span>
                    </span>
                    <span className="text-zinc-500">Reception Verification Included</span>
                  </div>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. SECTION: 4-STEP CONSULTATION PROCESS */}
      <section className="py-12 sm:py-16 bg-white border-b border-brand-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <ScrollReveal animation="fade-down">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-600" />
                <span>Structured Patient Journey</span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={100}>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-950">
                The 4-Step Consultation Process
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={150}>
              <p className="text-xs sm:text-sm text-zinc-600">
                A thorough, clinical workflow ensuring dedicated preparation and actionable treatment guidance.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CONSULTATION_STEPS.map((step, idx) => (
              <ScrollReveal key={step.step} animation="fade-up" delay={idx * 100}>
                <div className="bg-slate-50/80 hover:bg-white rounded-2xl p-5 border border-brand-100 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group hover:border-accent-300">
                  <div>
                    <div className="text-2xl font-black text-brand-600 mb-2 font-mono group-hover:text-accent-600 transition-colors">
                      0{step.step}
                    </div>
                    <h3 className="text-sm font-bold text-brand-950 mb-1.5 group-hover:text-brand-700 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
