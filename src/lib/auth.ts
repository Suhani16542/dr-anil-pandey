import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { Admin } from "@/models/Admin";
import { connectDB } from "./db";

const JWT_SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "dr_anil_pandey_secure_jwt_secret_key_2026"
);

export const AUTH_COOKIE_NAME = "dr_anil_admin_token";

export interface AdminTokenPayload {
  adminId: string;
  email: string;
  name: string;
  role: string;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function signToken(payload: AdminTokenPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<AdminTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as AdminTokenPayload;
  } catch {
    return null;
  }
}

export async function getCurrentAdmin(): Promise<AdminTokenPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

/**
 * Ensures an admin exists in database on startup/first login
 */
export async function ensureDefaultAdmin(): Promise<void> {
  try {
    await connectDB();
    const count = await Admin.countDocuments();
    if (count === 0) {
      const defaultEmail = (process.env.ADMIN_EMAIL || "admin@dranilpandey.com").toLowerCase();
      const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || "admin123";
      const passwordHash = await hashPassword(defaultPassword);

      await Admin.create({
        email: defaultEmail,
        passwordHash,
        name: "Dr. Anil Pandey Admin",
        role: "admin",
      });
      console.log(`[Admin Seed] Default admin created: ${defaultEmail}`);
    }
  } catch (err: unknown) {
    console.warn("[Admin Seed] Could not ensure default admin:", err instanceof Error ? err.message : String(err));
  }
}
