import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { cachedResponse } from "@/lib/utils/apiCache";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * GET /api/instant-jobs
 *
 * Instant jobs listesi - status, city, requiresSkills gibi filtrelerle
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status") as
      | "OPEN"
      | "ACCEPTED"
      | "COMPLETED"
      | "CANCELLED"
      | null;
    const city = searchParams.get("city");
    const requiresSkills = searchParams.get("requiresSkills");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100); // Max 100
    const skip = (page - 1) * limit;

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (city) {
      where.city = city;
    }

    if (requiresSkills !== null) {
      where.requiresSkills = requiresSkills === "true";
    }

    const jobs = await prisma.instantJob.findMany({
      where,
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        offers: {
          where: { status: "PENDING" },
          select: { id: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    });

    // Total count for pagination
    const total = await prisma.instantJob.count({ where });

    // Offer count'u hesapla
    const jobsWithOfferCount = jobs.map((job) => ({
      ...job,
      offerCount: job.offers.length,
      estimatedBudget: job.estimatedBudget ? Number(job.estimatedBudget) : null,
      customer: job.customer
        ? {
            name: job.customer.name,
            avatarUrl: job.customer.avatarUrl,
          }
        : null,
    }));

    return cachedResponse(
      {
        jobs: jobsWithOfferCount,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      { maxAge: 30, swr: 60 } // Cache for 30 seconds, stale-while-revalidate for 60
    );
  } catch (error: any) {
    console.error("Instant jobs fetch error:", error);
    return NextResponse.json(
      { error: error.message || "Anlık işler yüklenemedi" },
      { status: 500 },
    );
  }
}
