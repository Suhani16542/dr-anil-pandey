"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  User,
  Phone,
  Mail,
  CheckCircle,
  Info,
  ShieldCheck,
  Clock,
  FileText,
  Stethoscope,
  ChevronDown,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Lock,
  Building2,
  Video as VideoIcon,
  HelpCircle,
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { SITE_NAME, IMAGES, APPOINTMENT_STEPS, APPOINTMENT_FAQS } from "@/data/siteData";

export default function AppointmentPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    preferredDate: "",
    preferredTime: "morning",
    consultationType: "in-person",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit appointment request.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      preferredDate: "",
      preferredTime: "morning",
      consultationType: "in-person",
      message: "",
    });
    setSubmitted(false);
    setErrorMessage("");
  };

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case "FileText":
        return <FileText className="w-5 h-5 text-accent-600" />;
      case "Clock":
        return <Clock className="w-5 h-5 text-accent-600" />;
      case "CheckCircle":
        return <CheckCircle2 className="w-5 h-5 text-accent-600" />;
      default:
        return <Stethoscope className="w-5 h-5 text-accent-600" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/40">
      {/* 1. COMPACT LIGHT PAGE HEADER (Light background, no dark hero) */}
      <section className="pt-8 pb-6 sm:pt-10 sm:pb-8 bg-gradient-to-b from-brand-50/50 via-white to-slate-50/30 border-b border-brand-100/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <ScrollReveal animation="fade-down">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-500 font-medium mb-1">
              <Link href="/" className="hover:text-brand-700 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-brand-700 font-semibold">Book Appointment</span>
            </div>

            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/90 text-brand-800 text-xs font-semibold tracking-wide shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse-ring" />
              <CalendarIcon className="w-3.5 h-3.5 text-brand-600" />
              <span>Direct Clinical Scheduling</span>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={100}>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-950 leading-tight">
              Book an Appointment with <span className="text-brand-600">{SITE_NAME}</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={150}>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-xl mx-auto leading-relaxed font-normal">
              Schedule your in-person clinic visit or secure video consultation. Fill out the form below
              and our desk will confirm your dedicated time slot promptly.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. STANDALONE FOCUSED FORM SECTION (Clean White Card, Centered, Rich Light Aesthetics) */}
      <section className="py-8 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="bg-white rounded-2xl border border-brand-200/90 shadow-lg p-5 sm:p-8 lg:p-10 relative">
              {/* Form Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-zinc-100 gap-2">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-brand-950 flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-brand-600" />
                    <span>Appointment Booking Form</span>
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Please provide your contact details and preferred consultation preferences.
                  </p>
                </div>
                <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-800 bg-brand-50 px-3 py-1 rounded-full border border-brand-200 self-start sm:self-auto">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent-600" />
                  <span>Confidential &amp; Secure</span>
                </div>
              </div>

              {errorMessage && (
                <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5 shadow-2xs">
                  <Info className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Submission Error:</span> {errorMessage}
                  </div>
                </div>
              )}

              {submitted ? (
                /* Success Feedback State */
                <div className="rounded-xl border border-brand-200 bg-brand-50/70 p-6 sm:p-10 text-center space-y-4 shadow-sm">
                  <div className="w-14 h-14 rounded-full bg-brand-600 text-white mx-auto flex items-center justify-center shadow-md">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-extrabold text-brand-950">
                      Appointment Request Received!
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="font-bold text-brand-900">{formData.fullName}</span>. Your request for{" "}
                      <span className="font-bold text-brand-900">{formData.preferredDate || "your chosen date"}</span> has been recorded. Our team will contact you shortly to confirm.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-brand-200 text-xs text-left max-w-sm mx-auto space-y-1.5 text-zinc-700 shadow-2xs">
                    <div className="font-bold text-brand-900 border-b border-zinc-100 pb-1.5 flex items-center justify-between">
                      <span>Booking Summary</span>
                      <span className="text-[10px] text-accent-600 font-semibold">Status: Pending Review</span>
                    </div>
                    <div><strong>Patient Name:</strong> {formData.fullName}</div>
                    <div><strong>Phone:</strong> {formData.phone}</div>
                    <div><strong>Email:</strong> {formData.email}</div>
                    <div><strong>Consultation Mode:</strong> {formData.consultationType}</div>
                    <div><strong>Time Window:</strong> {formData.preferredTime}</div>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all hover:shadow-md cursor-pointer"
                  >
                    <span>Book Another Appointment</span>
                  </button>
                </div>
              ) : (
                /* Form Fields */
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Step 1: Patient Information */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-brand-900 flex items-center gap-1.5 pb-1 border-b border-brand-50">
                      <User className="w-3.5 h-3.5 text-accent-600" />
                      <span>1. Patient Information</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1 sm:col-span-2">
                        <label
                          htmlFor="fullName"
                          className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider"
                        >
                          Full Name <span className="text-accent-600">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                          <input
                            type="text"
                            id="fullName"
                            required
                            placeholder="e.g. Rajesh Kumar"
                            value={formData.fullName}
                            onChange={(e) =>
                              setFormData({ ...formData, fullName: e.target.value })
                            }
                            className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-zinc-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 outline-none text-xs text-zinc-900 bg-slate-50/40 focus:bg-white transition-all shadow-2xs font-medium"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="phone"
                          className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider"
                        >
                          Phone Number <span className="text-accent-600">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                          <input
                            type="tel"
                            id="phone"
                            required
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-zinc-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 outline-none text-xs text-zinc-900 bg-slate-50/40 focus:bg-white transition-all shadow-2xs font-medium"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="email"
                          className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider"
                        >
                          Email Address <span className="text-accent-600">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                          <input
                            type="email"
                            id="email"
                            required
                            placeholder="patient@example.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-zinc-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 outline-none text-xs text-zinc-900 bg-slate-50/40 focus:bg-white transition-all shadow-2xs font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Schedule & Format */}
                  <div className="space-y-3 pt-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-brand-900 flex items-center gap-1.5 pb-1 border-b border-brand-50">
                      <CalendarIcon className="w-3.5 h-3.5 text-accent-600" />
                      <span>2. Schedule &amp; Format Preferences</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                      <div className="space-y-1">
                        <label
                          htmlFor="preferredDate"
                          className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider"
                        >
                          Preferred Date <span className="text-accent-600">*</span>
                        </label>
                        <input
                          type="date"
                          id="preferredDate"
                          required
                          value={formData.preferredDate}
                          onChange={(e) =>
                            setFormData({ ...formData, preferredDate: e.target.value })
                          }
                          className="w-full px-3 py-2.5 rounded-xl border border-zinc-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 outline-none text-xs text-zinc-900 bg-slate-50/40 focus:bg-white transition-all shadow-2xs font-medium"
                        />
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="preferredTime"
                          className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider"
                        >
                          Time Window <span className="text-accent-600">*</span>
                        </label>
                        <select
                          id="preferredTime"
                          value={formData.preferredTime}
                          onChange={(e) =>
                            setFormData({ ...formData, preferredTime: e.target.value })
                          }
                          className="w-full px-3 py-2.5 rounded-xl border border-zinc-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 outline-none text-xs text-zinc-900 bg-slate-50/40 focus:bg-white transition-all shadow-2xs font-medium cursor-pointer"
                        >
                          <option value="morning">Morning (09:00 AM – 12:00 PM)</option>
                          <option value="afternoon">Afternoon (01:00 PM – 04:00 PM)</option>
                          <option value="evening">Evening (04:00 PM – 07:00 PM)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="consultationType"
                          className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider"
                        >
                          Consultation Mode <span className="text-accent-600">*</span>
                        </label>
                        <select
                          id="consultationType"
                          value={formData.consultationType}
                          onChange={(e) =>
                            setFormData({ ...formData, consultationType: e.target.value })
                          }
                          className="w-full px-3 py-2.5 rounded-xl border border-zinc-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 outline-none text-xs text-zinc-900 bg-slate-50/40 focus:bg-white transition-all shadow-2xs font-medium cursor-pointer"
                        >
                          <option value="in-person">In-Person Clinic Visit</option>
                          <option value="online-video">Online Video Consultation</option>
                          <option value="second-opinion">Second Opinion / Case Review</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Clinical Message */}
                  <div className="space-y-1 pt-1">
                    <label
                      htmlFor="message"
                      className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider"
                    >
                      Clinical Symptoms / Purpose of Visit (Optional)
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      placeholder="Briefly describe your symptoms, ongoing treatments, or clinical queries for Dr. Anil Pandey..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 outline-none text-xs text-zinc-900 bg-slate-50/40 focus:bg-white transition-all shadow-2xs resize-y font-medium"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 border border-brand-400/40 disabled:opacity-60 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Submitting Appointment Request...</span>
                        </>
                      ) : (
                        <>
                          <CalendarIcon className="w-4 h-4 text-brand-200" />
                          <span>Confirm &amp; Book Appointment</span>
                          <ArrowRight className="w-4 h-4 ml-1 text-accent-400" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Security Guarantee Note */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 border-t border-zinc-100 gap-1.5">
                    <span className="flex items-center gap-1 text-zinc-600">
                      <Lock className="w-3.5 h-3.5 text-accent-600" />
                      <span>Strict medical ethics &amp; patient privacy guaranteed</span>
                    </span>
                    <span className="text-zinc-500">No advance payment required</span>
                  </div>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. SECTION: 4-STEP APPOINTMENT PROCESS */}
      <section className="py-12 sm:py-16 bg-white border-t border-b border-brand-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <ScrollReveal animation="fade-down">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-600" />
                <span>Process Flow</span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={100}>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-950">
                How the Appointment Process Works
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={150}>
              <p className="text-xs sm:text-sm text-zinc-600">
                Four straightforward steps from initial scheduling to your dedicated clinical review.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {APPOINTMENT_STEPS.map((step, idx) => (
              <ScrollReveal key={step.step} animation="fade-up" delay={idx * 100}>
                <div className="bg-slate-50/80 hover:bg-white rounded-2xl p-5 border border-brand-100 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group hover:border-accent-300">
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="text-[11px] font-black px-2.5 py-0.5 rounded-md bg-brand-600 text-white shadow-2xs">
                        0{step.step}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-white border border-brand-200 flex items-center justify-center shadow-2xs group-hover:bg-brand-50 transition-colors">
                        {getStepIcon(step.icon)}
                      </div>
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

      {/* 4. SECTION: FREQUENTLY ASKED QUESTIONS */}
      <section className="py-12 sm:py-16 bg-slate-50/60 border-b border-brand-100/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <ScrollReveal animation="fade-down">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-600" />
                <span>Patient Preparation</span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={100}>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-950">
                Frequently Asked Questions
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={150}>
              <p className="text-xs sm:text-sm text-zinc-600">
                Clear answers regarding appointment preparation, required documents, and consultation policies.
              </p>
            </ScrollReveal>
          </div>

          <div className="space-y-3">
            {APPOINTMENT_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <ScrollReveal key={faq.q} animation="fade-up" delay={idx * 60}>
                  <div className="bg-white rounded-xl border border-brand-100 shadow-2xs overflow-hidden transition-all">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-brand-950 hover:bg-brand-50/40 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-brand-600 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-accent-600" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 pt-1 text-xs text-zinc-600 leading-relaxed border-t border-brand-50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
