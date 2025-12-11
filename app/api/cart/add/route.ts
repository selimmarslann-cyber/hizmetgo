/**
 * Cart Add API
 * 
 * POST /api/cart/add
 * 
 * Sepete ürün ekler (localStorage ile senkronize edilir)
 * Bu endpoint sadece ürün bilgilerini döner, gerçek sepet localStorage'da tutulur
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";

const addToCartSchema = z.object({
  productId: z.string().uuid("Geçerli bir ürün ID'si girin"),
  businessId: z.string().uuid("Geçerli bir işletme ID'si girin"),
  quantity: z.number().int().min(1).max(99).default(1),
});

// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = addToCartSchema.parse(body);

    // Ürünü getir
    const product = await prisma.product.findUnique({
      where: { id: validated.productId },
      include: {
        business: {
          select: {
            id: true,
            name: true,
            isActive: true,
            onlineStatus: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Ürün bulunamadı" },
        { status: 404 },
      );
    }

    if (!product.active) {
      return NextResponse.json(
        { error: "Bu ürün şu anda satışta değil" },
        { status: 400 },
      );
    }

    if (product.businessId !== validated.businessId) {
      return NextResponse.json(
        { error: "Ürün bu işletmeye ait değil" },
        { status: 400 },
      );
    }

    if (!product.business.isActive) {
      return NextResponse.json(
        { error: "Bu işletme şu anda aktif değil" },
        { status: 400 },
      );
    }

    // Ürün bilgilerini döndür (frontend localStorage'a ekleyecek)
    return NextResponse.json({
      success: true,
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        imageUrl: product.photoUrl,
        businessId: product.businessId,
        businessName: product.business.name,
      },
      quantity: validated.quantity,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 },
      );
    }

    console.error("Cart add error:", error);
    return NextResponse.json(
      { error: error.message || "Ürün sepete eklenemedi" },
      { status: 500 },
    );
  }
}

