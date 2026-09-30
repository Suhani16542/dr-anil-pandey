import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Appointment } from "@/models/Appointment";
import { getCurrentAdmin } from "@/lib/auth";
import { sendAppointmentNotification } from "@/lib/email";
import { findOrCreatePatient } from "@/lib/patientHelper";

// PUBLIC & ADMIN: Submit a new appointment request
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      fullName,
      phone,
      email,
      preferredDate,
      preferredTime,
      consultationType,
      appointmentType,
      message,
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
        { success: false, message: "Preferred date is required" },
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
        source: "Website Appointment",
        reason: message || "General Appointment",
      });
      linkedPatientId = patient._id;
    }

    const appointment = await Appointment.create({
      patientId: linkedPatientId,
      fullName: String(fullName).trim(),
      phone: String(phone).trim(),
      email: String(email).trim().toLowerCase(),
      preferredDate: String(preferredDate).trim(),
      preferredTime: preferredTime || "morning",
      consultationType: consultationType || "in-person",
      appointmentType: appointmentType || "General Consultation",
      message: message ? String(message).trim() : "",
      status: "Pending",
    });

    // Fire email notification asynchronously (non-blocking)
    sendAppointmentNotification({
      fullName: appointment.fullName,
      phone: appointment.phone,
      email: appointment.email,
      preferredDate: appointment.preferredDate,
      preferredTime: appointment.preferredTime,
      consultationType: appointment.consultationType,
      message: appointment.message,
    }).catch(() => {});

    return NextResponse.json(
      {
        success: true,
        message: "Appointment request submitted successfully",
        data: {
          id: String(appointment._id),
          patientId: linkedPatientId,
          fullName: appointment.fullName,
          preferredDate: appointment.preferredDate,
          preferredTime: appointment.preferredTime,
          consultationType: appointment.consultationType,
          status: appointment.status,
          createdAt: appointment.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("[Appointment Submission API Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit appointment request. Please try again." },
      { status: 500 }
    );
  }
}

// ADMIN ONLY: Query & List appointments with search, filter, and pagination
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
    const consultationType = searchParams.get("consultationType")?.trim() || "";
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

    if (consultationType && consultationType !== "ALL") {
      filter.consultationType = consultationType;
    }

    if (date) {
      filter.preferredDate = date;
    }

    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Appointment.countDocuments(filter);
    const totalPages = Math.ceil(total / limit) || 1;
    const skip = (page - 1) * limit;

    const appointments = await Appointment.find(filter)
      .populate("patientId", "patientId fullName phone email status")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: appointments,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error: unknown) {
    console.error("[Appointment List API Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}
