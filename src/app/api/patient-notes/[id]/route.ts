import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { PatientNote } from "@/models/PatientNote";
import { getCurrentAdmin } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: Request, { params }: RouteParams) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    await connectDB();

    const updated = await PatientNote.findByIdAndUpdate(id, { $set: body }, { new: true });
    if (!updated) {
      return NextResponse.json({ success: false, message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Note updated", data: updated });
  } catch (error: unknown) {
    console.error("[PatientNote PATCH Error]:", error);
    return NextResponse.json({ success: false, message: "Failed to update note" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    await PatientNote.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Note deleted" });
  } catch (error: unknown) {
    console.error("[PatientNote DELETE Error]:", error);
    return NextResponse.json({ success: false, message: "Failed to delete note" }, { status: 500 });
  }
}
