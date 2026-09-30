import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Patient } from "@/models/Patient";
import { getCurrentAdmin } from "@/lib/auth";
import { generatePatientId } from "@/lib/patientHelper";

// GET /api/patients - List patients with search, filtering, and pagination
export async function GET(req: Request) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() || "";
    const status = searchParams.get("status")?.trim() || "";
    const gender = searchParams.get("gender")?.trim() || "";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10", 10)));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = {};

    if (status && status !== "ALL") {
      filter.status = status;
    }

    if (gender && gender !== "ALL") {
      filter.gender = gender;
    }

    if (search) {
      filter.$or = [
        { patientId: { $regex: search, $options: "i" } },
        { fullName: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Patient.countDocuments(filter);
    const totalPages = Math.ceil(total / limit) || 1;
    const skip = (page - 1) * limit;

    const patients = await Patient.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: patients,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error: unknown) {
    console.error("[Patients GET API Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch patients list" },
      { status: 500 }
    );
  }
}

// POST /api/patients - Create a new patient manually from admin CRM
export async function POST(req: Request) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      fullName,
      phone,
      email,
      gender,
      dob,
      age,
      address,
      city,
      emergencyContact,
      reasonForConsultation,
      currentConcerns,
      relevantHistory,
      allergies,
      currentMedications,
      previousTreatments,
      notes,
      patientSource,
      assignedStaff,
      status,
      internalNotes,
    } = body;

    // Validation
    if (!fullName || !String(fullName).trim()) {
      return NextResponse.json(
        { success: false, message: "Full Name is required" },
        { status: 400 }
      );
    }

    if (!phone || !String(phone).trim()) {
      return NextResponse.json(
        { success: false, message: "Phone / WhatsApp number is required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if patient already exists by phone
    const existingPatient = await Patient.findOne({ phone: String(phone).trim() });
    if (existingPatient) {
      return NextResponse.json(
        {
          success: false,
          message: `A patient with phone number ${phone} already exists (${existingPatient.patientId} - ${existingPatient.fullName}).`,
          existingPatientId: existingPatient._id,
        },
        { status: 409 }
      );
    }

    const patientId = await generatePatientId();

    const patient = await Patient.create({
      patientId,
      fullName: String(fullName).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim().toLowerCase() : "",
      gender: gender || "Prefer not to say",
      dob: dob || "",
      age: age ? Number(age) : undefined,
      address: address ? String(address).trim() : "",
      city: city ? String(city).trim() : "",
      emergencyContact: emergencyContact || { name: "", phone: "", relationship: "" },
      reasonForConsultation: reasonForConsultation ? String(reasonForConsultation).trim() : "",
      currentConcerns: currentConcerns ? String(currentConcerns).trim() : "",
      relevantHistory: relevantHistory ? String(relevantHistory).trim() : "",
      allergies: allergies ? String(allergies).trim() : "",
      currentMedications: currentMedications ? String(currentMedications).trim() : "",
      previousTreatments: previousTreatments ? String(previousTreatments).trim() : "",
      notes: notes ? String(notes).trim() : "",
      patientSource: patientSource ? String(patientSource).trim() : "Direct Clinic Registration",
      assignedStaff: assignedStaff ? String(assignedStaff).trim() : "Dr. Anil Pandey",
      status: status || "Active",
      internalNotes: internalNotes ? String(internalNotes).trim() : "",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Patient record created successfully",
        data: patient,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("[Patients POST API Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create patient record" },
      { status: 500 }
    );
  }
}
