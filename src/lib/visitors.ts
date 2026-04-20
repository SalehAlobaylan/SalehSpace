import "server-only";

import { getDbOrNull } from "./db";

export interface Visitor {
  id: number;
  ip_address: string;
  user_agent: string | null;
  country: string | null;
  visited_at: string;
}

export interface VisitorStats {
  totalVisits: number;
  uniqueVisitors: number;
  recentVisitors: Visitor[];
}

function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");

  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) {
      return firstIp;
    }
  }

  return headers.get("x-real-ip") || "unknown";
}

export async function trackVisitor(headers: Headers): Promise<void> {
  const db = getDbOrNull();

  if (!db) {
    return;
  }

  const ipAddress = getClientIp(headers);
  const userAgent = headers.get("user-agent") || "unknown";

  await db`
    INSERT INTO visitors (ip_address, user_agent, visited_at)
    VALUES (${ipAddress}, ${userAgent}, NOW())
    ON CONFLICT (ip_address)
    DO UPDATE SET
      user_agent = EXCLUDED.user_agent,
      visited_at = EXCLUDED.visited_at
  `;
}

export async function getVisitorStats(): Promise<VisitorStats> {
  const db = getDbOrNull();

  if (!db) {
    return {
      totalVisits: 0,
      uniqueVisitors: 0,
      recentVisitors: [],
    };
  }

  const [totalRow] = await db<{ count: number }[]>`
    SELECT COUNT(*)::int AS count
    FROM visitors
  `;

  const [uniqueRow] = await db<{ count: number }[]>`
    SELECT COUNT(DISTINCT ip_address)::int AS count
    FROM visitors
  `;

  const recentVisitors = await db<Visitor[]>`
    SELECT
      id::int,
      ip_address,
      user_agent,
      country,
      visited_at::text
    FROM visitors
    ORDER BY visited_at DESC
    LIMIT 100
  `;

  return {
    totalVisits: totalRow?.count || 0,
    uniqueVisitors: uniqueRow?.count || 0,
    recentVisitors,
  };
}
