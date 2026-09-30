import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Patient } from "@/models/Patient";
import { Appointment } from "@/models/Appointment";
import { Consultation } from "@/models/Consultation";
import { FollowUp } from "@/models/FollowUp";
import { Visit } from "@/models/Visit";
import { Inquiry } from "@/models/Inquiry";
import { getCurrentAdmin, ensureDefaultAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await ensureDefaultAdmin();
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    // Today formatted string (YYYY-MM-DD)
    const todayStr = now.toISOString().split("T")[0];

    const [
      totalPatients,
      newPatientsThisMonth,
      activePatients,
      followupRequiredPatients,
      totalAppointments,
      todayAppointments,
      upcomingAppointments,
      pendingAppointments,
      totalConsultations,
      pendingConsultations,
      followupsDueToday,
      overdueFollowups,
      totalPendingFollowups,
      newInquiries,
      recentPatients,
      recentAppointments,
      recentConsultations,
      upcomingFollowups,
      recentVisits,
    ] = await Promise.all([
      Patient.countDocuments(),
      Patient.countDocuments({ createdAt: { $gte: startOfMonth } }),
      Patient.countDocuments({ status: "Active" }),
      Patient.countDocuments({ status: "Follow-up Required" }),
      Appointment.countDocuments(),
      Appointment.countDocuments({ preferredDate: todayStr }),
      Appointment.countDocuments({ status: { $in: ["Pending", "Confirmed"] } }),
      Appointment.countDocuments({ status: "Pending" }),
      Consultation.countDocuments(),
      Consultation.countDocuments({ status: "Pending" }),
      FollowUp.countDocuments({
        followUpDate: { $gte: startOfToday, $lte: endOfToday },
        status: { $ne: "Completed" },
      }),
      FollowUp.countDocuments({
        followUpDate: { $lt: startOfToday },
        status: { $ne: "Completed" },
      }),
      FollowUp.countDocuments({ status: { $in: ["Pending", "Contacted", "Scheduled"] } }),
      Inquiry.countDocuments({ status: "New" }),
      Patient.find().sort({ createdAt: -1 }).limit(6).lean(),
      Appointment.find({ status: { $in: ["Pending", "Confirmed"] } })
        .populate("patientId", "patientId fullName phone email status")
        .sort({ createdAt: -1 })
        .limit(6)
        .lean(),
      Consultation.find({ status: "Pending" })
        .populate("patientId", "patientId fullName phone email status")
        .sort({ createdAt: -1 })
        .limit(6)
        .lean(),
      FollowUp.find({ status: { $ne: "Completed" } })
        .populate("patientId", "patientId fullName phone email status")
        .sort({ followUpDate: 1 })
        .limit(6)
        .lean(),
      Visit.find()
        .populate("patientId", "patientId fullName phone email")
        .sort({ visitDate: -1 })
        .limit(6)
        .lean(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalPatients,
          newPatientsThisMonth,
          activePatients,
          followupRequiredPatients,
          totalAppointments,
          todayAppointments,
          upcomingAppointments,
          pendingAppointments,
          totalConsultations,
          pendingConsultations,
          followupsDueToday,
          overdueFollowups,
          totalPendingFollowups,
          newInquiries,
        },
        recentPatients,
        recentAppointments,
        recentConsultations,
        upcomingFollowups,
        recentVisits,
      },
    });
  } catch (error: unknown) {
    console.error("[Dashboard Stats Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load dashboard statistics" },
      { status: 500 }
    );
  }
}
