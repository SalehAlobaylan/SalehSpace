"use client";

import { useEffect } from "react";

export default function VisitorTracker() {
  useEffect(() => {
    // Track visitor on mount
    const trackVisitor = async () => {
      try {
        await fetch("/api/visitors", {
          method: "POST",
        });
      } catch (error) {
        console.error("Failed to track visitor:", error);
      }
    };

    trackVisitor();
  }, []);

  return null; // This component doesn't render anything
}
