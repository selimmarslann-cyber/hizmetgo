/**
 * Product Reorder API
 *
 * POST /api/businesses/[id]/products/reorder
 * Ürün sıralamasını güncelle (drag-drop için)
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";

const reorderSchema = z.object({
  productIds: z.array(z.string()).min(1),
});


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

    const businessId = params.id;

    // İşletmenin sahibi olduğunu kontrol et
    const business = await prisma.business.findFirst({
      where: {
        id: businessId,
        ownerUserId: userId,
      },
    });

    if (!business) {
      return NextResponse.json(
        { error: "İşletme bulunamadı veya yetkiniz yok" },
        { status: 404 },
      );
    }

    const body = await request.json();
    const validated = reorderSchema.parse(body);

    // Tüm ürünlerin bu işletmeye ait olduğunu kontrol et
    const products = await prisma.product.findMany({
      where: {
        id: { in: validated.productIds },
        businessId,
      },
    });

    if (products.length !== validated.productIds.length) {
      return NextResponse.json(
        { error: "Bazı ürünler bulunamadı" },
        { status: 400 },
      );
    }

    // SortOrder'ları güncelle
    await prisma.$transaction(
      validated.productIds.map((productId, index) =>
        prisma.product.update({
          where: { id: productId },
          data: { sortOrder: index },
        }),
      ),
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 },
      );
    }

    console.error("Product reorder error:", error);
    return NextResponse.json(
      { error: error.message || "Sıralama güncellenemedi" },
      { status: 500 },
    );
  }
}
