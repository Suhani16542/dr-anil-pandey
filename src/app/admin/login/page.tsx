"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldAlert, ArrowRight, Activity, ShieldCheck } from "lucide-react";
import { SITE_NAME } from "@/data/siteData";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid login credentials.");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Brand Badge */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-900 text-white font-bold text-2xl shadow-lg border border-brand-700 mb-4">
          AP
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-950">
          Admin Portal
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          {SITE_NAME} • Healthcare Management Dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl rounded-2xl border border-zinc-200">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2.5">
                <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-bold text-zinc-700 uppercase tracking-wider"
              >
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="admin@dranilpandey.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 focus:border-brand-700 focus:ring-2 focus:ring-brand-100 outline-none text-sm text-zinc-900 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold text-zinc-700 uppercase tracking-wider"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 focus:border-brand-700 focus:ring-2 focus:ring-brand-100 outline-none text-sm text-zinc-900 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-850 hover:bg-brand-900 text-white font-bold text-sm shadow-md transition-all hover:shadow-lg disabled:opacity-75 cursor-pointer mt-2"
            >
              {loading ? (
                <>
                  <Activity className="w-4 h-4 animate-spin text-brand-300" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 pt-6 border-t border-zinc-100 flex items-center justify-center gap-2 text-xs text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-brand-700" />
            <span>Encrypted Server-Side Session Security</span>
          </div>
        </div>
      </div>
    </div>
  );
}
