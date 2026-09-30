"use client";

import React, { useState } from "react";
import {
  Lock,
  Mail,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Activity,
  KeyRound,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage("New password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update password.");
      }

      setSuccessMessage("Admin password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Error updating password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-950">
          Admin Settings &amp; Security
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Manage administrator profile, credentials, and notification settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Change Password Form */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-100">
            <KeyRound className="w-5 h-5 text-brand-800" />
            <h2 className="font-bold text-base text-brand-950">Change Admin Password</h2>
          </div>

          {successMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider">
                Current Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-xs rounded-xl border border-zinc-300 focus:border-brand-700 focus:ring-2 focus:ring-brand-100 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider">
                New Password (Min 6 chars)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-xs rounded-xl border border-zinc-300 focus:border-brand-700 focus:ring-2 focus:ring-brand-100 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-xs rounded-xl border border-zinc-300 focus:border-brand-700 focus:ring-2 focus:ring-brand-100 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-brand-850 hover:bg-brand-900 text-white font-bold text-xs shadow-sm transition-all disabled:opacity-75 cursor-pointer mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Activity className="w-3.5 h-3.5 animate-spin" /> Updating...
                </span>
              ) : (
                "Update Password"
              )}
            </button>
          </form>
        </div>

        {/* System & Notification Configuration Card */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-100">
              <Mail className="w-5 h-5 text-brand-800" />
              <h2 className="font-bold text-base text-brand-950">Email Notifications</h2>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed">
              When new appointments or consultations are booked, notifications are automatically processed.
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 flex items-center justify-between">
                <span className="font-medium text-zinc-600">Admin Notification Email</span>
                <span className="font-bold text-brand-950 font-mono text-[11px]">
                  admin@dranilpandey.com
                </span>
              </div>

              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 flex items-center justify-between">
                <span className="font-medium text-zinc-600">SMTP Email Delivery</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Configured via .env
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-100">
              <ShieldCheck className="w-5 h-5 text-brand-800" />
              <h2 className="font-bold text-base text-brand-950">Security Standards</h2>
            </div>
            <ul className="text-xs text-zinc-600 space-y-2 list-disc pl-4 leading-relaxed">
              <li>Passwords encrypted with salted 10-round bcrypt hashing.</li>
              <li>HTTP-only secure session cookies preventing XSS token theft.</li>
              <li>Server-side request validation on every API endpoint.</li>
              <li>Admin portal protected from search engine indexers (`noindex`).</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
