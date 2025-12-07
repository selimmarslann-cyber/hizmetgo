/**
 * Job Offers API
 *
 * GET /api/jobs/[id]/offers - Job'a gelen teklifleri listele
 * POST /api/jobs/[id]/offers - Job'a teklif ver
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { requireRole } from "@/lib/auth/roleCheck";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";
import { createNotification } from "@/lib/notifications/createNotification";

const offerSchema = z.object({
  amount: z.number().positive(),
  message: z.string().optional(),
});

// GET: Job'a gelen teklifleri listele

// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    const job = await prisma.job.findUnique({
      where: { id: params.id },
      include: {
        customer: true,
        offers: {
          include: {
            business: {
              include: {
                owner: {
                  select: {
                    id: true,
                    name: true,
                    avatarUrl: true,
                  },
                },
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!job) {
      return NextResponse.json({ error: "İş bulunamadı" }, { status: 404 });
    }

    // Sadece iş sahibi veya teklif veren işletmeler görebilir
    const isOwner = job.customerId === userId;
    const userBusiness = await prisma.business.findFirst({
      where: { ownerUserId: userId },
    });
    const hasOffer = userBusiness
      ? job.offers.some((o) => o.businessId === userBusiness.id)
      : false;

    if (!isOwner && !hasOffer) {
      return NextResponse.json(
        { error: "Bu işin tekliflerini görme yetkiniz yok" },
        { status: 403 },
      );
    }

    return NextResponse.json({ offers: job.offers });
  } catch (error: any) {
    console.error("Job offers fetch error:", error);
    return NextResponse.json(
      { error: error.message || "Teklifler yüklenemedi" },
      { status: 500 },
    );
  }
}

// POST: Job'a teklif ver
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    // Sadece VENDOR teklif verebilir
    try {
      await requireRole(userId, ["VENDOR"]);
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Bu işlem için yetkiniz yok" },
        { status: 403 },
      );
    }

    const body = await request.json();
    const validated = offerSchema.parse(body);

    // Job'ı bul
    const job = await prisma.job.findUnique({
      where: { id: params.id },
      include: { customer: true },
    });

    if (!job) {
      return NextResponse.json({ error: "İş bulunamadı" }, { status: 404 });
    }

    if (job.status !== "PENDING") {
      return NextResponse.json(
        { error: "Bu iş artık teklif kabul etmiyor" },
        { status: 400 },
      );
    }

    if (job.customerId === userId) {
      return NextResponse.json(
        { error: "Kendi işinize teklif veremezsiniz" },
        { status: 400 },
      );
    }

    // Kullanıcının işletmesini bul
    const business = await prisma.business.findFirst({
      where: { ownerUserId: userId },
    });

    if (!business) {
      return NextResponse.json(
        { error: "İşletme kaydınız bulunamadı" },
        { status: 400 },
      );
    }

    // Daha önce teklif verilmiş mi kontrol et
    const existingOffer = await prisma.jobOffer.findFirst({
      where: {
        jobId: params.id,
        businessId: business.id,
        status: "PENDING",
      },
    });

    if (existingOffer) {
      return NextResponse.json(
        { error: "Bu işe zaten teklif verdiniz" },
        { status: 400 },
      );
    }

    // Teklif oluştur
    const offer = await prisma.jobOffer.create({
      data: {
        jobId: params.id,
        businessId: business.id,
        amount: validated.amount,
        message: validated.message?.trim() || null,
        status: "PENDING",
      },
      include: {
        business: {
          include: {
            owner: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    });

    // Müşteriye bildirim gönder
    await createNotification({
      userId: job.customerId,
      type: "OFFER_RECEIVED",
      title: "Yeni Teklif",
      body: `${business.name} işinize ${validated.amount} ₺ teklif verdi`,
      data: { jobId: job.id, offerId: offer.id, businessId: business.id },
    });

    return NextResponse.json({ offer }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 },
      );
    }

    console.error("Job offer creation error:", error);
    return NextResponse.json(
      { error: error.message || "Teklif oluşturulamadı" },
      { status: 500 },
    );
  }
}
