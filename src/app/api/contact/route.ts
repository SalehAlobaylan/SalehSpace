import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ============ RATE LIMITING ============
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3; // Max 3 requests per minute per IP

function getRateLimitInfo(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (record.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: MAX_REQUESTS - record.count };
}

// ============ INPUT SANITIZATION ============
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "") // Remove < and > to prevent HTML injection
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, "") // Remove event handlers like onclick=
    .trim()
    .slice(0, 5000); // Limit length
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limit
    const { allowed, remaining } = getRateLimitInfo(ip);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "X-RateLimit-Remaining": "0",
            "Retry-After": "60",
          },
        }
      );
    }

    const body = await request.json();

    // Validate and sanitize input
    const name = sanitizeInput(body.name || "");
    const email = sanitizeInput(body.email || "");
    const message = sanitizeInput(body.message || "");

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Length validation
    if (name.length > 100) {
      return NextResponse.json(
        { error: "Name is too long (max 100 characters)" },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Message is too long (max 5000 characters)" },
        { status: 400 }
      );
    }

    // Escape HTML for safe email rendering
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>", // Use your verified domain: "Contact Form <contact@yourdomain.com>"
      to: ["salehwleed1@gmail.com"],
      replyTo: email,
      subject: `New Contact Form Message from ${safeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #013837; border-bottom: 2px solid #FFB703; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${safeName}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          </div>
          <div style="background-color: #066D6A; color: white; padding: 20px; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #FFB703;">Message:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${safeMessage}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Sent from SalehSpace contact form
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Email sent successfully", id: data?.id },
      {
        status: 200,
        headers: {
          "X-RateLimit-Remaining": remaining.toString(),
        },
      }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
