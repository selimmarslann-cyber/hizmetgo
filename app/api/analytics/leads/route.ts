/**
 * Lead Analytics API
 *
 * GET /api/analytics/leads
 *
 * Lead sistemine ait analytics verilerini döndürür
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { requireAdmin } from "@/lib/auth/roleCheck";
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

    // Sadece admin analytics görebilir
    await requireAdmin(userId);

    const searchParams = request.nextUrl.searchParams;
    const startDate =
      searchParams.get("startDate") ||
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(); // Son 30 gün
    const endDate = searchParams.get("endDate") || new Date().toISOString();

    // 1. Toplam Lead Satın Alma İstatistikleri
    const { data: totalPurchases, error: purchasesError } = await supabaseAdmin
      .from("lead_purchases")
      .select(
        "id, lead_fee_tl, created_at, contact_made_at, job_status, refund_processed",
      )
      .gte("created_at", startDate)
      .lte("created_at", endDate);

    // 2. Toplam İlan İstatistikleri
    const { data: totalListings, error: listingsError } = await supabaseAdmin
      .from("listings")
      .select("id, level, lead_fee_tl, status, created_at, cancelled_at")
      .gte("created_at", startDate)
      .lte("created_at", endDate);

    // 3. İade İstatistikleri
    const { data: totalRefunds, error: refundsError } = await supabaseAdmin
      .from("lead_refunds")
      .select("id, refund_amount_tl, refund_status, refund_reason, created_at")
      .gte("created_at", startDate)
      .lte("created_at", endDate);

    // 4. Kategori Bazlı İstatistikler
    const { data: categoryStats, error: categoryError } = await supabaseAdmin
      .from("listings")
      .select(
        `
        service_category_id,
        service_categories!inner(name, slug, level),
        lead_fee_tl
      `,
      )
      .gte("created_at", startDate)
      .lte("created_at", endDate);

    // Hesaplamalar
    const totalLeads = totalPurchases?.length || 0;
    const totalRevenue =
      totalPurchases?.reduce((sum, p) => sum + (p.lead_fee_tl || 0), 0) || 0;
    const totalListingsCount = totalListings?.length || 0;

    // İletişim kurulma oranı
    const contactedLeads =
      totalPurchases?.filter((p) => p.contact_made_at).length || 0;
    const contactRate =
      totalLeads > 0 ? (contactedLeads / totalLeads) * 100 : 0;

    // İş tamamlanma oranı
    const completedLeads =
      totalPurchases?.filter((p) => p.job_status === "completed").length || 0;
    const completionRate =
      totalLeads > 0 ? (completedLeads / totalLeads) * 100 : 0;

    // İade oranı
    const processedRefunds =
      totalRefunds?.filter((r) => r.refund_status === "processed").length || 0;
    const refundRate =
      totalLeads > 0 ? (processedRefunds / totalLeads) * 100 : 0;
    const totalRefundAmount =
      totalRefunds
        ?.filter((r) => r.refund_status === "processed")
        .reduce((sum, r) => sum + (r.refund_amount_tl || 0), 0) || 0;

    // Net gelir (toplam - iadeler)
    const netRevenue = totalRevenue - totalRefundAmount;

    // Ortalama lead ücreti
    const avgLeadFee = totalLeads > 0 ? totalRevenue / totalLeads : 0;

    // İptal oranı
    const cancelledListings =
      totalListings?.filter((l) => l.cancelled_at).length || 0;
    const cancellationRate =
      totalListingsCount > 0
        ? (cancelledListings / totalListingsCount) * 100
        : 0;

    // Kategori bazlı analiz
    const categoryBreakdown: Record<string, any> = {};
    categoryStats?.forEach((stat: any) => {
      const categoryName = stat.service_categories?.name || "Bilinmeyen";
      if (!categoryBreakdown[categoryName]) {
        categoryBreakdown[categoryName] = {
          name: categoryName,
          slug: stat.service_categories?.slug,
          level: stat.service_categories?.level,
          count: 0,
          totalRevenue: 0,
        };
      }
      categoryBreakdown[categoryName].count++;
      categoryBreakdown[categoryName].totalRevenue += stat.lead_fee_tl || 0;
    });

    // İade nedenleri analizi
    const refundReasons: Record<string, number> = {};
    totalRefunds?.forEach((refund) => {
      const reason = refund.refund_reason || "other";
      refundReasons[reason] = (refundReasons[reason] || 0) + 1;
    });

    // Günlük trend (son 30 gün)
    const dailyTrend: Record<string, any> = {};
    const days = 30;
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      dailyTrend[dateStr] = {
        date: dateStr,
        leads: 0,
        revenue: 0,
        refunds: 0,
      };
    }

    totalPurchases?.forEach((purchase) => {
      const dateStr = purchase.created_at?.split("T")[0];
      if (dateStr && dailyTrend[dateStr]) {
        dailyTrend[dateStr].leads++;
        dailyTrend[dateStr].revenue += purchase.lead_fee_tl || 0;
      }
    });

    totalRefunds?.forEach((refund) => {
      const dateStr = refund.created_at?.split("T")[0];
      if (dateStr && dailyTrend[dateStr]) {
        dailyTrend[dateStr].refunds++;
      }
    });

    return NextResponse.json(
      {
        period: {
          startDate,
          endDate,
        },
        overview: {
          totalLeads,
          totalListings: totalListingsCount,
          totalRevenue,
          netRevenue,
          totalRefundAmount,
          avgLeadFee: Math.round(avgLeadFee),
          contactRate: Math.round(contactRate * 100) / 100,
          completionRate: Math.round(completionRate * 100) / 100,
          refundRate: Math.round(refundRate * 100) / 100,
          cancellationRate: Math.round(cancellationRate * 100) / 100,
        },
        categoryBreakdown: Object.values(categoryBreakdown),
        refundReasons,
        dailyTrend: Object.values(dailyTrend).reverse(), // En eski tarihten en yeniye
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { error: error.message || "Analytics verileri yüklenemedi" },
      { status: 500 },
    );
  }
}
