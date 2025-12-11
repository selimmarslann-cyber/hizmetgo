import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { requireAdmin } from "@/lib/auth/roleCheck";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    // Admin kontrolü
    await requireAdmin(userId);

    // Filtreler
    const searchParams = request.nextUrl.searchParams;
    const fromDate = searchParams.get("fromDate");
    const toDate = searchParams.get("toDate");
    const partnerId = searchParams.get("partnerId");
    const minAmount = searchParams.get("minAmount");
    const maxAmount = searchParams.get("maxAmount");

    const where: any = {};

    // Tarih filtresi
    if (fromDate || toDate) {
      where.issuedAt = {};
      if (fromDate) {
        where.issuedAt.gte = new Date(fromDate);
      }
      if (toDate) {
        where.issuedAt.lte = new Date(toDate);
      }
    }

    // Partner filtresi
    if (partnerId) {
      where.partnerId = partnerId;
    }

    // Tutar filtresi
    if (minAmount || maxAmount) {
      where.totalAmount = {};
      if (minAmount) {
        where.totalAmount.gte = parseFloat(minAmount);
      }
      if (maxAmount) {
        where.totalAmount.lte = parseFloat(maxAmount);
      }
    }

    // Faturaları getir
    const invoices = await prisma.invoice.findMany({
      where,
      include: {
        partner: {
          select: {
            name: true,
            email: true,
          },
        },
        order: {
          select: {
            id: true,
            totalAmount: true,
            status: true,
          },
        },
      },
      orderBy: { issuedAt: "desc" },
      take: 100,
    });

    return NextResponse.json({ invoices });
  } catch (error: any) {
    console.error("Admin invoice list error:", error);
    return NextResponse.json(
      { error: error.message || "Faturalar yüklenemedi" },
      { status: 500 },
    );
  }
}

