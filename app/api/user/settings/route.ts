import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const settingsSchema = z.object({
  // Notification settings
  instantJobNotifications: z.boolean().optional(),
  whatsappNotifications: z.boolean().optional(),
  smsNotifications: z.boolean().optional(),
  emailMarketing: z.boolean().optional(),

  // Location settings
  locationLat: z.number().optional().nullable(),
  locationLng: z.number().optional().nullable(),
  city: z.string().optional().nullable(),
});

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
    const validated = settingsSchema.parse(body);

    const updateData: any = {};

    // Notification settings
    if (validated.instantJobNotifications !== undefined) {
      updateData.instantJobNotifications = validated.instantJobNotifications;
    }
    if (validated.whatsappNotifications !== undefined) {
      updateData.whatsappNotifications = validated.whatsappNotifications;
    }
    if (validated.smsNotifications !== undefined) {
      updateData.smsNotifications = validated.smsNotifications;
    }
    if (validated.emailMarketing !== undefined) {
      updateData.emailMarketing = validated.emailMarketing;
    }

    // Location settings
    if (validated.locationLat !== undefined) {
      updateData.locationLat = validated.locationLat;
    }
    if (validated.locationLng !== undefined) {
      updateData.locationLng = validated.locationLng;
    }
    if (validated.city !== undefined) {
      updateData.city = validated.city;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "Güncellenecek alan bulunamadı" },
        { status: 400 },
      );
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        instantJobNotifications: true,
        whatsappNotifications: true,
        smsNotifications: true,
        emailMarketing: true,
        locationLat: true,
        locationLng: true,
        city: true,
      },
    });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 },
      );
    }

    console.error("Settings update error:", error);
    return NextResponse.json(
      { error: error.message || "Ayarlar güncellenemedi" },
      { status: 500 },
    );
  }
}
