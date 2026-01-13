import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const supabase = createServerClient();

    // Get visitor information
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Check if visitor with this IP exists
    const { data: existingVisitor } = await supabase
      .from("visitors")
      .select("id")
      .eq("ip_address", ip)
      .single();

    if (existingVisitor) {
      // Update existing visitor's last visit time
      const { error } = await supabase
        .from("visitors")
        .update({ visited_at: new Date().toISOString() } as never)
        .eq("ip_address", ip);

      if (error) {
        console.error("Error updating visitor:", error);
      }
    } else {
      // Insert new visitor
      const { error } = await supabase.from("visitors").insert({
        ip_address: ip,
        user_agent: userAgent,
      } as never);

      if (error && error.code !== "23505") {
        // Ignore duplicate key errors, log others
        console.error("Error logging visitor:", error);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Visitor tracking error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabase = createServerClient();

    // Get total visitor count
    const { count: totalVisitors, error: countError } = await supabase
      .from("visitors")
      .select("*", { count: "exact", head: true });

    if (countError) {
      console.error("Error fetching visitor count:", countError);
      return NextResponse.json(
        { error: "Failed to fetch visitors" },
        { status: 500 }
      );
    }

    // Get unique visitors (distinct IPs)
    const { data: uniqueVisitors, error: uniqueError } = (await supabase
      .from("visitors")
      .select("ip_address")
      .order("visited_at", { ascending: false })) as {
      data: { ip_address: string }[] | null;
      error: { message: string; code?: string } | null;
    };

    if (uniqueError) {
      console.error("Error fetching unique visitors:", uniqueError);
      return NextResponse.json(
        { error: "Failed to fetch visitors" },
        { status: 500 }
      );
    }

    const uniqueIPs = new Set(uniqueVisitors?.map((v) => v.ip_address) || []);

    // Get recent visitors (last 100)
    const { data: recentVisitors, error: recentError } = await supabase
      .from("visitors")
      .select("*")
      .order("visited_at", { ascending: false })
      .limit(100);

    if (recentError) {
      console.error("Error fetching recent visitors:", recentError);
      return NextResponse.json(
        { error: "Failed to fetch visitors" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      totalVisits: totalVisitors || 0,
      uniqueVisitors: uniqueIPs.size,
      recentVisitors: recentVisitors || [],
    });
  } catch (error) {
    console.error("Visitor stats error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
