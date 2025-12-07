import { NextRequest, NextResponse } from "next/server";
import { createReview } from "@/lib/services/ratingService";
import { createReviewSchema } from "@/lib/validations/review";
import { getUserId } from "@/lib/auth/session";
import { requireCustomer } from "@/lib/auth/roleCheck";


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

    // FAZ 3: Sadece customer review yazabilir
    await requireCustomer(userId);

    const body = await request.json();
    const validated = createReviewSchema.parse(body);

    // Order'dan businessId al
    const { prisma } = await import("@/lib/db/prisma");
    const order = await prisma.order.findUnique({
      where: { id: validated.orderId },
      select: { businessId: true },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Sipariş bulunamadı" },
        { status: 404 },
      );
    }

    const review = await createReview({
      orderId: validated.orderId,
      businessId: order.businessId,
      reviewerId: userId,
      rating: validated.rating,
      comment: validated.comment,
    });

    return NextResponse.json({ review }, { status: 201 });
  } catch (error: any) {
    console.error("Review creation error:", error);
    return NextResponse.json(
      { error: error.message || "Değerlendirme oluşturulamadı" },
      { status: 400 },
    );
  }
}
