import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { updateProductSchema } from "@/lib/validations/product";

// PATCH: Ürünü güncelle

// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string; productId: string } },
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
    const productId = params.productId;

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

    // Ürünün bu işletmeye ait olduğunu kontrol et
    const existingProduct = await prisma.product.findFirst({
      where: {
        id: productId,
        businessId,
      },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });
    }

    const body = await request.json();
    const validated = updateProductSchema.parse(body);

    const product = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        ...validated,
        photoUrl: validated.photoUrl ?? existingProduct.photoUrl,
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.error("Product update error:", error);
    return NextResponse.json(
      { error: error.message || "Ürün güncellenemedi" },
      { status: 400 },
    );
  }
}

// DELETE: Ürünü sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; productId: string } },
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
    const productId = params.productId;

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

    // Ürünün bu işletmeye ait olduğunu kontrol et
    const existingProduct = await prisma.product.findFirst({
      where: {
        id: productId,
        businessId,
      },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });
    }

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Product delete error:", error);
    return NextResponse.json(
      { error: error.message || "Ürün silinemedi" },
      { status: 400 },
    );
  }
}
