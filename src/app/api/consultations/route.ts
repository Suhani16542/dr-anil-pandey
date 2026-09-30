import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Consultation } from "@/models/Consultation";
import { getCurrentAdmin } from "@/lib/auth";
import { sendConsultationNotification } from "@/lib/email";
import { findOrCreatePatient } from "@/lib/patientHelper";

// PUBLIC & ADMIN: Submit a consultation booking
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      fullName,
      phone,
      email,
      consultationOption,
      consultationType,
      preferredDate,
      preferredTimeSlot,
      notes,
      reason,
      followUpDate,
      patientId: explicitPatientId,
    } = body;

    // Server-side validation
    if (!fullName || !String(fullName).trim()) {
      return NextResponse.json(
        { success: false, message: "Full name is required" },
        { status: 400 }
      );
    }

    if (!phone || !String(phone).trim()) {
      return NextResponse.json(
        { success: false, message: "Phone number is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(String(email).trim())) {
      return NextResponse.json(
        { success: false, message: "A valid email address is required" },
        { status: 400 }
      );
    }

    if (!preferredDate) {
      return NextResponse.json(
        { success: false, message: "Preferred consultation date is required" },
        { status: 400 }
      );
    }

    await connectDB();

    // CRM integration: link to patient
    let linkedPatientId = explicitPatientId;
    if (!linkedPatientId) {
      const patient = await findOrCreatePatient({
        fullName: String(fullName).trim(),
        phone: String(phone).trim(),
        email: String(email).trim().toLowerCase(),
        source: "Website Consultation",
        reason: reason || notes || "Online Consultation",
      });
      linkedPatientId = patient._id;
    }

    const consultation = await Consultation.create({
      patientId: linkedPatientId,
      fullName: String(fullName).trim(),
      phone: String(phone).trim(),
      email: String(email).trim().toLowerCase(),
      consultationOption: consultationOption || "in-person",
      consultationType: consultationType || "Clinical Consultation",
      preferredDate: String(preferredDate).trim(),
      preferredTimeSlot: preferredTimeSlot || "10:00 AM",
      notes: notes ? String(notes).trim() : "",
      reason: reason ? String(reason).trim() : "",
      followUpDate: followUpDate || "",
      status: "Pending",
    });

    // Fire email notification asynchronously (non-blocking)
    sendConsultationNotification({
      fullName: consultation.fullName,
      phone: consultation.phone,
      email: consultation.email,
      consultationOption: consultation.consultationOption,
      preferredDate: consultation.preferredDate,
      preferredTimeSlot: consultation.preferredTimeSlot,
      notes: consultation.notes,
    }).catch(() => {});

    return NextResponse.json(
      {
        success: true,
        message: "Consultation booking request submitted successfully",
        data: {
          id: String(consultation._id),
          patientId: linkedPatientId,
          fullName: consultation.fullName,
          consultationOption: consultation.consultationOption,
          preferredDate: consultation.preferredDate,
          preferredTimeSlot: consultation.preferredTimeSlot,
          status: consultation.status,
          createdAt: consultation.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("[Consultation Submission API Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit consultation booking request." },
      { status: 500 }
    );
  }
}

// ADMIN ONLY: Query & List consultations with search, filter, and pagination
export async function GET(req: Request) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() || "";
    const status = searchParams.get("status")?.trim() || "";
    const option = searchParams.get("option")?.trim() || "";
    const patientId = searchParams.get("patientId")?.trim() || "";
    const date = searchParams.get("date")?.trim() || "";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10", 10)));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = {};

    if (patientId) {
      filter.patientId = patientId;
    }

    if (status && status !== "ALL") {
      filter.status = status;
    }

    if (option && option !== "ALL") {
      filter.consultationOption = option;
    }

    if (date) {
      filter.preferredDate = date;
    }

    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { notes: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Consultation.countDocuments(filter);
    const totalPages = Math.ceil(total / limit) || 1;
    const skip = (page - 1) * limit;

    const consultations = await Consultation.find(filter)
      .populate("patientId", "patientId fullName phone email status")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: consultations,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error: unknown) {
    console.error("[Consultation List API Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch consultations" },
      { status: 500 }
    );
  }
}
