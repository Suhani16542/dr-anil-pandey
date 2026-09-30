"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Calendar,
  Video,
  Clock,
  AlertCircle,
  MessageSquare,
  ArrowRight,
  RefreshCw,
  Phone,
  UserPlus,
  CalendarPlus,
  Stethoscope,
  Clock3,
  ExternalLink,
} from "lucide-react";

interface DashboardStats {
  totalPatients: number;
  newPatientsThisMonth: number;
  activePatients: number;
  followupRequiredPatients: number;
  totalAppointments: number;
  todayAppointments: number;
  upcomingAppointments: number;
  pendingAppointments: number;
  totalConsultations: number;
  pendingConsultations: number;
  followupsDueToday: number;
  overdueFollowups: number;
  totalPendingFollowups: number;
  newInquiries: number;
}

interface PatientRef {
  _id: string;
  patientId: string;
  fullName: string;
  phone: string;
  email?: string;
  status: string;
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
  status: string;
  createdAt: string;
}

interface ConsultationItem {
  _id: string;
  patientId?: PatientRef;
  fullName: string;
  phone: string;
  email: string;
  consultationOption: string;
  preferredDate: string;
  preferredTimeSlot: string;
  status: string;
  createdAt: string;
}

interface FollowUpItem {
  _id: string;
  patientId?: PatientRef;
  followUpDate: string;
  followUpReason: string;
  status: string;
  assignedStaff?: string;
  createdAt: string;
}

