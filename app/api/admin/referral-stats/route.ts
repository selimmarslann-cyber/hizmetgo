import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getUserId } from "@/lib/auth/session";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Basit admin kontrolü (ileride gerçek auth eklenebilir)
const ADMIN_USER_IDS = process.env.ADMIN_USER_IDS?.split(",") || [];

export async function GET(request: NextRequest) {
  try {
    // Admin kontrolü
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // En çok kazanan 20 kullanıcı
    const topEarners = await prisma.$queryRaw<
      Array<{
        user_id: string;
        name: string;
        total_earnings: any;
      }>
    >`
      SELECT 
        u.id as user_id,
        u.name,
        COALESCE(SUM(wt.amount), 0) as total_earnings
      FROM users u
      LEFT JOIN wallet_transactions wt ON wt.user_id = u.id
        AND wt.source_type IN ('referral', 'region')
      GROUP BY u.id, u.name
      ORDER BY total_earnings DESC
      LIMIT 20
    `;

    // En yüksek network GMV (orders üzerinden hesapla)
    const topGMV = await prisma.$queryRaw<
      Array<{
        user_id: string;
        name: string;
        network_gmv: any;
      }>
    >`
      SELECT 
        u.id as user_id,
        u.name,
        COALESCE(SUM(o.total_amount), 0) as network_gmv
      FROM users u
      LEFT JOIN orders o ON o.customer_id = u.id
        AND o.status = 'COMPLETED'
      GROUP BY u.id, u.name
      HAVING COALESCE(SUM(o.total_amount), 0) > 0
      ORDER BY network_gmv DESC
      LIMIT 20
    `;

    // Bölge bazında toplam ciro
    const regionStats = await prisma.$queryRaw<
      Array<{
        region_type: string;
        region_code: string;
        total_gmv: any;
        total_commissions: any;
      }>
    >`
      SELECT 
        CASE 
          WHEN o.region_mahalle IS NOT NULL THEN 'mahalle'
          WHEN o.region_ilce IS NOT NULL THEN 'ilce'
          WHEN o.region_il IS NOT NULL THEN 'il'
          ELSE 'ulke'
        END as region_type,
        COALESCE(o.region_mahalle, o.region_ilce, o.region_il, o.region_country, 'TR') as region_code,
        COALESCE(SUM(o.total_amount), 0) as total_gmv,
        COALESCE(SUM(o.platform_fee_amount), 0) as total_commissions
      FROM orders o
      WHERE o.status = 'COMPLETED'
        AND (o.region_mahalle IS NOT NULL OR o.region_ilce IS NOT NULL OR o.region_il IS NOT NULL)
      GROUP BY region_type, region_code
      ORDER BY total_gmv DESC
      LIMIT 50
    `;

    return NextResponse.json({
      topEarners: topEarners.map((e) => ({
        user_id: e.user_id,
        name: e.name,
        total_earnings: parseFloat(e.total_earnings?.toString() || "0"),
      })),
      topGMV: topGMV.map((u) => ({
        user_id: u.user_id,
        name: u.name,
        network_gmv: parseFloat(u.network_gmv?.toString() || "0"),
      })),
      regionStats: regionStats.map((s) => ({
        region_type: s.region_type,
        region_code: s.region_code,
        total_gmv: parseFloat(s.total_gmv?.toString() || "0"),
        total_commissions: parseFloat(s.total_commissions?.toString() || "0"),
      })),
    });
  } catch (error: any) {
    console.error("Admin referral stats error:", error);
    return NextResponse.json(
      { error: error.message || "İstatistikler yüklenemedi" },
      { status: 500 },
    );
  }
}
