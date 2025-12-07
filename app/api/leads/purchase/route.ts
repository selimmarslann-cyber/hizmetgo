/**
 * Lead Purchase API
 *
 * POST /api/leads/purchase
 *
 * Usta bir ilan için iletişim açmak istediğinde cüzdanından ücret öder.
 *
 * Flow:
 * 1. Usta authenticated ve vendor olduğunu doğrula
 * 2. Listing'i çek (level, lead_fee_tl)
 * 3. Ustanın cüzdanını çek (balance_tl)
 * 4. Bakiye yeterli mi kontrol et
 * 5. Cüzdandan düş, wallet_transaction kaydet, lead_purchase kaydet
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { requireVendor } from "@/lib/auth/roleCheck";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { z } from "zod";

const purchaseLeadSchema = z.object({
  listingId: z.string().uuid("Geçersiz listing ID"),
});


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

    // Sadece vendor (usta) lead satın alabilir
    await requireVendor(userId);

    const body = await request.json();
    const { listingId } = purchaseLeadSchema.parse(body);

    // Listing'i çek
    const { data: listing, error: listingError } = await supabaseAdmin
      .from("listings")
      .select("id, level, lead_fee_tl, status")
      .eq("id", listingId)
      .single();

    if (listingError || !listing) {
      return NextResponse.json({ error: "İlan bulunamadı" }, { status: 404 });
    }

    if (listing.status !== "open") {
      return NextResponse.json(
        { error: "Bu ilan artık açık değil" },
        { status: 400 },
      );
    }

    // Bu usta daha önce bu ilan için ödeme yapmış mı kontrol et
    const { data: existingPurchase } = await supabaseAdmin
      .from("lead_purchases")
      .select("id")
      .eq("listing_id", listingId)
      .eq("vendor_id", userId)
      .single();

    if (existingPurchase) {
      return NextResponse.json(
        { error: "Bu ilan için zaten ödeme yaptınız" },
        { status: 400 },
      );
    }

    // Ustanın cüzdanını çek (Prisma Wallet modeli kullanarak)
    // NOT: Supabase'de wallets tablosu var ama Prisma'da da Wallet modeli var
    // Prisma kullanarak cüzdanı çekelim
    const { prisma } = await import("@/lib/db/prisma");

    let wallet = await prisma.wallet.findUnique({
      where: { userId },
    });

    // Eğer cüzdan yoksa oluştur
    if (!wallet) {
      wallet = await prisma.wallet.create({
        data: {
          userId,
          balance: 0,
          pendingBalance: 0,
          currency: "TRY",
        },
      });
    }

    const balanceTl = Number(wallet.balance);
    const leadFeeTl = listing.lead_fee_tl;

    // Bakiye kontrolü
    if (balanceTl < leadFeeTl) {
      return NextResponse.json(
        {
          error: "Bakiyeniz yetersiz",
          balance: balanceTl,
          required: leadFeeTl,
          missing: leadFeeTl - balanceTl,
        },
        { status: 400 },
      );
    }

    // Transaction başlat: Cüzdandan düş, wallet_transaction kaydet, lead_purchase kaydet
    try {
      // 1. Cüzdan bakiyesini güncelle
      const newBalance = balanceTl - leadFeeTl;
      await prisma.wallet.update({
        where: { userId },
        data: {
          balance: newBalance,
        },
      });

      // 2. Wallet transaction kaydı oluştur (Supabase wallet_transactions tablosuna)
      // NOT: Prisma'da wallet_transactions modeli yok, Supabase kullanıyoruz
      const { error: txError } = await supabaseAdmin
        .from("wallet_transactions")
        .insert({
          user_id: userId,
          listing_id: listingId,
          source_type: "lead_purchase",
          amount: -leadFeeTl, // Negatif = harcama
          created_at: new Date().toISOString(),
        });

      if (txError) {
        console.error("Wallet transaction kaydı hatası:", txError);
        // Rollback: Bakiye geri ekle
        await prisma.wallet.update({
          where: { userId },
          data: {
            balance: balanceTl,
          },
        });
        throw new Error("İşlem kaydedilemedi");
      }

      // 3. Lead purchase kaydı oluştur
      const { data: leadPurchase, error: purchaseError } = await supabaseAdmin
        .from("lead_purchases")
        .insert({
          listing_id: listingId,
          vendor_id: userId,
          lead_fee_tl: leadFeeTl,
        })
        .select()
        .single();

      if (purchaseError || !leadPurchase) {
        console.error("Lead purchase kaydı hatası:", purchaseError);
        // Rollback: Bakiye geri ekle, transaction'ı sil
        await prisma.wallet.update({
          where: { userId },
          data: {
            balance: balanceTl,
          },
        });
        await supabaseAdmin
          .from("wallet_transactions")
          .delete()
          .eq("user_id", userId)
          .eq("listing_id", listingId)
          .eq("source_type", "lead_purchase");
        throw new Error("Lead satın alma kaydedilemedi");
      }

      return NextResponse.json(
        {
          success: true,
          leadPurchase: {
            id: leadPurchase.id,
            listingId: leadPurchase.listing_id,
            leadFee: leadPurchase.lead_fee_tl,
            createdAt: leadPurchase.created_at,
          },
          wallet: {
            previousBalance: balanceTl,
            newBalance: newBalance,
            spent: leadFeeTl,
          },
        },
        { status: 200 },
      );
    } catch (transactionError: any) {
      console.error("Transaction hatası:", transactionError);
      return NextResponse.json(
        { error: transactionError.message || "İşlem gerçekleştirilemedi" },
        { status: 500 },
      );
    }
  } catch (error: any) {
    console.error("Lead purchase error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Geçersiz veri", details: error.errors },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: error.message || "Lead satın alınamadı" },
      { status: 400 },
    );
  }
}
