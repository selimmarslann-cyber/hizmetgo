/**
 * Set Password After Email Verification
 *
 * POST /api/auth/set-password
 * Sets password after email code verification
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { signToken } from "@/lib/auth/jwt";
import { prisma } from "@/lib/db/prisma";
import { hashPassword } from "@/lib/auth/auth";
import { getOrCreateReferralCodeForUser } from "@/lib/services/referralService";

const setPasswordSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  code: z.string().length(6, "Kod 6 haneli olmalı"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalı"),
});


// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = setPasswordSchema.parse(body);

    // OTP'yi kontrol et
    const otp = await prisma.otp.findFirst({
      where: {
        email: validated.email,
        code: validated.code,
        used: false,
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!otp) {
      return NextResponse.json(
        { error: "Geçersiz kod veya kod süresi dolmuş" },
        { status: 400 },
      );
    }

    // Kullanıcıyı bul veya oluştur
    let user = await prisma.user.findUnique({
      where: {
        email: validated.email,
      },
    });

    if (!user) {
      // Yeni kullanıcı oluştur
      const passwordHash = await hashPassword(validated.password);
      user = await prisma.user.create({
        data: {
          email: validated.email,
          name: validated.email.split("@")[0],
          passwordHash,
        },
      });

      // Referral kodu oluştur
      try {
        await getOrCreateReferralCodeForUser(user.id);
      } catch (refError) {
        console.error("Referral kodu oluşturma hatası:", refError);
      }
    } else {
      // Mevcut kullanıcının şifresini güncelle
      const passwordHash = await hashPassword(validated.password);
      user = await prisma.user.update({
        where: { id: user.id },
        data: { passwordHash },
      });
    }

    // OTP'yi kullanıldı olarak işaretle
    await prisma.otp.update({
      where: { id: otp.id },
      data: { used: true },
    });

    // JWT token oluştur ve giriş yap
    const token = signToken({
      userId: user.id,
      email: user.email || "",
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
        role: user.role,
      },
    });

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 gün
      path: "/",
    });

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 },
      );
    }

    console.error("Set password error:", error);
    return NextResponse.json({ error: "Şifre belirlenemedi" }, { status: 500 });
  }
}
