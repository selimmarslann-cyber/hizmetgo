import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";
import { createNotification } from "@/lib/notifications/createNotification";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const applyToJobSchema = z.object({
  amount: z.number().positive().optional(), // Opsiyonel fiyat teklifi
  message: z.string().optional(), // Opsiyonel mesaj
});

/**
 * Anlık işe başvuru endpoint'i
 * InstantJobOffer kaydı oluşturur
 */
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

    const jobId = params.id;

    // Job'ı bul
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!job) {
      return NextResponse.json({ error: "İş bulunamadı" }, { status: 404 });
    }

    // Sadece PENDING durumundaki işlere başvurulabilir
    if (job.status !== "PENDING") {
      return NextResponse.json(
        { error: "Bu işe artık başvuru yapılamaz" },
        { status: 400 },
      );
    }

    // Kullanıcı kendi işine başvurmasın
    if (job.customerId === userId) {
      return NextResponse.json(
        { error: "Kendi işinize başvuru yapamazsınız" },
        { status: 400 },
      );
    }

    // InstantJob mi kontrol et (InstantJobOffer için)
    const instantJob = await prisma.instantJob.findUnique({
      where: { id: jobId },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (instantJob) {
      // Instant job için başvuru
      return await handleInstantJobApply(request, instantJob, userId, jobId);
    }

    // Normal job için teklif oluştur
    const body = await request.json().catch(() => ({}));
    const validated = applyToJobSchema.safeParse(body);

    // Kullanıcının business'ı var mı kontrol et
    const userBusiness = await prisma.business.findFirst({
      where: {
        ownerUserId: userId,
        isActive: true,
      },
    });

    if (!userBusiness) {
      return NextResponse.json(
        {
          error: "İş başvurusu yapmak için önce işletme kaydı oluşturmalısınız",
        },
        { status: 400 },
      );
    }

    // Aynı business zaten bu işe teklif vermiş mi kontrol et
    const existingOffer = await prisma.jobOffer.findUnique({
      where: {
        jobId_businessId: {
          jobId: jobId,
          businessId: userBusiness.id,
        },
      },
    });

    if (existingOffer) {
      return NextResponse.json(
        { error: "Bu işe zaten teklif vermişsiniz" },
        { status: 400 },
      );
    }

    // JobOffer oluştur
    const offer = await prisma.jobOffer.create({
      data: {
        jobId: jobId,
        businessId: userBusiness.id,
        amount:
          validated.success && validated.data.amount
            ? validated.data.amount
            : null,
        message:
          validated.success && validated.data.message
            ? validated.data.message.trim()
            : null,
        status: "PENDING",
      },
      include: {
        business: {
          select: {
            name: true,
          },
        },
      },
    });

    // Müşteriye bildirim gönder
    try {
      await createNotification({
        userId: job.customerId,
        type: "OFFER_RECEIVED",
        title: "Yeni Teklif",
        body: `${offer.business.name} işinize teklif verdi.`,
        data: {
          jobId: jobId,
          offerId: offer.id,
          businessId: userBusiness.id,
        },
      });
    } catch (notifError) {
      console.error("Teklif bildirimi gönderme hatası:", notifError);
      // Bildirim hatası teklif oluşturmayı engellememeli
    }

    return NextResponse.json(
      {
        success: true,
        offer,
        message: "Teklifiniz başarıyla gönderildi",
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Job apply error:", error);
    return NextResponse.json(
      { error: error.message || "Başvuru gönderilemedi" },
      { status: 500 },
    );
  }
}

/**
 * Instant job için başvuru işlemi
 */
async function handleInstantJobApply(
  request: NextRequest,
  instantJob: any,
  userId: string,
  jobId: string,
) {
  try {
    const body = await request.json().catch(() => ({}));
    const validated = applyToJobSchema.safeParse(body);

    // Instant job açık mı kontrol et
    if (instantJob.status !== "OPEN") {
      return NextResponse.json(
        { error: "Bu işe artık başvuru yapılamaz" },
        { status: 400 },
      );
    }

    // Kullanıcı kendi işine başvurmasın
    if (instantJob.customerId === userId) {
      return NextResponse.json(
        { error: "Kendi işinize başvuru yapamazsınız" },
        { status: 400 },
      );
    }

    // Zaten başvuru yapmış mı kontrol et
    const existingOffer = await prisma.instantJobOffer.findFirst({
      where: {
        instantJobId: jobId,
        userId: userId,
      },
    });

    if (existingOffer) {
      return NextResponse.json(
        { error: "Bu işe zaten başvuru yapmışsınız" },
        { status: 400 },
      );
    }

    // Fiyat teklifi hesapla (eğer verilmemişse)
    let offerAmount: number;
    if (validated.success && validated.data.amount) {
      offerAmount = validated.data.amount;
    } else {
      // Teklif sayısına göre otomatik fiyat belirleme
      const offerCount = instantJob.offerCount || 0;
      if (offerCount === 0) {
        offerAmount = 50; // İlk teklif: 50 TL
      } else if (offerCount === 1) {
        offerAmount = 40; // İkinci teklif: 40 TL
      } else {
        offerAmount = 30; // Üçüncü ve sonraki: 30 TL
      }
    }

    // InstantJobOffer oluştur
    const offer = await prisma.$transaction(async (tx) => {
      // Offer oluştur
      const newOffer = await tx.instantJobOffer.create({
        data: {
          instantJobId: jobId,
          userId: userId,
          amount: offerAmount,
          message:
            validated.success && validated.data.message
              ? validated.data.message.trim()
              : null,
          status: "PENDING",
        },
      });

      // Offer count'u artır
      await tx.instantJob.update({
        where: { id: jobId },
        data: {
          offerCount: {
            increment: 1,
          },
        },
      });

      return newOffer;
    });

    // Müşteriye bildirim gönder
    try {
      const applicantUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { name: true },
      });

      await createNotification({
        userId: instantJob.customerId,
        type: "OFFER_RECEIVED",
        title: "Yeni Başvuru",
        body: `${applicantUser?.name || "Bir kullanıcı"} işinize ${offerAmount} TL teklif ile başvurdu.`,
        data: {
          instantJobId: jobId,
          offerId: offer.id,
          amount: offerAmount,
        },
      });
    } catch (notifError) {
      console.error("Başvuru bildirimi gönderme hatası:", notifError);
      // Bildirim hatası başvuruyu engellememeli
    }

    return NextResponse.json(
      {
        success: true,
        offer: {
          id: offer.id,
          amount: offerAmount,
          message:
            validated.success && validated.data.message
              ? validated.data.message
              : null,
        },
        message: "Başvurunuz başarıyla gönderildi",
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Instant job apply error:", error);
    throw error;
  }
}
