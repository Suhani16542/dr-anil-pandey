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
} from "lucide-react";
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
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
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
        return <FileText className="w-5 h-5 text-white" />;
      case "Clock":
        return <Clock className="w-5 h-5 text-white" />;
      case "CheckCircle":
        return <CheckCircle className="w-5 h-5 text-white" />;
      default:
        return <Stethoscope className="w-5 h-5 text-white" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Full-Width Hero Banner */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 -z-30 w-full h-full">
          <Image
            src={IMAGES.appointmentHero}
            alt="Doctor Clinic Appointment Booking"
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
              <CalendarIcon className="w-3.5 h-3.5 text-emerald-300" />
              <span>Direct Clinical Scheduling</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-lg [text-shadow:_0_2px_12px_rgba(0,0,0,0.8)]">
              Take an Appointment
            </h1>
            <p className="text-base sm:text-xl text-brand-100/95 leading-relaxed drop-shadow-md font-medium [text-shadow:_0_1px_6px_rgba(0,0,0,0.7)]">
              Schedule your confidential clinical consultation with {SITE_NAME}. Select your preferred date, consultation format, and review the preparation steps.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Appointment Introduction (2-Column: Left Large Image, Right Info) */}
      <section className="py-20 lg:py-28 bg-white border-b border-brand-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Large Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden bg-brand-950 border-2 border-brand-300 shadow-2xl">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={IMAGES.appointmentIntro}
                    alt="Doctor Consultation Environment"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-transparent to-transparent" />
                </div>
                <div className="p-5 bg-brand-950 text-white space-y-1">
                  <div className="font-bold text-base">In-Person &amp; Digital Consultations</div>
                  <div className="text-xs text-brand-300">Focused, one-on-one medical reviews</div>
                </div>
              </div>
            </div>

            {/* Right Column: Appointment Guide */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-brand-100 text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200">
                Consultation Guidelines
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-brand-950">
                Preparing for Your Visit with {SITE_NAME}
              </h2>

              <div className="space-y-4 text-base text-zinc-600 leading-relaxed">
                <p>
                  Appointments are organized to ensure adequate time is allocated for comprehensive clinical evaluations, symptom reviews, and open patient discussions.
                </p>
                <p>
                  <strong>Who can schedule:</strong> New patients seeking first-time evaluations, individuals requesting comprehensive second opinions, and existing patients scheduling routine clinical monitoring.
                </p>
                <p>
                  <strong>Required information:</strong> Basic personal details, a primary contact number, preferred timing, and a brief description of current health concerns or existing diagnoses.
                </p>
              </div>

              {/* Quick Info Box */}
              <div className="p-4 rounded-xl bg-brand-50/70 border border-brand-200 flex items-start gap-3 text-xs text-brand-950">
                <ShieldCheck className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Privacy Guarantee:</span> All patient health details and appointment requests are handled with complete confidentiality in accordance with medical ethics.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Appointment Process Steps */}
      <section className="py-20 lg:py-28 bg-brand-50/40 border-b border-brand-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-brand-100 text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200">
              Process
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-950">
              How the Appointment Process Works
            </h2>
            <p className="text-zinc-600 text-base">
              Four straightforward steps from initial scheduling to your dedicated clinical consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {APPOINTMENT_STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-white rounded-2xl p-6 border border-brand-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-100 text-brand-800">
                      Step {step.step}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-brand-800 flex items-center justify-center shadow">
                      {getStepIcon(step.icon)}
                    </div>
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

      {/* 4. Main Appointment Form Section */}
      <section className="py-20 lg:py-28 bg-white border-b border-brand-100/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-950">
              Request Your Consultation Slot
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base">
              Complete the scheduling form below to request an in-person clinic visit or remote video session.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
              <Info className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Submission Error:</span> {errorMessage}
              </div>
            </div>
          )}

          {submitted ? (
            /* Success Feedback State */
            <div className="rounded-2xl border-2 border-brand-300 bg-brand-50/50 p-8 sm:p-12 text-center space-y-6 shadow-lg">
              <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-800 mx-auto flex items-center justify-center">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-brand-950">
                  Appointment Request Received
                </h2>
                <p className="text-sm text-zinc-600">
                  Thank you, <span className="font-semibold">{formData.fullName || "Patient"}</span>. Your appointment request for{" "}
                  <span className="font-semibold">{formData.preferredDate || "your chosen date"}</span> has been saved securely to our clinic database and notified to our medical team.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-brand-200 text-xs text-left max-w-md mx-auto space-y-2 text-zinc-700">
                <div className="font-bold text-brand-900 border-b border-zinc-100 pb-1">
                  Request Summary:
                </div>
                <div><strong>Full Name:</strong> {formData.fullName || "N/A"}</div>
                <div><strong>Phone:</strong> {formData.phone || "N/A"}</div>
                <div><strong>Email:</strong> {formData.email || "N/A"}</div>
                <div><strong>Consultation:</strong> {formData.consultationType}</div>
                <div><strong>Time Window:</strong> {formData.preferredTime}</div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white text-sm font-semibold shadow transition-colors cursor-pointer"
              >
                <span>Submit Another Request</span>
              </button>
            </div>
          ) : (
            /* Appointment Form */
            <div className="rounded-2xl border-2 border-brand-200 bg-white p-6 sm:p-10 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Patient Information */}
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-brand-950 flex items-center gap-2 pb-2 border-b border-zinc-100">
                    <User className="w-5 h-5 text-brand-700" />
                    <span>Patient Contact Information</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 sm:col-span-2">
                      <label htmlFor="fullName" className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        required
                        placeholder="e.g. Rajesh Kumar"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-brand-700 focus:ring-2 focus:ring-brand-100 outline-none text-sm text-zinc-900 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                        <input
                          type="tel"
                          id="phone"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-300 focus:border-brand-700 focus:ring-2 focus:ring-brand-100 outline-none text-sm text-zinc-900 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                        <input
                          type="email"
                          id="email"
                          required
                          placeholder="patient@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-300 focus:border-brand-700 focus:ring-2 focus:ring-brand-100 outline-none text-sm text-zinc-900 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Schedule & Format */}
                <div className="space-y-4 pt-4">
                  <h3 className="text-base font-bold text-brand-950 flex items-center gap-2 pb-2 border-b border-zinc-100">
                    <CalendarIcon className="w-5 h-5 text-brand-700" />
                    <span>Schedule &amp; Consultation Mode</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="preferredDate" className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                        Preferred Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="preferredDate"
                        required
                        value={formData.preferredDate}
                        onChange={(e) =>
                          setFormData({ ...formData, preferredDate: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-brand-700 focus:ring-2 focus:ring-brand-100 outline-none text-sm text-zinc-900 transition-all bg-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="preferredTime" className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                        Preferred Window <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="preferredTime"
                        value={formData.preferredTime}
                        onChange={(e) =>
                          setFormData({ ...formData, preferredTime: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-brand-700 focus:ring-2 focus:ring-brand-100 outline-none text-sm text-zinc-900 bg-white transition-all"
                      >
                        <option value="morning">Morning (09:00 AM – 12:00 PM)</option>
                        <option value="afternoon">Afternoon (01:00 PM – 04:00 PM)</option>
                        <option value="evening">Evening (04:00 PM – 07:00 PM)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="consultationType" className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                        Consultation Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="consultationType"
                        value={formData.consultationType}
                        onChange={(e) =>
                          setFormData({ ...formData, consultationType: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-brand-700 focus:ring-2 focus:ring-brand-100 outline-none text-sm text-zinc-900 bg-white transition-all"
                      >
                        <option value="in-person">In-Person Clinic Visit</option>
                        <option value="online-video">Online Video Consultation</option>
                        <option value="second-opinion">Second Opinion Review</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Clinical Notes */}
                <div className="space-y-1.5 pt-2">
                  <label htmlFor="message" className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                    Clinical Symptoms / Purpose of Visit (Optional)
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Briefly describe your symptoms, ongoing treatments, or key questions for Dr. Anil Pandey..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-brand-700 focus:ring-2 focus:ring-brand-100 outline-none text-sm text-zinc-900 transition-all resize-y"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <ShieldCheck className="w-4 h-4 text-brand-700" />
                    <span>Your data remains strictly confidential</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-sm shadow-md transition-all hover:shadow-lg disabled:opacity-75 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Submitting Request...</span>
                    ) : (
                      <>
                        <CalendarIcon className="w-4 h-4" />
                        <span>Request Appointment</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* 5. Appointment FAQs Section */}
      <section className="py-20 lg:py-28 bg-brand-50/40 border-b border-brand-100/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-brand-100 text-brand-900 text-xs font-semibold uppercase tracking-wider border border-brand-200">
              Questions &amp; Answers
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-950">
              Frequently Asked Appointment Questions
            </h2>
            <p className="text-zinc-600 text-base">
              Common questions regarding appointment scheduling, preparation, and consultation formats.
            </p>
          </div>

          <div className="space-y-4">
            {APPOINTMENT_FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-white border border-brand-200 overflow-hidden shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-brand-950 hover:text-brand-800 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-brand-700 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-zinc-600 leading-relaxed border-t border-brand-100 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Final Photographic CTA */}
      <section className="relative py-20 lg:py-24 overflow-hidden text-white">
        <div className="absolute inset-0 -z-30 w-full h-full">
          <Image
            src={IMAGES.finalCtaBg}
            alt="Appointment Consultation"
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
            Dedicated Healthcare is One Step Away
          </h2>
          <p className="text-base sm:text-lg text-brand-100 max-w-xl mx-auto drop-shadow-sm font-normal">
            Take the next step toward personalized medical attention with Dr. Anil Pandey.
          </p>
          <div className="pt-2">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-brand-950 font-bold text-base shadow-xl hover:bg-brand-50 transition-colors"
            >
              <span>Explore Consultation Options</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
