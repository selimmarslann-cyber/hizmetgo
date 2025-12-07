/**
 * Verify OTP Code
 *
 * POST /api/auth/verify-code
 * Verifies the OTP code and logs in or creates the user
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { signToken } from "@/lib/auth/jwt";
import { prisma } from "@/lib/db/prisma";
import { getOrCreateReferralCodeForUser } from "@/lib/services/referralService";

const verifyCodeSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  code: z.string().length(6, "Kod 6 haneli olmalı"),
});


// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = verifyCodeSchema.parse(body);

    // OTP'yi bul
    const otp = await prisma.otp.findFirst({
      where: {
        email: validated.email,
        code: validated.code,
        used: false,
        expiresAt: {
          gt: new Date(), // Süresi dolmamış
        },
      },
      orderBy: {
        createdAt: "desc", // En son oluşturulan
      },
    });

    if (!otp) {
      return NextResponse.json(
        { error: "Geçersiz kod veya kod süresi dolmuş" },
        { status: 400 },
      );
    }

    // Kod doğrulandı, şifre ekranına geçmek için sadece başarı döndür
    // Şifre set-password endpoint'inde belirlenecek
    return NextResponse.json({
      success: true,
      message: "Kod doğrulandı",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 },
      );
    }

    console.error("Verify code error:", error);
    return NextResponse.json({ error: "Kod doğrulanamadı" }, { status: 500 });
  }
}
