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
} from "lucide-react";
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
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setIsBooked(false);
    setErrorMessage("");
    setClientInfo({ name: "", phone: "", email: "", notes: "" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Full-Width Hero Banner */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 -z-30 w-full h-full">
          <Image
            src={IMAGES.consultationHero}
            alt="Doctor Consultation Booking"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div
          className="absolute inset-0 -z-20 bg-gradient-to-r from-brand-950/88 via-brand-950/70 to-brand-900/50"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-950/85 border border-brand-400/50 text-brand-200 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>Personalized Healthcare Protocols</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-lg [text-shadow:_0_2px_12px_rgba(0,0,0,0.8)]">
              Consultation Booking
            </h1>
            <p className="text-base sm:text-xl text-brand-100/95 leading-relaxed drop-shadow-md font-medium [text-shadow:_0_1px_6px_rgba(0,0,0,0.7)]">
              Choose your consultation mode, pick a preferred schedule, and receive dedicated one-on-one medical reviews from {SITE_NAME}.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Consultation Introduction (Large Image + Detailed Content) */}
      <section className="py-20 lg:py-28 bg-white border-b border-brand-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Large Consultation Photo */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden bg-brand-950 border-2 border-brand-300 shadow-2xl">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={IMAGES.consultationIntro}
                    alt="Clinical Consultation Review"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-transparent to-transparent" />
                </div>
                <div className="p-5 bg-brand-950 text-white space-y-1">
                  <div className="font-bold text-base">Comprehensive Medical Dialogues</div>
                  <div className="text-xs text-brand-300">Dedicated patient evaluations</div>
                </div>
              </div>
            </div>

            {/* Right: Detailed Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-brand-100 text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200">
                Consultation Experience
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-brand-950">
                Focused Clinical Review Tailored to You
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-zinc-600 leading-relaxed">
                <p>
                  A medical consultation with Dr. Anil Pandey provides a structured, supportive space to explore symptoms, evaluate past diagnostic tests, and establish evidence-guided healthcare pathways.
                </p>
                <p>
                  Consultations are never rushed. Every session is designed to listen to patient concerns, clarify test interpretations in plain terms, and provide actionable medical recommendations.
                </p>
                <p>
                  Whether you choose an in-person chamber consultation or a remote digital session, you receive the same rigorous standard of clinical attention and follow-up support.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-brand-900">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-50 border border-brand-200">
                  <CheckCircle2 className="w-4 h-4 text-brand-700" />
                  30–45 Minute Focused Slots
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-50 border border-brand-200">
                  <CheckCircle2 className="w-4 h-4 text-brand-700" />
                  Detailed Report Assessments
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-50 border border-brand-200">
                  <CheckCircle2 className="w-4 h-4 text-brand-700" />
                  Structured Prescription Review
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Consultation Process (Step-by-Step 01 - 04) */}
      <section className="py-20 lg:py-28 bg-brand-50/40 border-b border-brand-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-brand-100 text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200">
              Process
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-950">
              The 4-Step Consultation Journey
            </h2>
            <p className="text-zinc-600 text-base">
              A transparent, streamlined workflow ensuring thorough clinical preparation and personalized follow-up.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONSULTATION_STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-white rounded-2xl p-7 border border-brand-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl font-black text-brand-800 mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-brand-950 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Consultation Experience (Alternating Editorial Blocks) */}
      <section className="py-20 lg:py-28 bg-white border-b border-brand-100/60 space-y-20 lg:space-y-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 lg:space-y-28">
          {/* Editorial Block 1: Left Image, Right Text */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden bg-brand-950 border-2 border-brand-200 shadow-xl group">
                <div className="relative aspect-[16/11] w-full">
                  <Image
                    src={IMAGES.consultationExp1}
                    alt="In-Person Clinical Evaluation"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-bold text-emerald-300">Chamber Experience</div>
                  <div className="text-base font-bold">Comprehensive In-Person Clinical Review</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">
                Format 01 • Clinic Visits
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-brand-950">
                In-Person Consultations with Diagnostic Depth
              </h3>
              <p className="text-base text-zinc-600 leading-relaxed">
                Direct physical examinations, review of diagnostic imaging, and face-to-face evaluations conducted in a calm, modern clinical setting.
              </p>
              <ul className="space-y-2 text-sm text-zinc-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-700" />
                  <span>Hands-on clinical assessment and vitals check</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-700" />
                  <span>Direct examination of physical diagnostic scans</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-700" />
                  <span>Interactive discussion with family members or caregivers</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Editorial Block 2: Right Image, Left Text (Reversed) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1 space-y-5">
              <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">
                Format 02 • Digital Care
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-brand-950">
                Remote Video Consultations &amp; Second Opinions
              </h3>
              <p className="text-base text-zinc-600 leading-relaxed">
                Access specialist medical advice from the comfort of your home. Ideal for follow-ups, remote triage, outstation patients, and second opinion reviews.
              </p>
              <ul className="space-y-2 text-sm text-zinc-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-700" />
                  <span>Secure, encrypted high-definition video link</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-700" />
                  <span>Digital review of uploaded reports and lab investigations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-700" />
                  <span>Convenient scheduling for out-of-city patients</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden bg-brand-950 border-2 border-brand-200 shadow-xl group">
                <div className="relative aspect-[16/11] w-full">
                  <Image
                    src={IMAGES.consultationExp2}
                    alt="Digital Healthcare Consultation"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-bold text-emerald-300">Remote Consultation</div>
                  <div className="text-base font-bold">Secure Digital Medical Guidance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Main Consultation Booking Form */}
      <section className="py-20 lg:py-28 bg-brand-50/40 border-b border-brand-100/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-950">
              Schedule Your Consultation
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base">
              Choose your format, preferred time slot, and submit your contact information.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-8 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
              <Info className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Booking Error:</span> {errorMessage}
              </div>
            </div>
          )}

          {isBooked ? (
            /* Confirmation Feedback */
            <div className="rounded-2xl border-2 border-brand-300 bg-white p-8 sm:p-12 text-center space-y-6 shadow-xl">
              <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-800 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-brand-950">
                  Consultation Booking Confirmed
                </h2>
                <p className="text-sm text-zinc-600">
                  Thank you, <span className="font-semibold">{clientInfo.name || "Patient"}</span>. Your consultation booking has been recorded in the clinic database and assigned for confirmation.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-brand-50/60 border border-brand-200 text-xs text-left max-w-md mx-auto space-y-2 text-zinc-700">
                <div><strong>Consultation Mode:</strong> {selectedOption}</div>
                <div><strong>Selected Date:</strong> {selectedDate || "Next Available"}</div>
                <div><strong>Selected Slot:</strong> {selectedTimeSlot}</div>
                <div><strong>Contact:</strong> {clientInfo.phone || "N/A"} | {clientInfo.email || "N/A"}</div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white text-sm font-semibold shadow transition-colors cursor-pointer"
              >
                <span>Book Another Consultation</span>
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-brand-200 bg-white p-6 sm:p-10 shadow-xl">
              <form onSubmit={handleBookingSubmit} className="space-y-10">
                {/* Format Picker */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-brand-950 flex items-center gap-2 pb-2 border-b border-zinc-100">
                    <span className="w-6 h-6 rounded-full bg-brand-800 text-white text-xs font-bold flex items-center justify-center">1</span>
                    <span>Select Consultation Mode</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {CONSULTATION_OPTIONS.map((opt) => {
                      const isSelected = selectedOption === opt.id;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => setSelectedOption(opt.id)}
                          className={`cursor-pointer rounded-2xl p-5 border-2 transition-all flex flex-col justify-between ${
                            isSelected
                              ? "border-brand-700 bg-brand-50/70 shadow-md ring-2 ring-brand-700/20"
                              : "border-zinc-200 bg-white hover:border-brand-300"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-800">
                                {opt.badge}
                              </span>
                              <span className="text-xs text-zinc-500 font-medium">
                                {opt.duration}
                              </span>
                            </div>
                            <h4 className="text-base font-bold text-brand-950 mb-1.5">{opt.title}</h4>
                            <p className="text-xs text-zinc-600 leading-relaxed">{opt.description}</p>
                          </div>
                          <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold">
                            <span className={isSelected ? "text-brand-800" : "text-zinc-500"}>
                              {isSelected ? "Selected" : "Select Option"}
                            </span>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? "border-brand-700 bg-brand-700" : "border-zinc-300"}`}>
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Date & Slot Picker */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-lg font-bold text-brand-950 flex items-center gap-2 pb-2 border-b border-zinc-100">
                    <span className="w-6 h-6 rounded-full bg-brand-800 text-white text-xs font-bold flex items-center justify-center">2</span>
                    <span>Date &amp; Time Window</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-brand-50/40 p-6 rounded-2xl border border-brand-200">
                    <div className="md:col-span-5 space-y-2">
                      <label htmlFor="consultDate" className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                        Preferred Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="consultDate"
                        required
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 bg-white focus:border-brand-700 focus:ring-2 focus:ring-brand-100 outline-none text-sm text-zinc-900"
                      />
                    </div>

                    <div className="md:col-span-7 space-y-2">
                      <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                        Available Windows <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {availableSlots.map((slot) => {
                          const isChosen = selectedTimeSlot === slot;
                          return (
                            <button
                              type="button"
                              key={slot}
                              onClick={() => setSelectedTimeSlot(slot)}
                              className={`py-2 px-2 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer ${
                                isChosen
                                  ? "bg-brand-800 text-white border-brand-800 font-bold shadow-sm"
                                  : "bg-white text-zinc-700 border-zinc-200 hover:border-brand-300"
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

                {/* Patient Information Fields */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-lg font-bold text-brand-950 flex items-center gap-2 pb-2 border-b border-zinc-100">
                    <span className="w-6 h-6 rounded-full bg-brand-800 text-white text-xs font-bold flex items-center justify-center">3</span>
                    <span>Patient Details &amp; Notes</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="clientName" className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="clientName"
                        required
                        placeholder="e.g. S. Verma"
                        value={clientInfo.name}
                        onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-brand-700 focus:ring-2 focus:ring-brand-100 outline-none text-sm text-zinc-900"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="clientPhone" className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="clientPhone"
                        required
                        placeholder="+91 98765 43210"
                        value={clientInfo.phone}
                        onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-brand-700 focus:ring-2 focus:ring-brand-100 outline-none text-sm text-zinc-900"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="clientEmail" className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="clientEmail"
                        required
                        placeholder="patient@example.com"
                        value={clientInfo.email}
                        onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-brand-700 focus:ring-2 focus:ring-brand-100 outline-none text-sm text-zinc-900"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <label htmlFor="clientNotes" className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                      Medical Inquiries / Existing Conditions / Symptoms
                    </label>
                    <textarea
                      id="clientNotes"
                      rows={3}
                      placeholder="Mention any existing prescriptions, specific symptoms, or clinical background..."
                      value={clientInfo.notes}
                      onChange={(e) => setClientInfo({ ...clientInfo, notes: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-brand-700 focus:ring-2 focus:ring-brand-100 outline-none text-sm text-zinc-900 resize-y"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <ShieldCheck className="w-4 h-4 text-brand-700" />
                    <span>Strict patient confidentiality and medical discretion</span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-base shadow-md transition-all hover:shadow-lg disabled:opacity-75 cursor-pointer"
                  >
                    {loading ? (
                      <span>Confirming Booking...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Book Consultation</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* 6. Final Consultation CTA */}
      <section className="relative py-20 lg:py-24 overflow-hidden text-white">
        <div className="absolute inset-0 -z-30 w-full h-full">
          <Image
            src={IMAGES.finalCtaBg}
            alt="Consultation Clinic"
            fill
            sizes="100vw"
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div
          className="absolute inset-0 -z-20 bg-gradient-to-r from-brand-950/30 via-brand-950/20 to-brand-950/15"
          aria-hidden="true"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold drop-shadow-md">
            Dedicated Clinical Attention for Your Health Needs
          </h2>
          <p className="text-base sm:text-lg text-brand-100 max-w-xl mx-auto drop-shadow-sm font-normal">
            Arrange your consultation with Dr. Anil Pandey for evidence-guided diagnostics and personalized care.
          </p>
          <div className="pt-2">
            <Link
              href="/appointment"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-brand-950 font-bold text-base shadow-xl hover:bg-brand-50 transition-colors"
            >
              <Calendar className="w-4 h-4 text-brand-800" />
              <span>Take an Appointment</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
