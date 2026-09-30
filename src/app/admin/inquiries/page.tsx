"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  MessageSquare,
  Search,
  Filter,
  Trash2,
  Phone,
  Mail,
  RefreshCw,
  Activity,
} from "lucide-react";

interface InquiryItem {
  _id: string;
  name: string;
  phone?: string;
  email: string;
  message: string;
  status: "New" | "Contacted" | "Resolved";
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

export default function InquiriesAdminPage() {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchInquiries = useCallback(async (pageToLoad = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(pageToLoad),
        limit: "10",
      });

      if (search) params.set("search", search);
      if (statusFilter !== "ALL") params.set("status", statusFilter);

      const res = await fetch(`/api/inquiries?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setInquiries(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Failed to load inquiries:", error);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchInquiries(1);
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchInquiries]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status: newStatus as InquiryItem["status"] } : item))
        );
      }
    } catch (err) {
      console.error("Inquiry status update error:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/inquiries/${deleteTargetId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) => prev.filter((item) => item._id !== deleteTargetId));
        setDeleteTargetId(null);
        fetchInquiries(pagination.page);
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "New":
        return "bg-purple-50 text-purple-800 border-purple-200";
      case "Contacted":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Resolved":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      default:
        return "bg-zinc-100 text-zinc-800 border-zinc-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-950">
            Inquiries Management
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            General patient inquiries and communication requests.
          </p>
        </div>

        <button
          onClick={() => fetchInquiries(pagination.page)}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-zinc-200 text-zinc-700 hover:text-brand-900 text-xs font-semibold shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search sender, email, message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 text-xs sm:text-sm focus:border-brand-700 focus:ring-2 focus:ring-brand-100 outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-zinc-400 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-xs sm:text-sm bg-white focus:border-brand-700 outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table - Desktop/Tablet */}
      <div className="hidden md:block bg-white rounded-2xl border border-zinc-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-zinc-200 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Sender</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Message</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Received</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-400">
                    <Activity className="w-6 h-6 animate-spin mx-auto mb-2 text-brand-700" />
                    <span>Loading inquiries...</span>
                  </td>
                </tr>
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-400">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 text-zinc-300" />
                    <p className="font-semibold text-zinc-700">No inquiries found</p>
                  </td>
                </tr>
              ) : (
                inquiries.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-brand-950">
                      {item.name}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-zinc-600 space-y-0.5">
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-zinc-400" />
                        <span>{item.email}</span>
                      </div>
                      {item.phone && (
                        <div className="flex items-center gap-1 font-mono">
                          <Phone className="w-3 h-3 text-zinc-400" />
                          <span>{item.phone}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-zinc-700 max-w-xs truncate">
                      {item.message}
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
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-zinc-400 whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                      <button
                        onClick={() => setDeleteTargetId(item._id)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
                        title="Delete Inquiry"
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
            Showing <strong>{inquiries.length}</strong> of <strong>{pagination.total}</strong> inquiries
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchInquiries(pagination.page - 1)}
              disabled={pagination.page <= 1 || loading}
              className="px-3 py-1.5 rounded-lg bg-white border border-zinc-200 disabled:opacity-50 text-zinc-700 hover:bg-zinc-50"
            >
              Previous
            </button>
            <span className="font-semibold text-zinc-700">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => fetchInquiries(pagination.page + 1)}
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
            <span>Loading inquiries...</span>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-zinc-200 text-center text-zinc-400 text-xs">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 text-zinc-300" />
            <p className="font-semibold text-zinc-700">No inquiries found</p>
          </div>
        ) : (
          inquiries.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-xs space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-bold text-sm text-zinc-900">{item.name}</span>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(item._id, e.target.value)}
                  disabled={actionLoading}
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border outline-none cursor-pointer ${getStatusBadge(
                    item.status
                  )}`}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-zinc-100 text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-zinc-600">
                  <Mail className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span className="truncate">{item.email}</span>
                </div>
                {item.phone && (
                  <div className="flex items-center gap-1.5 text-zinc-600 font-mono">
                    <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span>{item.phone}</span>
                  </div>
                )}
              </div>

              <div className="text-xs text-zinc-700 bg-amber-50/50 p-2.5 rounded-xl border border-amber-100/80 leading-relaxed">
                <span className="font-semibold text-amber-900 block mb-0.5 text-[10px] uppercase">Message:</span>
                {item.message}
              </div>

              <div className="flex items-center justify-end pt-1 border-t border-zinc-100">
                <button
                  onClick={() => setDeleteTargetId(item._id)}
                  className="px-2.5 py-1 rounded-lg text-rose-600 bg-rose-50 border border-rose-200 text-xs font-semibold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))
        )}

        {/* Mobile Pagination */}
        {inquiries.length > 0 && (
          <div className="p-3 bg-white rounded-xl border border-zinc-200 flex items-center justify-between text-xs text-zinc-600">
            <button
              onClick={() => fetchInquiries(pagination.page - 1)}
              disabled={pagination.page <= 1 || loading}
              className="px-2.5 py-1 rounded bg-slate-50 border border-zinc-200 disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {pagination.page} / {pagination.totalPages}
            </span>
            <button
              onClick={() => fetchInquiries(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages || loading}
              className="px-2.5 py-1 rounded bg-slate-50 border border-zinc-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-zinc-200 text-center animate-fade-up">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-zinc-900">Delete Inquiry?</h3>
              <p className="text-xs text-zinc-500">
                Are you sure you want to delete this message? This action cannot be undone.
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
