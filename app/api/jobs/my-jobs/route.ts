/**
 * My Jobs API Route
 * Müşterinin kendi işlerini ve yayınlanan ilanlarını getirir
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { supabaseAdmin } from "@/lib/supabaseAdmin";


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

    // Pagination support
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    // 1. Jobs tablosundan müşterinin işlerini çek
    const jobs = await prisma.job.findMany({
      where: {
        customerId: userId,
      },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        offers: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit, // Pagination ile limit
    });

    const totalJobs = await prisma.job.count({
      where: {
        customerId: userId,
      },
    });

    // 2. Listings tablosundan yayınlanan ilanları çek (status: 'open') - Tüm detaylar
    const { data: listings, error: listingsError } = await supabaseAdmin
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
      .eq("user_id", userId)
      .eq("status", "open")
      .order("created_at", { ascending: false });

    if (listingsError) {
      console.error("Listings fetch error:", listingsError);
    }

    // 3. Jobs'ları formatla
    const formattedJobs = jobs.map((job) => ({
      id: job.id,
      customerId: job.customerId,
      title: job.description.substring(0, 50) || "İş Talebi",
      description: job.description,
      mainCategoryId: job.mainCategoryId,
      subServiceId: job.subServiceId,
      isOther: job.isOther,
      city: job.city,
      district: job.district,
      addressText: job.addressText,
      location:
        job.locationLat && job.locationLng
          ? { lat: job.locationLat, lng: job.locationLng }
          : null,
      scheduledAt: job.scheduledAt,
      status:
        job.status === "PENDING"
          ? "open"
          : job.status === "ACCEPTED"
            ? "assigned"
            : job.status === "COMPLETED"
              ? "completed"
              : job.status === "CANCELLED"
                ? "cancelled"
                : "open",
      type: "standard" as const,
      createdAt: job.createdAt.toISOString(),
      updatedAt: job.updatedAt.toISOString(),
      customer: job.customer,
      offerCount: job.offers.length,
      keywords: [], // Jobs için keywords yok
    }));

    // 4. Listings'leri jobs formatına dönüştür - Tüm detaylar
    const formattedListings = await Promise.all(
      (listings || []).map(async (listing: any) => {
        // İlan sahibi kendi ilanını görebilir
        let canViewContact = false;
        if (
          listing.user_id &&
          userId &&
          String(listing.user_id) === String(userId)
        ) {
          canViewContact = true;
        }

        // Vendor ise ödeme kontrolü yap
        if (userId && !canViewContact) {
          const { data: user } = await supabaseAdmin
            .from("users")
            .select("role")
            .eq("id", userId)
            .single();

          if (user?.role === "VENDOR") {
            // Bu usta bu ilan için ödeme yapmış mı?
            const { data: purchase } = await supabaseAdmin
              .from("lead_purchases")
              .select("id")
              .eq("listing_id", listing.id)
              .eq("vendor_id", userId)
              .single();

            if (purchase) {
              canViewContact = true;
            }
          }
        }

        // Müşteri bilgisini çek
        const { data: customer } = await supabaseAdmin
          .from("users")
          .select("id, name, email, avatarUrl")
          .eq("id", listing.user_id)
          .single();

        return {
          id: listing.id,
          customerId: listing.user_id,
          title: listing.description?.substring(0, 50) || "İlan",
          description: listing.description || "",
          mainCategoryId: listing.service_category_id || listing.category || "",
          subServiceId: null,
          isOther: false,
          city: "Belirtilmemiş", // Listings'de city yok, varsayılan
          district: "Belirtilmemiş",
          addressText: listing.address || null,
          location: null,
          scheduledAt: null,
          status: listing.status === "open" ? "open" : "cancelled",
          type: "listing" as const,
          createdAt: listing.created_at,
          updatedAt: listing.updated_at,
          customer: customer
            ? {
                id: customer.id,
                name: customer.name,
                avatarUrl: customer.avatarUrl,
              }
            : null,
          offerCount: 0, // Listings için offer count yok
          keywords: listing.service_categories
            ? [
                {
                  id: listing.service_categories.id,
                  label: listing.service_categories.name,
                },
              ]
            : [],
          // Listing'e özel detaylar
          listingDetails: {
            level: listing.level,
            leadFee: listing.lead_fee_tl,
            date: listing.date,
            priority: listing.priority,
            address: listing.address,
            priceRange: listing.price_range,
            serviceCategory: listing.service_categories
              ? {
                  id: listing.service_categories.id,
                  name: listing.service_categories.name,
                  slug: listing.service_categories.slug,
                  level: listing.service_categories.level,
                }
              : null,
            canViewContact,
            contact:
              canViewContact && customer
                ? {
                    customerName: customer.name,
                    customerEmail: customer.email,
                  }
                : null,
          },
        };
      }),
    );

    // 5. Jobs ve listings'leri birleştir ve tarihe göre sırala
    const allJobs = [...formattedJobs, ...formattedListings].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });

    return NextResponse.json({
      jobs: allJobs,
      count: allJobs.length,
    });
  } catch (error: any) {
    console.error("My jobs fetch error:", error);
    return NextResponse.json(
      { error: error.message || "İşler yüklenemedi" },
      { status: 500 },
    );
  }
}
