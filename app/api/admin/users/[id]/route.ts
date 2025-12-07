import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getUserId } from "@/lib/auth/session";

/**
 * Admin - Kullanıcı detayı ve referral istatistikleri
 * TODO: Admin yetki kontrolü ekle
 */

// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    // Admin kontrolü
    const adminUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!adminUser || adminUser.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Yetkisiz - Admin yetkisi gerekli" },
        { status: 403 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        referralBalance: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 404 },
      );
    }

    // Referral kodu
    const referralCode = await prisma.referralCode.findUnique({
      where: { userId: params.id },
      select: { code: true },
    });

    // Referral istatistikleri
    const level1Count = await prisma.referralRelation.count({
      where: {
        referrerUserId: params.id,
        level: 1,
      },
    });

    const level2Count = await prisma.referralRelation.count({
      where: {
        referrerUserId: params.id,
        level: 2,
      },
    });

    const level1EarningsResult = await prisma.referralReward.aggregate({
      where: {
        userId: params.id,
        level: 1,
      },
      _sum: { amount: true },
    });
    const level1Earnings = level1EarningsResult._sum.amount || 0;

    const level2EarningsResult = await prisma.referralReward.aggregate({
      where: {
        userId: params.id,
        level: 2,
      },
      _sum: { amount: true },
    });
    const level2Earnings = level2EarningsResult._sum.amount || 0;

    const totalEarningsResult = await prisma.referralReward.aggregate({
      where: {
        userId: params.id,
      },
      _sum: { amount: true },
    });
    const totalEarnings = totalEarningsResult._sum.amount || 0;

    return NextResponse.json({
      user: {
        ...user,
        referralBalance: user.referralBalance.toNumber(),
      },
      referralStats: {
        referralCode: referralCode?.code || null,
        balance: user.referralBalance.toNumber(),
        level1Count,
        level2Count,
        level1Earnings:
          typeof level1Earnings === "number"
            ? level1Earnings
            : level1Earnings.toNumber(),
        level2Earnings:
          typeof level2Earnings === "number"
            ? level2Earnings
            : level2Earnings.toNumber(),
        totalEarnings:
          typeof totalEarnings === "number"
            ? totalEarnings
            : totalEarnings.toNumber(),
      },
    });
  } catch (error: any) {
    console.error("Admin user detail error:", error);
    return NextResponse.json(
      { error: error.message || "Kullanıcı detayı yüklenemedi" },
      { status: 500 },
    );
  }
}
