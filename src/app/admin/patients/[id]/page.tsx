"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  Users,
  Calendar,
  Video,
  Clock,
  FileText,
  Stethoscope,
  Phone,
  Mail,
  MapPin,
  AlertCircle,
  CheckCircle2,
  Plus,
  Edit,
  ArrowLeft,
  Activity,
  Shield,
  CalendarPlus,
  RefreshCw,
  X,
  UserCheck,
} from "lucide-react";

interface EmergencyContact {
  name?: string;
  phone?: string;
  relationship?: string;
}

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
  emergencyContact?: EmergencyContact;
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

interface AppointmentItem {
  _id: string;
  preferredDate: string;
  preferredTime: string;
  consultationType: string;
  appointmentType?: string;
  message?: string;
  status: string;
  createdAt: string;
}

interface ConsultationItem {
  _id: string;
  preferredDate: string;
  preferredTimeSlot: string;
  consultationOption: string;
  consultationType?: string;
  notes?: string;
  reason?: string;
  followUpDate?: string;
  status: string;
  createdAt: string;
}

interface VisitItem {
  _id: string;
  visitDate: string;
  visitType: string;
  reason: string;
  consultationNotes?: string;
  findings?: string;
  treatmentNotes?: string;
  followUpRecommendation?: string;
  nextFollowUpDate?: string;
  recordedBy?: string;
  createdAt: string;
}

interface FollowUpItem {
  _id: string;
  followUpDate: string;
  followUpReason: string;
  status: string;
  assignedStaff?: string;
  notes?: string;
  createdAt: string;
}

interface NoteItem {
  _id: string;
  note: string;
  createdBy: string;
  createdAt: string;
}

interface TimelineItem {
  id: string;
  type: string;
  title: string;
  description: string;
  date: string;
  status?: string;
}

