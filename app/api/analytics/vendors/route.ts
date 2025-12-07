/**
 * Vendor Analytics API
 *
 * GET /api/analytics/vendors
 *
 * Usta performans metriklerini döndürür
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
    const vendorId = searchParams.get("vendorId"); // Belirli bir usta için
    const startDate =
      searchParams.get("startDate") ||
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const endDate = searchParams.get("endDate") || new Date().toISOString();

    // Usta lead satın alımları
    let query = supabaseAdmin
      .from("lead_purchases")
      .select(
        `
        id,
        vendor_id,
        listing_id,
        lead_fee_tl,
        created_at,
        contact_made_at,
        job_status,
        refund_processed,
        listings!inner(description, level, lead_fee_tl)
      `,
      )
      .gte("created_at", startDate)
      .lte("created_at", endDate);

    if (vendorId) {
      query = query.eq("vendor_id", vendorId);
    }

    const { data: purchases, error: purchasesError } = await query;

    // Usta bilgilerini al
    const vendorIds = Array.from(
      new Set(purchases?.map((p) => p.vendor_id) || []),
    );
    const { data: vendors, error: vendorsError } = await supabaseAdmin
      .from("users")
      .select("id, name, email")
      .in("id", vendorIds);

    // Usta bazlı performans hesaplama
    const vendorPerformance: Record<string, any> = {};

    purchases?.forEach((purchase) => {
      const vid = purchase.vendor_id;
      if (!vendorPerformance[vid]) {
        const vendor = vendors?.find((v) => v.id === vid);
        vendorPerformance[vid] = {
          vendorId: vid,
          vendorName: vendor?.name || "Bilinmeyen",
          vendorEmail: vendor?.email || "",
          totalLeads: 0,
          totalSpent: 0,
          contactedLeads: 0,
          completedLeads: 0,
          cancelledLeads: 0,
          refundedLeads: 0,
          totalRefundAmount: 0,
          avgResponseTime: null, // Saat cinsinden
          responseTimes: [] as number[],
        };
      }

      const perf = vendorPerformance[vid];
      perf.totalLeads++;
      perf.totalSpent += purchase.lead_fee_tl || 0;

      if (purchase.contact_made_at) {
        perf.contactedLeads++;
        // Response time hesapla (lead satın alma - iletişim kurma)
        const purchaseTime = new Date(purchase.created_at).getTime();
        const contactTime = new Date(purchase.contact_made_at).getTime();
        const responseTimeHours =
          (contactTime - purchaseTime) / (1000 * 60 * 60);
        perf.responseTimes.push(responseTimeHours);
      }

      if (purchase.job_status === "completed") {
        perf.completedLeads++;
      }

      if (purchase.job_status === "cancelled") {
        perf.cancelledLeads++;
      }

      if (purchase.refund_processed) {
        perf.refundedLeads++;
        perf.totalRefundAmount += purchase.lead_fee_tl || 0;
      }
    });

    // Ortalama response time hesapla
    Object.values(vendorPerformance).forEach((perf: any) => {
      if (perf.responseTimes.length > 0) {
        perf.avgResponseTime =
          Math.round(
            (perf.responseTimes.reduce(
              (sum: number, time: number) => sum + time,
              0,
            ) /
              perf.responseTimes.length) *
              100,
          ) / 100;
      }

      // Conversion rate hesapla
      perf.contactRate =
        perf.totalLeads > 0
          ? Math.round((perf.contactedLeads / perf.totalLeads) * 10000) / 100
          : 0;
      perf.completionRate =
        perf.totalLeads > 0
          ? Math.round((perf.completedLeads / perf.totalLeads) * 10000) / 100
          : 0;
      perf.cancellationRate =
        perf.totalLeads > 0
          ? Math.round((perf.cancelledLeads / perf.totalLeads) * 10000) / 100
          : 0;
      perf.refundRate =
        perf.totalLeads > 0
          ? Math.round((perf.refundedLeads / perf.totalLeads) * 10000) / 100
          : 0;

      // Net spend (harcama - iadeler)
      perf.netSpent = perf.totalSpent - perf.totalRefundAmount;

      // ROI hesapla (eğer completed leads varsa)
      perf.roi =
        perf.completedLeads > 0
          ? Math.round((perf.completedLeads / perf.netSpent) * 100) / 100
          : 0;

      delete perf.responseTimes; // Response times array'ini kaldır
    });

    // Top performanslı ustalar (completion rate'e göre)
    const topPerformers = Object.values(vendorPerformance)
      .sort((a: any, b: any) => b.completionRate - a.completionRate)
      .slice(0, 10);

    // En çok lead satın alan ustalar
    const topSpenders = Object.values(vendorPerformance)
      .sort((a: any, b: any) => b.totalLeads - a.totalLeads)
      .slice(0, 10);

    return NextResponse.json(
      {
        period: {
          startDate,
          endDate,
        },
        vendorPerformance: Object.values(vendorPerformance),
        topPerformers,
        topSpenders,
        summary: {
          totalVendors: Object.keys(vendorPerformance).length,
          totalLeads: purchases?.length || 0,
          avgLeadsPerVendor:
            Object.keys(vendorPerformance).length > 0
              ? Math.round(
                  ((purchases?.length || 0) /
                    Object.keys(vendorPerformance).length) *
                    100,
                ) / 100
              : 0,
        },
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Vendor analytics error:", error);
    return NextResponse.json(
      { error: error.message || "Usta analytics verileri yüklenemedi" },
      { status: 500 },
    );
  }
}
