import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Admin } from "@/models/Admin";
import { getCurrentAdmin, comparePassword, hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const currentAdmin = await getCurrentAdmin();
    if (!currentAdmin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Current password and new password are required" },
        { status: 400 }
      );
    }

    if (String(newPassword).length < 6) {
      return NextResponse.json(
        { success: false, message: "New password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    await connectDB();
    const admin = await Admin.findById(currentAdmin.adminId);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Admin not found" },
        { status: 404 }
      );
    }

    const isMatch = await comparePassword(currentPassword, admin.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Incorrect current password" },
        { status: 400 }
      );
    }

    admin.passwordHash = await hashPassword(newPassword);
    await admin.save();

    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error: unknown) {
    console.error("[Change Password Error]:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
