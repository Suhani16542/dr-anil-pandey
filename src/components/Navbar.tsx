"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Calendar, ChevronRight, Shield } from "lucide-react";
import { NAV_ITEMS, SITE_NAME } from "@/data/siteData";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Don't show public navbar on admin pages
  const isAdminPage = pathname.startsWith("/admin");

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (isAdminPage) {
    return null;
  }

  // Hide the currently active page from the mobile menu so all other navigation options are immediately accessible
  const mobileNavItems = NAV_ITEMS.filter((item) => item.href !== pathname);

  return (
    <header
      className={`sticky top-0 z-50 w-full relative transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-brand-100 py-3"
          : "bg-white/90 backdrop-blur-sm border-b border-zinc-100 py-3.5 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo / Brand */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="group flex items-center gap-2.5 sm:gap-3 transition-transform duration-200 hover:opacity-95 shrink-0"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-900 flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-xs border border-brand-700 shrink-0">
              <span>AP</span>
              {/* Subtle Medical Red Accent Dot */}
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-accent-600 border-2 border-white shadow-xs" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-brand-950 group-hover:text-brand-700 transition-colors leading-tight">
                {SITE_NAME}
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-brand-600 tracking-wider uppercase">
                Medical &amp; Clinical Practice
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links - Evenly Spaced & Centered */}
          <nav className="hidden lg:flex items-center gap-1 bg-zinc-50/80 p-1 rounded-xl border border-zinc-200/60">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-1.5 rounded-lg text-sm transition-all duration-150 ${
                    isActive
                      ? "text-brand-950 bg-white font-semibold shadow-xs border border-brand-200/60"
                      : "text-zinc-600 hover:text-brand-900 hover:bg-white/80 font-medium"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Buttons (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <Link
              href="/appointment"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold shadow-xs transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>

            <Link
              href="/admin"
              title="Admin Portal"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-200 hover:border-brand-300 text-zinc-600 hover:text-brand-900 bg-white hover:bg-brand-50 text-xs font-semibold shadow-2xs transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-brand-700" />
              <span>Admin</span>
            </Link>
          </div>

          {/* Mobile Right Menu Toggle Icon */}
          <div className="flex lg:hidden items-center shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 min-h-[42px] min-w-[42px] flex items-center justify-center rounded-xl text-zinc-700 hover:text-brand-900 hover:bg-brand-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-600 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-brand-900" />
              ) : (
                <Menu className="w-5 h-5 text-brand-900" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu (Overlays Hero Section) */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            className="lg:hidden fixed inset-0 top-0 left-0 right-0 bottom-0 bg-black/40 backdrop-blur-xs z-40 animate-overlay-fade"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Dropdown panel directly underneath the header */}
          <div className="lg:hidden absolute top-full left-0 right-0 w-full bg-white border-b border-brand-200/80 shadow-2xl z-50 max-h-[calc(100vh-80px)] overflow-y-auto animate-menu-slide">
            <div className="px-4 py-3.5 space-y-1">
              {/* Other Navigation Items */}
              {mobileNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-lg text-base font-semibold text-zinc-800 hover:text-brand-900 hover:bg-brand-50/80 transition-colors"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-zinc-400" />
                </Link>
              ))}

              {/* Action Buttons in Mobile Menu */}
              <div className="pt-3 mt-2 border-t border-zinc-100 flex flex-col gap-2">
                {pathname !== "/appointment" && (
                  <Link
                    href="/appointment"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-sm transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book an Appointment</span>
                  </Link>
                )}

                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-100 text-brand-950 font-semibold text-xs border border-zinc-200 hover:bg-brand-50 transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-brand-700" />
                  <span>Admin Dashboard Portal</span>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}