interface RecentPatientItem {
  _id: string;
  patientId: string;
  fullName: string;
  phone: string;
  email?: string;
  gender?: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentPatients, setRecentPatients] = useState<RecentPatientItem[]>([]);
  const [recentAppointments, setRecentAppointments] = useState<AppointmentItem[]>([]);
  const [recentConsultations, setRecentConsultations] = useState<ConsultationItem[]>([]);
  const [upcomingFollowups, setUpcomingFollowups] = useState<FollowUpItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/dashboard/stats");
      const data = await res.json();
      if (data.success) {
        setStats(data.data.stats);
        setRecentPatients(data.data.recentPatients || []);
        setRecentAppointments(data.data.recentAppointments || []);
        setRecentConsultations(data.data.recentConsultations || []);
        setUpcomingFollowups(data.data.upcomingFollowups || []);
      }
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const res = await fetch("/api/dashboard/stats");
        const data = await res.json();
        if (data.success && isMounted) {
          setStats(data.data.stats);
          setRecentPatients(data.data.recentPatients || []);
          setRecentAppointments(data.data.recentAppointments || []);
          setRecentConsultations(data.data.recentConsultations || []);
          setUpcomingFollowups(data.data.upcomingFollowups || []);
        }
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
      case "Scheduled":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Confirmed":
      case "Active":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Completed":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "Follow-up Required":
        return "bg-purple-50 text-purple-800 border-purple-200";
      case "Cancelled":
      case "Missed":
        return "bg-rose-50 text-rose-800 border-rose-200";
      default:
        return "bg-zinc-50 text-zinc-700 border-zinc-200";
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-850 to-brand-950 text-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-sm border border-brand-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-1">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Clinical CRM & Patient Management</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">
            Dr. Anil Pandey Clinic Console
          </h1>
          <p className="text-zinc-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Real-time patient database, upcoming appointments, consultation queues, and clinical follow-up tracking.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
          <Link
            href="/admin/patients"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            <span>Patients Directory</span>
          </Link>
          <button
            onClick={fetchStats}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-2.5 bg-brand-800/80 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold transition-colors border border-brand-700 cursor-pointer"
            title="Refresh statistics"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden min-[380px]:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Primary CRM Stats Grid (1 Col Mobile, 2 Col Tablet, 4 Col Desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Patients */}
        <Link
          href="/admin/patients"
          className="bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200 hover:border-emerald-500 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Total Patients</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900">
              {loading ? "..." : stats?.totalPatients || 0}
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              +{stats?.newPatientsThisMonth || 0} this mo
            </span>
          </div>
          <div className="mt-2 text-xs text-zinc-500 flex items-center gap-1 group-hover:text-emerald-700 font-medium">
            <span>Manage patient records</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </Link>

        {/* Today's Appointments */}
        <Link
          href="/admin/appointments"
          className="bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200 hover:border-blue-500 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Today&apos;s Appointments</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900">
              {loading ? "..." : stats?.todayAppointments || 0}
            </div>
            <span className="text-xs text-zinc-500">
              ({stats?.upcomingAppointments || 0} upcoming)
            </span>
          </div>
          <div className="mt-2 text-xs text-zinc-500 flex items-center gap-1 group-hover:text-blue-700 font-medium">
            <span>View appointment schedule</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </Link>

        {/* Follow-ups Due Today */}
        <Link
          href="/admin/followups"
          className="bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200 hover:border-amber-500 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Follow-ups Due</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900">
              {loading ? "..." : stats?.followupsDueToday || 0}
            </div>
            {Boolean(stats?.overdueFollowups) && (
              <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                <AlertCircle className="w-3 h-3" />
                {stats?.overdueFollowups} overdue
              </span>
            )}
          </div>
          <div className="mt-2 text-xs text-zinc-500 flex items-center gap-1 group-hover:text-amber-700 font-medium">
            <span>Check follow-up CRM</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </Link>

        {/* Pending Consultations */}
        <Link
          href="/admin/consultations"
          className="bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200 hover:border-purple-500 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Pending Consultations</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Video className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900">
              {loading ? "..." : stats?.pendingConsultations || 0}
            </div>
            <span className="text-xs text-zinc-500">
              ({stats?.totalConsultations || 0} total)
            </span>
          </div>
          <div className="mt-2 text-xs text-zinc-500 flex items-center gap-1 group-hover:text-purple-700 font-medium">
            <span>Manage online requests</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </Link>
      </div>

      {/* Secondary Quick Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 bg-white p-3.5 sm:p-4 rounded-xl border border-zinc-200 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2 rounded-lg bg-slate-50/70">
          <span className="text-zinc-500 font-medium">Active Patients:</span>
          <span className="font-bold text-zinc-900 text-sm sm:text-xs">{stats?.activePatients || 0}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2 rounded-lg bg-slate-50/70">
          <span className="text-zinc-500 font-medium">Follow-up Needed:</span>
          <span className="font-bold text-purple-700 text-sm sm:text-xs">{stats?.followupRequiredPatients || 0}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2 rounded-lg bg-slate-50/70">
          <span className="text-zinc-500 font-medium">Pending Apt:</span>
          <span className="font-bold text-amber-700 text-sm sm:text-xs">{stats?.pendingAppointments || 0}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2 rounded-lg bg-slate-50/70">
          <span className="text-zinc-500 font-medium">New Inquiries:</span>
          <span className="font-bold text-brand-800 text-sm sm:text-xs">{stats?.newInquiries || 0}</span>
        </div>
      </div>

      {/* Main CRM Grid: Recent Patients & Upcoming Follow-ups */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Patients */}
        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-xs">
          <div className="p-3.5 sm:p-5 border-b border-zinc-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-700" />
              <h2 className="text-xs sm:text-sm font-bold text-zinc-900">Recent Patients</h2>
            </div>
            <Link
              href="/admin/patients"
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Directory</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-zinc-100">
            {recentPatients.length === 0 ? (
              <div className="p-8 text-center text-xs text-zinc-500">
                {loading ? "Loading patient records..." : "No patient records registered yet."}
              </div>
            ) : (
              recentPatients.map((patient) => (
                <div
                  key={patient._id}
                  className="p-3.5 sm:p-4 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-2.5 sm:gap-3"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-brand-100 text-brand-800 font-bold text-xs flex items-center justify-center shrink-0">
                      {patient.fullName.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Link
                          href={`/admin/patients/${patient._id}`}
                          className="text-xs font-bold text-zinc-900 hover:text-brand-700 truncate"
                        >
                          {patient.fullName}
                        </Link>
                        <span className="font-mono text-[10px] text-zinc-500 bg-zinc-100 px-1 py-0.2 rounded shrink-0">
                          {patient.patientId}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-500 flex items-center gap-2 mt-0.5 truncate">
                        <span>{patient.phone}</span>
                        {patient.gender && <span className="hidden sm:inline">• {patient.gender}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getStatusBadge(
                        patient.status
                      )}`}
                    >
                      {patient.status}
                    </span>
                    <Link
                      href={`/admin/patients/${patient._id}`}
                      className="p-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-100 text-zinc-600 transition-colors"
                      title="Open Profile"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Follow-up CRM Queue */}
        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-xs">
          <div className="p-3.5 sm:p-5 border-b border-zinc-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <Clock3 className="w-4 h-4 text-amber-700" />
              <h2 className="text-xs sm:text-sm font-bold text-zinc-900">Upcoming Follow-up CRM</h2>
            </div>
            <Link
              href="/admin/followups"
              className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
            >
              <span>Queue</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-zinc-100">
            {upcomingFollowups.length === 0 ? (
              <div className="p-8 text-center text-xs text-zinc-500">
                {loading ? "Loading follow-up tasks..." : "No pending follow-ups in the queue."}
              </div>
            ) : (
              upcomingFollowups.map((item) => (
                <div
                  key={item._id}
                  className="p-3.5 sm:p-4 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-2.5 sm:gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Link
                        href={item.patientId ? `/admin/patients/${item.patientId._id}` : "/admin/followups"}
                        className="text-xs font-bold text-zinc-900 hover:text-brand-700 truncate"
                      >
                        {item.patientId?.fullName || "Patient"}
                      </Link>
                      {item.patientId?.patientId && (
                        <span className="font-mono text-[10px] text-zinc-500 bg-zinc-100 px-1 rounded shrink-0">
                          {item.patientId.patientId}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-zinc-600 mt-0.5 truncate font-medium">
                      {item.followUpReason}
                    </div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">
                      Due: {new Date(item.followUpDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getStatusBadge(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                    {item.patientId?.phone && (
                      <a
                        href={`tel:${item.patientId.phone}`}
                        className="p-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-100 text-zinc-600 transition-colors"
                        title="Call Patient"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Secondary Row: Upcoming Appointments & Consultation Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Appointments Queue */}
        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-xs">
          <div className="p-3.5 sm:p-5 border-b border-zinc-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-700" />
              <h2 className="text-xs sm:text-sm font-bold text-zinc-900">Upcoming Appointments</h2>
            </div>
            <Link
              href="/admin/appointments"
              className="text-xs font-semibold text-brand-700 hover:text-brand-800 flex items-center gap-1"
            >
              <span>All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-zinc-100">
            {recentAppointments.length === 0 ? (
              <div className="p-8 text-center text-xs text-zinc-500">
                {loading ? "Loading appointments..." : "No appointments scheduled."}
              </div>
            ) : (
              recentAppointments.map((apt) => (
                <div
                  key={apt._id}
                  className="p-3.5 sm:p-4 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-2.5 sm:gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="text-xs font-bold text-zinc-900 truncate">{apt.fullName}</span>
                      {apt.patientId?.patientId && (
                        <Link
                          href={`/admin/patients/${apt.patientId._id}`}
                          className="font-mono text-[10px] text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-1.5 py-0.2 rounded font-semibold shrink-0"
                        >
                          {apt.patientId.patientId}
                        </Link>
                      )}
                    </div>
                    <div className="text-[11px] text-zinc-500 mt-0.5 truncate">
                      {apt.preferredDate} • {apt.preferredTime} ({apt.consultationType})
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${getStatusBadge(
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

        {/* Consultations Queue */}
        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-xs">
          <div className="p-3.5 sm:p-5 border-b border-zinc-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-purple-700" />
              <h2 className="text-xs sm:text-sm font-bold text-zinc-900">Consultation Requests</h2>
            </div>
            <Link
              href="/admin/consultations"
              className="text-xs font-semibold text-purple-700 hover:text-purple-800 flex items-center gap-1"
            >
              <span>All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-zinc-100">
            {recentConsultations.length === 0 ? (
              <div className="p-8 text-center text-xs text-zinc-500">
                {loading ? "Loading consultations..." : "No consultation requests found."}
              </div>
            ) : (
              recentConsultations.map((con) => (
                <div
                  key={con._id}
                  className="p-3.5 sm:p-4 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-2.5 sm:gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="text-xs font-bold text-zinc-900 truncate">{con.fullName}</span>
                      {con.patientId?.patientId && (
                        <Link
                          href={`/admin/patients/${con.patientId._id}`}
                          className="font-mono text-[10px] text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-1.5 py-0.2 rounded font-semibold shrink-0"
                        >
                          {con.patientId.patientId}
                        </Link>
                      )}
                    </div>
                    <div className="text-[11px] text-zinc-500 mt-0.5 truncate">
                      {con.preferredDate} • {con.preferredTimeSlot} ({con.consultationOption})
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${getStatusBadge(
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
      </div>
    </div>
  );
}
