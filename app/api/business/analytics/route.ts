/**
 * Business Analytics API (Comprehensive)
 *
 * GET /api/business/analytics
 * Comprehensive vendor analytics with date range support
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { getVendorAnalytics } from "@/lib/analytics/vendorAnalytics";
import { logger } from "@/lib/utils/logger";
import {
  createErrorResponse,
  createSuccessResponse,
  getErrorCodeFromStatus,
  getStatusFromErrorCode,
} from "@/lib/utils/apiError";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  let business: { id: string } | null = null;
  try {
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    // Get user's business
    business = await prisma.business.findFirst({
      where: { ownerUserId: userId },
    });

    if (!business) {
      return NextResponse.json(
        { error: "İşletme bulunamadı" },
        { status: 404 },
      );
    }

    // Use comprehensive analytics service
    const searchParams = request.nextUrl.searchParams;
    const startDateParam = searchParams.get("startDate");
    const endDateParam = searchParams.get("endDate");

    const startDate = startDateParam ? new Date(startDateParam) : undefined;
    const endDate = endDateParam ? new Date(endDateParam) : undefined;

    const analyticsData = await getVendorAnalytics(
      business.id,
      startDate,
      endDate,
    );

    const successResponse = createSuccessResponse(analyticsData);
    return NextResponse.json(successResponse);
  } catch (error: any) {
    logger.error("Analytics fetch error", error, { businessId: business?.id });

    const errorResponse = createErrorResponse(
      getErrorCodeFromStatus(500),
      error.message || "Analitik veriler yüklenemedi",
    );

    return NextResponse.json(errorResponse, {
      status: getStatusFromErrorCode(getErrorCodeFromStatus(500)),
    });
  }
}
