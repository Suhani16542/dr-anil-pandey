import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { PatientNote } from "@/models/PatientNote";
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

    const notes = await PatientNote.find(filter).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: notes });
  } catch (error: unknown) {
    console.error("[PatientNotes GET Error]:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch notes" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { patientId, note, createdBy } = body;

    if (!patientId || !note || !String(note).trim()) {
      return NextResponse.json(
        { success: false, message: "Patient ID and note content are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const newNote = await PatientNote.create({
      patientId,
      note: String(note).trim(),
      createdBy: createdBy || admin.name || "Dr. Anil Pandey",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Note saved successfully",
        data: newNote,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("[PatientNotes POST Error]:", error);
    return NextResponse.json({ success: false, message: "Failed to create note" }, { status: 500 });
  }
}
