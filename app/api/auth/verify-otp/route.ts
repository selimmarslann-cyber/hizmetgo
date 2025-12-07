import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { signToken } from "@/lib/auth/jwt";
import { prisma } from "@/lib/db/prisma";
import { getOrCreateReferralCodeForUser } from "@/lib/services/referralService";
import { getOtp, deleteOtp } from "@/lib/auth/otpStore";

const verifyOtpSchema = z.object({
  phone: z.string().min(10, "Geçerli bir telefon numarası girin"),
  code: z.string().length(6, "Kod 6 haneli olmalı"),
});


// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = verifyOtpSchema.parse(body);

    // OTP'yi kontrol et
    const storedOtp = getOtp(validated.phone);

    if (!storedOtp) {
      return NextResponse.json(
        { error: "Kod bulunamadı veya süresi dolmuş" },
        { status: 400 },
      );
    }

    if (storedOtp.expiresAt < Date.now()) {
      deleteOtp(validated.phone);
      return NextResponse.json({ error: "Kod süresi dolmuş" }, { status: 400 });
    }

    if (storedOtp.code !== validated.code) {
      return NextResponse.json({ error: "Geçersiz kod" }, { status: 400 });
    }

    // OTP doğrulandı, kullanıcıyı bul veya oluştur
    // Not: Schema'da phone alanı yoksa, email ile eşleştirme yap
    const tempEmail = `phone_${validated.phone}@hizmetgo.local`;
    let user = await prisma.user.findFirst({
      where: {
        email: tempEmail,
      },
    });

    if (!user) {
      // Yeni kullanıcı oluştur
      // Not: Schema'da phone alanı yoksa, email olarak phone kullan veya unique bir email oluştur
      const tempEmail = `phone_${validated.phone}@hizmetgo.local`;
      user = await prisma.user.create({
        data: {
          email: tempEmail,
          name: `Kullanıcı ${validated.phone.slice(-4)}`, // Geçici isim
          passwordHash: null, // OTP ile giriş, şifre yok
        },
      });

      // Referral kodu oluştur
      try {
        await getOrCreateReferralCodeForUser(user.id);
      } catch (refError) {
        console.error("Referral kodu oluşturma hatası:", refError);
      }
    }

    // JWT token oluştur
    const token = signToken({
      userId: user.id,
      email: user.email || "",
    });

    // OTP'yi sil
    deleteOtp(validated.phone);

    // HTTP-only cookie olarak set et
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
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

    console.error("Verify OTP error:", error);
    return NextResponse.json({ error: "Kod doğrulanamadı" }, { status: 500 });
  }
}
