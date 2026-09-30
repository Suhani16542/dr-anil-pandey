"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Video,
  MessageSquare,
  Clock,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  Activity,
  User,
  Search,
  ChevronRight,
  UserPlus,
} from "lucide-react";
import { SITE_NAME } from "@/data/siteData";

interface AdminUser {
  adminId: string;
  email: string;
  name: string;
  role: string;
}

interface PatientSearchResult {
  _id: string;
  patientId: string;
  fullName: string;
  phone: string;
  email?: string;
  status: string;
  lastVisitDate?: string;
  nextFollowUpDate?: string;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(() => !isLoginPage);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  // Global Quick Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<PatientSearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  // Check authentication session
  useEffect(() => {
    if (isLoginPage) return;

    let isMounted = true;
    async function checkSession() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.push("/admin/login");
          return;
        }
        const data = await res.json();
        if (data.success && isMounted) {
          setAdmin(data.data.admin);
        } else if (isMounted) {
          router.push("/admin/login");
        }
      } catch {
        if (isMounted) router.push("/admin/login");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    checkSession();
    return () => {
      isMounted = false;
    };
  }, [isLoginPage, router]);

  // Global Search Debounce
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSearchOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(`/api/patients/search?q=${encodeURIComponent(searchQuery)}`);
        const json = await res.json();
        if (json.success) {
          setSearchResults(json.data);
          setSearchOpen(true);
        }
      } catch (err) {
        console.error("Global search error:", err);
      } finally {
        setSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Click outside to close search dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  // If on login page, render children directly without dashboard shell
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <Activity className="w-8 h-8 text-brand-700 animate-spin" />
          <span className="text-xs sm:text-sm font-medium text-zinc-600">Verifying Admin Session...</span>
        </div>
      </div>
    );
  }

  const navLinks = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Patients", href: "/admin/patients", icon: Users, highlight: true },
    { label: "Appointments", href: "/admin/appointments", icon: Calendar },
    { label: "Consultations", href: "/admin/consultations", icon: Video },
    { label: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
    { label: "Patient Follow-ups", href: "/admin/followups", icon: Clock },
    { label: "Reports", href: "/admin/reports", icon: BarChart3 },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row font-sans">
      {/* Desktop Sidebar (Fixed Width on lg+, Hidden on Mobile) */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-brand-950 text-white border-r border-brand-900 shrink-0 select-none">
        {/* Brand Header */}
        <div className="p-5 xl:p-6 border-b border-brand-900 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-800 border border-brand-600 flex items-center justify-center font-bold text-lg text-white shadow-sm">
            AP
          </div>
          <div>
            <div className="font-bold text-sm tracking-tight text-white leading-tight">
              {SITE_NAME}
            </div>
            <div className="text-[11px] text-emerald-400 font-semibold tracking-wider uppercase">
              Patient CRM System
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navLinks.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-brand-800 text-white font-semibold shadow-sm border border-brand-600/60"
                    : "text-zinc-300 hover:text-white hover:bg-brand-900/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-4 h-4 ${isActive ? "text-emerald-300" : "text-zinc-400"}`} />
                  <span>{item.label}</span>
                </div>
                {item.highlight && (
                  <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    CRM
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Logout Bottom Area */}
        <div className="p-4 border-t border-brand-900 bg-brand-950/80 space-y-3">
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-8 h-8 rounded-full bg-brand-800 border border-brand-600 flex items-center justify-center text-white shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">
                {admin?.name || "Dr. Anil Pandey"}
              </div>
              <div className="text-[10px] text-zinc-400 truncate">
                {admin?.email || "admin@dranilpandey.com"}
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-brand-900 hover:bg-red-900/80 text-zinc-300 hover:text-white text-xs font-semibold transition-colors border border-brand-800 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Body */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-zinc-200 sticky top-0 z-30 px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-xs gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden p-2 rounded-lg text-zinc-700 hover:bg-zinc-100 cursor-pointer shrink-0"
              aria-label="Toggle Mobile Sidebar"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h2 className="text-sm sm:text-base lg:text-lg font-bold text-brand-950 capitalize truncate">
              {pathname === "/admin"
                ? "CRM Overview"
                : pathname === "/admin/patients"
                ? "Patients CRM"
                : pathname.startsWith("/admin/patients/")
                ? "Patient Profile"
                : pathname.replace("/admin/", "").replace("-", " ")}
            </h2>
          </div>

          {/* Center Search Bar (Desktop / Tablet) */}
          <div className="relative flex-1 max-w-md mx-2 hidden md:block" ref={searchRef}>
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (searchResults.length > 0) setSearchOpen(true);
                }}
                placeholder="Search patient by name, phone, or ID (e.g. PAT-1001)..."
                className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-zinc-200 rounded-lg text-xs text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
              />
              {searching && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Activity className="w-3.5 h-3.5 text-brand-600 animate-spin" />
                </div>
              )}
            </div>

            {/* Quick Search Dropdown */}
            {searchOpen && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-zinc-200 rounded-xl shadow-xl overflow-hidden z-50 animate-fade-down">
                <div className="p-2 border-b border-zinc-100 bg-slate-50 flex items-center justify-between text-[11px] font-semibold text-zinc-500">
                  <span>Patient Results ({searchResults.length})</span>
                  <span>Click to view</span>
                </div>
                {searchResults.length === 0 ? (
                  <div className="p-4 text-center text-xs text-zinc-500">
                    No matching patients found for &quot;{searchQuery}&quot;
                  </div>
                ) : (
                  <div className="max-h-72 overflow-y-auto divide-y divide-zinc-100">
                    {searchResults.map((pt) => (
                      <Link
                        key={pt._id}
                        href={`/admin/patients/${pt._id}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="p-2.5 flex items-center justify-between hover:bg-emerald-50/60 transition-colors group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-800 flex items-center justify-center font-bold text-xs shrink-0">
                            {pt.fullName.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-zinc-900 flex items-center gap-2 truncate">
                              <span className="truncate">{pt.fullName}</span>
                              <span className="font-mono text-[10px] text-zinc-500 font-semibold bg-zinc-100 px-1 rounded shrink-0">
                                {pt.patientId}
                              </span>
                            </div>
                            <div className="text-[11px] text-zinc-500 truncate">
                              {pt.phone} {pt.email && `• ${pt.email}`}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              pt.status === "Active"
                                ? "bg-emerald-100 text-emerald-800"
                                : pt.status === "Follow-up Required"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-zinc-100 text-zinc-700"
                            }`}
                          >
                            {pt.status}
                          </span>
                          <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-brand-700 transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Header Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="md:hidden p-2 rounded-lg text-zinc-600 hover:bg-zinc-100 border border-zinc-200"
              aria-label="Toggle Mobile Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <Link
              href="/admin/patients"
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold transition-colors shadow-xs"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span className="hidden min-[420px]:inline">Patients</span>
            </Link>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-lg border border-zinc-200 hover:border-brand-300 text-zinc-700 hover:text-brand-900 text-xs font-medium transition-colors bg-white"
            >
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
              <span className="hidden sm:inline">Website</span>
            </Link>
          </div>
        </header>

        {/* Mobile Search Bar Expandable Drawer */}
        {mobileSearchOpen && (
          <div className="md:hidden bg-white border-b border-zinc-200 p-3 animate-fade-down" ref={mobileSearchRef}>
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patient name, phone, ID..."
                autoFocus
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            {searchResults.length > 0 && (
              <div className="mt-2 bg-white border border-zinc-200 rounded-xl max-h-56 overflow-y-auto divide-y shadow-lg">
                {searchResults.map((pt) => (
                  <Link
                    key={pt._id}
                    href={`/admin/patients/${pt._id}`}
                    onClick={() => {
                      setMobileSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="p-2.5 flex items-center justify-between hover:bg-emerald-50 text-xs"
                  >
                    <div>
                      <div className="font-bold text-zinc-900">{pt.fullName}</div>
                      <div className="text-[10px] text-zinc-500">
                        {pt.patientId} • {pt.phone}
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-zinc-100">
                      {pt.status}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mobile Navigation Drawer with Backdrop */}
        {mobileNavOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-2xs flex flex-col justify-start">
            <div className="bg-brand-950 text-white border-b border-brand-900 p-4 space-y-2 max-h-[85vh] overflow-y-auto animate-fade-down">
              <div className="flex items-center justify-between pb-3 border-b border-brand-900">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-800 flex items-center justify-center font-bold text-sm text-white">
                    AP
                  </div>
                  <span className="font-bold text-sm">{SITE_NAME} CRM</span>
                </div>
                <button
                  onClick={() => setMobileNavOpen(false)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {navLinks.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileNavOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium ${
                      isActive
                        ? "bg-brand-800 text-white font-semibold shadow-xs"
                        : "text-zinc-300 hover:bg-brand-900"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.highlight && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        CRM
                      </span>
                    )}
                  </Link>
                );
              })}

              <div className="pt-3 border-t border-brand-900">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-sm font-medium cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Routed Page Area */}
        <main className="p-3.5 sm:p-6 lg:p-8 flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
