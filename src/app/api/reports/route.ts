import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Patient } from "@/models/Patient";
import { Appointment } from "@/models/Appointment";
import { Consultation } from "@/models/Consultation";
import { FollowUp } from "@/models/FollowUp";
import { Visit } from "@/models/Visit";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const [
      totalPatients,
      patientsByStatus,
      patientsByGender,
      patientsBySource,
      totalAppointments,
      appointmentsByStatus,
      totalConsultations,
      consultationsByStatus,
      totalFollowups,
      followupsByStatus,
      totalVisits,
    ] = await Promise.all([
      Patient.countDocuments(),
      Patient.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Patient.aggregate([{ $group: { _id: "$gender", count: { $sum: 1 } } }]),
      Patient.aggregate([{ $group: { _id: "$patientSource", count: { $sum: 1 } } }]),
      Appointment.countDocuments(),
      Appointment.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Consultation.countDocuments(),
      Consultation.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      FollowUp.countDocuments(),
      FollowUp.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Visit.countDocuments(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalPatients,
        patientsByStatus,
        patientsByGender,
        patientsBySource,
        totalAppointments,
        appointmentsByStatus,
        totalConsultations,
        consultationsByStatus,
        totalFollowups,
        followupsByStatus,
        totalVisits,
      },
    });
  } catch (error: unknown) {
    console.error("[Reports API Error]:", error);
    return NextResponse.json({ success: false, message: "Failed to generate CRM reports" }, { status: 500 });
  }
}
