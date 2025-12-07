/**
 * Accept Job Offer API
 *
 * POST /api/jobs/[id]/offers/[offerId]/accept
 * Müşteri bir teklifi kabul eder, iş o işletmeye atanır
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { requireRole } from "@/lib/auth/roleCheck";
import { prisma } from "@/lib/db/prisma";
import { createNotification } from "@/lib/notifications/createNotification";
import { Decimal } from "@prisma/client/runtime/library";


// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; offerId: string } },
) {
  try {
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    // Sadece CUSTOMER teklif kabul edebilir
    try {
      await requireRole(userId, ["CUSTOMER"]);
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Bu işlem için yetkiniz yok" },
        { status: 403 },
      );
    }

    const job = await prisma.job.findUnique({
      where: { id: params.id },
      include: {
        customer: true,
        offers: {
          where: { id: params.offerId },
          include: {
            business: true,
          },
        },
      },
    });

    if (!job) {
      return NextResponse.json({ error: "İş bulunamadı" }, { status: 404 });
    }

    if (job.customerId !== userId) {
      return NextResponse.json(
        { error: "Bu işe ait teklifleri kabul etme yetkiniz yok" },
        { status: 403 },
      );
    }

    if (job.status !== "PENDING") {
      return NextResponse.json(
        { error: "Bu iş artık teklif kabul etmiyor" },
        { status: 400 },
      );
    }

    const offer = job.offers[0];
    if (!offer) {
      return NextResponse.json({ error: "Teklif bulunamadı" }, { status: 404 });
    }

    if (offer.status !== "PENDING") {
      return NextResponse.json(
        { error: "Bu teklif artık kabul edilemez" },
        { status: 400 },
      );
    }

    // Transaction: Teklifi kabul et, diğer teklifleri reddet, job'ı ACCEPTED yap, order oluştur
    const result = await prisma.$transaction(async (tx) => {
      // Seçilen teklifi ACCEPTED yap
      await tx.jobOffer.update({
        where: { id: params.offerId },
        data: { status: "ACCEPTED" },
      });

      // Diğer teklifleri REJECTED yap
      await tx.jobOffer.updateMany({
        where: {
          jobId: params.id,
          id: { not: params.offerId },
          status: "PENDING",
        },
        data: { status: "REJECTED" },
      });

      // Job'ı ACCEPTED yap ve business'ı ata
      const updatedJob = await tx.job.update({
        where: { id: params.id },
        data: {
          status: "ACCEPTED",
          acceptedByBusinessId: offer.businessId,
        },
        include: {
          acceptedBy: {
            include: {
              owner: true,
            },
          },
        },
      });

      // Order oluştur (Job → Order akışı)
      // Job offer'dan gelen amount'u kullan, yoksa 0
      const offerAmount = offer.amount
        ? new Decimal(offer.amount.toString())
        : new Decimal(0);

      // Platform komisyonu hesapla (%10)
      const COMMISSION_RATE = 0.1;
      const commissionFee = offerAmount.mul(COMMISSION_RATE);
      const vendorAmount = offerAmount.sub(commissionFee);

      // Order oluştur (OrderItem'lar olmadan - job service-based olduğu için)
      const order = await tx.order.create({
        data: {
          customerId: job.customerId,
          businessId: offer.businessId,
          totalAmount: offerAmount,
          vendorAmount,
          commissionFee,
          status: "PENDING_CONFIRMATION",
          paymentStatus: "INITIATED",
          addressText: job.addressText || `${job.city}, ${job.district}`,
          locationLat: job.locationLat,
          locationLng: job.locationLng,
          scheduledAt: job.scheduledAt,
        },
      });

      // Payment kaydı oluştur
      await tx.payment.create({
        data: {
          orderId: order.id,
          customerId: job.customerId,
          vendorId: offer.business.ownerUserId,
          amount: offerAmount,
          platformFee: commissionFee,
          vendorShare: vendorAmount,
          status: "INITIATED",
          provider: "mock",
        },
      });

      return { job: updatedJob, order };
    });

    // İşletme sahibine bildirim gönder
    await createNotification({
      userId: offer.business.ownerUserId,
      type: "OFFER_ACCEPTED",
      title: "Teklifiniz Kabul Edildi!",
      body: `${job.customer.name} işinizi kabul etti. Siparişi onaylayarak işe başlayabilirsiniz.`,
      data: {
        jobId: job.id,
        offerId: offer.id,
        orderId: result.order.id,
      },
    });

    // Diğer teklif verenlere bildirim gönder
    const rejectedOffers = await prisma.jobOffer.findMany({
      where: {
        jobId: params.id,
        status: "REJECTED",
        businessId: { not: offer.businessId },
      },
      include: {
        business: true,
      },
    });

    for (const rejectedOffer of rejectedOffers) {
      await createNotification({
        userId: rejectedOffer.business.ownerUserId,
        type: "OFFER_REJECTED",
        title: "Teklifiniz Reddedildi",
        body: `${job.customer.name} başka bir teklifi seçti.`,
        data: { jobId: job.id, offerId: rejectedOffer.id },
      });
    }

    return NextResponse.json({
      job: result.job,
      order: result.order,
    });
  } catch (error: any) {
    console.error("Job offer accept error:", error);
    return NextResponse.json(
      { error: error.message || "Teklif kabul edilemedi" },
      { status: 500 },
    );
  }
}
