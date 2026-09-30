import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Patient } from "@/models/Patient";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim() || "";

    if (!q) {
      return NextResponse.json({ success: true, data: [] });
    }

    await connectDB();

    const patients = await Patient.find({
      $or: [
        { patientId: { $regex: q, $options: "i" } },
        { fullName: { $regex: q, $options: "i" } },
        { phone: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
      ],
    })
      .select("patientId fullName phone email status lastVisitDate nextFollowUpDate gender age")
      .limit(10)
      .lean();

    return NextResponse.json({ success: true, data: patients });
  } catch (error: unknown) {
    console.error("[Patient Search Error]:", error);
    return NextResponse.json({ success: false, message: "Search failed" }, { status: 500 });
  }
}
