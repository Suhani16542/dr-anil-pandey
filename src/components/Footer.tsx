import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { SITE_NAME } from "@/data/siteData";

export default function Footer() {
  return (
    <footer className="bg-white text-zinc-700 border-t border-zinc-200">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand & Introduction */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-900 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                AP
              </div>
              <span className="text-xl font-bold tracking-tight text-brand-950">
                {SITE_NAME}
              </span>
            </div>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Committed to delivering compassionate, evidence-based healthcare
              and dedicated medical consultations with an emphasis on patient
              wellbeing and clinical excellence.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="#linkedin"
                aria-label="LinkedIn Profile"
                className="w-9 h-9 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-800 hover:bg-brand-800 hover:text-white hover:border-brand-800 transition-colors"
              >
                <svg
                  className="w-4 h-4 fill-currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.88 0-1.6.72-1.6 1.6 0 .88.72 1.6 1.6 1.6.88 0 1.6-.72 1.6-1.6 0-.88-.72-1.6-1.6-1.6Z" />
                </svg>
              </a>
              <a
                href="#twitter"
                aria-label="Twitter Profile"
                className="w-9 h-9 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-800 hover:bg-brand-800 hover:text-white hover:border-brand-800 transition-colors"
              >
                <svg
                  className="w-4 h-4 fill-currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#facebook"
                aria-label="Facebook Profile"
                className="w-9 h-9 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-800 hover:bg-brand-800 hover:text-white hover:border-brand-800 transition-colors"
              >
                <svg
                  className="w-4 h-4 fill-currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold tracking-wider uppercase text-brand-900">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-zinc-600 hover:text-brand-800 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-brand-600" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-zinc-600 hover:text-brand-800 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-brand-600" />
                  <span>About Dr. Anil Pandey</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/appointment"
                  className="text-zinc-600 hover:text-brand-800 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-brand-600" />
                  <span>Take an Appointment</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/consultation"
                  className="text-zinc-600 hover:text-brand-800 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-brand-600" />
                  <span>Consultation Booking</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Clinical Practice Details (Placeholders) */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold tracking-wider uppercase text-brand-900">
              Practice &amp; Hours
            </h3>
            <div className="space-y-3 text-sm text-zinc-600">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-brand-950">
                    Consultation Hours (By Appointment)
                  </div>
                  <div className="text-xs text-zinc-600 mt-0.5">
                    Monday – Saturday: 09:00 AM – 06:00 PM
                  </div>
                  <div className="text-xs text-zinc-500">
                    Sunday: Closed / Emergency On-Call
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <ShieldCheck className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
                <span className="text-xs text-zinc-500">
                  Prior appointment is recommended to ensure minimal waiting
                  time.
                </span>
              </div>
            </div>
          </div>

          {/* Contact Placeholders */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold tracking-wider uppercase text-brand-900">
              Clinic &amp; Contact
            </h3>
            <div className="space-y-3 text-sm text-zinc-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
                <span className="text-xs">
                  [Clinic / Hospital Address Placeholder, City, State, ZIP]
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-700 shrink-0" />
                <span className="text-xs">[Phone: +91 (XXX) XXX-XXXX]</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-700 shrink-0" />
                <span className="text-xs">[Email: contact@dranilpandey.com]</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>Confidential &amp; Professional Medical Consultations</span>
            <span className="hidden sm:inline">•</span>
            <span>Frontend Preview</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
