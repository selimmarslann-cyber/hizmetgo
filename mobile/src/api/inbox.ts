/**
 * Inbox API Client - Mobile
 */

import { request } from "./client";

export interface InboxItem {
  id: string;
  type: "support" | "order" | "job" | "lead";
  title: string;
  preview: string;
  sender?: string;
  unread: boolean;
  createdAt: string;
  status?: string;
  category?: string;
}

export interface InboxResponse {
  items: InboxItem[];
}

/**
 * Get inbox items
 */
export async function fetchInbox(
  authToken: string,
  filter?: "all" | "support" | "orders" | "jobs" | "unread",
): Promise<InboxResponse> {
  const params: Record<string, string> = {};
  if (filter) {
    params.filter = filter;
  }

  return request<InboxResponse>("/api/inbox", {
    method: "GET",
    authToken,
    params,
  });
}
