import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Inquiry } from "@/models/Inquiry";
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

    const updated = await Inquiry.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, message: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Inquiry updated", data: updated });
  } catch (error: unknown) {
    console.error("[Inquiry Update Error]:", error);
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

    const deleted = await Inquiry.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false, message: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Inquiry deleted" });
  } catch (error: unknown) {
    console.error("[Inquiry Delete Error]:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
