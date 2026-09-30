import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Admin } from "@/models/Admin";
import { comparePassword, signToken, AUTH_COOKIE_NAME, ensureDefaultAdmin } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectDB();
    await ensureDefaultAdmin();

    const normalizedEmail = String(email).trim().toLowerCase();
    const admin = await Admin.findOne({ email: normalizedEmail });

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isValidPassword = await comparePassword(password, admin.passwordHash);
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    admin.lastLogin = new Date();
    await admin.save();

    const token = await signToken({
      adminId: String(admin._id),
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful",
      data: {
        admin: {
          id: String(admin._id),
          email: admin.email,
          name: admin.name,
          role: admin.role,
        },
      },
    });

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: unknown) {
    console.error("[Login API Error]:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred during authentication" },
      { status: 500 }
    );
  }
}
