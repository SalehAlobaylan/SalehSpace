import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
const attemptStore = new Map<string, { count: number; lockedUntil?: number }>();

export async function POST(request: Request) {
  try {
    const { pin } = await request.json();
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    // Check rate limiting
    const attempts = attemptStore.get(ip);
    if (attempts?.lockedUntil && Date.now() < attempts.lockedUntil) {
      return NextResponse.json(
        { success: false, error: "Too many attempts. Please try again later." },
        { status: 429 }
      );
    }

    // Validate PIN
    const adminPin = process.env.ADMIN_PIN;
    if (!adminPin) {
      console.error("ADMIN_PIN not configured");
      return NextResponse.json(
        { success: false, error: "Authentication not configured" },
        { status: 500 }
      );
    }

    if (pin === adminPin) {
      // Success - reset attempts
      attemptStore.delete(ip);

      // Create session
      const authSecret = process.env.AUTH_SECRET || "default-secret-change-me";
      const cookieStore = await cookies();
      cookieStore.set("auth_session", authSecret, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      return NextResponse.json({ success: true });
    }

    // Failed attempt - increment counter
    const currentAttempts = attemptStore.get(ip) || { count: 0 };
    currentAttempts.count += 1;

    if (currentAttempts.count >= MAX_ATTEMPTS) {
      currentAttempts.lockedUntil = Date.now() + LOCKOUT_DURATION;
    }

    attemptStore.set(ip, currentAttempts);

    return NextResponse.json(
      { success: false, error: "Incorrect PIN" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication failed" },
      { status: 500 }
    );
  }
}
