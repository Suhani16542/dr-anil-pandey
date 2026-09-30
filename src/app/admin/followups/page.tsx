"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Phone,
  Search,
  Plus,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Filter,
  Users,
  X,
  Clock3,
} from "lucide-react";

interface PatientRef {
  _id: string;
  patientId: string;
  fullName: string;
  phone: string;
  email?: string;
  status: string;
  lastVisitDate?: string;
}

interface FollowUp {
  _id: string;
  patientId?: PatientRef;
  lastVisitDate?: string;
  followUpDate: string;
  followUpReason: string;
  status: "Pending" | "Contacted" | "Scheduled" | "Completed" | "Missed";
  assignedStaff?: string;
  notes?: string;
  createdAt: string;
}

interface FollowUpCounts {
  dueToday: number;
  overdue: number;
  totalPending: number;
}

export default function FollowUpsCRMPage() {
  const [followups, setFollowups] = useState<FollowUp[]>([]);
  const [counts, setCounts] = useState<FollowUpCounts>({ dueToday: 0, overdue: 0, totalPending: 0 });
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<"all" | "today" | "tomorrow" | "this_week" | "overdue" | "completed">("today");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // New Follow-up Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [patientSearchQuery, setPatientSearchQuery] = useState("");
  const [patientSearchResults, setPatientSearchResults] = useState<PatientRef[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<PatientRef | null>(null);
  const [formData, setFormData] = useState({
    followUpDate: new Date().toISOString().split("T")[0],
    followUpReason: "",
    status: "Pending",
    notes: "",
    assignedStaff: "Dr. Anil Pandey",
  });

  const showToast = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchFollowUps = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeFilter !== "all") params.set("filter", activeFilter);
      if (statusFilter !== "ALL") params.set("status", statusFilter);

      const res = await fetch(`/api/followups?${params.toString()}`);
      const json = await res.json();
      if (json.success) {
        setFollowups(json.data || []);
        if (json.counts) {
          setCounts(json.counts);
        }
      }
    } catch {
      showToast("Failed to load follow-ups", "error");
    } finally {
      setLoading(false);
    }
  }, [activeFilter, statusFilter]);

  useEffect(() => {
    fetchFollowUps();
  }, [fetchFollowUps]);

  // Search Patient for Modal
  useEffect(() => {
    if (!patientSearchQuery.trim()) {
      setPatientSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/patients/search?q=${encodeURIComponent(patientSearchQuery)}`);
        const json = await res.json();
        if (json.success) setPatientSearchResults(json.data || []);
      } catch (e) {
        console.error(e);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [patientSearchQuery]);

  // Update Status
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/followups/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        showToast(`Follow-up marked as ${newStatus}`, "success");
        setFollowups((prev) =>
          prev.map((f) => (f._id === id ? { ...f, status: newStatus as FollowUp["status"] } : f))
        );
        fetchFollowUps();
      }
    } catch {
      showToast("Failed to update status", "error");
    }
  };

  // Submit Modal
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) {
      showToast("Please search and select a patient", "error");
      return;
    }
    if (!formData.followUpDate || !formData.followUpReason) {
      showToast("Date and reason are required", "error");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/followups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: selectedPatient._id,
          ...formData,
        }),
      });
      const json = await res.json();
      if (json.success) {
        showToast("Follow-up task scheduled successfully", "success");
        setModalOpen(false);
        setSelectedPatient(null);
        setPatientSearchQuery("");
        fetchFollowUps();
      } else {
        showToast(json.message || "Failed to create follow-up", "error");
      }
    } catch {
      showToast("Network error creating follow-up", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Scheduled":
        return "bg-purple-50 text-purple-800 border-purple-200";
      case "Contacted":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "Pending":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Missed":
        return "bg-rose-50 text-rose-800 border-rose-200";
      default:
        return "bg-zinc-50 text-zinc-700 border-zinc-200";
    }
  };

  // Filter followups by text search locally
  const filteredFollowups = followups.filter((f) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    const pName = f.patientId?.fullName?.toLowerCase() || "";
    const pPhone = f.patientId?.phone?.toLowerCase() || "";
    const pId = f.patientId?.patientId?.toLowerCase() || "";
    const reason = f.followUpReason?.toLowerCase() || "";
    return pName.includes(q) || pPhone.includes(q) || pId.includes(q) || reason.includes(q);
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Toast */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-xl border text-sm font-medium flex items-center gap-2 animate-fade-up ${
            notification.type === "success"
              ? "bg-emerald-900 text-white border-emerald-700"
              : "bg-rose-900 text-white border-rose-700"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            <span>Patient Retention & Follow-up CRM</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 mt-1">
            Patient Follow-up Workflow
          </h1>
          <p className="text-zinc-500 text-xs mt-0.5">
            Track and contact patients due for checkups, report reviews, and treatment follow-ups.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Follow-up</span>
          </button>
          <button
            onClick={fetchFollowUps}
            className="p-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-600 transition-colors cursor-pointer"
            title="Refresh list"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Due Today</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock3 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-extrabold text-amber-900">{counts.dueToday}</div>
          <p className="text-[11px] text-zinc-400 mt-0.5">Patients scheduled for contact today</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Overdue</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-extrabold text-rose-900">{counts.overdue}</div>
          <p className="text-[11px] text-zinc-400 mt-0.5">Missed or pending past scheduled dates</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Total Active Pipeline</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-extrabold text-blue-900">{counts.totalPending}</div>
          <p className="text-[11px] text-zinc-400 mt-0.5">Total pending & scheduled follow-ups</p>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-xs space-y-3">
        {/* Date Period Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { key: "today", label: "Due Today" },
            { key: "tomorrow", label: "Tomorrow" },
            { key: "this_week", label: "This Week" },
            { key: "overdue", label: "Overdue" },
            { key: "completed", label: "Completed" },
            { key: "all", label: "All Records" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key as typeof activeFilter)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === tab.key
                  ? "bg-amber-700 text-white shadow-xs"
                  : "bg-slate-50 text-zinc-600 hover:bg-zinc-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Status Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-zinc-100">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by patient name, phone, ID, or reason..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <span className="text-xs text-zinc-500 font-semibold shrink-0">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-zinc-200 rounded-lg font-medium text-zinc-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="ALL">All</option>
              <option value="Pending">Pending</option>
              <option value="Contacted">Contacted</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Missed">Missed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Follow-ups Table */}
      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-zinc-200 text-zinc-600 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Patient</th>
                <th className="py-3.5 px-4">Phone</th>
                <th className="py-3.5 px-4">Follow-up Date</th>
                <th className="py-3.5 px-4">Reason & Notes</th>
                <th className="py-3.5 px-4">Staff</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-zinc-400">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto text-amber-700 mb-2" />
                    <span>Loading follow-up tasks...</span>
                  </td>
                </tr>
              ) : filteredFollowups.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-zinc-500">
                    <Clock className="w-8 h-8 mx-auto text-zinc-300 mb-2" />
                    <p className="font-semibold text-sm">No follow-ups found in this view</p>
                    <p className="text-xs text-zinc-400 mt-1">Switch filter tabs or schedule a new follow-up.</p>
                  </td>
                </tr>
              ) : (
                filteredFollowups.map((fol) => (
                  <tr key={fol._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-zinc-900 flex items-center gap-1.5">
                        {fol.patientId ? (
                          <Link
                            href={`/admin/patients/${fol.patientId._id}`}
                            className="hover:text-brand-700"
                          >
                            {fol.patientId.fullName}
                          </Link>
                        ) : (
                          <span>Patient</span>
                        )}
                        {fol.patientId?.patientId && (
                          <span className="font-mono text-[10px] text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded">
                            {fol.patientId.patientId}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-zinc-700">
                      {fol.patientId?.phone ? (
                        <a
                          href={`tel:${fol.patientId.phone}`}
                          className="flex items-center gap-1 hover:text-emerald-700 font-medium"
                        >
                          <Phone className="w-3 h-3 text-emerald-600" />
                          <span>{fol.patientId.phone}</span>
                        </a>
                      ) : (
                        <span className="text-zinc-300">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-zinc-800">
                        {new Date(fol.followUpDate).toLocaleDateString()}
                      </div>
                      {new Date(fol.followUpDate).getTime() < new Date().setHours(0, 0, 0, 0) &&
                        fol.status !== "Completed" && (
                          <span className="text-[10px] font-bold text-rose-600 flex items-center gap-0.5">
                            <AlertCircle className="w-3 h-3" /> Overdue
                          </span>
                        )}
                    </td>

                    <td className="py-3.5 px-4 text-zinc-700 max-w-xs">
                      <div className="font-semibold text-zinc-900 truncate">{fol.followUpReason}</div>
                      {fol.notes && <div className="text-[11px] text-zinc-500 truncate">{fol.notes}</div>}
                    </td>

                    <td className="py-3.5 px-4 text-zinc-600">
                      {fol.assignedStaff || "Dr. Anil Pandey"}
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={fol.status}
                        onChange={(e) => handleStatusChange(fol._id, e.target.value)}
                        className={`text-[10px] font-bold px-2 py-1 rounded-full border cursor-pointer focus:outline-none ${getStatusBadge(
                          fol.status
                        )}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Completed">Completed</option>
                        <option value="Missed">Missed</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {fol.patientId && (
                          <Link
                            href={`/admin/patients/${fol.patientId._id}`}
                            className="p-1.5 rounded-lg border border-zinc-200 hover:bg-emerald-50 text-zinc-600 hover:text-emerald-700"
                            title="Open Patient Profile"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        )}
                        {fol.status !== "Completed" && (
                          <button
                            onClick={() => handleStatusChange(fol._id, "Completed")}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                          >
                            Done
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SCHEDULE FOLLOWUP MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-zinc-200 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <h3 className="text-base font-extrabold text-zinc-900">Schedule Follow-up Task</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-xs">
              {/* Patient Lookup */}
              <div>
                <label className="block font-bold text-zinc-700 mb-1">
                  Select Patient <span className="text-rose-600">*</span>
                </label>
                {selectedPatient ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-bold text-zinc-900">{selectedPatient.fullName}</div>
                      <div className="text-[11px] text-zinc-500">
                        {selectedPatient.patientId} • {selectedPatient.phone}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedPatient(null)}
                      className="text-xs font-bold text-rose-600 hover:underline"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      type="text"
                      value={patientSearchQuery}
                      onChange={(e) => setPatientSearchQuery(e.target.value)}
                      placeholder="Type patient name, phone, or ID to search..."
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                    {patientSearchResults.length > 0 && (
                      <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-zinc-200 rounded-xl shadow-lg max-h-48 overflow-y-auto z-50 divide-y">
                        {patientSearchResults.map((pt) => (
                          <button
                            type="button"
                            key={pt._id}
                            onClick={() => {
                              setSelectedPatient(pt);
                              setPatientSearchQuery("");
                              setPatientSearchResults([]);
                            }}
                            className="w-full text-left p-2.5 hover:bg-emerald-50 flex items-center justify-between"
                          >
                            <div>
                              <div className="font-bold text-zinc-900">{pt.fullName}</div>
                              <div className="text-[10px] text-zinc-500">
                                {pt.patientId} • {pt.phone}
                              </div>
                            </div>
                            <span className="text-[10px] bg-zinc-100 px-1.5 py-0.5 rounded">Select</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">
                    Follow-up Target Date <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.followUpDate}
                    onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Assigned Staff</label>
                  <input
                    type="text"
                    value={formData.assignedStaff}
                    onChange={(e) => setFormData({ ...formData, assignedStaff: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">
                  Reason for Follow-up <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.followUpReason}
                  onChange={(e) => setFormData({ ...formData, followUpReason: e.target.value })}
                  placeholder="e.g. Check recovery, review blood reports, schedule next scan"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="Pending">Pending</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Notes</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Special instructions..."
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="pt-3 border-t border-zinc-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 font-bold text-zinc-600 hover:bg-zinc-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 font-bold bg-amber-700 hover:bg-amber-800 text-white rounded-xl disabled:opacity-50"
                >
                  {submitting ? "Scheduling..." : "Save Follow-up"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
