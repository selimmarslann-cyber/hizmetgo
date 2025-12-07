/**
 * Messages API Client - Mobile
 */

import { request } from "./client";

export interface Message {
  id: string;
  orderId: string;
  senderId: string;
  receiverId: string;
  content: string;
  fileUrl?: string | null;
  fileType?: string | null;
  fileName?: string | null;
  fileSize?: number | null;
  isRead: boolean;
  createdAt: string;
  sender: {
    id: string;
    name: string;
    avatarUrl?: string | null;
  };
  receiver: {
    id: string;
    name: string;
    avatarUrl?: string | null;
  };
}

export interface MessagesResponse {
  messages: Message[];
}

export interface SendMessageRequest {
  content?: string;
  fileUrl?: string;
  fileType?: string;
  fileName?: string;
  fileSize?: number;
}

export interface SendMessageResponse {
  message: Message;
}

/**
 * Get messages for an order
 */
export async function fetchOrderMessages(
  orderId: string,
  authToken: string,
): Promise<MessagesResponse> {
  return request<MessagesResponse>(`/api/orders/${orderId}/messages`, {
    method: "GET",
    authToken,
  });
}

/**
 * Send a message
 */
export async function sendMessage(
  orderId: string,
  data: SendMessageRequest,
  authToken: string,
): Promise<SendMessageResponse> {
  return request<SendMessageResponse>(`/api/orders/${orderId}/messages`, {
    method: "POST",
    authToken,
    body: JSON.stringify(data),
  });
}
