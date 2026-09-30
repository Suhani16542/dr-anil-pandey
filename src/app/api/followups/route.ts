import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { FollowUp } from "@/models/FollowUp";
import { Patient } from "@/models/Patient";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { searchParams } = new URL(req.url);
    const filterType = searchParams.get("filter") || "all";
    const status = searchParams.get("status");
    const patientId = searchParams.get("patientId");

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    
    const startOfTomorrow = new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000);
    const endOfTomorrow = new Date(endOfToday.getTime() + 24 * 60 * 60 * 1000);
    
    const endOfWeek = new Date(startOfToday.getTime() + 7 * 24 * 60 * 60 * 1000);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = {};

    if (patientId) {
      query.patientId = patientId;
    }

    if (filterType === "today") {
      query.followUpDate = { $gte: startOfToday, $lte: endOfToday };
    } else if (filterType === "tomorrow") {
      query.followUpDate = { $gte: startOfTomorrow, $lte: endOfTomorrow };
    } else if (filterType === "this_week") {
      query.followUpDate = { $gte: startOfToday, $lte: endOfWeek };
    } else if (filterType === "overdue") {
      query.followUpDate = { $lt: startOfToday };
      query.status = { $ne: "Completed" };
    } else if (filterType === "completed") {
      query.status = "Completed";
    }

    if (status && status !== "ALL") {
      query.status = status;
    }

    const followups = await FollowUp.find(query)
      .populate("patientId", "patientId fullName phone email status lastVisitDate")
      .sort({ followUpDate: 1 })
      .lean();

    // Summary counts
    const [dueTodayCount, overdueCount, totalPendingCount] = await Promise.all([
      FollowUp.countDocuments({
        followUpDate: { $gte: startOfToday, $lte: endOfToday },
        status: { $ne: "Completed" },
      }),
      FollowUp.countDocuments({
        followUpDate: { $lt: startOfToday },
        status: { $ne: "Completed" },
      }),
      FollowUp.countDocuments({ status: { $in: ["Pending", "Contacted", "Scheduled"] } }),
    ]);

    return NextResponse.json({
      success: true,
      data: followups,
      counts: {
        dueToday: dueTodayCount,
        overdue: overdueCount,
        totalPending: totalPendingCount,
      },
    });
  } catch (error: unknown) {
    console.error("[FollowUps GET API Error]:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch follow-ups" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { patientId, lastVisitDate, followUpDate, followUpReason, status, assignedStaff, notes } = body;

    if (!patientId || !followUpDate || !followUpReason) {
      return NextResponse.json(
        { success: false, message: "Patient, follow-up date, and reason are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const fDate = new Date(followUpDate);

    const followUp = await FollowUp.create({
      patientId,
      lastVisitDate: lastVisitDate ? new Date(lastVisitDate) : undefined,
      followUpDate: fDate,
      followUpReason: String(followUpReason).trim(),
      status: status || "Pending",
      assignedStaff: assignedStaff || admin.name || "Dr. Anil Pandey",
      notes: notes ? String(notes).trim() : "",
    });

    // Update patient nextFollowUpDate
    await Patient.findByIdAndUpdate(patientId, {
      $set: {
        nextFollowUpDate: fDate,
        status: "Follow-up Required",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Follow-up created successfully",
        data: followUp,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("[FollowUps POST API Error]:", error);
    return NextResponse.json({ success: false, message: "Failed to create follow-up" }, { status: 500 });
  }
}
