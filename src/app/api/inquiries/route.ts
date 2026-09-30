import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Inquiry } from "@/models/Inquiry";
import { getCurrentAdmin } from "@/lib/auth";

// PUBLIC: Submit a general inquiry/contact message
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, message } = body;

    if (!name || !String(name).trim()) {
      return NextResponse.json({ success: false, message: "Name is required" }, { status: 400 });
    }

    if (!email || !String(email).trim()) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    if (!message || !String(message).trim()) {
      return NextResponse.json({ success: false, message: "Message is required" }, { status: 400 });
    }

    await connectDB();

    const inquiry = await Inquiry.create({
      name: String(name).trim(),
      phone: phone ? String(phone).trim() : "",
      email: String(email).trim().toLowerCase(),
      message: String(message).trim(),
      status: "New",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received successfully",
        data: inquiry,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("[Inquiry API Error]:", error);
    return NextResponse.json({ success: false, message: "Failed to submit inquiry" }, { status: 500 });
  }
}

// ADMIN ONLY: List inquiries
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
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10", 10)));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = {};

    if (status && status !== "ALL") {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Inquiry.countDocuments(filter);
    const totalPages = Math.ceil(total / limit) || 1;
    const skip = (page - 1) * limit;

    const inquiries = await Inquiry.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: inquiries,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error: unknown) {
    console.error("[Inquiries List Error]:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch inquiries" }, { status: 500 });
  }
}
