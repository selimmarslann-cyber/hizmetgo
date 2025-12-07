/**
 * Unread Notification Count API
 *
 * GET /api/notifications/unread-count
 * Returns the count of unread notifications for the current user
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    const count = await prisma.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });

    return NextResponse.json({
      count,
    });
  } catch (error: any) {
    console.error("Unread count fetch error:", error);
    return NextResponse.json(
      { error: error.message || "Okunmamış bildirim sayısı alınamadı" },
      { status: 500 },
    );
  }
}
