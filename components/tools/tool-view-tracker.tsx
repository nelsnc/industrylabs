"use client";

import { useEffect, useRef } from "react";

interface ToolViewTrackerProps {
  toolId: string;
}

export function ToolViewTracker({ toolId }: ToolViewTrackerProps) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    fetch(`/api/tools/${toolId}/view`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          console.warn("View tracking failed:", data.error);
        }
      })
      .catch((error) => {
        console.warn("View tracking error:", error);
      });
  }, [toolId]);

  return null;
}
