/**
 * Payout Requests API - FAZ 3
 *
 * GET: Kullanıcının payout request'lerini listele
 * POST: Yeni payout request oluştur
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { requireVendor } from "@/lib/auth/roleCheck";
import {
  createPayoutRequest,
  getUserPayoutRequests,
} from "@/lib/services/walletService";
import { z } from "zod";
import { Decimal } from "@prisma/client/runtime/library";

const createPayoutRequestSchema = z.object({
  amount: z.number().positive("Tutar pozitif olmalı"),
  iban: z.string().optional(),
  notes: z.string().optional(),
});


// Cookie kullandığı için dynamic olmalı
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

    // FAZ 3: Sadece vendor çekim talebi görebilir
    await requireVendor(userId);

    const requests = await getUserPayoutRequests(userId);

    return NextResponse.json({
      requests: requests.map((req) => ({
        id: req.id,
        walletId: req.walletId,
        userId: req.userId,
        amount:
          typeof req.amount === "number" ? req.amount : req.amount.toNumber(),
        status: req.status,
        iban: req.iban,
        notes: req.notes,
        requestedAt: req.requestedAt.toISOString(),
        processedAt: req.processedAt?.toISOString() || null,
        createdAt: req.createdAt.toISOString(),
        updatedAt: req.updatedAt.toISOString(),
      })),
    });
  } catch (error: any) {
    console.error("Payout requests fetch error:", error);
    return NextResponse.json(
      { error: error.message || "Çekim talepleri yüklenemedi" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    // FAZ 3: Sadece vendor çekim talebi oluşturabilir
    await requireVendor(userId);

    const body = await request.json();
    const validated = createPayoutRequestSchema.parse(body);

    const payoutRequest = await createPayoutRequest({
      userId,
      amount: new Decimal(validated.amount),
      iban: validated.iban,
      notes: validated.notes,
    });

    return NextResponse.json(
      {
        payoutRequest: {
          id: payoutRequest.id,
          walletId: payoutRequest.walletId,
          userId: payoutRequest.userId,
          amount:
            typeof payoutRequest.amount === "number"
              ? payoutRequest.amount
              : payoutRequest.amount.toNumber(),
          status: payoutRequest.status,
          iban: payoutRequest.iban,
          notes: payoutRequest.notes,
          requestedAt: payoutRequest.requestedAt.toISOString(),
          createdAt: payoutRequest.createdAt.toISOString(),
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Payout request creation error:", error);
    return NextResponse.json(
      { error: error.message || "Çekim talebi oluşturulamadı" },
      { status: 400 },
    );
  }
}
