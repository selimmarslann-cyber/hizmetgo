/**
 * Real-time Chat Hook using Supabase Realtime
 * Replaces polling with real-time message updates
 */

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { RealtimeChannel } from "@supabase/supabase-js";

export interface ChatMessage {
  id: string;
  orderId: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  sender?: {
    id: string;
    name: string;
    avatarUrl: string | null;
  };
  receiver?: {
    id: string;
    name: string;
    avatarUrl: string | null;
  };
  fileUrl?: string | null;
  fileType?: string | null;
  fileName?: string | null;
  fileSize?: number | null;
  isRead?: boolean;
}

interface UseRealtimeChatOptions {
  orderId: string;
  userId: string | null;
  enabled?: boolean;
}

export function useRealtimeChat({
  orderId,
  userId,
  enabled = true,
}: UseRealtimeChatOptions) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load initial messages
  const loadMessages = useCallback(async () => {
    if (!orderId || !userId) return;

    try {
      const res = await fetch(`/api/orders/${orderId}/messages`, {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  }, [orderId, userId]);

  // Setup real-time subscription
  useEffect(() => {
    if (!enabled || !orderId || !userId) {
      return;
    }

    // Load initial messages
    loadMessages();

    // Create channel for this order's messages
    const channel = supabase
      .channel(`order:${orderId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `order_id=eq.${orderId}`,
        },
        async (payload) => {
          // New message inserted
          const newMessage = payload.new as any;

          // Fetch full message with relations
          try {
            const res = await fetch(
              `/api/orders/${orderId}/messages/${newMessage.id}`,
              {
                credentials: "include",
              },
            );
            if (res.ok) {
              const message = await res.json();
              setMessages((prev) => {
                // Avoid duplicates
                if (prev.some((m) => m.id === message.id)) {
                  return prev;
                }
                return [...prev, message];
              });
            }
          } catch (error) {
            console.error("Failed to fetch new message:", error);
            // Fallback: reload all messages
            loadMessages();
          }
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "messages",
          filter: `order_id=eq.${orderId}`,
        },
        (payload) => {
          // Message updated (e.g., read status)
          const updatedMessage = payload.new as any;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === updatedMessage.id
                ? { ...msg, ...updatedMessage }
                : msg,
            ),
          );
        },
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          setIsConnected(true);
        } else if (
          status === "CHANNEL_ERROR" ||
          status === "TIMED_OUT" ||
          status === "CLOSED"
        ) {
          setIsConnected(false);
        }
      });

    channelRef.current = channel;

    // Cleanup
    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
      setIsConnected(false);
    };
  }, [orderId, userId, enabled, loadMessages]);

  // Typing indicator
  const sendTyping = useCallback(() => {
    if (!channelRef.current || !userId) return;

    // Broadcast typing status
    channelRef.current.send({
      type: "broadcast",
      event: "typing",
      payload: {
        userId,
        orderId,
        isTyping: true,
      },
    });

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Stop typing after 3 seconds
    typingTimeoutRef.current = setTimeout(() => {
      if (channelRef.current && userId) {
        channelRef.current.send({
          type: "broadcast",
          event: "typing",
          payload: {
            userId,
            orderId,
            isTyping: false,
          },
        });
      }
      setIsTyping(false);
      setTypingUser(null);
    }, 3000);
  }, [orderId, userId]);

  // Listen for typing events
  useEffect(() => {
    if (!channelRef.current || !userId) return;

    const channel = channelRef.current;

    channel.on("broadcast", { event: "typing" }, (payload) => {
      const { userId: typingUserId, isTyping: userIsTyping } =
        payload.payload as any;

      // Don't show typing indicator for own typing
      if (typingUserId === userId) return;

      if (userIsTyping) {
        setIsTyping(true);
        setTypingUser(typingUserId);
      } else {
        setIsTyping(false);
        setTypingUser(null);
      }
    });

    return () => {
      // Cleanup handled by main useEffect
    };
  }, [userId]);

  return {
    messages,
    isConnected,
    isTyping,
    typingUser,
    loadMessages,
    sendTyping,
  };
}
