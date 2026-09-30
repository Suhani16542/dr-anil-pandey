import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Consultation } from "@/models/Consultation";
import { getCurrentAdmin } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: RouteParams) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const consultation = await Consultation.findById(id).lean();
    if (!consultation) {
      return NextResponse.json({ success: false, message: "Consultation not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: consultation });
  } catch (error: unknown) {
    console.error("[Consultation Detail Error]:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
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

    const updated = await Consultation.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, message: "Consultation not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Consultation updated successfully",
      data: updated,
    });
  } catch (error: unknown) {
    console.error("[Consultation Update Error]:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
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

    const deleted = await Consultation.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false, message: "Consultation not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Consultation deleted successfully",
    });
  } catch (error: unknown) {
    console.error("[Consultation Delete Error]:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
