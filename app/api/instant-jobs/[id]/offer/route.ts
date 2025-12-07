import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";

const offerSchema = z.object({
  message: z.string().optional(),
});

// Fiyat hesaplama: İlk 50 TL, 2. 40 TL, 3. ve sonrası 30 TL
function calculateOfferAmount(offerCount: number): number {
  if (offerCount === 0) return 50;
  if (offerCount === 1) return 40;
  return 30;
}


// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const validated = offerSchema.parse(body);

    // Anlık işi bul
    const instantJob = await prisma.instantJob.findUnique({
      where: { id: params.id },
      include: {
        offers: {
          where: { status: "PENDING" },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!instantJob) {
      return NextResponse.json(
        { error: "Anlık iş bulunamadı" },
        { status: 404 },
      );
    }

    if (instantJob.status !== "OPEN") {
      return NextResponse.json(
        { error: "Bu iş artık teklif kabul etmiyor" },
        { status: 400 },
      );
    }

    if (instantJob.customerId === userId) {
      return NextResponse.json(
        { error: "Kendi işinize teklif veremezsiniz" },
        { status: 400 },
      );
    }

    // Daha önce teklif verilmiş mi kontrol et
    const existingOffer = await prisma.instantJobOffer.findFirst({
      where: {
        instantJobId: params.id,
        userId,
        status: "PENDING",
      },
    });

    if (existingOffer) {
      return NextResponse.json(
        { error: "Bu işe zaten teklif verdiniz" },
        { status: 400 },
      );
    }

    // Fiyat hesapla
    const offerCount = instantJob.offerCount;
    const amount = calculateOfferAmount(offerCount);

    // Teklif oluştur
    const offer = await prisma.$transaction(async (tx) => {
      const newOffer = await tx.instantJobOffer.create({
        data: {
          instantJobId: params.id,
          userId,
          amount,
          message: validated.message?.trim() || null,
          status: "PENDING",
        },
      });

      // Offer count'u güncelle
      await tx.instantJob.update({
        where: { id: params.id },
        data: {
          offerCount: { increment: 1 },
        },
      });

      return newOffer;
    });

    return NextResponse.json({ offer }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 },
      );
    }

    console.error("Offer creation error:", error);
    return NextResponse.json(
      { error: error.message || "Teklif oluşturulamadı" },
      { status: 500 },
    );
  }
}
