"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Calendar,
  ChevronRight,
  Shield,
  Home,
  User,
  Stethoscope,
  Clock,
  Phone,
  Sparkles,
} from "lucide-react";
import { SITE_NAME } from "@/data/siteData";

const NAV_LINKS = [
  {
    label: "Home",
    href: "/",
    description: "Welcome & Clinical Overview",
    icon: Home,
  },
  {
    label: "About Dr. Anil Pandey",
    href: "/about",
    description: "Qualifications, Experience & Approach",
    icon: User,
  },
  {
    label: "Take Appointment",
    href: "/appointment",
    description: "Schedule your in-person or clinic visit",
    icon: Calendar,
  },
  {
    label: "Consultation Booking",
    href: "/consultation",
    description: "Video, second opinion & clinic options",
    icon: Stethoscope,
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Don't show public navbar on admin pages
  const isAdminPage = pathname.startsWith("/admin");

  // Scroll detection for navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open & handle Escape key
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  if (isAdminPage) {
    return null;
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-brand-100 py-2.5 sm:py-3"
          : "bg-white/90 backdrop-blur-sm border-b border-zinc-100 py-3 sm:py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          {/* Logo / Brand */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="group flex items-center gap-2.5 sm:gap-3 transition-transform duration-200 hover:opacity-90 shrink-0 min-w-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-brand-900 flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-sm border border-brand-700 shrink-0">
              AP
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm sm:text-base lg:text-lg font-bold tracking-tight text-brand-950 group-hover:text-brand-800 transition-colors truncate">
                {SITE_NAME}
              </span>
              <span className="text-[10px] sm:text-xs font-medium text-brand-600 tracking-wider uppercase truncate">
                Medical &amp; Clinical Practice
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "text-brand-900 bg-brand-50 font-semibold shadow-2xs"
                      : "text-zinc-600 hover:text-brand-900 hover:bg-brand-50/70"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Link
              href="/appointment"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-800 hover:bg-brand-900 text-white text-sm font-semibold shadow-xs transition-all duration-200 hover:shadow active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>

            <Link
              href="/admin"
              title="Admin Portal"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 hover:border-brand-400 text-zinc-600 hover:text-brand-950 bg-white hover:bg-brand-50/70 text-xs font-semibold shadow-2xs transition-all active:scale-[0.98]"
            >
              <Shield className="w-3.5 h-3.5 text-brand-700" />
              <span>Admin</span>
            </Link>
          </div>

          {/* Mobile Actions Bar */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            <Link
              href="/appointment"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-brand-800 hover:bg-brand-900 text-white text-xs font-semibold shadow-2xs transition-all active:scale-[0.97]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span className="hidden min-[340px]:inline">Book Appt</span>
            </Link>

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              title="Admin Portal"
              className="p-1.5 sm:p-2 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-zinc-600 hover:text-brand-900 hover:bg-brand-50 border border-zinc-200 transition-colors"
            >
              <Shield className="w-4 h-4 text-brand-800" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className={`p-1.5 sm:p-2 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg transition-colors border ${
                mobileMenuOpen
                  ? "bg-brand-50 text-brand-950 border-brand-200"
                  : "bg-white text-zinc-700 hover:bg-brand-50 border-zinc-200"
              } focus:outline-none focus:ring-2 focus:ring-brand-600`}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-brand-900" />
              ) : (
                <Menu className="w-5 h-5 text-zinc-800" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Modal */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[52px] sm:top-[60px] bottom-0 z-50 flex flex-col justify-start">
          {/* Backdrop */}
          <div
            className="fixed inset-0 top-[52px] sm:top-[60px] bg-zinc-950/40 backdrop-blur-xs animate-overlay-fade"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Menu Content */}
          <div className="relative z-10 w-full bg-white border-b border-brand-100 shadow-2xl max-h-[calc(100dvh-60px)] overflow-y-auto px-4 pt-3 pb-8 space-y-4 animate-menu-slide">
            {/* Header label */}
            <div className="flex items-center justify-between px-1 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              <span>Main Menu</span>
              <span className="flex items-center gap-1 text-brand-700 normal-case font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                Quick Navigation
              </span>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1.5">
              {NAV_LINKS.map((item) => {
                const isActive = pathname === item.href;
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-brand-50/90 text-brand-950 border border-brand-200 shadow-2xs font-semibold"
                        : "text-zinc-700 hover:text-brand-900 hover:bg-zinc-50 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                          isActive
                            ? "bg-brand-800 text-white shadow-2xs"
                            : "bg-brand-50 text-brand-800"
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col min-w-0 text-left">
                        <span className="text-sm font-semibold truncate leading-tight">
                          {item.label}
                        </span>
                        <span className="text-[11px] text-zinc-500 truncate mt-0.5">
                          {item.description}
                        </span>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isActive
                          ? "text-brand-800 translate-x-0.5"
                          : "text-zinc-400"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-2 border-t border-zinc-100 flex flex-col gap-2">
              <Link
                href="/appointment"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-semibold text-sm shadow-sm active:scale-[0.98] transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Online</span>
              </Link>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/consultation"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-brand-200 bg-brand-50/50 hover:bg-brand-50 text-brand-900 font-semibold text-xs text-center transition-colors"
                >
                  <Stethoscope className="w-3.5 h-3.5 text-brand-700 shrink-0" />
                  <span className="truncate">Consultations</span>
                </Link>

                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-800 font-semibold text-xs text-center transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-brand-800 shrink-0" />
                  <span className="truncate">Admin Portal</span>
                </Link>
              </div>
            </div>

            {/* Clinic Info Footer in Drawer */}
            <div className="bg-brand-50/60 rounded-xl p-3 border border-brand-100/80 text-xs text-zinc-600 space-y-2">
              <div className="flex items-center gap-2 text-brand-950 font-semibold">
                <Clock className="w-3.5 h-3.5 text-brand-700 shrink-0" />
                <span>Consultation Hours</span>
              </div>
              <p className="text-[11px] text-zinc-600 pl-5.5 leading-relaxed">
                Mon – Sat: 09:00 AM – 06:00 PM (By Appointment)
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

