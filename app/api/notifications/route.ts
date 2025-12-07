/**
 * Notifications API - FAZ 3
 *
 * GET: Kullanıcının bildirimlerini listele
 * PATCH: Bildirimi okundu olarak işaretle
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

    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "20");
    const isRead =
      searchParams.get("isRead") === "true"
        ? true
        : searchParams.get("isRead") === "false"
          ? false
          : undefined;

    const where: any = { userId };
    if (isRead !== undefined) {
      where.isRead = isRead;
    }

    const notifications = await prisma.notification.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return NextResponse.json({
      notifications: notifications.map((notif) => ({
        id: notif.id,
        userId: notif.userId,
        type: notif.type,
        title: notif.title,
        body: notif.body,
        data: notif.data,
        isRead: notif.isRead,
        createdAt: notif.createdAt.toISOString(),
      })),
    });
  } catch (error: any) {
    console.error("Notifications fetch error:", error);
    return NextResponse.json(
      { error: error.message || "Bildirimler yüklenemedi" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { id, isRead } = body;

    if (!id || typeof isRead !== "boolean") {
      return NextResponse.json(
        { error: "Bildirim ID ve isRead (boolean) gerekli" },
        { status: 400 },
      );
    }

    // Bildirimin kullanıcıya ait olduğunu kontrol et
    const notification = await prisma.notification.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!notification) {
      return NextResponse.json(
        { error: "Bildirim bulunamadı" },
        { status: 404 },
      );
    }

    const updated = await prisma.notification.update({
      where: { id },
      data: { isRead },
    });

    return NextResponse.json({
      notification: {
        id: updated.id,
        isRead: updated.isRead,
      },
    });
  } catch (error: any) {
    console.error("Notification update error:", error);
    return NextResponse.json(
      { error: error.message || "Bildirim güncellenemedi" },
      { status: 500 },
    );
  }
}
