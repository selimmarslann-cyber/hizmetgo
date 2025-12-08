import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getSession();

    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { role: true },
    });

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Review'ı sil ve business rating'ini güncelle
    const review = await prisma.review.findUnique({
      where: { id: params.id },
      include: { business: true },
    });

    if (!review) {
      return NextResponse.json(
        { error: "Review bulunamadı" },
        { status: 404 },
      );
    }

    await prisma.$transaction(async (tx) => {
      // Review'ı sil
      await tx.review.delete({
        where: { id: params.id },
      });

      // Business rating'ini güncelle
      const business = await tx.business.findUnique({
        where: { id: review.businessId },
        include: {
          reviews: {
            where: {
              moderationStatus: "APPROVED",
            },
          },
        },
      });

      if (business) {
        const allRatings = business.reviews.map((r) => r.rating);
        const avgRating =
          allRatings.length > 0
            ? allRatings.reduce((sum, r) => sum + r, 0) / allRatings.length
            : 0;

        await tx.business.update({
          where: { id: review.businessId },
          data: {
            avgRating,
            reviewCount: allRatings.length,
          },
        });
      }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Admin delete review error:", error);
    return NextResponse.json(
      { error: "Failed to delete review", details: error.message },
      { status: 500 },
    );
  }
}

