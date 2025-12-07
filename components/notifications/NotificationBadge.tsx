"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NotificationBadgeProps {
  className?: string;
  showCount?: boolean;
}

export default function NotificationBadge({
  className,
  showCount = true,
}: NotificationBadgeProps) {
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchUnreadCount = async () => {
    try {
      const res = await fetch("/api/notifications/unread-count", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUnreadCount(data.count || 0);
      }
    } catch (error) {
      console.error("Failed to fetch unread count:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnreadCount();

    // Poll every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);

    // SSE connection for real-time updates (if available)
    const eventSource = new EventSource("/api/notifications/stream", {
      withCredentials: true,
    });

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "notification" && data.unreadCount !== undefined) {
          setUnreadCount(data.unreadCount);
        }
      } catch (error) {
        console.error("Notification stream parse error:", error);
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      clearInterval(interval);
      eventSource.close();
    };
  }, []);

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`relative ${className}`}
      onClick={() => router.push("/notifications")}
    >
      <Bell className="w-5 h-5" />
      {!loading && showCount && unreadCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs min-w-[20px]"
        >
          {unreadCount > 99 ? "99+" : unreadCount}
        </Badge>
      )}
    </Button>
  );
}
