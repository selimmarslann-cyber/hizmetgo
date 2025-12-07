import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId();
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

    // Direkt davet edilen kullanıcılar (L1) - ReferralRelation üzerinden
    const referralRelations = await prisma.referralRelation.findMany({
      where: {
        referrerUserId: userId,
        level: 1,
      },
      include: {
        referred: {
          select: {
            id: true,
            name: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit, // Pagination ile limit
    });

    // Her kullanıcı için GMV ve earnings hesapla
    const invitedUsers = await Promise.all(
      referralRelations.map(async (relation) => {
        const user = relation.referred;

        // Total GMV (orders üzerinden)
        const totalGMVResult = await prisma.$queryRaw<Array<{ total: any }>>`
          SELECT COALESCE(SUM(total_amount), 0) as total
          FROM orders
          WHERE customer_id = ${user.id}::uuid
            AND status = 'COMPLETED'
        `;
        const total_gmv = parseFloat(totalGMVResult[0]?.total || "0");

        // Total earnings (wallet_transactions üzerinden)
        const totalEarningsResult = await prisma.$queryRaw<
          Array<{ total: any }>
        >`
          SELECT COALESCE(SUM(wt.amount), 0) as total
          FROM wallet_transactions wt
          WHERE wt.order_id IN (
            SELECT o.id
            FROM orders o
            WHERE o.customer_id = ${user.id}::uuid
              AND o.status = 'COMPLETED'
          )
          AND wt.user_id = ${userId}::uuid
          AND wt.source_type = 'referral'
          AND wt.level = 1
        `;
        const total_earnings = parseFloat(totalEarningsResult[0]?.total || "0");

        return {
          id: user.id,
          name: user.name,
          created_at: user.createdAt,
          total_gmv,
          total_earnings,
        };
      }),
    );

    // Her kullanıcının sipariş sayısını kontrol et (aktif/pasif)
    const usersWithStatus = await Promise.all(
      invitedUsers.map(async (user) => {
        const orderCount = await prisma.order.count({
          where: {
            customerId: user.id,
            status: "COMPLETED",
          },
        });

        return {
          id: user.id,
          name:
            user.name.length > 2
              ? `${user.name.charAt(0)}${"*".repeat(user.name.length - 2)}${user.name.charAt(user.name.length - 1)}`
              : user.name,
          registeredAt: user.created_at.toISOString(),
          status: orderCount > 0 ? ("active" as const) : ("inactive" as const),
          totalGMV: parseFloat(user.total_gmv?.toString() || "0"),
          earnings: parseFloat(user.total_earnings?.toString() || "0"),
        };
      }),
    );

    const total = await prisma.referralRelation.count({
      where: {
        referrerUserId: userId,
        level: 1,
      },
    });

    return NextResponse.json({
      users: usersWithStatus,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("Invited users error:", error);
    return NextResponse.json(
      { error: error.message || "Davet edilen kullanıcılar yüklenemedi" },
      { status: 500 },
    );
  }
}
