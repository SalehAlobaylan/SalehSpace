"use client";

import { useAuth } from "@/lib/authContext";
import { useEffect, useState } from "react";

interface VisitorStats {
  totalVisits: number;
  uniqueVisitors: number;
  recentVisitors: Array<{
    id: number;
    ip_address: string;
    user_agent: string;
    visited_at: string;
  }>;
}

export default function VisitorStats({ locale }: { locale: "en" | "ar" }) {
  const { isAuthenticated } = useAuth();
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        const response = await fetch("/api/visitors");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch visitor stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;
  if (isLoading) return null;
  if (!stats) return null;

  return (
    <div className="fixed bottom-20 left-4 bg-[#F6E5C6]/10 backdrop-blur-sm border border-[#F6E5C6]/20 rounded-xl p-4 max-w-sm z-40">
      <h3 className="text-lg font-bold text-[#F6E5C6] mb-3">
        {locale === "ar" ? "إحصائيات الزوار" : "Visitor Statistics"}
      </h3>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-[#F6E5C6]/70">
            {locale === "ar" ? "إجمالي الزيارات:" : "Total Visits:"}
          </span>
          <span className="text-[#FFB703] font-bold">{stats.totalVisits}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-[#F6E5C6]/70">
            {locale === "ar" ? "زوار فريدون:" : "Unique Visitors:"}
          </span>
          <span className="text-[#FFB703] font-bold">{stats.uniqueVisitors}</span>
        </div>
      </div>

      {stats.recentVisitors.length > 0 && (
        <div className="mt-4 pt-4 border-t border-[#F6E5C6]/20">
          <p className="text-xs text-[#F6E5C6]/50 mb-2">
            {locale === "ar" ? "آخر 5 زيارات:" : "Last 5 Visits:"}
          </p>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {stats.recentVisitors.slice(0, 5).map((visitor) => (
              <div key={visitor.id} className="text-xs text-[#F6E5C6]/60">
                <span className="font-mono">{visitor.ip_address}</span>
                <span className="mx-1">•</span>
                <span>
                  {new Date(visitor.visited_at).toLocaleTimeString(
                    locale === "ar" ? "ar-SA" : "en-US",
                    { hour: "2-digit", minute: "2-digit" }
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
