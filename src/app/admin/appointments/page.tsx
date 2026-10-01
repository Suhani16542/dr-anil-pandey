"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Calendar,
  Search,
  Filter,
  Eye,
  Trash2,
  Phone,
  Mail,
  X,
  RefreshCw,
  Activity,
  FileText,
} from "lucide-react";

interface PatientRef {
  _id: string;
  patientId: string;
  fullName: string;
  phone: string;
  email?: string;
  status?: string;
}

interface AppointmentItem {
  _id: string;
  patientId?: PatientRef;
  fullName: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  consultationType: string;
  message?: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function AppointmentsAdminPage() {
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  // Filters & Search
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("");

  // Modal State
  const [selectedItem, setSelectedItem] = useState<AppointmentItem | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [adminNotesInput, setAdminNotesInput] = useState("");

  const fetchAppointments = useCallback(async (pageToLoad = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(pageToLoad),
        limit: "10",
      });

      if (search) params.set("search", search);
      if (statusFilter !== "ALL") params.set("status", statusFilter);
      if (typeFilter !== "ALL") params.set("consultationType", typeFilter);
      if (dateFilter) params.set("date", dateFilter);

      const res = await fetch(`/api/appointments?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setAppointments(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Failed to load appointments:", error);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, typeFilter, dateFilter]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchAppointments(1);
    }, 250);
    return () => clearTimeout(debounceTimer);
  }, [fetchAppointments]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setAppointments((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status: newStatus as AppointmentItem["status"] } : item))
        );
        if (selectedItem && selectedItem._id === id) {
          setSelectedItem((prev) => (prev ? { ...prev, status: newStatus as AppointmentItem["status"] } : null));
        }
      }
    } catch (err) {
      console.error("Status update error:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedItem) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/appointments/${selectedItem._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminNotes: adminNotesInput }),
      });
      const data = await res.json();
      if (data.success) {
        setAppointments((prev) =>
          prev.map((item) =>
            item._id === selectedItem._id ? { ...item, adminNotes: adminNotesInput } : item
          )
        );
        setSelectedItem((prev) => (prev ? { ...prev, adminNotes: adminNotesInput } : null));
      }
    } catch (err) {
      console.error("Notes save error:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/appointments/${deleteTargetId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setAppointments((prev) => prev.filter((item) => item._id !== deleteTargetId));
        if (selectedItem && selectedItem._id === deleteTargetId) {
          setSelectedItem(null);
        }
        setDeleteTargetId(null);
        fetchAppointments(pagination.page);
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const openViewModal = (item: AppointmentItem) => {
    setSelectedItem(item);
    setAdminNotesInput(item.adminNotes || "");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-slate-100 text-brand-900 border-zinc-200";
      case "Confirmed":
        return "bg-brand-50 text-brand-800 border-brand-200 font-semibold";
      case "Completed":
        return "bg-brand-100/60 text-brand-900 border-brand-300 font-medium";
      case "Cancelled":
        return "bg-accent-50 text-accent-800 border-accent-200";
      default:
        return "bg-zinc-100 text-zinc-800 border-zinc-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-950">
            Appointments Management
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            View, search, filter, and update patient appointment requests.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchAppointments(pagination.page)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-zinc-200 text-zinc-700 hover:text-brand-900 text-xs font-semibold shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 text-xs sm:text-sm focus:border-brand-700 focus:ring-2 focus:ring-brand-100 outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-zinc-400 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-xs sm:text-sm bg-white focus:border-brand-700 outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-xs sm:text-sm bg-white focus:border-brand-700 outline-none"
            >
              <option value="ALL">All Consultation Types</option>
              <option value="in-person">In-Person Clinic Visit</option>
              <option value="online-video">Online Video Consultation</option>
              <option value="second-opinion">Second Opinion Review</option>
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-xs sm:text-sm bg-white focus:border-brand-700 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Main Appointments Table (Desktop / Tablet) */}
      <div className="hidden md:block bg-white rounded-2xl border border-zinc-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-zinc-200 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Patient</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Schedule</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-zinc-400">
                    <Activity className="w-6 h-6 animate-spin mx-auto mb-2 text-brand-700" />
                    <span>Loading appointments...</span>
                  </td>
                </tr>
              ) : appointments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-zinc-400">
                    <Calendar className="w-8 h-8 mx-auto mb-2 text-zinc-300" />
                    <p className="font-semibold text-zinc-700">No appointments found</p>
                    <p className="text-xs text-zinc-400 mt-0.5">Try resetting search filters.</p>
                  </td>
                </tr>
              ) : (
                appointments.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-medium text-brand-950">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-brand-50 text-brand-800 flex items-center justify-center font-bold text-xs shrink-0">
                          {item.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold">{item.fullName}</span>
                            {item.patientId?.patientId && (
                              <Link
                                href={`/admin/patients/${item.patientId._id}`}
                                className="font-mono text-[10px] text-brand-700 bg-brand-50 hover:bg-brand-100 px-1.5 py-0.5 rounded font-semibold border border-brand-200"
                                title="Open Patient CRM Profile"
                              >
                                {item.patientId.patientId}
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-xs text-zinc-600 space-y-0.5">
                      <div className="flex items-center gap-1.5 font-mono">
                        <Phone className="w-3 h-3 text-zinc-400" />
                        <span>{item.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-zinc-500">
                        <Mail className="w-3 h-3 text-zinc-400" />
                        <span className="truncate max-w-[150px]">{item.email}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-xs">
                      <div className="font-semibold text-brand-950 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-brand-700" />
                        <span>{item.preferredDate}</span>
                      </div>
                      <div className="text-zinc-500 capitalize">{item.preferredTime}</div>
                    </td>

                    <td className="py-3.5 px-4 text-xs text-zinc-700">
                      <span className="capitalize">{item.consultationType.replace("-", " ")}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item._id, e.target.value)}
                        disabled={actionLoading}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border outline-none cursor-pointer ${getStatusBadge(
                          item.status
                        )}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-xs text-zinc-400 whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>

                    <td className="py-3.5 px-4 sm:px-6 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => openViewModal(item)}
                        className="p-1.5 rounded-lg text-brand-800 hover:bg-brand-50 border border-brand-200 transition-colors"
                        title="View Full Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTargetId(item._id)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-zinc-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <div>
            Showing <strong>{appointments.length}</strong> of <strong>{pagination.total}</strong> appointments
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchAppointments(pagination.page - 1)}
              disabled={pagination.page <= 1 || loading}
              className="px-3 py-1.5 rounded-lg bg-white border border-zinc-200 disabled:opacity-50 text-zinc-700 hover:bg-zinc-50"
            >
              Previous
            </button>
            <span className="font-semibold text-zinc-700">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => fetchAppointments(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages || loading}
              className="px-3 py-1.5 rounded-lg bg-white border border-zinc-200 disabled:opacity-50 text-zinc-700 hover:bg-zinc-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Card Layout (Visible on Small Screens) */}
      <div className="md:hidden space-y-3">
        {loading ? (
          <div className="bg-white p-8 rounded-2xl border border-zinc-200 text-center text-zinc-400 text-xs">
            <Activity className="w-6 h-6 animate-spin mx-auto mb-2 text-brand-700" />
            <span>Loading appointments...</span>
          </div>
        ) : appointments.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-zinc-200 text-center text-zinc-400 text-xs">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-zinc-300" />
            <p className="font-semibold text-zinc-700">No appointments found</p>
          </div>
        ) : (
          appointments.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-xs space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-zinc-900">{item.fullName}</span>
                    {item.patientId?.patientId && (
                      <Link
                        href={`/admin/patients/${item.patientId._id}`}
                        className="font-mono text-[10px] text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded font-semibold border border-brand-200"
                      >
                        {item.patientId.patientId}
                      </Link>
                    )}
                  </div>
                  <div className="text-xs text-zinc-500 mt-0.5">
                    {item.preferredDate} • {item.preferredTime}
                  </div>
                </div>

                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(item._id, e.target.value)}
                  className={`text-[10px] font-bold px-2 py-1 rounded-full border cursor-pointer ${getStatusBadge(
                    item.status
                  )}`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-600 pt-1 border-t border-zinc-100">
                <a href={`tel:${item.phone}`} className="flex items-center gap-1 hover:text-brand-700 font-medium">
                  <Phone className="w-3.5 h-3.5 text-brand-600" />
                  <span>{item.phone}</span>
                </a>
                <span className="capitalize text-zinc-500">{item.consultationType.replace("-", " ")}</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1 border-t border-zinc-100">
                <button
                  onClick={() => openViewModal(item)}
                  className="px-3 py-1.5 rounded-lg bg-brand-50 text-brand-900 font-semibold text-xs flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Details</span>
                </button>
                <button
                  onClick={() => setDeleteTargetId(item._id)}
                  className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 border border-rose-200"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Appointment Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-zinc-200 overflow-hidden animate-fade-up max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-5 bg-brand-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-brand-300" />
                <h3 className="font-bold text-base">Appointment Details</h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1 rounded-lg text-zinc-300 hover:text-white hover:bg-brand-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-zinc-700">
              {/* Patient Profile */}
              <div className="p-4 rounded-xl bg-brand-50/60 border border-brand-100 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-brand-800 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {selectedItem.fullName.charAt(0)}
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-base text-brand-950">{selectedItem.fullName}</h4>
                  <div className="text-xs text-zinc-600 flex flex-wrap gap-x-4">
                    <span>📞 {selectedItem.phone}</span>
                    <span>✉️ {selectedItem.email}</span>
                  </div>
                </div>
              </div>

              {/* Booking Info Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1">
                  <span className="text-zinc-500 font-bold uppercase text-[10px]">Preferred Date</span>
                  <div className="font-bold text-sm text-brand-950">{selectedItem.preferredDate}</div>
                </div>
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1">
                  <span className="text-zinc-500 font-bold uppercase text-[10px]">Time Window</span>
                  <div className="font-bold text-sm text-brand-950 capitalize">{selectedItem.preferredTime}</div>
                </div>
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1">
                  <span className="text-zinc-500 font-bold uppercase text-[10px]">Consultation Mode</span>
                  <div className="font-bold text-sm text-brand-950 capitalize">{selectedItem.consultationType}</div>
                </div>
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1">
                  <span className="text-zinc-500 font-bold uppercase text-[10px]">Current Status</span>
                  <div>
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(selectedItem.status)}`}>
                      {selectedItem.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Message / Symptoms */}
              {selectedItem.message && (
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-zinc-700 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-brand-700" />
                    <span>Patient Symptoms / Message</span>
                  </span>
                  <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-700 leading-relaxed">
                    {selectedItem.message}
                  </div>
                </div>
              )}

              {/* Admin Notes Field */}
              <div className="space-y-2 pt-2 border-t border-zinc-100">
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider">
                  Internal Clinic Notes
                </label>
                <textarea
                  rows={3}
                  value={adminNotesInput}
                  onChange={(e) => setAdminNotesInput(e.target.value)}
                  placeholder="Add private clinical remarks, prescription followup, or payment status..."
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-100"
                />
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={actionLoading}
                  className="px-4 py-1.5 rounded-lg bg-brand-850 hover:bg-brand-900 text-white text-xs font-semibold shadow-xs"
                >
                  Save Clinic Notes
                </button>
              </div>

              {/* Status Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-zinc-100">
                <span className="text-xs font-bold text-zinc-700">Quick Status Update:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleStatusChange(selectedItem._id, "Confirmed")}
                    className="px-3 py-1.5 rounded-lg bg-brand-100 text-brand-900 text-xs font-semibold hover:bg-brand-200"
                  >
                    ✓ Confirm Booking
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedItem._id, "Completed")}
                    className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-800 text-xs font-semibold hover:bg-blue-200"
                  >
                    Mark Completed
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedItem._id, "Cancelled")}
                    className="px-3 py-1.5 rounded-lg bg-rose-100 text-rose-800 text-xs font-semibold hover:bg-rose-200"
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-zinc-200 flex items-center justify-between text-xs">
              <span className="text-zinc-400">
                Submitted on {new Date(selectedItem.createdAt).toLocaleString()}
              </span>
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 rounded-xl bg-zinc-200 hover:bg-zinc-300 font-semibold text-zinc-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-zinc-200 text-center animate-fade-up">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-zinc-900">Delete Appointment?</h3>
              <p className="text-xs text-zinc-500">
                Are you sure you want to permanently delete this appointment record? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={actionLoading}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs"
              >
                {actionLoading ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
