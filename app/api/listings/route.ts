/**
 * Listings API
 *
 * POST /api/listings - Yeni hizmet ilanı oluştur
 *
 * Flow:
 * 1. AI ile kategori tespiti (classifyServiceCategory)
 * 2. Level ve fee otomatik atama (service_categories ve lead_levels tablolarından)
 * 3. Listing kaydı oluşturma
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { requireCustomer } from "@/lib/auth/roleCheck";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { classifyServiceCategory } from "@/lib/ai/classifyServiceCategory";
import { createNotification } from "@/lib/notifications/createNotification";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";

const createListingSchema = z.object({
  description: z.string().min(10, "Açıklama en az 10 karakter olmalı"),
  title: z.string().optional(), // İlan başlığı (ilk 30 karakter)
  raw_description: z.string().optional(), // Kullanıcının ilk yazdığı ham metin
  city: z.string().optional(),
  district: z.string().optional(),
  address: z.string().optional(),
  date: z.string().optional(), // 'YYYY-MM-DD', 'acil', 'esnek'
  priority: z.enum(["acil", "normal", "esnek"]).optional().default("normal"),
  price_range: z.string().optional(),
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

    // Sadece customer ilan oluşturabilir
    await requireCustomer(userId);

    const body = await request.json();
    const validated = createListingSchema.parse(body);

    // AI ile kategori tespiti
    // NOT: AI sadece kategori seçer, level ve fee backend'den gelir
    let categoryResult;
    try {
      categoryResult = await classifyServiceCategory(validated.description);
    } catch (categoryError: any) {
      console.error("Kategori tespiti hatası:", categoryError);
      return NextResponse.json(
        { error: `Kategori tespit edilemedi: ${categoryError.message}` },
        { status: 400 },
      );
    }

    const { category } = categoryResult;

    // Level'e göre fee'yi lead_levels tablosundan çek
    const { data: leadLevel, error: leadLevelError } = await supabaseAdmin
      .from("lead_levels")
      .select("fee_tl")
      .eq("level", category.level)
      .single();

    if (leadLevelError || !leadLevel) {
      console.error("Lead level bulunamadı:", leadLevelError);
      return NextResponse.json(
        { error: "Lead ücreti belirlenemedi" },
        { status: 500 },
      );
    }

    // Listing kaydı oluştur
    // NOT: title kolonu yok, frontend'de description'dan ilk 30 karakteri title olarak gösterilecek
    // RLS bypass için service role key kullanıyoruz
    let { data: listing, error: insertError } = await supabaseAdmin
      .from("listings")
      .insert({
        user_id: userId,
        description: validated.description.trim(),
        category: category.name, // Eski kategori alanı (backward compatibility)
        service_category_id: category.categoryId,
        level: category.level,
        lead_fee_tl: leadLevel.fee_tl,
        date: validated.date || null,
        priority: validated.priority || "normal",
        address: validated.address || null,
        price_range: validated.price_range || null,
        status: "draft", // İlk oluşturulduğunda draft, kullanıcı yayınlayınca 'open'
      })
      .select()
      .single();

    // NOT: Supabase trigger'ı artık lead_quality_scores hatalarını yakalayıp yutuyor
    // Bu yüzden insertError genellikle gelmeyecek, ama yine de kontrol ediyoruz
    if (insertError) {
      console.error("❌ Listing oluşturma hatası:", insertError);
      console.error("Error code:", insertError.code);
      console.error("Error message:", insertError.message);
      console.error("Error details:", insertError.details);
      console.error("Error hint:", insertError.hint);

      // ÖNEMLİ: lead_quality_scores tablosu ile ilgili RLS hatası ise, bu hatayı yok say
      // Trigger hatası olsa bile ilan oluşturulmuş sayılır (AFTER INSERT trigger olduğu için)
      // Bu durumda listing verisini tekrar sorgulayarak kontrol et
      if (
        insertError.code === "42501" &&
        (insertError.message?.includes("lead_quality_scores") ||
          insertError.message?.toLowerCase().includes("lead quality"))
      ) {
        console.warn(
          "⚠️ lead_quality_scores RLS hatası tespit edildi, ilan kontrol ediliyor...",
        );

        // İlanın gerçekten oluşturulup oluşturulmadığını kontrol et
        // Trigger AFTER INSERT olduğu için, trigger hatası olsa bile ilan zaten oluşturulmuş olabilir
        const { data: existingListing, error: fetchError } = await supabaseAdmin
          .from("listings")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (!fetchError && existingListing) {
          // İlan başarıyla oluşturulmuş, sadece quality score yazılamamış
          // Bu durumda listing'i kullan ve devam et
          console.log(
            "✅ İlan başarıyla oluşturuldu (quality score yazılamadı ama bu kritik değil)",
          );
          // listing değişkenini güncelle
          listing = existingListing;
          // Devam et - return etme, normal akışa devam et
        } else {
          // İlan oluşturulmamış, gerçek bir hata var
          return NextResponse.json(
            {
              error: "İlan oluşturulamadı: Güvenlik politikası hatası",
              details:
                "RLS (Row Level Security) politikası ihlal edildi. Lütfen yöneticiye başvurun.",
              code: insertError.code,
            },
            { status: 403 },
          );
        }
      } else if (insertError.code === "42501") {
        // Diğer RLS hataları (lead_quality_scores dışında)
        return NextResponse.json(
          {
            error: "İlan oluşturulamadı: Güvenlik politikası hatası",
            details:
              "RLS (Row Level Security) politikası ihlal edildi. Lütfen yöneticiye başvurun.",
            code: insertError.code,
          },
          { status: 403 },
        );
      } else {
        // Diğer hatalar
        return NextResponse.json(
          {
            error: "İlan oluşturulamadı",
            details: insertError.message,
            code: insertError.code,
          },
          { status: 500 },
        );
      }
    }

    // Lead quality score hesapla (opsiyonel - hata olsa bile devam et)
    // NOT: Quality score önemli değil, RLS hatası olsa bile ilan oluşturulmuş sayılır
    // NOT: Supabase trigger'ı (trigger_listing_quality_score) otomatik olarak
    //      update_lead_quality_score() fonksiyonunu çağırıyor
    //      Trigger AFTER INSERT olduğu için, trigger hatası olsa bile ilan zaten oluşturulmuş olur
    //      Bu yüzden manuel RPC çağrısı yapmıyoruz - trigger'a bırakıyoruz
    //      Trigger hatası console'da görünebilir ama response'u etkilemez
    //      Eğer trigger hatası olsa bile, ilan oluşturma işlemi başarılı sayılır

    // Bildirim gönder: Sadece ana kategoriye göre (alt kategori yok)
    // Business'ların mainCategories array'inde bu kategori slug'ı varsa bildirim gönder
    try {
      // Kategori slug'ını al
      const categorySlug = category.slug;

      // Bu kategoriye uygun business'ları bul (mainCategories array'inde bu slug var mı?)
      // NOT: Prisma'da array contains kontrolü için özel sorgu gerekir
      const matchingBusinesses = await prisma.business.findMany({
        where: {
          isActive: true,
          mainCategories: {
            has: categorySlug, // mainCategories array'inde bu slug var mı?
          },
        },
        include: {
          owner: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      // Müşteri bilgisini al
      const customer = await prisma.user.findUnique({
        where: { id: userId },
        select: { name: true },
      });

      // Her matching business'a bildirim gönder
      const notificationPromises = matchingBusinesses.map((business) => {
        return createNotification({
          userId: business.ownerUserId,
          type: "JOB_CREATED", // Mevcut notification type'ı kullan
          title: "Yeni Hizmet İlanı",
          body: `${customer?.name || "Bir müşteri"} "${category.name}" kategorisinde yeni bir ilan oluşturdu. İletişim açmak için tıklayın.`,
          data: {
            listingId: listing.id,
            categorySlug: categorySlug,
            categoryName: category.name,
            level: category.level,
            leadFee: leadLevel.fee_tl,
          },
        });
      });

      // Bildirimleri paralel gönder (await yapmıyoruz - ilan oluşturma hızını etkilemesin)
      Promise.all(notificationPromises).catch((error) => {
        console.error("Bildirim gönderme hatası:", error);
      });
    } catch (notificationError) {
      // Bildirim hatası ilan oluşturmayı etkilemesin
      console.error("Bildirim gönderme hatası:", notificationError);
    }

    return NextResponse.json(
      {
        listing: {
          id: listing.id,
          description: listing.description,
          category: {
            id: category.categoryId,
            name: category.name,
            slug: category.slug,
            level: category.level,
          },
          leadFee: leadLevel.fee_tl,
          status: listing.status,
          createdAt: listing.created_at,
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("❌ Listing creation error:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });

    if (error instanceof z.ZodError) {
      console.error("Validation errors:", error.errors);
      return NextResponse.json(
        {
          error: "Geçersiz veri",
          details: error.errors
            .map((e) => `${e.path.join(".")}: ${e.message}`)
            .join(", "),
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error: error.message || "İlan oluşturulamadı",
        type: error.name || "UnknownError",
      },
      { status: 400 },
    );
  }
}
