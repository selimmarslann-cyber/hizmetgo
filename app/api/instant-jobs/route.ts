import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

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
    const limit = parseInt(searchParams.get("limit") || "100");

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
      take: limit,
    });

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

    return NextResponse.json({
      jobs: jobsWithOfferCount,
      count: jobsWithOfferCount.length,
    });
  } catch (error: any) {
    console.error("Instant jobs fetch error:", error);
    return NextResponse.json(
      { error: error.message || "Anlık işler yüklenemedi" },
      { status: 500 },
    );
  }
}
