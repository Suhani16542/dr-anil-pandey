import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Visit } from "@/models/Visit";
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

    const updated = await Visit.findByIdAndUpdate(id, { $set: body }, { new: true });
    if (!updated) {
      return NextResponse.json({ success: false, message: "Visit not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Visit updated", data: updated });
  } catch (error: unknown) {
    console.error("[Visit PATCH API Error]:", error);
    return NextResponse.json({ success: false, message: "Failed to update visit" }, { status: 500 });
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

    await Visit.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Visit deleted" });
  } catch (error: unknown) {
    console.error("[Visit DELETE API Error]:", error);
    return NextResponse.json({ success: false, message: "Failed to delete visit" }, { status: 500 });
  }
}
