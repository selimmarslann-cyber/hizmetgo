/**
 * Send OTP Code via Email
 *
 * POST /api/auth/send-code
 * Sends a 6-digit OTP code to the provided email address
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { sendOtpEmail } from "@/lib/mail";

const sendCodeSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi girin"),
});


// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  console.log("📧 Send code API called");
  try {
    const body = await request.json();
    console.log("📧 Request body:", { email: body.email });

    const validated = sendCodeSchema.parse(body);
    console.log("✅ Email validated:", validated.email);

    // 6-digit OTP code oluştur
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("🔐 Generated OTP code:", code);

    // Expiration: 5 minutes from now
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Database bağlantısını test et
    console.log("🔌 Testing database connection...");
    try {
      await prisma.$connect();
      console.log("✅ Database connected");
    } catch (dbError: any) {
      console.error("❌ Database connection error:", dbError);
      return NextResponse.json(
        {
          error:
            "Veritabanı bağlantı hatası. Lütfen sistem yöneticisine başvurun.",
        },
        { status: 500 },
      );
    }

    // Eski OTP'leri temizle (kullanılmamış ve süresi dolmuş)
    console.log("🧹 Cleaning old OTPs...");
    try {
      await prisma.otp.deleteMany({
        where: {
          email: validated.email,
          OR: [{ used: true }, { expiresAt: { lt: new Date() } }],
        },
      });
      console.log("✅ Old OTPs cleaned");
    } catch (cleanError: any) {
      console.error("❌ Error cleaning OTPs:", cleanError);
      // Devam et, kritik değil
    }

    // Yeni OTP kaydet
    console.log("💾 Saving new OTP...");
    try {
      await prisma.otp.create({
        data: {
          email: validated.email,
          code,
          expiresAt,
          used: false,
        },
      });
      console.log("✅ OTP saved to database");
    } catch (saveError: any) {
      console.error("❌ Error saving OTP:", saveError);
      return NextResponse.json(
        { error: "Kod kaydedilemedi. Lütfen tekrar deneyin." },
        { status: 500 },
      );
    }

    // Email gönder
    try {
      await sendOtpEmail(validated.email, code);
      console.log("✅ OTP email sent successfully to:", validated.email);
    } catch (emailError: any) {
      console.error("❌ Email sending error:", {
        email: validated.email,
        error: emailError.message,
        code: emailError.code,
        stack:
          process.env.NODE_ENV === "development" ? emailError.stack : undefined,
      });

      // OTP'yi sil (email gönderilemediyse)
      await prisma.otp.deleteMany({
        where: {
          email: validated.email,
          code,
        },
      });

      // Daha açıklayıcı hata mesajı
      let errorMessage = "E-posta gönderilemedi. Lütfen tekrar deneyin.";
      if (emailError.message?.includes("Email configuration is missing")) {
        errorMessage =
          "E-posta yapılandırması eksik. Lütfen sistem yöneticisine başvurun.";
      } else if (emailError.message?.includes("EAUTH")) {
        errorMessage =
          "E-posta kimlik doğrulama hatası. Lütfen sistem yöneticisine başvurun.";
      } else if (emailError.message?.includes("ECONNECTION")) {
        errorMessage =
          "E-posta sunucusuna bağlanılamadı. Lütfen daha sonra tekrar deneyin.";
      } else if (emailError.message) {
        errorMessage = `E-posta gönderilemedi: ${emailError.message}`;
      }

      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Doğrulama kodu e-posta adresinize gönderildi.",
      // Development için kod döndürülüyor, production'da kaldırılmalı
      ...(process.env.NODE_ENV === "development" && { mockCode: code }),
    });
  } catch (error) {
    console.error("❌ Send code error:", error);

    if (error instanceof z.ZodError) {
      console.error("❌ Validation error:", error.errors);
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 },
      );
    }

    // Prisma hatası kontrolü
    if (error && typeof error === "object" && "code" in error) {
      const prismaError = error as any;
      if (prismaError.code === "P1001") {
        return NextResponse.json(
          {
            error:
              "Veritabanı bağlantı hatası. Lütfen sistem yöneticisine başvurun.",
          },
          { status: 500 },
        );
      }
      if (prismaError.code === "P2002") {
        return NextResponse.json(
          {
            error: "Bu e-posta için zaten bir kod gönderildi. Lütfen bekleyin.",
          },
          { status: 409 },
        );
      }
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Kod gönderilemedi" },
      { status: 500 },
    );
  }
}
