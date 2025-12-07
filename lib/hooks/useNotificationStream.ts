/**
 * useNotificationStream Hook
 *
 * Real-time notification stream için React hook
 */

"use client";

import { useEffect, useState, useRef } from "react";

interface NotificationEvent {
  type: "connected" | "notification";
  unreadCount?: number;
  message?: string;
}

export function useNotificationStream(enabled: boolean = true) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!enabled) return;

    // EventSource oluştur
    const eventSource = new EventSource("/api/notifications/stream", {
      withCredentials: true,
    });

    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      setIsConnected(true);
    };

    eventSource.onmessage = (event) => {
      try {
        const data: NotificationEvent = JSON.parse(event.data);
        if (data.type === "notification" && data.unreadCount !== undefined) {
          setUnreadCount(data.unreadCount);
        }
      } catch (error) {
        console.error("Notification stream parse error:", error);
      }
    };

    eventSource.onerror = () => {
      setIsConnected(false);
      // Reconnect after 5 seconds
      setTimeout(() => {
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
          eventSourceRef.current = null;
        }
      }, 5000);
    };

    return () => {
      eventSource.close();
      eventSourceRef.current = null;
    };
  }, [enabled]);

  return { unreadCount, isConnected };
}
