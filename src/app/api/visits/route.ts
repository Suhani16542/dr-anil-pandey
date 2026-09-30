import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Visit } from "@/models/Visit";
import { Patient } from "@/models/Patient";
import { FollowUp } from "@/models/FollowUp";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { searchParams } = new URL(req.url);
    const patientId = searchParams.get("patientId");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = {};
    if (patientId) {
      filter.patientId = patientId;
    }

    const visits = await Visit.find(filter)
      .populate("patientId", "patientId fullName phone email")
      .sort({ visitDate: -1 })
      .lean();

    return NextResponse.json({ success: true, data: visits });
  } catch (error: unknown) {
    console.error("[Visits GET API Error]:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch visits" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      patientId,
      visitDate,
      visitType,
      reason,
      consultationNotes,
      findings,
      treatmentNotes,
      followUpRecommendation,
      nextFollowUpDate,
      internalNotes,
      recordedBy,
    } = body;

    if (!patientId) {
      return NextResponse.json({ success: false, message: "Patient ID is required" }, { status: 400 });
    }

    await connectDB();

    const actualVisitDate = visitDate ? new Date(visitDate) : new Date();

    const visit = await Visit.create({
      patientId,
      visitDate: actualVisitDate,
      visitType: visitType || "Consultation",
      reason: reason ? String(reason).trim() : "",
      consultationNotes: consultationNotes ? String(consultationNotes).trim() : "",
      findings: findings ? String(findings).trim() : "",
      treatmentNotes: treatmentNotes ? String(treatmentNotes).trim() : "",
      followUpRecommendation: followUpRecommendation ? String(followUpRecommendation).trim() : "",
      nextFollowUpDate: nextFollowUpDate ? new Date(nextFollowUpDate) : undefined,
      internalNotes: internalNotes ? String(internalNotes).trim() : "",
      recordedBy: recordedBy || admin.name || "Dr. Anil Pandey",
    });

    // Update patient's lastVisitDate & nextFollowUpDate
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatePatientFields: Record<string, any> = {
      lastVisitDate: actualVisitDate,
    };

    if (nextFollowUpDate) {
      const fDate = new Date(nextFollowUpDate);
      updatePatientFields.nextFollowUpDate = fDate;
      updatePatientFields.status = "Follow-up Required";

      // Also automatically create FollowUp item
      await FollowUp.create({
        patientId,
        lastVisitDate: actualVisitDate,
        followUpDate: fDate,
        followUpReason: followUpRecommendation || `Follow-up after ${visitType || "Visit"}`,
        status: "Pending",
        assignedStaff: admin.name || "Dr. Anil Pandey",
      });
    }

    await Patient.findByIdAndUpdate(patientId, { $set: updatePatientFields });

    return NextResponse.json(
      {
        success: true,
        message: "Visit recorded successfully",
        data: visit,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("[Visits POST API Error]:", error);
    return NextResponse.json({ success: false, message: "Failed to record visit" }, { status: 500 });
  }
}
