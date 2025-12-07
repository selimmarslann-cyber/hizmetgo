/**
 * Push Tokens API - FAZ 3
 *
 * POST: Expo push token kaydet/güncelle
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";

const pushTokenSchema = z.object({
  expoPushToken: z.string().min(1, "Expo push token gerekli"),
  deviceId: z.string().optional(),
  platform: z.enum(["ios", "android", "web"]).optional(),
});


// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const validated = pushTokenSchema.parse(body);

    // Token'ı kaydet veya güncelle (upsert)
    const pushToken = await prisma.pushToken.upsert({
      where: {
        userId_expoPushToken: {
          userId,
          expoPushToken: validated.expoPushToken,
        },
      },
      create: {
        userId,
        expoPushToken: validated.expoPushToken,
        deviceId: validated.deviceId,
        platform: validated.platform,
      },
      update: {
        deviceId: validated.deviceId,
        platform: validated.platform,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      pushToken: {
        id: pushToken.id,
        userId: pushToken.userId,
        expoPushToken: pushToken.expoPushToken,
        deviceId: pushToken.deviceId,
        platform: pushToken.platform,
        createdAt: pushToken.createdAt.toISOString(),
        updatedAt: pushToken.updatedAt.toISOString(),
      },
    });
  } catch (error: any) {
    console.error("Push token save error:", error);
    return NextResponse.json(
      { error: error.message || "Push token kaydedilemedi" },
      { status: 400 },
    );
  }
}
