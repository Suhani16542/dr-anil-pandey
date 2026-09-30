"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Plus,
  RefreshCw,
  Phone,
  Mail,
  Calendar,
  Clock,
  Edit,
  FileText,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  CheckCircle2,
  AlertCircle,
  MapPin,
  CalendarPlus,
} from "lucide-react";

interface Patient {
  _id: string;
  patientId: string;
  fullName: string;
  phone: string;
  email?: string;
  gender?: string;
  dob?: string;
  age?: number;
  address?: string;
  city?: string;
  emergencyContact?: {
    name?: string;
    phone?: string;
    relationship?: string;
  };
  reasonForConsultation?: string;
  currentConcerns?: string;
  relevantHistory?: string;
  allergies?: string;
  currentMedications?: string;
  previousTreatments?: string;
  notes?: string;
  patientSource?: string;
  assignedStaff?: string;
  status: "Active" | "Follow-up Required" | "Inactive" | "Archived";
  internalNotes?: string;
  lastVisitDate?: string;
  nextFollowUpDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function PatientsDirectoryPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [genderFilter, setGenderFilter] = useState("ALL");
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  // Modal States
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [activeModalPatient, setActiveModalPatient] = useState<Patient | null>(null);
  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const [followUpModalOpen, setFollowUpModalOpen] = useState(false);
  const [noteModalOpen, setNoteModalOpen] = useState(false);

  // Form Submitting & Notifications
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Add Patient Form state
  const initialAddForm = {
    fullName: "",
    phone: "",
    email: "",
    gender: "Prefer not to say",
    dob: "",
    age: "",
    address: "",
    city: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRel: "",
    reasonForConsultation: "",
    currentConcerns: "",
    relevantHistory: "",
    allergies: "",
    currentMedications: "",
    previousTreatments: "",
    patientSource: "Direct Clinic Registration",
    assignedStaff: "Dr. Anil Pandey",
    status: "Active",
    internalNotes: "",
  };
  const [addFormData, setAddFormData] = useState(initialAddForm);

  // Quick Action Form states
  const [visitFormData, setVisitFormData] = useState({
    visitDate: new Date().toISOString().split("T")[0],
    visitType: "Clinical Consultation",
    reason: "",
    consultationNotes: "",
    findings: "",
    treatmentNotes: "",
    followUpRecommendation: "",
    nextFollowUpDate: "",
    internalNotes: "",
  });

  const [followUpFormData, setFollowUpFormData] = useState({
    followUpDate: "",
    followUpReason: "",
    status: "Pending",
    notes: "",
  });

  const [noteContent, setNoteContent] = useState("");

  const showToast = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchPatients = useCallback(
    async (pageToFetch = pagination.page) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search.trim()) params.set("search", search.trim());
        if (statusFilter && statusFilter !== "ALL") params.set("status", statusFilter);
        if (genderFilter && genderFilter !== "ALL") params.set("gender", genderFilter);
        params.set("page", String(pageToFetch));
        params.set("limit", String(pagination.limit));

