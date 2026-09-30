import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { FollowUp } from "@/models/FollowUp";
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

    const updated = await FollowUp.findByIdAndUpdate(id, { $set: body }, { new: true });
    if (!updated) {
      return NextResponse.json({ success: false, message: "Follow-up not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Follow-up updated", data: updated });
  } catch (error: unknown) {
    console.error("[FollowUp PATCH API Error]:", error);
    return NextResponse.json({ success: false, message: "Failed to update follow-up" }, { status: 500 });
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

    await FollowUp.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Follow-up deleted" });
  } catch (error: unknown) {
    console.error("[FollowUp DELETE API Error]:", error);
    return NextResponse.json({ success: false, message: "Failed to delete follow-up" }, { status: 500 });
  }
}
