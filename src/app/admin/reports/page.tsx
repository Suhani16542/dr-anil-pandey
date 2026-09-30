"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart3,
  Users,
  Calendar,
  Video,
  Clock,
  Stethoscope,
  RefreshCw,
  TrendingUp,
  PieChart,
  ShieldCheck,
} from "lucide-react";

interface AggregateItem {
  _id: string;
  count: number;
}

interface ReportData {
  totalPatients: number;
  patientsByStatus: AggregateItem[];
  patientsByGender: AggregateItem[];
  patientsBySource: AggregateItem[];
  totalAppointments: number;
  appointmentsByStatus: AggregateItem[];
  totalConsultations: number;
  consultationsByStatus: AggregateItem[];
  totalFollowups: number;
  followupsByStatus: AggregateItem[];
  totalVisits: number;
}

export default function ReportsPage() {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reports");
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-brand-700 uppercase tracking-wider">
            <BarChart3 className="w-4 h-4" />
            <span>Clinic CRM Analytics & Reports</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 mt-1">
            Clinic Operational & Patient Reports
          </h1>
          <p className="text-zinc-500 text-xs mt-0.5">
            Aggregated metrics on patient growth, appointments, consultations, and follow-up compliance.
          </p>
        </div>

        <button
          onClick={fetchReports}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-xs font-bold transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Reports</span>
        </button>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
          <span className="text-xs font-bold text-zinc-500 uppercase">Total Patients</span>
          <div className="text-2xl font-extrabold text-zinc-900 mt-2">
            {loading ? "..." : data?.totalPatients || 0}
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">Registered in CRM database</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
          <span className="text-xs font-bold text-zinc-500 uppercase">Clinical Visits</span>
          <div className="text-2xl font-extrabold text-blue-900 mt-2">
            {loading ? "..." : data?.totalVisits || 0}
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">Encounters recorded</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
          <span className="text-xs font-bold text-zinc-500 uppercase">Appointments</span>
          <div className="text-2xl font-extrabold text-brand-900 mt-2">
            {loading ? "..." : data?.totalAppointments || 0}
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">Bookings processed</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
          <span className="text-xs font-bold text-zinc-500 uppercase">Follow-up Tasks</span>
          <div className="text-2xl font-extrabold text-amber-900 mt-2">
            {loading ? "..." : data?.totalFollowups || 0}
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">Scheduled follow-up CRM items</p>
        </div>
      </div>

      {/* Aggregate Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Patient Status Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-4">
          <h2 className="text-sm font-extrabold text-zinc-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-700" />
            <span>Patients by Status</span>
          </h2>
          <div className="space-y-2.5">
            {data?.patientsByStatus?.map((item) => {
              const total = data.totalPatients || 1;
              const pct = Math.round((item.count / total) * 100);
              return (
                <div key={item._id || "Unknown"} className="text-xs space-y-1">
                  <div className="flex justify-between font-semibold text-zinc-700">
                    <span>{item._id || "Unspecified"}</span>
                    <span>
                      {item.count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Patient Acquisition Source */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-4">
          <h2 className="text-sm font-extrabold text-zinc-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-brand-700" />
            <span>Patient Acquisition Source</span>
          </h2>
          <div className="space-y-2.5">
            {data?.patientsBySource?.map((item) => {
              const total = data.totalPatients || 1;
              const pct = Math.round((item.count / total) * 100);
              return (
                <div key={item._id || "Unknown"} className="text-xs space-y-1">
                  <div className="flex justify-between font-semibold text-zinc-700">
                    <span>{item._id || "Direct Clinic"}</span>
                    <span>
                      {item.count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-brand-600 h-2 rounded-full" style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Follow-up Status Compliance */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-4">
          <h2 className="text-sm font-extrabold text-zinc-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-700" />
            <span>Follow-up Status Breakdown</span>
          </h2>
          <div className="space-y-2.5">
            {data?.followupsByStatus?.map((item) => {
              const total = data.totalFollowups || 1;
              const pct = Math.round((item.count / total) * 100);
              return (
                <div key={item._id || "Unknown"} className="text-xs space-y-1">
                  <div className="flex justify-between font-semibold text-zinc-700">
                    <span>{item._id || "Pending"}</span>
                    <span>
                      {item.count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-amber-600 h-2 rounded-full" style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Appointment Status Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-4">
          <h2 className="text-sm font-extrabold text-zinc-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-700" />
            <span>Appointment Status Distribution</span>
          </h2>
          <div className="space-y-2.5">
            {data?.appointmentsByStatus?.map((item) => {
              const total = data.totalAppointments || 1;
              const pct = Math.round((item.count / total) * 100);
              return (
                <div key={item._id || "Unknown"} className="text-xs space-y-1">
                  <div className="flex justify-between font-semibold text-zinc-700">
                    <span>{item._id || "Pending"}</span>
                    <span>
                      {item.count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