export default function PatientProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [consultations, setConsultations] = useState<ConsultationItem[]>([]);
  const [visits, setVisits] = useState<VisitItem[]>([]);
  const [followups, setFollowups] = useState<FollowUpItem[]>([]);
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    "overview" | "timeline" | "visits" | "appointments" | "consultations" | "followups" | "notes" | "medical"
  >("overview");

  // Modals
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const [aptModalOpen, setAptModalOpen] = useState(false);
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [followUpModalOpen, setFollowUpModalOpen] = useState(false);
  const [noteModalOpen, setNoteModalOpen] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Quick form states
  const [editFormData, setEditFormData] = useState<Partial<Patient>>({});
  const [visitForm, setVisitForm] = useState({
    visitDate: new Date().toISOString().split("T")[0],
    visitType: "Consultation",
    reason: "",
    consultationNotes: "",
    findings: "",
    treatmentNotes: "",
    followUpRecommendation: "",
    nextFollowUpDate: "",
    internalNotes: "",
  });
  const [aptForm, setAptForm] = useState({
    preferredDate: new Date().toISOString().split("T")[0],
    preferredTime: "10:00 AM",
    consultationType: "in-person",
    appointmentType: "Follow-up",
    message: "",
  });
  const [consultForm, setConsultForm] = useState({
    preferredDate: new Date().toISOString().split("T")[0],
    preferredTimeSlot: "11:00 AM",
    consultationOption: "video",
    consultationType: "Online Consultation",
    notes: "",
  });
  const [followUpForm, setFollowUpForm] = useState({
    followUpDate: "",
    followUpReason: "",
    status: "Pending",
    notes: "",
  });
  const [quickNoteText, setQuickNoteText] = useState("");

  const showToast = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/patients/${id}`);
      const json = await res.json();
      if (json.success && json.data) {
        setPatient(json.data.patient);
        setAppointments(json.data.appointments || []);
        setConsultations(json.data.consultations || []);
        setVisits(json.data.visits || []);
        setFollowups(json.data.followups || []);
        setNotes(json.data.notes || []);
        setTimeline(json.data.activityTimeline || []);
        setEditFormData(json.data.patient);
      } else {
        showToast("Patient record not found", "error");
      }
    } catch {
      showToast("Error loading patient profile", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Handle Edit Patient Submit
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/patients/${patient._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });
      const json = await res.json();
      if (json.success) {
        showToast("Patient record updated", "success");
        setEditModalOpen(false);
        fetchProfile();
      } else {
        showToast(json.message || "Failed to update patient", "error");
      }
    } catch {
      showToast("Network error updating patient", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Visit Submit
  const handleVisitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: patient._id,
          ...visitForm,
        }),
      });
      const json = await res.json();
      if (json.success) {
        showToast("Visit recorded successfully", "success");
        setVisitModalOpen(false);
        fetchProfile();
      } else {
        showToast(json.message || "Failed to record visit", "error");
      }
    } catch {
      showToast("Network error saving visit", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Appointment Submit
  const handleAptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: patient._id,
          fullName: patient.fullName,
          phone: patient.phone,
          email: patient.email || "patient@dranilpandey.com",
          ...aptForm,
        }),
      });
      const json = await res.json();
      if (json.success) {
        showToast("Appointment booked and linked to patient", "success");
        setAptModalOpen(false);
        fetchProfile();
      } else {
        showToast(json.message || "Failed to book appointment", "error");
      }
    } catch {
      showToast("Network error booking appointment", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Consultation Submit
  const handleConsultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: patient._id,
          fullName: patient.fullName,
          phone: patient.phone,
          email: patient.email || "patient@dranilpandey.com",
          ...consultForm,
        }),
      });
      const json = await res.json();
      if (json.success) {
        showToast("Consultation scheduled and linked", "success");
        setConsultModalOpen(false);
        fetchProfile();
      } else {
        showToast(json.message || "Failed to create consultation", "error");
      }
    } catch {
      showToast("Network error creating consultation", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle FollowUp Submit
  const handleFollowUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient || !followUpForm.followUpDate || !followUpForm.followUpReason) {
      showToast("Date and reason are required", "error");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/followups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: patient._id,
          ...followUpForm,
        }),
      });
      const json = await res.json();
      if (json.success) {
        showToast("Follow-up scheduled", "success");
        setFollowUpModalOpen(false);
        fetchProfile();
      } else {
        showToast(json.message || "Failed to schedule follow-up", "error");
      }
    } catch {
      showToast("Network error saving follow-up", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Quick Note Submit
  const handleNoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient || !quickNoteText.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/patient-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: patient._id,
          note: quickNoteText.trim(),
        }),
      });
      const json = await res.json();
      if (json.success) {
        showToast("Note added", "success");
        setNoteModalOpen(false);
        setQuickNoteText("");
        fetchProfile();
      } else {
        showToast(json.message || "Failed to save note", "error");
      }
    } catch {
      showToast("Network error saving note", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Status badge style helper
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
      case "Confirmed":
        return "bg-brand-50 text-brand-800 border-brand-200 font-semibold";
      case "Completed":
        return "bg-brand-100/60 text-brand-900 border-brand-300 font-medium";
      case "Follow-up Required":
      case "Overdue":
        return "bg-accent-50 text-accent-700 border-accent-200 font-semibold";
      case "Scheduled":
      case "Pending":
        return "bg-slate-100 text-brand-900 border-zinc-200";
      case "Inactive":
        return "bg-zinc-100 text-zinc-700 border-zinc-200";
      case "Archived":
      case "Cancelled":
      case "Missed":
        return "bg-accent-50 text-accent-800 border-accent-200";
      default:
        return "bg-zinc-50 text-zinc-700 border-zinc-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-2 text-center">
          <Activity className="w-8 h-8 text-brand-700 animate-spin" />
          <span className="text-xs font-semibold text-zinc-600">Loading Patient CRM Profile...</span>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="bg-white p-8 sm:p-12 text-center rounded-2xl border border-zinc-200 max-w-lg mx-auto">
        <AlertCircle className="w-10 h-10 text-rose-600 mx-auto mb-3" />
        <h2 className="text-base sm:text-lg font-bold text-zinc-900">Patient Not Found</h2>
        <p className="text-xs text-zinc-500 mt-1">
          The requested patient ID could not be located in the database.
        </p>
        <Link
          href="/admin/patients"
          className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-brand-700 text-white text-xs font-bold rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Patients Directory</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 px-4 py-3 rounded-xl shadow-xl border text-xs sm:text-sm font-medium flex items-center gap-2 animate-fade-up max-w-[90vw] ${
            notification.type === "success"
              ? "bg-brand-900 text-white border-brand-700"
              : "bg-rose-900 text-white border-rose-700"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-brand-300 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span className="truncate">{notification.message}</span>
        </div>
      )}

      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/patients"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-600 hover:text-brand-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Patients Directory</span>
        </Link>

        <button
          onClick={fetchProfile}
          className="p-1.5 px-2.5 rounded-lg border border-zinc-200 hover:bg-white text-zinc-600 transition-colors text-xs flex items-center gap-1 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Refresh Profile</span>
        </button>
      </div>

      {/* CRM Patient Header Card */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-4 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
          {/* Patient Core Identity */}
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 text-white flex items-center justify-center font-extrabold text-lg sm:text-xl shadow-md shrink-0">
              {patient.fullName.slice(0, 2).toUpperCase()}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-zinc-900 tracking-tight truncate">
                  {patient.fullName}
                </h1>
                <span className="font-mono text-[11px] sm:text-xs font-bold bg-brand-50 text-brand-800 border border-brand-200 px-2 py-0.5 rounded-md shrink-0">
                  {patient.patientId}
                </span>
                <span
                  className={`text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full border shrink-0 ${getStatusBadge(
                    patient.status
                  )}`}
                >
                  {patient.status}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-zinc-500 mt-1.5 sm:mt-2">
                <a
                  href={`tel:${patient.phone}`}
                  className="flex items-center gap-1 text-zinc-800 font-medium hover:text-brand-700"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                  <span>{patient.phone}</span>
                </a>
                {patient.email && (
                  <a
                    href={`mailto:${patient.email}`}
                    className="hidden sm:flex items-center gap-1 text-zinc-700 hover:text-brand-700 truncate"
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">{patient.email}</span>
                  </a>
                )}
                {patient.city && (
                  <span className="flex items-center gap-1 text-zinc-600">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span>{patient.city}</span>
                  </span>
                )}
                {patient.age && <span>{patient.age} yrs</span>}
                {patient.gender && <span className="hidden min-[400px]:inline">({patient.gender})</span>}
              </div>
            </div>
          </div>

          {/* Quick Action Buttons (Responsive Wrapping Grid) */}
          <div className="grid grid-cols-3 sm:flex sm:flex-wrap items-center gap-1.5 sm:gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-zinc-100">
            <button
              onClick={() => setAptModalOpen(true)}
              className="px-2.5 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-900 border border-brand-200 text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <CalendarPlus className="w-3.5 h-3.5 text-brand-700" />
              <span>Apt</span>
            </button>
            <button
              onClick={() => setConsultModalOpen(true)}
              className="px-2.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <Video className="w-3.5 h-3.5 text-purple-700" />
              <span>Consult</span>
            </button>
            <button
              onClick={() => setVisitModalOpen(true)}
              className="px-2.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <Stethoscope className="w-3.5 h-3.5 text-blue-700" />
              <span>Visit</span>
            </button>
            <button
              onClick={() => setFollowUpModalOpen(true)}
              className="px-2.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              <span>Follow</span>
            </button>
            <button
              onClick={() => setNoteModalOpen(true)}
              className="px-2.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-zinc-600" />
              <span>Note</span>
            </button>
            <button
              onClick={() => setEditModalOpen(true)}
              className="p-2 rounded-xl border border-zinc-200 hover:bg-zinc-100 text-zinc-700 transition-colors flex items-center justify-center cursor-pointer"
              title="Edit Patient Details"
            >
              <Edit className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation (Smooth Touch Horizontal Scroll) */}
      <div className="flex items-center gap-1 border-b border-zinc-200 overflow-x-auto pb-px touch-pan-x">
        {[
          { key: "overview", label: "Overview", count: null },
          { key: "medical", label: "Medical History", count: null },
          { key: "visits", label: "Clinical Visits", count: visits.length },
          { key: "appointments", label: "Appointments", count: appointments.length },
          { key: "consultations", label: "Consultations", count: consultations.length },
          { key: "followups", label: "Follow-ups", count: followups.length },
          { key: "notes", label: "Notes", count: notes.length },
          { key: "timeline", label: "Activity Timeline", count: timeline.length },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`px-3 sm:px-4 py-2 sm:py-2.5 text-xs font-bold whitespace-nowrap transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeTab === tab.key
                ? "border-brand-700 text-brand-900 bg-white rounded-t-lg shadow-2xs"
                : "border-transparent text-zinc-500 hover:text-zinc-900 hover:border-zinc-300"
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== null && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                  activeTab === tab.key
                    ? "bg-brand-100 text-brand-900"
                    : "bg-zinc-100 text-zinc-600"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* TAB CONTENT AREAS */}
      {/* ========================================================================= */}

      {/* 1. OVERVIEW TAB */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Column 1 & 2: Main Info Card */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Primary Details */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-4 sm:p-6 shadow-xs space-y-4">
              <h2 className="text-xs sm:text-sm font-extrabold text-zinc-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-700" />
                <span>Patient Demographics &amp; Basic Details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-zinc-400 text-[10px] uppercase font-bold block mb-0.5">
                    Full Legal Name
                  </span>
                  <span className="font-bold text-zinc-900">{patient.fullName}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-zinc-400 text-[10px] uppercase font-bold block mb-0.5">
                    Patient System ID
                  </span>
                  <span className="font-mono font-bold text-brand-800">{patient.patientId}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-zinc-400 text-[10px] uppercase font-bold block mb-0.5">
                    Phone / WhatsApp
                  </span>
                  <span className="font-semibold text-zinc-900">{patient.phone}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-zinc-400 text-[10px] uppercase font-bold block mb-0.5">
                    Email Address
                  </span>
                  <span className="font-semibold text-zinc-900 truncate block">{patient.email || "Not Provided"}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-zinc-400 text-[10px] uppercase font-bold block mb-0.5">
                    Gender &amp; Age
                  </span>
                  <span className="font-semibold text-zinc-900">
                    {patient.gender || "—"} {patient.age ? `(${patient.age} years)` : ""}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-zinc-400 text-[10px] uppercase font-bold block mb-0.5">
                    Date of Birth
                  </span>
                  <span className="font-semibold text-zinc-900">{patient.dob || "—"}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl sm:col-span-2">
                  <span className="text-zinc-400 text-[10px] uppercase font-bold block mb-0.5">
                    Residential Address &amp; City
                  </span>
                  <span className="font-semibold text-zinc-900">
                    {patient.address ? `${patient.address}, ` : ""}
                    {patient.city || "Not Provided"}
                  </span>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-4 sm:p-6 shadow-xs">
              <h2 className="text-xs sm:text-sm font-extrabold text-zinc-900 flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-brand-700" />
                <span>Emergency Contact Person</span>
              </h2>

              {patient.emergencyContact?.name || patient.emergencyContact?.phone ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-3 bg-brand-50/50 rounded-xl border border-brand-100">
                    <span className="text-[10px] font-bold text-brand-800 uppercase block mb-0.5">
                      Name
                    </span>
                    <span className="font-bold text-zinc-900">{patient.emergencyContact.name || "—"}</span>
                  </div>
                  <div className="p-3 bg-brand-50/50 rounded-xl border border-brand-100">
                    <span className="text-[10px] font-bold text-brand-800 uppercase block mb-0.5">
                      Phone Number
                    </span>
                    <span className="font-bold text-zinc-900">{patient.emergencyContact.phone || "—"}</span>
                  </div>
                  <div className="p-3 bg-brand-50/50 rounded-xl border border-brand-100">
                    <span className="text-[10px] font-bold text-brand-800 uppercase block mb-0.5">
                      Relationship
                    </span>
                    <span className="font-bold text-zinc-900">
                      {patient.emergencyContact.relationship || "Family"}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-zinc-400 py-2">
                  No emergency contact registered for this patient.
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Administrative Summary & Quick Notes */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-2xl border border-zinc-200 p-4 sm:p-6 shadow-xs space-y-3">
              <h2 className="text-xs sm:text-sm font-extrabold text-zinc-900 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-purple-700" />
                <span>Administrative Info</span>
              </h2>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-zinc-100">
                  <span className="text-zinc-500">Source:</span>
                  <span className="font-semibold text-zinc-900">{patient.patientSource || "Website"}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-100">
                  <span className="text-zinc-500">Assigned Staff:</span>
                  <span className="font-semibold text-zinc-900">{patient.assignedStaff || "Dr. Anil Pandey"}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-100">
                  <span className="text-zinc-500">Registration:</span>
                  <span className="font-semibold text-zinc-900">
                    {new Date(patient.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-100">
                  <span className="text-zinc-500">Last Visit:</span>
                  <span className="font-semibold text-zinc-900">
                    {patient.lastVisitDate ? new Date(patient.lastVisitDate).toLocaleDateString() : "None"}
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-zinc-500">Next Follow-up:</span>
                  <span className="font-bold text-purple-700">
                    {patient.nextFollowUpDate
                      ? new Date(patient.nextFollowUpDate).toLocaleDateString()
                      : "None"}
                  </span>
                </div>
              </div>

              {patient.internalNotes && (
                <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs">
                  <span className="font-bold text-amber-900 block mb-0.5">Notes:</span>
                  <p className="text-amber-800">{patient.internalNotes}</p>
                </div>
              )}
            </div>

            {/* Quick Note Input Box */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-4 sm:p-5 shadow-xs">
              <h2 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-zinc-500" />
                <span>Quick Note</span>
              </h2>
              <form onSubmit={handleNoteSubmit} className="space-y-2">
                <textarea
                  rows={2}
                  value={quickNoteText}
                  onChange={(e) => setQuickNoteText(e.target.value)}
                  placeholder="Type internal clinical note..."
                  className="w-full p-2 text-xs bg-slate-50 border border-zinc-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <button
                  type="submit"
                  disabled={submitting || !quickNoteText.trim()}
                  className="w-full py-1.5 bg-brand-700 hover:bg-brand-800 text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-50 cursor-pointer"
                >
                  Save Note
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 2. MEDICAL & HISTORY TAB */}
      {activeTab === "medical" && (
        <div className="bg-white rounded-2xl border border-zinc-200 p-4 sm:p-6 shadow-xs space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100 gap-2">
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-zinc-900">
                Medical &amp; Consultation Background
              </h2>
              <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5">
                Chief concerns, allergies, and medication history.
              </p>
            </div>
            <button
              onClick={() => setEditModalOpen(true)}
              className="px-3 py-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-xs font-semibold text-zinc-700 flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Edit className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Edit Medical Info</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-zinc-100">
              <span className="text-[10px] font-bold text-brand-800 uppercase tracking-wider block mb-1">
                Reason for Consultation
              </span>
              <p className="text-zinc-800 font-medium whitespace-pre-wrap">
                {patient.reasonForConsultation || "No specific consultation reason specified."}
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-zinc-100">
              <span className="text-[10px] font-bold text-brand-800 uppercase tracking-wider block mb-1">
                Current Concerns / Symptoms
              </span>
              <p className="text-zinc-800 font-medium whitespace-pre-wrap">
                {patient.currentConcerns || "No current concerns entered."}
              </p>
            </div>

            <div className="p-3.5 bg-rose-50/50 rounded-xl border border-rose-100">
              <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider block mb-1">
                Allergies
              </span>
              <p className="text-zinc-800 font-medium whitespace-pre-wrap">
                {patient.allergies || "No known drug/food allergies recorded."}
              </p>
            </div>

            <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100">
              <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block mb-1">
                Current Medications
              </span>
              <p className="text-zinc-800 font-medium whitespace-pre-wrap">
                {patient.currentMedications || "No active medications documented."}
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-zinc-100 md:col-span-2">
              <span className="text-[10px] font-bold text-brand-800 uppercase tracking-wider block mb-1">
                Relevant Past History / Previous Procedures
              </span>
              <p className="text-zinc-800 font-medium whitespace-pre-wrap">
                {patient.relevantHistory ||
                  patient.previousTreatments ||
                  "No past surgical or medical history specified."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. VISITS TAB */}
      {activeTab === "visits" && (
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-zinc-100 flex items-center justify-between bg-slate-50/50 gap-2">
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-zinc-900">Clinical Visits</h2>
              <p className="text-[11px] text-zinc-500 mt-0.5">Encounters with Dr. Anil Pandey</p>
            </div>
            <button
              onClick={() => setVisitModalOpen(true)}
              className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Visit</span>
            </button>
          </div>

          <div className="divide-y divide-zinc-100">
            {visits.length === 0 ? (
              <div className="p-8 sm:p-12 text-center text-zinc-400 text-xs">
                <Stethoscope className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
                <p className="font-semibold text-zinc-700">No clinical visits recorded yet</p>
              </div>
            ) : (
              visits.map((vis) => (
                <div key={vis._id} className="p-4 sm:p-5 hover:bg-slate-50/60 transition-colors space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-zinc-900">{vis.visitType}</span>
                      <span className="text-[10px] sm:text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        {new Date(vis.visitDate).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-zinc-400 shrink-0">By {vis.recordedBy || "Dr. Anil Pandey"}</span>
                  </div>

                  {vis.reason && (
                    <div className="text-xs text-zinc-700">
                      <strong className="text-zinc-900">Reason:</strong> {vis.reason}
                    </div>
                  )}

                  {vis.consultationNotes && (
                    <div className="p-3 bg-slate-50 rounded-xl text-xs text-zinc-800 border border-zinc-100">
                      <strong className="text-zinc-900 block mb-1">Findings &amp; Notes:</strong>
                      <p className="whitespace-pre-wrap">{vis.consultationNotes}</p>
                    </div>
                  )}

                  {vis.treatmentNotes && (
                    <div className="text-xs text-zinc-700">
                      <strong className="text-zinc-900">Treatment Plan:</strong> {vis.treatmentNotes}
                    </div>
                  )}

                  {vis.nextFollowUpDate && (
                    <div className="text-[10px] sm:text-[11px] font-semibold text-purple-800 bg-purple-50 px-2 py-0.5 rounded-lg inline-block">
                      Next Follow-up: {new Date(vis.nextFollowUpDate).toLocaleDateString()}
                      {vis.followUpRecommendation ? ` (${vis.followUpRecommendation})` : ""}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 4. APPOINTMENTS TAB */}
      {activeTab === "appointments" && (
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-zinc-100 flex items-center justify-between bg-slate-50/50 gap-2">
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-zinc-900">Appointment History</h2>
              <p className="text-[11px] text-zinc-500 mt-0.5">Appointments booked directly or online</p>
            </div>
            <button
              onClick={() => setAptModalOpen(true)}
              className="px-3 py-1.5 bg-brand-700 hover:bg-brand-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Book</span>
            </button>
          </div>

          <div className="divide-y divide-zinc-100">
            {appointments.length === 0 ? (
              <div className="p-8 sm:p-12 text-center text-zinc-400 text-xs">
                <Calendar className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
                <p className="font-semibold text-zinc-700">No appointments scheduled</p>
              </div>
            ) : (
              appointments.map((apt) => (
                <div key={apt._id} className="p-3.5 sm:p-4 flex items-center justify-between hover:bg-slate-50/60 gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-900 truncate">
                        {apt.appointmentType || apt.consultationType || "General Consultation"}
                      </span>
                      <span className="text-[11px] text-zinc-500 shrink-0">
                        {apt.preferredDate} • {apt.preferredTime}
                      </span>
                    </div>
                    {apt.message && <div className="text-[11px] text-zinc-600 mt-0.5 truncate">{apt.message}</div>}
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${getStatusBadge(
                      apt.status
                    )}`}
                  >
                    {apt.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 5. CONSULTATIONS TAB */}
      {activeTab === "consultations" && (
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-zinc-100 flex items-center justify-between bg-slate-50/50 gap-2">
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-zinc-900">Consultation Requests</h2>
              <p className="text-[11px] text-zinc-500 mt-0.5">Video &amp; in-person bookings</p>
            </div>
            <button
              onClick={() => setConsultModalOpen(true)}
              className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Schedule</span>
            </button>
          </div>

          <div className="divide-y divide-zinc-100">
            {consultations.length === 0 ? (
              <div className="p-8 sm:p-12 text-center text-zinc-400 text-xs">
                <Video className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
                <p className="font-semibold text-zinc-700">No consultation requests recorded</p>
              </div>
            ) : (
              consultations.map((con) => (
                <div key={con._id} className="p-3.5 sm:p-4 flex items-center justify-between hover:bg-slate-50/60 gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-900 capitalize truncate">
                        {con.consultationOption} Consultation
                      </span>
                      <span className="text-[11px] text-zinc-500 shrink-0">
                        {con.preferredDate} • {con.preferredTimeSlot}
                      </span>
                    </div>
                    {con.notes && <div className="text-[11px] text-zinc-600 mt-0.5 truncate">{con.notes}</div>}
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${getStatusBadge(
                      con.status
                    )}`}
                  >
                    {con.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 6. FOLLOW-UPS TAB */}
      {activeTab === "followups" && (
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-zinc-100 flex items-center justify-between bg-slate-50/50 gap-2">
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-zinc-900">Follow-up Tracking</h2>
              <p className="text-[11px] text-zinc-500 mt-0.5">Post-visit follow-up items</p>
            </div>
            <button
              onClick={() => setFollowUpModalOpen(true)}
              className="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Schedule</span>
            </button>
          </div>

          <div className="divide-y divide-zinc-100">
            {followups.length === 0 ? (
              <div className="p-8 sm:p-12 text-center text-zinc-400 text-xs">
                <Clock className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
                <p className="font-semibold text-zinc-700">No follow-ups recorded</p>
              </div>
            ) : (
              followups.map((fol) => (
                <div key={fol._id} className="p-3.5 sm:p-4 flex items-center justify-between hover:bg-slate-50/60 gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-900 truncate">{fol.followUpReason}</span>
                      <span className="text-[10px] sm:text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded shrink-0">
                        Target: {new Date(fol.followUpDate).toLocaleDateString()}
                      </span>
                    </div>
                    {fol.notes && <div className="text-[11px] text-zinc-500 mt-0.5 truncate">{fol.notes}</div>}
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${getStatusBadge(
                      fol.status
                    )}`}
                  >
                    {fol.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 7. NOTES TAB */}
      {activeTab === "notes" && (
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-zinc-100 flex items-center justify-between bg-slate-50/50 gap-2">
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-zinc-900">Internal Clinical &amp; Staff Notes</h2>
              <p className="text-[11px] text-zinc-500 mt-0.5">Chronological record of staff observations</p>
            </div>
            <button
              onClick={() => setNoteModalOpen(true)}
              className="px-3 py-1.5 bg-brand-700 hover:bg-brand-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Note</span>
            </button>
          </div>

          <div className="divide-y divide-zinc-100">
            {notes.length === 0 ? (
              <div className="p-8 sm:p-12 text-center text-zinc-400 text-xs">
                <FileText className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
                <p className="font-semibold text-zinc-700">No internal notes attached</p>
              </div>
            ) : (
              notes.map((n) => (
                <div key={n._id} className="p-3.5 sm:p-4 hover:bg-slate-50/60 transition-colors">
                  <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
                    <span className="font-bold text-zinc-800">{n.createdBy || "Staff"}</span>
                    <span className="text-[11px]">{new Date(n.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-zinc-700 whitespace-pre-wrap">{n.note}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 8. ACTIVITY TIMELINE TAB */}
      {activeTab === "timeline" && (
        <div className="bg-white rounded-2xl border border-zinc-200 p-4 sm:p-6 shadow-xs">
          <h2 className="text-xs sm:text-sm font-extrabold text-zinc-900 mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-brand-700" />
            <span>Complete Patient Activity &amp; Audit Trail</span>
          </h2>

          <div className="relative pl-5 sm:pl-6 space-y-4 sm:space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-200">
            {timeline.map((event) => (
              <div key={event.id} className="relative group">
                <div className="absolute -left-5 sm:-left-6 top-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white border-2 border-brand-600 group-hover:scale-110 transition-transform"></div>
                <div className="bg-slate-50 p-3 sm:p-3.5 rounded-xl border border-zinc-100 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-zinc-900">{event.title}</span>
                    <span className="text-[10px] sm:text-[11px] text-zinc-400 shrink-0">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-zinc-600 mt-1 text-[11px]">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODALS */}
      {/* ========================================================================= */}

      {/* EDIT PATIENT MODAL */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl border border-zinc-200 animate-scale-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <h3 className="text-sm sm:text-base font-extrabold text-zinc-900">Edit Patient Profile</h3>
              <button
                onClick={() => setEditModalOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-3 sm:space-y-4 mt-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editFormData.fullName || ""}
                    onChange={(e) => setEditFormData({ ...editFormData, fullName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={editFormData.phone || ""}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={editFormData.email || ""}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Status</label>
                  <select
                    value={editFormData.status || "Active"}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        status: e.target.value as Patient["status"],
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="Active">Active</option>
                    <option value="Follow-up Required">Follow-up Required</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">City</label>
                  <input
                    type="text"
                    value={editFormData.city || ""}
                    onChange={(e) => setEditFormData({ ...editFormData, city: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Age</label>
                  <input
                    type="number"
                    value={editFormData.age || ""}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        age: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Reason for Consultation</label>
                <input
                  type="text"
                  value={editFormData.reasonForConsultation || ""}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, reasonForConsultation: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Allergies</label>
                <input
                  type="text"
                  value={editFormData.allergies || ""}
                  onChange={(e) => setEditFormData({ ...editFormData, allergies: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Current Medications</label>
                <input
                  type="text"
                  value={editFormData.currentMedications || ""}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, currentMedications: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Relevant Past History</label>
                <textarea
                  rows={2}
                  value={editFormData.relevantHistory || ""}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, relevantHistory: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="pt-3 border-t border-zinc-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 font-bold text-zinc-600 hover:bg-zinc-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 font-bold bg-brand-700 hover:bg-brand-800 text-white rounded-xl disabled:opacity-50"
                >
                  {submitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RECORD VISIT MODAL */}
      {visitModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-4 sm:p-6 shadow-2xl border border-zinc-200 animate-scale-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <h3 className="text-sm sm:text-base font-extrabold text-zinc-900">Record Clinical Visit</h3>
              <button
                onClick={() => setVisitModalOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleVisitSubmit} className="space-y-3 mt-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Visit Date</label>
                  <input
                    type="date"
                    required
                    value={visitForm.visitDate}
                    onChange={(e) => setVisitForm({ ...visitForm, visitDate: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Visit Type</label>
                  <select
                    value={visitForm.visitType}
                    onChange={(e) => setVisitForm({ ...visitForm, visitType: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
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
                  value={visitForm.reason}
                  onChange={(e) => setVisitForm({ ...visitForm, reason: e.target.value })}
                  placeholder="Primary concern..."
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Clinical Notes &amp; Findings</label>
                <textarea
                  rows={2}
                  value={visitForm.consultationNotes}
                  onChange={(e) => setVisitForm({ ...visitForm, consultationNotes: e.target.value })}
                  placeholder="Findings and observation..."
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Treatment / Advice</label>
                <input
                  type="text"
                  value={visitForm.treatmentNotes}
                  onChange={(e) => setVisitForm({ ...visitForm, treatmentNotes: e.target.value })}
                  placeholder="Prescription / procedure..."
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 bg-purple-50 rounded-xl">
                <div>
                  <label className="block font-bold text-purple-900 mb-1 text-[11px]">Next Follow-up Date</label>
                  <input
                    type="date"
                    value={visitForm.nextFollowUpDate}
                    onChange={(e) => setVisitForm({ ...visitForm, nextFollowUpDate: e.target.value })}
                    className="w-full px-2 py-1.5 bg-white border border-purple-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-purple-900 mb-1 text-[11px]">Follow-up Reason</label>
                  <input
                    type="text"
                    value={visitForm.followUpRecommendation}
                    onChange={(e) =>
                      setVisitForm({ ...visitForm, followUpRecommendation: e.target.value })
                    }
                    placeholder="e.g. Review blood tests"
                    className="w-full px-2 py-1.5 bg-white border border-purple-200 rounded-lg"
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
                  {submitting ? "Saving..." : "Save Visit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BOOK APPOINTMENT MODAL */}
      {aptModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-4 sm:p-6 shadow-2xl border border-zinc-200 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <h3 className="text-sm sm:text-base font-extrabold text-zinc-900">Book Appointment</h3>
              <button
                onClick={() => setAptModalOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAptSubmit} className="space-y-3 mt-4 text-xs">
              <div>
                <label className="block font-bold text-zinc-700 mb-1">Preferred Date</label>
                <input
                  type="date"
                  required
                  value={aptForm.preferredDate}
                  onChange={(e) => setAptForm({ ...aptForm, preferredDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Time Slot</label>
                <input
                  type="text"
                  required
                  value={aptForm.preferredTime}
                  onChange={(e) => setAptForm({ ...aptForm, preferredTime: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Consultation Mode</label>
                <select
                  value={aptForm.consultationType}
                  onChange={(e) => setAptForm({ ...aptForm, consultationType: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="in-person">In-Person Clinic Visit</option>
                  <option value="video">Online Video Consultation</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Appointment Purpose</label>
                <input
                  type="text"
                  value={aptForm.message}
                  onChange={(e) => setAptForm({ ...aptForm, message: e.target.value })}
                  placeholder="Routine checkup, report review..."
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="pt-3 border-t border-zinc-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAptModalOpen(false)}
                  className="px-4 py-2 font-bold text-zinc-600 hover:bg-zinc-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 font-bold bg-brand-700 hover:bg-brand-800 text-white rounded-xl disabled:opacity-50"
                >
                  {submitting ? "Booking..." : "Confirm Appointment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SCHEDULE CONSULTATION MODAL */}
      {consultModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-4 sm:p-6 shadow-2xl border border-zinc-200 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <h3 className="text-sm sm:text-base font-extrabold text-zinc-900">Schedule Consultation</h3>
              <button
                onClick={() => setConsultModalOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConsultSubmit} className="space-y-3 mt-4 text-xs">
              <div>
                <label className="block font-bold text-zinc-700 mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={consultForm.preferredDate}
                  onChange={(e) => setConsultForm({ ...consultForm, preferredDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Time Slot</label>
                <input
                  type="text"
                  required
                  value={consultForm.preferredTimeSlot}
                  onChange={(e) =>
                    setConsultForm({ ...consultForm, preferredTimeSlot: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Format</label>
                <select
                  value={consultForm.consultationOption}
                  onChange={(e) =>
                    setConsultForm({ ...consultForm, consultationOption: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="video">Video Call (Google Meet / Zoom)</option>
                  <option value="audio">Audio Phone Call</option>
                  <option value="in-person">In-Person Consultation</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Notes</label>
                <input
                  type="text"
                  value={consultForm.notes}
                  onChange={(e) => setConsultForm({ ...consultForm, notes: e.target.value })}
                  placeholder="Consultation agenda..."
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="pt-3 border-t border-zinc-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setConsultModalOpen(false)}
                  className="px-4 py-2 font-bold text-zinc-600 hover:bg-zinc-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 font-bold bg-purple-700 hover:bg-purple-800 text-white rounded-xl disabled:opacity-50"
                >
                  {submitting ? "Saving..." : "Schedule Consultation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SCHEDULE FOLLOWUP MODAL */}
      {followUpModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-4 sm:p-6 shadow-2xl border border-zinc-200 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <h3 className="text-sm sm:text-base font-extrabold text-zinc-900">Schedule Follow-up</h3>
              <button
                onClick={() => setFollowUpModalOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFollowUpSubmit} className="space-y-3 mt-4 text-xs">
              <div>
                <label className="block font-bold text-zinc-700 mb-1">Follow-up Date</label>
                <input
                  type="date"
                  required
                  value={followUpForm.followUpDate}
                  onChange={(e) => setFollowUpForm({ ...followUpForm, followUpDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Reason</label>
                <input
                  type="text"
                  required
                  value={followUpForm.followUpReason}
                  onChange={(e) =>
                    setFollowUpForm({ ...followUpForm, followUpReason: e.target.value })
                  }
                  placeholder="e.g. Check recovery / Review reports"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Instructions / Notes</label>
                <textarea
                  rows={2}
                  value={followUpForm.notes}
                  onChange={(e) => setFollowUpForm({ ...followUpForm, notes: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
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
                  className="px-5 py-2 font-bold bg-amber-700 hover:bg-amber-800 text-white rounded-xl disabled:opacity-50"
                >
                  {submitting ? "Saving..." : "Schedule Follow-up"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NOTE MODAL */}
      {noteModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-4 sm:p-6 shadow-2xl border border-zinc-200 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <h3 className="text-sm sm:text-base font-extrabold text-zinc-900">Attach Internal Note</h3>
              <button
                onClick={() => setNoteModalOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleNoteSubmit} className="space-y-3 mt-4 text-xs">
              <div>
                <label className="block font-bold text-zinc-700 mb-1">Note Content</label>
                <textarea
                  rows={4}
                  required
                  value={quickNoteText}
                  onChange={(e) => setQuickNoteText(e.target.value)}
                  placeholder="Enter observation / note..."
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500"
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
                  className="px-5 py-2 font-bold bg-brand-700 hover:bg-brand-800 text-white rounded-xl disabled:opacity-50"
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
