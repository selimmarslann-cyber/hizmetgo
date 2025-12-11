import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";
import { getUserId } from "@/lib/auth/getUserId";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const completeRegistrationSchema = z.object({
  skillCategories: z.array(z.string()).optional().default([]),
  publishWithoutKeyword: z.boolean().optional().default(false),
});

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Giriş yapmanız gerekiyor" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validated = completeRegistrationSchema.parse(body);

    // Kullanıcıyı güncelle - skillCategories'ı kaydet
    await prisma.user.update({
      where: { id: userId },
      data: {
        skillCategories: validated.skillCategories,
      },
    });

    // Eğer publishWithoutKeyword true ise ve skillCategories boşsa, yapay zeka ile kategori eşleştirmesi yapılacak
    if (validated.publishWithoutKeyword && validated.skillCategories.length === 0) {
      // TODO: Yapay zeka ile kategori eşleştirmesi yapılacak
      console.log(
        "AI kategori eşleştirmesi yapılacak - publishWithoutKeyword:",
        validated.publishWithoutKeyword,
      );
    }

    return NextResponse.json({
      success: true,
      message: "Yetenekler kaydedildi",
    });
  } catch (error: any) {
    console.error("Complete registration error:", error);
    return NextResponse.json(
      { error: error.message || "Yetenekler kaydedilemedi" },
      { status: 500 }
    );
  }
}