        const res = await fetch(`/api/patients?${params.toString()}`);
        const data = await res.json();
        if (data.success) {
          setPatients(data.data);
          setPagination(data.pagination);
        }
      } catch (err) {
        console.error("Error fetching patients:", err);
        showToast("Failed to fetch patients list", "error");
      } finally {
        setLoading(false);
      }
    },
    [search, statusFilter, genderFilter, pagination.limit, pagination.page]
  );

  useEffect(() => {
    fetchPatients(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, genderFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPatients(1);
  };

  // Submit Add Patient
  const handleAddPatientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addFormData.fullName.trim() || !addFormData.phone.trim()) {
      showToast("Full Name and Phone number are required", "error");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        fullName: addFormData.fullName.trim(),
        phone: addFormData.phone.trim(),
        email: addFormData.email.trim(),
        gender: addFormData.gender,
        dob: addFormData.dob,
        age: addFormData.age ? Number(addFormData.age) : undefined,
        address: addFormData.address.trim(),
        city: addFormData.city.trim(),
        emergencyContact: {
          name: addFormData.emergencyContactName.trim(),
          phone: addFormData.emergencyContactPhone.trim(),
          relationship: addFormData.emergencyContactRel.trim(),
        },
        reasonForConsultation: addFormData.reasonForConsultation.trim(),
        currentConcerns: addFormData.currentConcerns.trim(),
        relevantHistory: addFormData.relevantHistory.trim(),
        allergies: addFormData.allergies.trim(),
        currentMedications: addFormData.currentMedications.trim(),
        previousTreatments: addFormData.previousTreatments.trim(),
        patientSource: addFormData.patientSource,
        assignedStaff: addFormData.assignedStaff,
        status: addFormData.status,
        internalNotes: addFormData.internalNotes.trim(),
      };

      const res = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        showToast(`Patient ${data.data.fullName} registered successfully (${data.data.patientId})`, "success");
        setAddModalOpen(false);
        setAddFormData(initialAddForm);
        fetchPatients(1);
      } else {
        showToast(data.message || "Failed to create patient", "error");
      }
    } catch {
      showToast("Network error creating patient", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Submit Quick Add Visit
  const handleAddVisitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalPatient) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: activeModalPatient._id,
          ...visitFormData,
        }),
      });
      const data = await res.json();

      if (data.success) {
        showToast("Clinical visit recorded successfully", "success");
        setVisitModalOpen(false);
        fetchPatients(pagination.page);
      } else {
        showToast(data.message || "Failed to record visit", "error");
      }
    } catch {
      showToast("Network error saving visit", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Submit Quick Add Follow-up
  const handleAddFollowUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalPatient || !followUpFormData.followUpDate || !followUpFormData.followUpReason) {
      showToast("Date and reason are required", "error");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/followups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: activeModalPatient._id,
          ...followUpFormData,
        }),
      });
      const data = await res.json();

      if (data.success) {
        showToast("Follow-up scheduled successfully", "success");
        setFollowUpModalOpen(false);
        fetchPatients(pagination.page);
      } else {
        showToast(data.message || "Failed to create follow-up", "error");
      }
    } catch {
      showToast("Network error creating follow-up", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Submit Quick Note
  const handleAddNoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalPatient || !noteContent.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/patient-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: activeModalPatient._id,
          note: noteContent.trim(),
        }),
      });
      const data = await res.json();

      if (data.success) {
        showToast("Internal note attached to patient", "success");
        setNoteModalOpen(false);
        setNoteContent("");
      } else {
        showToast(data.message || "Failed to add note", "error");
      }
    } catch {
      showToast("Network error saving note", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Quick Status Update
  const handleStatusChange = async (patientId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/patients/${patientId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Patient status changed to ${newStatus}`, "success");
        setPatients((prev) =>
          prev.map((p) => (p._id === patientId ? { ...p, status: newStatus as Patient["status"] } : p))
        );
      }
    } catch {
      showToast("Failed to update status", "error");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Follow-up Required":
        return "bg-purple-50 text-purple-800 border-purple-200";
      case "Inactive":
        return "bg-zinc-100 text-zinc-700 border-zinc-200";
      case "Archived":
        return "bg-rose-50 text-rose-800 border-rose-200";
      default:
        return "bg-zinc-50 text-zinc-700 border-zinc-200";
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 px-4 py-3 rounded-xl shadow-xl border text-xs sm:text-sm font-medium flex items-center gap-2 animate-fade-up max-w-[90vw] ${
            notification.type === "success"
              ? "bg-emerald-900 text-white border-emerald-700"
              : "bg-rose-900 text-white border-rose-700"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span className="truncate">{notification.message}</span>
        </div>
      )}

      {/* Header & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-zinc-200 shadow-xs">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-emerald-700 uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Patient CRM Directory</span>
          </div>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-zinc-900 mt-1">
            Patient Database Management
          </h1>
          <p className="text-zinc-500 text-xs mt-0.5">
            Total {pagination.total} registered patients across clinic visits, consultations and appointments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAddModalOpen(true)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Patient</span>
          </button>
          <button
            onClick={() => fetchPatients(pagination.page)}
            className="p-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-600 transition-colors cursor-pointer"
            title="Refresh list"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filters & Search Toolbar (Responsive Stacking on Mobile) */}
      <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-zinc-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5 sm:gap-3">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="flex-1 relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone, email, or patient ID..."
              className="w-full pl-9 pr-16 sm:pr-20 py-2 bg-slate-50 border border-zinc-200 rounded-lg text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 sm:px-3 py-1 bg-brand-700 hover:bg-brand-800 text-white rounded-md text-[11px] sm:text-xs font-semibold"
            >
              Search
            </button>
          </form>

          {/* Filter Dropdowns Row */}
          <div className="flex items-center gap-2">
            {/* Status Filter */}
            <div className="flex-1 sm:flex-initial flex items-center gap-1.5">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-auto px-2.5 py-2 bg-slate-50 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="ALL">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Follow-up Required">Follow-up</option>
                <option value="Inactive">Inactive</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            {/* Gender Filter */}
            <div className="flex-1 sm:flex-initial flex items-center gap-1.5">
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="w-full sm:w-auto px-2.5 py-2 bg-slate-50 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="ALL">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. DESKTOP & TABLET VIEW: FULL TABLE (md:block, hidden on mobile) */}
      {/* ========================================================================= */}
      <div className="hidden md:block bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-zinc-200 text-zinc-600 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Patient ID</th>
                <th className="py-3.5 px-4">Full Name</th>
                <th className="py-3.5 px-4">Phone / WhatsApp</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Gender / Age</th>
                <th className="py-3.5 px-4">Last Visit</th>
                <th className="py-3.5 px-4">Next Follow-up</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Created Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {loading ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-zinc-400">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto text-brand-700 mb-2" />
                    <span>Loading patient records...</span>
                  </td>
                </tr>
              ) : patients.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-zinc-500">
                    <Users className="w-8 h-8 mx-auto text-zinc-300 mb-2" />
                    <p className="font-semibold text-sm">No patients found</p>
                    <p className="text-xs text-zinc-400 mt-1">Try adjusting search criteria or add a new patient.</p>
                  </td>
                </tr>
              ) : (
                patients.map((pt) => (
                  <tr key={pt._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-800">
                      <Link
                        href={`/admin/patients/${pt._id}`}
                        className="hover:underline flex items-center gap-1"
                      >
                        {pt.patientId}
                      </Link>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-zinc-900">
                      <Link
                        href={`/admin/patients/${pt._id}`}
                        className="hover:text-brand-700 transition-colors"
                      >
                        {pt.fullName}
                      </Link>
                      {pt.city && <div className="text-[10px] text-zinc-400 font-normal">{pt.city}</div>}
                    </td>

                    <td className="py-3.5 px-4 text-zinc-700">
                      <a
                        href={`tel:${pt.phone}`}
                        className="hover:text-brand-700 flex items-center gap-1 font-medium"
                      >
                        <Phone className="w-3 h-3 text-zinc-400" />
                        <span>{pt.phone}</span>
                      </a>
                    </td>

                    <td className="py-3.5 px-4 text-zinc-600">
                      {pt.email ? (
                        <span className="truncate max-w-[140px] block">{pt.email}</span>
                      ) : (
                        <span className="text-zinc-300">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-zinc-600">
                      <span>{pt.gender || "—"}</span>
                      {pt.age ? <span className="text-zinc-400"> ({pt.age}y)</span> : null}
                    </td>

                    <td className="py-3.5 px-4 text-zinc-600">
                      {pt.lastVisitDate ? (
                        <span className="font-medium text-zinc-800">
                          {new Date(pt.lastVisitDate).toLocaleDateString()}
                        </span>
                      ) : (
                        <span className="text-zinc-300">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {pt.nextFollowUpDate ? (
                        <span className="font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded text-[11px]">
                          {new Date(pt.nextFollowUpDate).toLocaleDateString()}
                        </span>
                      ) : (
                        <span className="text-zinc-300">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={pt.status}
                        onChange={(e) => handleStatusChange(pt._id, e.target.value)}
                        className={`text-[10px] font-bold px-2 py-1 rounded-full border cursor-pointer focus:outline-none ${getStatusBadge(
                          pt.status
                        )}`}
                      >
                        <option value="Active">Active</option>
                        <option value="Follow-up Required">Follow-up</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-zinc-500 text-[11px]">
                      {new Date(pt.createdAt).toLocaleDateString()}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/patients/${pt._id}`}
                          className="p-1.5 rounded-lg border border-zinc-200 hover:bg-emerald-50 hover:text-emerald-700 text-zinc-600 transition-colors"
                          title="View Full Profile"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => {
                            setActiveModalPatient(pt);
                            setVisitModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg border border-zinc-200 hover:bg-blue-50 hover:text-blue-700 text-zinc-600 transition-colors cursor-pointer"
                          title="Record Visit"
                        >
                          <Stethoscope className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setActiveModalPatient(pt);
                            setFollowUpModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg border border-zinc-200 hover:bg-purple-50 hover:text-purple-700 text-zinc-600 transition-colors cursor-pointer"
                          title="Add Follow-up"
                        >
                          <Clock className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setActiveModalPatient(pt);
                            setNoteModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg border border-zinc-200 hover:bg-amber-50 hover:text-amber-700 text-zinc-600 transition-colors cursor-pointer"
                          title="Add Clinical Note"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MOBILE VIEW: PATIENT CARDS (md:hidden, visible on small devices) */}
      {/* ========================================================================= */}
      <div className="md:hidden space-y-3">
        {loading ? (
          <div className="bg-white p-8 rounded-2xl border border-zinc-200 text-center text-zinc-400 text-xs">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-brand-700 mb-2" />
            <span>Loading patients...</span>
          </div>
        ) : patients.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-zinc-200 text-center text-zinc-500 text-xs">
            <Users className="w-8 h-8 mx-auto text-zinc-300 mb-2" />
            <p className="font-semibold text-sm">No patients found</p>
          </div>
        ) : (
          patients.map((pt) => (
            <div key={pt._id} className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-xs space-y-3">
              {/* Card Header: Name, ID & Status */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/admin/patients/${pt._id}`}
                      className="text-sm font-bold text-zinc-900 hover:text-brand-700"
                    >
                      {pt.fullName}
                    </Link>
                    <span className="font-mono text-[10px] font-bold text-brand-800 bg-brand-50 px-1.5 py-0.5 rounded border border-brand-200">
                      {pt.patientId}
                    </span>
                  </div>
                  {pt.city && <div className="text-[10px] text-zinc-400 mt-0.5">{pt.city}</div>}
                </div>

                <select
                  value={pt.status}
                  onChange={(e) => handleStatusChange(pt._id, e.target.value)}
                  className={`text-[10px] font-bold px-2 py-1 rounded-full border cursor-pointer ${getStatusBadge(
                    pt.status
                  )}`}
                >
                  <option value="Active">Active</option>
                  <option value="Follow-up Required">Follow-up</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-2 text-xs text-zinc-600 pt-1 border-t border-zinc-100">
                <a
                  href={`tel:${pt.phone}`}
                  className="flex items-center gap-1 text-zinc-800 font-medium hover:text-emerald-700"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{pt.phone}</span>
                </a>
                <div className="text-right text-zinc-500">
                  {pt.gender || "—"} {pt.age ? `(${pt.age}y)` : ""}
                </div>
              </div>

              {/* Dates Row */}
              <div className="flex items-center justify-between text-[11px] bg-slate-50 p-2 rounded-xl border border-zinc-100">
                <div>
                  <span className="text-zinc-400 block text-[9px] uppercase font-bold">Last Visit</span>
                  <span className="font-medium text-zinc-800">
                    {pt.lastVisitDate ? new Date(pt.lastVisitDate).toLocaleDateString() : "None"}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-zinc-400 block text-[9px] uppercase font-bold">Next Follow-up</span>
                  <span className="font-semibold text-purple-700">
                    {pt.nextFollowUpDate ? new Date(pt.nextFollowUpDate).toLocaleDateString() : "None"}
                  </span>
                </div>
              </div>

              {/* Mobile Quick Action Buttons Row */}
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                <Link
                  href={`/admin/patients/${pt._id}`}
                  className="py-2 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-zinc-700 font-semibold text-[11px] flex flex-col items-center justify-center gap-0.5 text-center"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={() => {
                    setActiveModalPatient(pt);
                    setVisitModalOpen(true);
                  }}
                  className="py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 font-semibold text-[11px] flex flex-col items-center justify-center gap-0.5 text-center"
                >
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>+ Visit</span>
                </button>
                <button
                  onClick={() => {
                    setActiveModalPatient(pt);
                    setFollowUpModalOpen(true);
                  }}
                  className="py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-semibold text-[11px] flex flex-col items-center justify-center gap-0.5 text-center"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>+ Follow</span>
                </button>
                <button
                  onClick={() => {
                    setActiveModalPatient(pt);
                    setNoteModalOpen(true);
                  }}
                  className="py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold text-[11px] flex flex-col items-center justify-center gap-0.5 text-center"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>+ Note</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Bar */}
      <div className="p-3.5 sm:p-4 bg-white rounded-2xl border border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="text-xs text-zinc-500 font-medium text-center sm:text-left">
          Showing Page {pagination.page} of {pagination.totalPages} ({pagination.total} total patients)
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => fetchPatients(pagination.page - 1)}
            disabled={pagination.page <= 1}
            className="p-2 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-zinc-600 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-3 py-1 text-xs font-bold text-zinc-800 bg-slate-50 border border-zinc-200 rounded-lg">
            {pagination.page} / {pagination.totalPages}
          </span>
          <button
            onClick={() => fetchPatients(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages}
            className="p-2 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-zinc-600 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ADD PATIENT MODAL (Optimized for Mobile / Tablet / Desktop) */}
      {/* ========================================================================= */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border border-zinc-200 animate-scale-up">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-zinc-200 flex items-center justify-between bg-slate-50 rounded-t-2xl">
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-zinc-900">Add New Patient Record</h3>
                <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5">
                  Register a patient into Dr. Anil Pandey&apos;s CRM system.
                </p>
              </div>
              <button
                onClick={() => setAddModalOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleAddPatientSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-5">
              {/* Section 1 */}
              <div>
                <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  1. Basic &amp; Contact Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-zinc-700 mb-1">
                      Full Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={addFormData.fullName}
                      onChange={(e) => setAddFormData({ ...addFormData, fullName: e.target.value })}
                      placeholder="e.g. Ramesh Sharma"
                      className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-700 mb-1">
                      Phone / WhatsApp <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={addFormData.phone}
                      onChange={(e) => setAddFormData({ ...addFormData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={addFormData.email}
                      onChange={(e) => setAddFormData({ ...addFormData, email: e.target.value })}
                      placeholder="e.g. ramesh@example.com"
                      className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-700 mb-1">Gender</label>
                    <select
                      value={addFormData.gender}
                      onChange={(e) => setAddFormData({ ...addFormData, gender: e.target.value })}
                      className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-zinc-700 mb-1">Date of Birth</label>
                      <input
                        type="date"
                        value={addFormData.dob}
                        onChange={(e) => setAddFormData({ ...addFormData, dob: e.target.value })}
                        className="w-full px-2 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-zinc-700 mb-1">Age</label>
                      <input
                        type="number"
                        min="0"
                        max="120"
                        value={addFormData.age}
                        onChange={(e) => setAddFormData({ ...addFormData, age: e.target.value })}
                        placeholder="Yrs"
                        className="w-full px-2 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-zinc-700 mb-1">Address</label>
                    <input
                      type="text"
                      value={addFormData.address}
                      onChange={(e) => setAddFormData({ ...addFormData, address: e.target.value })}
                      placeholder="Street address / locality"
                      className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-700 mb-1">City / Region</label>
                    <input
                      type="text"
                      value={addFormData.city}
                      onChange={(e) => setAddFormData({ ...addFormData, city: e.target.value })}
                      placeholder="e.g. New Delhi"
                      className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="mt-2.5 p-3 bg-slate-50 rounded-xl border border-zinc-100">
                  <span className="text-[11px] font-bold text-zinc-600 block mb-1.5">
                    Emergency Contact (Optional):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <input
                      type="text"
                      value={addFormData.emergencyContactName}
                      onChange={(e) =>
                        setAddFormData({ ...addFormData, emergencyContactName: e.target.value })
                      }
                      placeholder="Contact Name"
                      className="px-2.5 py-1.5 bg-white border border-zinc-200 rounded-lg"
                    />
                    <input
                      type="tel"
                      value={addFormData.emergencyContactPhone}
                      onChange={(e) =>
                        setAddFormData({ ...addFormData, emergencyContactPhone: e.target.value })
                      }
                      placeholder="Contact Phone"
                      className="px-2.5 py-1.5 bg-white border border-zinc-200 rounded-lg"
                    />
                    <input
                      type="text"
                      value={addFormData.emergencyContactRel}
                      onChange={(e) =>
                        setAddFormData({ ...addFormData, emergencyContactRel: e.target.value })
                      }
                      placeholder="Relationship (e.g. Spouse)"
                      className="px-2.5 py-1.5 bg-white border border-zinc-200 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div>
                <h4 className="text-xs font-bold text-brand-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-700"></span>
                  2. Consultation &amp; Medical Info
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-zinc-700 mb-1">
                      Reason for Consultation
                    </label>
                    <input
                      type="text"
                      value={addFormData.reasonForConsultation}
                      onChange={(e) =>
                        setAddFormData({ ...addFormData, reasonForConsultation: e.target.value })
                      }
                      placeholder="e.g. Routine Consultation / Pain in knee"
                      className="w-full px-3 py-2 border border-zinc-200 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-700 mb-1">
                      Current Concerns / Symptoms
                    </label>
                    <input
                      type="text"
                      value={addFormData.currentConcerns}
                      onChange={(e) => setAddFormData({ ...addFormData, currentConcerns: e.target.value })}
                      placeholder="e.g. Chronic stiffness since 2 weeks"
                      className="w-full px-3 py-2 border border-zinc-200 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-700 mb-1">Allergies</label>
                    <input
                      type="text"
                      value={addFormData.allergies}
                      onChange={(e) => setAddFormData({ ...addFormData, allergies: e.target.value })}
                      placeholder="e.g. Penicillin, Dust or None"
                      className="w-full px-3 py-2 border border-zinc-200 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-700 mb-1">Current Medications</label>
                    <input
                      type="text"
                      value={addFormData.currentMedications}
                      onChange={(e) =>
                        setAddFormData({ ...addFormData, currentMedications: e.target.value })
                      }
                      placeholder="e.g. Antihypertensives, Vitamins"
                      className="w-full px-3 py-2 border border-zinc-200 rounded-lg"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-zinc-700 mb-1">
                      Relevant History / Previous Procedures
                    </label>
                    <textarea
                      rows={2}
                      value={addFormData.relevantHistory}
                      onChange={(e) =>
                        setAddFormData({ ...addFormData, relevantHistory: e.target.value })
                      }
                      placeholder="Any relevant past procedures, history or notes..."
                      className="w-full px-3 py-2 border border-zinc-200 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <h4 className="text-xs font-bold text-purple-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-700"></span>
                  3. Administrative Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-zinc-700 mb-1">Patient Source</label>
                    <select
                      value={addFormData.patientSource}
                      onChange={(e) => setAddFormData({ ...addFormData, patientSource: e.target.value })}
                      className="w-full px-3 py-2 border border-zinc-200 rounded-lg"
                    >
                      <option value="Direct Clinic Registration">Direct Registration</option>
                      <option value="Website Appointment">Website Appointment</option>
                      <option value="Online Consultation">Online Consultation</option>
                      <option value="Referral">Referral</option>
                      <option value="Walk-in">Walk-in</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-700 mb-1">Assigned Staff</label>
                    <input
                      type="text"
                      value={addFormData.assignedStaff}
                      onChange={(e) => setAddFormData({ ...addFormData, assignedStaff: e.target.value })}
                      className="w-full px-3 py-2 border border-zinc-200 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-700 mb-1">Status</label>
                    <select
                      value={addFormData.status}
                      onChange={(e) =>
                        setAddFormData({
                          ...addFormData,
                          status: e.target.value as Patient["status"],
                        })
                      }
                      className="w-full px-3 py-2 border border-zinc-200 rounded-lg"
                    >
                      <option value="Active">Active</option>
                      <option value="Follow-up Required">Follow-up Required</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block font-bold text-zinc-700 mb-1">Internal Notes</label>
                    <input
                      type="text"
                      value={addFormData.internalNotes}
                      onChange={(e) => setAddFormData({ ...addFormData, internalNotes: e.target.value })}
                      placeholder="Confidential clinic / staff notes..."
                      className="w-full px-3 py-2 border border-zinc-200 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-zinc-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-zinc-600 hover:bg-zinc-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 text-xs font-bold bg-brand-700 hover:bg-brand-800 text-white rounded-xl shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? "Saving Patient..." : "Create Patient Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QUICK ADD VISIT MODAL */}
      {visitModalOpen && activeModalPatient && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-4 sm:p-6 shadow-2xl border border-zinc-200 animate-scale-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-zinc-900">
                  Record Clinical Visit
                </h3>
                <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5">
                  Patient: <span className="font-bold text-zinc-800">{activeModalPatient.fullName}</span> ({activeModalPatient.patientId})
                </p>
              </div>
              <button
                onClick={() => setVisitModalOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddVisitSubmit} className="space-y-3 mt-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Visit Date</label>
                  <input
                    type="date"
                    required
                    value={visitFormData.visitDate}
                    onChange={(e) => setVisitFormData({ ...visitFormData, visitDate: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Visit Type</label>
                  <select
                    value={visitFormData.visitType}
                    onChange={(e) => setVisitFormData({ ...visitFormData, visitType: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-200 rounded-lg"
                  >
                    <option value="Initial Consultation">Initial Consultation</option>
                    <option value="Follow-up Visit">Follow-up Visit</option>
                    <option value="Routine Checkup">Routine Checkup</option>
                    <option value="Procedure Review">Procedure Review</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Reason for Visit</label>
                <input
                  type="text"
                  value={visitFormData.reason}
                  onChange={(e) => setVisitFormData({ ...visitFormData, reason: e.target.value })}
                  placeholder="Primary reason..."
                  className="w-full px-3 py-2 border border-zinc-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Findings &amp; Clinical Notes</label>
                <textarea
                  rows={2}
                  value={visitFormData.consultationNotes}
                  onChange={(e) => setVisitFormData({ ...visitFormData, consultationNotes: e.target.value })}
                  placeholder="Clinical observation..."
                  className="w-full px-3 py-2 border border-zinc-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Treatment / Advice Notes</label>
                <input
                  type="text"
                  value={visitFormData.treatmentNotes}
                  onChange={(e) => setVisitFormData({ ...visitFormData, treatmentNotes: e.target.value })}
                  placeholder="Prescribed advice..."
                  className="w-full px-3 py-2 border border-zinc-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 bg-purple-50 rounded-xl">
                <div>
                  <label className="block font-bold text-purple-900 mb-1 text-[11px]">Next Follow-up Date</label>
                  <input
                    type="date"
                    value={visitFormData.nextFollowUpDate}
                    onChange={(e) => setVisitFormData({ ...visitFormData, nextFollowUpDate: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-purple-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-purple-900 mb-1 text-[11px]">Recommendation</label>
                  <input
                    type="text"
                    value={visitFormData.followUpRecommendation}
                    onChange={(e) =>
                      setVisitFormData({ ...visitFormData, followUpRecommendation: e.target.value })
                    }
                    placeholder="e.g. Review tests"
                    className="w-full px-2.5 py-1.5 bg-white border border-purple-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setVisitModalOpen(false)}
                  className="px-4 py-2 font-bold text-zinc-600 hover:bg-zinc-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 font-bold bg-blue-700 hover:bg-blue-800 text-white rounded-xl disabled:opacity-50"
                >
                  {submitting ? "Saving..." : "Save Visit Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QUICK ADD FOLLOW-UP MODAL */}
      {followUpModalOpen && activeModalPatient && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-4 sm:p-6 shadow-2xl border border-zinc-200 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-zinc-900">Schedule Follow-up</h3>
                <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5">
                  Patient: <span className="font-bold text-zinc-800">{activeModalPatient.fullName}</span>
                </p>
              </div>
              <button
                onClick={() => setFollowUpModalOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddFollowUpSubmit} className="space-y-3 mt-4 text-xs">
              <div>
                <label className="block font-bold text-zinc-700 mb-1">
                  Follow-up Date <span className="text-rose-600">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={followUpFormData.followUpDate}
                  onChange={(e) => setFollowUpFormData({ ...followUpFormData, followUpDate: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">
                  Reason for Follow-up <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={followUpFormData.followUpReason}
                  onChange={(e) => setFollowUpFormData({ ...followUpFormData, followUpReason: e.target.value })}
                  placeholder="e.g. Check recovery, review reports"
                  className="w-full px-3 py-2 border border-zinc-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Status</label>
                <select
                  value={followUpFormData.status}
                  onChange={(e) => setFollowUpFormData({ ...followUpFormData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-200 rounded-lg"
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
                  value={followUpFormData.notes}
                  onChange={(e) => setFollowUpFormData({ ...followUpFormData, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-200 rounded-lg"
                />
              </div>

              <div className="pt-3 border-t border-zinc-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setFollowUpModalOpen(false)}
                  className="px-4 py-2 font-bold text-zinc-600 hover:bg-zinc-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 font-bold bg-purple-700 hover:bg-purple-800 text-white rounded-xl disabled:opacity-50"
                >
                  {submitting ? "Scheduling..." : "Schedule Follow-up"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QUICK ADD NOTE MODAL */}
      {noteModalOpen && activeModalPatient && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-4 sm:p-6 shadow-2xl border border-zinc-200 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-zinc-900">Attach Internal Note</h3>
                <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5">
                  Patient: <span className="font-bold text-zinc-800">{activeModalPatient.fullName}</span>
                </p>
              </div>
              <button
                onClick={() => setNoteModalOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNoteSubmit} className="space-y-3 mt-4 text-xs">
              <div>
                <label className="block font-bold text-zinc-700 mb-1">
                  Note Content <span className="text-rose-600">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Enter staff / clinical internal observation..."
                  className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-3 border-t border-zinc-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNoteModalOpen(false)}
                  className="px-4 py-2 font-bold text-zinc-600 hover:bg-zinc-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 font-bold bg-amber-700 hover:bg-amber-800 text-white rounded-xl disabled:opacity-50"
                >
                  {submitting ? "Saving..." : "Save Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
