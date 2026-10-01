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
    <footer className="bg-brand-950 text-zinc-300 border-t border-brand-900">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-7">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand & Introduction */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-xl bg-brand-900 flex items-center justify-center text-white font-bold text-base shadow-sm border border-brand-700 shrink-0">
                <span>AP</span>
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-accent-500 border border-brand-950 shadow-xs" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                {SITE_NAME}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Committed to delivering compassionate, evidence-based healthcare
              and dedicated medical consultations with an emphasis on patient
              wellbeing and clinical excellence.
            </p>
            <div className="pt-1 flex items-center gap-2.5">
              <a
                href="#linkedin"
                aria-label="LinkedIn Profile"
                className="w-8 h-8 rounded-full bg-brand-900/80 border border-brand-800 flex items-center justify-center text-brand-300 hover:bg-accent-600 hover:text-white hover:border-accent-500 transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5 fill-currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.88 0-1.6.72-1.6 1.6 0 .88.72 1.6 1.6 1.6.88 0 1.6-.72 1.6-1.6 0-.88-.72-1.6-1.6-1.6Z" />
                </svg>
              </a>
              <a
                href="#twitter"
                aria-label="Twitter Profile"
                className="w-8 h-8 rounded-full bg-brand-900/80 border border-brand-800 flex items-center justify-center text-brand-300 hover:bg-accent-600 hover:text-white hover:border-accent-500 transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5 fill-currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#facebook"
                aria-label="Facebook Profile"
                className="w-8 h-8 rounded-full bg-brand-900/80 border border-brand-800 flex items-center justify-center text-brand-300 hover:bg-accent-600 hover:text-white hover:border-accent-500 transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5 fill-currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-wider uppercase text-brand-200 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-accent-500" />
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="/"
                  className="text-zinc-400 hover:text-accent-400 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                >
                  <ArrowRight className="w-3 h-3 text-accent-500" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-zinc-400 hover:text-accent-400 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                >
                  <ArrowRight className="w-3 h-3 text-accent-500" />
                  <span>About Dr. Anil Pandey</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/videos"
                  className="text-zinc-400 hover:text-accent-400 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                >
                  <ArrowRight className="w-3 h-3 text-accent-500" />
                  <span>Videos</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-zinc-400 hover:text-accent-400 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                >
                  <ArrowRight className="w-3 h-3 text-accent-500" />
                  <span>Medical Blog &amp; Articles</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/appointment"
                  className="text-zinc-400 hover:text-accent-400 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                >
                  <ArrowRight className="w-3 h-3 text-accent-500" />
                  <span>Take an Appointment</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/consultation"
                  className="text-zinc-400 hover:text-accent-400 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                >
                  <ArrowRight className="w-3 h-3 text-accent-500" />
                  <span>Consultation Booking</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Clinical Practice Details */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-wider uppercase text-brand-200 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-accent-500" />
              Practice &amp; Hours
            </h3>
            <div className="space-y-2.5 text-xs sm:text-sm text-zinc-400">
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-accent-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">
                    Consultation Hours (By Appointment)
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">
                    Monday – Saturday: 09:00 AM – 06:00 PM
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    Sunday: Closed / Emergency On-Call
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-accent-400 shrink-0 mt-0.5" />
                <span className="text-[11px] text-zinc-400">
                  Prior appointment is recommended to ensure minimal waiting
                  time.
                </span>
              </div>
            </div>
          </div>

          {/* Contact Placeholders */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-wider uppercase text-brand-200 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-accent-500" />
              Clinic &amp; Contact
            </h3>
            <div className="space-y-2.5 text-xs sm:text-sm text-zinc-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-accent-400 shrink-0 mt-0.5" />
                <span className="text-xs">
                  [Clinic / Hospital Address Placeholder, City, State, ZIP]
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-accent-400 shrink-0" />
                <span className="text-xs">[Phone: +91 (XXX) XXX-XXXX]</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-accent-400 shrink-0" />
                <span className="text-xs">[Email: contact@dranilpandey.com]</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-5 border-t border-brand-900/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <p>
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-zinc-400">Confidential &amp; Professional Medical Consultations</span>
            <span className="hidden sm:inline text-zinc-600">•</span>
            <span className="text-zinc-500">Frontend Preview</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
