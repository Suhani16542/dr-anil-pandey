import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Patient } from "@/models/Patient";
import { Appointment } from "@/models/Appointment";
import { Consultation } from "@/models/Consultation";
import { Visit } from "@/models/Visit";
import { FollowUp } from "@/models/FollowUp";
import { PatientNote } from "@/models/PatientNote";
import { getCurrentAdmin } from "@/lib/auth";
import mongoose from "mongoose";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/patients/[id] - Fetch detailed profile with all connected sub-modules & activity timeline
export async function GET(req: Request, { params }: RouteParams) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    // Query either by MongoDB ObjectId or human-readable patientId
    let patient = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      patient = await Patient.findById(id).lean();
    }
    if (!patient) {
      patient = await Patient.findOne({ patientId: id }).lean();
    }

    if (!patient) {
      return NextResponse.json({ success: false, message: "Patient not found" }, { status: 404 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const patientMongoId = (patient as any)._id;

    // Fetch related items in parallel
    const [appointments, consultations, visits, followups, notes] = await Promise.all([
      Appointment.find({ patientId: patientMongoId }).sort({ createdAt: -1 }).lean(),
      Consultation.find({ patientId: patientMongoId }).sort({ createdAt: -1 }).lean(),
      Visit.find({ patientId: patientMongoId }).sort({ visitDate: -1 }).lean(),
      FollowUp.find({ patientId: patientMongoId }).sort({ followUpDate: -1 }).lean(),
      PatientNote.find({ patientId: patientMongoId }).sort({ createdAt: -1 }).lean(),
    ]);

    // Construct Activity Timeline dynamically from real events
    interface ActivityItem {
      id: string;
      type: "patient_created" | "appointment" | "consultation" | "visit" | "followup" | "note" | "profile_update";
      title: string;
      description: string;
      date: Date | string;
      status?: string;
      meta?: Record<string, unknown>;
    }

    const timeline: ActivityItem[] = [];

    // Patient creation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const patientData = patient as any;
    timeline.push({
      id: `created-${patientData._id}`,
      type: "patient_created",
      title: "Patient Record Created",
      description: `Registered with ID ${patientData.patientId} (Source: ${patientData.patientSource || "Direct"})`,
      date: patientData.createdAt,
    });

    // Appointments
    appointments.forEach((apt) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const a = apt as any;
      timeline.push({
        id: `apt-${a._id}`,
        type: "appointment",
        title: `Appointment Booked (${a.consultationType || "General"})`,
        description: `Scheduled for ${a.preferredDate} - ${a.preferredTime}. Status: ${a.status}`,
        date: a.createdAt,
        status: a.status,
      });
    });

    // Consultations
    consultations.forEach((con) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const c = con as any;
      timeline.push({
        id: `con-${c._id}`,
        type: "consultation",
        title: `Consultation Requested (${c.consultationOption})`,
        description: `Date: ${c.preferredDate} at ${c.preferredTimeSlot}. Status: ${c.status}`,
        date: c.createdAt,
        status: c.status,
      });
    });

    // Visits
    visits.forEach((v) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const vis = v as any;
      timeline.push({
        id: `vis-${vis._id}`,
        type: "visit",
        title: `Clinical Visit: ${vis.visitType}`,
        description: vis.reason ? `Reason: ${vis.reason}` : "Clinical encounter recorded",
        date: vis.visitDate || vis.createdAt,
      });
    });

    // Follow-ups
    followups.forEach((f) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fol = f as any;
      timeline.push({
        id: `fol-${fol._id}`,
        type: "followup",
        title: `Follow-up: ${fol.followUpReason}`,
        description: `Target Date: ${new Date(fol.followUpDate).toLocaleDateString()} - Status: ${fol.status}`,
        date: fol.createdAt,
        status: fol.status,
      });
    });

    // Notes
    notes.forEach((n) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const not = n as any;
      timeline.push({
        id: `note-${not._id}`,
        type: "note",
        title: `Clinical Note Added by ${not.createdBy}`,
        description: not.note,
        date: not.createdAt,
      });
    });

    // Sort timeline by date descending
    timeline.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({
      success: true,
      data: {
        patient,
        appointments,
        consultations,
        visits,
        followups,
        notes,
        activityTimeline: timeline,
      },
    });
  } catch (error: unknown) {
    console.error("[Patient Detail API Error]:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch patient details" }, { status: 500 });
  }
}

// PATCH /api/patients/[id] - Update patient details
export async function PATCH(req: Request, { params }: RouteParams) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    await connectDB();

    const query = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { patientId: id };

    const updated = await Patient.findOneAndUpdate(query, { $set: body }, { new: true, runValidators: true });

    if (!updated) {
      return NextResponse.json({ success: false, message: "Patient not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Patient record updated successfully",
      data: updated,
    });
  } catch (error: unknown) {
    console.error("[Patient Update API Error]:", error);
    return NextResponse.json({ success: false, message: "Failed to update patient record" }, { status: 500 });
  }
}

// DELETE /api/patients/[id] - Delete or archive patient
export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const query = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { patientId: id };
    const patient = await Patient.findOne(query);

    if (!patient) {
      return NextResponse.json({ success: false, message: "Patient not found" }, { status: 404 });
    }

    await Patient.deleteOne({ _id: patient._id });

    return NextResponse.json({
      success: true,
      message: "Patient record deleted successfully",
    });
  } catch (error: unknown) {
    console.error("[Patient Delete API Error]:", error);
    return NextResponse.json({ success: false, message: "Failed to delete patient" }, { status: 500 });
  }
}
