/**
 * Notification Stream API (Server-Sent Events)
 *
 * GET /api/notifications/stream
 * Real-time notification stream for vendors
 */

import { NextRequest } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";


// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  // SSE stream oluştur
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      // İlk bağlantı mesajı
      const send = (data: string) => {
        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
      };

      send(JSON.stringify({ type: "connected", message: "Bağlantı kuruldu" }));

      // Polling: Her 3 saniyede bir yeni bildirimleri kontrol et
      const interval = setInterval(async () => {
        try {
          const unreadCount = await prisma.notification.count({
            where: {
              userId,
              isRead: false,
            },
          });

          if (unreadCount > 0) {
            send(
              JSON.stringify({
                type: "notification",
                unreadCount,
                message: `${unreadCount} yeni bildiriminiz var`,
              }),
            );
          }
        } catch (error) {
          console.error("Notification stream error:", error);
        }
      }, 3000);

      // Client disconnect olduğunda temizle
      request.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
