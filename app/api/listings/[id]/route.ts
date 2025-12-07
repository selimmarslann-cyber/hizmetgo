/**
 * Listing Detail API
 *
 * GET /api/listings/[id]
 *
 * İlan detayını getirir. Usta ise can_view_contact kontrolü yapar.
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { supabaseAdmin } from "@/lib/supabaseAdmin";


// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userId = await getUserId(request);
    const listingId = params.id;

    // Listing'i çek
    const { data: listing, error: listingError } = await supabaseAdmin
      .from("listings")
      .select(
        `
        id,
        user_id,
        description,
        category,
        service_category_id,
        level,
        lead_fee_tl,
        date,
        priority,
        address,
        price_range,
        status,
        image_url,
        created_at,
        updated_at,
        service_categories (
          id,
          name,
          slug,
          level
        )
      `,
      )
      .eq("id", listingId)
      .single();

    if (listingError || !listing) {
      return NextResponse.json({ error: "İlan bulunamadı" }, { status: 404 });
    }

    // Kullanıcı bilgisini çek (iletişim bilgileri için)
    const { data: customer, error: customerError } = await supabaseAdmin
      .from("users")
      .select("id, name, email")
      .eq("id", listing.user_id)
      .single();

    // can_view_contact kontrolü (sadece vendor için)
    let canViewContact = false;
    let leadPurchase = null;

    if (userId) {
      // Kullanıcının vendor olup olmadığını kontrol et
      const { data: user } = await supabaseAdmin
        .from("users")
        .select("role")
        .eq("id", userId)
        .single();

      if (user?.role === "VENDOR") {
        // Bu usta bu ilan için ödeme yapmış mı?
        const { data: purchase } = await supabaseAdmin
          .from("lead_purchases")
          .select("id, lead_fee_tl, created_at")
          .eq("listing_id", listingId)
          .eq("vendor_id", userId)
          .single();

        if (purchase) {
          canViewContact = true;
          leadPurchase = purchase;
        }
      }

      // İlan sahibi kendi ilanını görebilir (string/UUID formatı farkını dikkate al)
      if (
        listing.user_id &&
        userId &&
        String(listing.user_id) === String(userId)
      ) {
        canViewContact = true;
      }
    }

    // Admin her şeyi görebilir
    if (userId) {
      const { data: user } = await supabaseAdmin
        .from("users")
        .select("role")
        .eq("id", userId)
        .single();

      if (user?.role === "ADMIN") {
        canViewContact = true;
      }
    }

    // Response oluştur
    const response: any = {
      listing: {
        id: listing.id,
        description: listing.description,
        category: listing.category,
        serviceCategory:
          listing.service_categories &&
          Array.isArray(listing.service_categories) &&
          listing.service_categories.length > 0
            ? {
                id: listing.service_categories[0].id,
                name: listing.service_categories[0].name,
                slug: listing.service_categories[0].slug,
                level: listing.service_categories[0].level,
              }
            : null,
        level: listing.level,
        leadFee: listing.lead_fee_tl,
        date: listing.date,
        priority: listing.priority,
        address: listing.address,
        priceRange: listing.price_range,
        status: listing.status,
        imageUrl: listing.image_url,
        createdAt: listing.created_at,
        updatedAt: listing.updated_at,
      },
      canViewContact,
    };

    // İletişim bilgileri (sadece can_view_contact true ise)
    if (canViewContact && customer) {
      response.contact = {
        customerName: customer.name,
        customerEmail: customer.email,
        // NOT: Telefon, WhatsApp gibi alanlar users tablosunda yoksa
        // burada eklenebilir veya ayrı bir tablodan çekilebilir
      };
    } else {
      // İletişim bilgileri gizli
      response.contact = null;
      response.contactMessage =
        "İletişim bilgilerini görmek için bu ilan için ödeme yapmanız gerekmektedir.";
    }

    // Usta ise ve ödeme yapmadıysa, cüzdan bilgisi ekle
    if (userId) {
      const { data: user } = await supabaseAdmin
        .from("users")
        .select("role")
        .eq("id", userId)
        .single();

      if (user?.role === "VENDOR" && !canViewContact) {
        // Cüzdan bakiyesini çek
        const { prisma } = await import("@/lib/db/prisma");
        const wallet = await prisma.wallet.findUnique({
          where: { userId },
        });

        response.wallet = {
          balance: wallet ? Number(wallet.balance) : 0,
          required: listing.lead_fee_tl,
          sufficient: wallet
            ? Number(wallet.balance) >= listing.lead_fee_tl
            : false,
        };
      }
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error("Listing detail error:", error);
    return NextResponse.json(
      { error: error.message || "İlan detayı yüklenemedi" },
      { status: 500 },
    );
  }
}
