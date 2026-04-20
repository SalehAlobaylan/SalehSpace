import { NextResponse } from "next/server";

import { getVisitorStats, trackVisitor } from "@/lib/visitors";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    await trackVisitor(request.headers);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Visitor tracking error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    return NextResponse.json(await getVisitorStats());
  } catch (error) {
    console.error("Visitor stats error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
