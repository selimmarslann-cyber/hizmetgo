import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";

const updateProfileSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalı").optional(),
  email: z
    .string()
    .email("Geçerli bir e-posta adresi girin")
    .optional()
    .nullable(),
  phone: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  district: z.string().optional().nullable(),
  neighborhood: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  avatarUrl: z.string().url("Geçerli bir URL girin").optional().nullable(),
});


// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
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
    const validated = updateProfileSchema.parse(body);

    // E-posta değişiyorsa, başka bir kullanıcıda kullanılıyor mu kontrol et
    if (validated.email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: validated.email,
          NOT: { id: userId },
        },
      });
      if (existingUser) {
        return NextResponse.json(
          { error: "Bu e-posta adresi zaten kullanılıyor" },
          { status: 400 },
        );
      }
    }

    // Profili güncelle - null değerleri undefined'a çevir
    const updateData: any = {};
    if (validated.name !== undefined) updateData.name = validated.name;
    if (validated.email !== undefined && validated.email !== null)
      updateData.email = validated.email;
    if (validated.avatarUrl !== undefined && validated.avatarUrl !== null)
      updateData.avatarUrl = validated.avatarUrl;
    if (validated.city !== undefined && validated.city !== null)
      updateData.city = validated.city;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        city: true,
        avatarUrl: true,
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 },
      );
    }

    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Profil güncellenemedi" },
      { status: 500 },
    );
  }
}
