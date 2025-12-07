import { NextRequest, NextResponse } from "next/server";
import { createUser, getUserByEmail } from "@/lib/auth/auth";
import { signToken } from "@/lib/auth/jwt";
import { createMobileToken } from "@/lib/auth/mobileTokens";
import { buildReferralChainOnRegister } from "@/lib/services/referralService";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";
import { trackSignup } from "@/lib/analytics/trackEvent";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const registerSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalı"),
  name: z.string().min(2, "İsim en az 2 karakter olmalı"),
  instantJobNotifications: z.boolean().optional().default(false), // Anlık işlerden bildirim almak ister mi?
  whatsappNotifications: z.boolean().optional().default(false), // WhatsApp bildirimleri
  smsNotifications: z.boolean().optional().default(false), // SMS bildirimleri
  emailMarketing: z.boolean().optional().default(false), // E-posta reklam/tanıtım
  skillCategories: z.array(z.string()).optional().default([]), // Yetenek kategorileri
  publishWithoutKeyword: z.boolean().optional().default(false), // Anahtar kelime bulunamazsa yapay zeka ile eşleştir
  ref: z.string().optional(), // Referral kodu (query param)
});

export async function POST(request: NextRequest) {
  try {
    // Safely parse JSON body
    let body;
    try {
      body = await request.json();
    } catch (jsonError: any) {
      return NextResponse.json(
        { error: "Geçersiz JSON formatı" },
        { status: 400 }
      );
    }
    
    const validated = registerSchema.parse(body);

    // Referral kodu query param'dan al
    const searchParams = request.nextUrl.searchParams;
    const refCode = searchParams.get("ref") || validated.ref;

    // E-posta kontrolü
    const existingUser = await getUserByEmail(validated.email);
    if (existingUser) {
      return NextResponse.json(
        { error: "Bu e-posta adresi zaten kullanılıyor" },
        { status: 400 },
      );
    }

    // Eğer publishWithoutKeyword true ise ve skillCategories boşsa, yapay zeka ile kategori eşleştirmesi yapılacak
    let finalSkillCategories = validated.skillCategories || [];

    if (validated.publishWithoutKeyword && finalSkillCategories.length === 0) {
      // TODO: Yapay zeka ile kategori eşleştirmesi yapılacak
      // Şimdilik boş bırakıyoruz, ileride AI servisi eklenecek
      console.log(
        "AI kategori eşleştirmesi yapılacak - publishWithoutKeyword:",
        validated.publishWithoutKeyword,
      );
    }

    const user = await createUser({
      email: validated.email,
      password: validated.password,
      name: validated.name,
      instantJobNotifications: validated.instantJobNotifications || false,
      whatsappNotifications: validated.whatsappNotifications || false,
      smsNotifications: validated.smsNotifications || false,
      emailMarketing: validated.emailMarketing || false,
      skillCategories: finalSkillCategories,
      publishWithoutKeyword: validated.publishWithoutKeyword || false,
    });

    // UTM parametrelerini cookie'den al
    const cookieStore = await cookies();
    let utmData: any = null;
    try {
      const utmCookie = cookieStore.get("utm_data");
      if (utmCookie?.value) {
        utmData = JSON.parse(utmCookie.value);
      }
    } catch (error) {
      // UTM cookie parse hatası kritik değil
    }

    // Referral chain oluştur (eğer ref kodu varsa)
    if (refCode) {
      try {
        await buildReferralChainOnRegister(user.id, refCode);
      } catch (refError) {
        // Referral hatası kayıt işlemini engellemez, sadece logla
        console.error("Referral chain oluşturma hatası:", refError);
      }
    } else {
      // Referral kodu yoksa sadece kendi kodunu oluştur
      try {
        const { getOrCreateReferralCodeForUser } =
          await import("@/lib/services/referralService");
        await getOrCreateReferralCodeForUser(user.id);
      } catch (refError) {
        console.error("Referral kodu oluşturma hatası:", refError);
      }
    }

    // Analytics: Signup event tracking (UTM + referral)
    try {
      await trackSignup(
        user.id,
        utmData
          ? {
              utm_source: utmData.utm_source,
              utm_medium: utmData.utm_medium,
              utm_campaign: utmData.utm_campaign,
              utm_term: utmData.utm_term,
              utm_content: utmData.utm_content,
            }
          : undefined,
        refCode || undefined,
      );
    } catch (analyticsError) {
      // Analytics hatası kayıt işlemini engellemez
      console.error("Analytics tracking error:", analyticsError);
    }

    // Wallet oluştur
    try {
      await prisma.wallet.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          balance: 0,
          pendingBalance: 0,
        },
        update: {}, // Update yapılmasın, sadece yoksa oluşturulsun
      });
    } catch (walletError) {
      console.error("Wallet oluşturma hatası:", walletError);
      // Wallet hatası kayıt işlemini engellemez
    }

    // JWT token oluştur (web cookie için)
    const token = signToken({
      userId: user.id,
      email: user.email,
    });

    // Mobile token oluştur (Bearer token için)
    let mobileToken: string | undefined;
    try {
      mobileToken = createMobileToken(user.id, user.email);
    } catch (mobileTokenError) {
      console.error("Mobile token creation error:", mobileTokenError);
      // Mobile token hatası kritik değil, web cookie ile devam edebilir
    }

    // Response oluştur
    const responseData: {
      user: {
        id: string;
        email: string;
        name: string;
      };
      sessionToken?: string;
    } = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };

    // Mobile token varsa response'a ekle
    if (mobileToken) {
      responseData.sessionToken = mobileToken;
    }

    const response = NextResponse.json(responseData, { status: 201 });

    // HTTP-only cookie olarak set et (web için)
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

    // Daha detaylı hata mesajı
    console.error("Register error:", error);

    // Hata tipine göre mesaj belirle
    let errorMessage = "Kayıt işlemi başarısız";

    if (error instanceof Error) {
      // Database bağlantı hatası
      if (
        error.message.includes("P1001") ||
        error.message.includes("connect")
      ) {
        errorMessage =
          "Veritabanı bağlantı hatası. Lütfen daha sonra tekrar deneyin.";
      }
      // Unique constraint hatası (email zaten var)
      else if (
        error.message.includes("Unique constraint") ||
        error.message.includes("P2002")
      ) {
        errorMessage = "Bu e-posta adresi zaten kullanılıyor";
      }
      // Diğer Prisma hataları
      else if (error.message.includes("P")) {
        errorMessage = "Veritabanı hatası. Lütfen tekrar deneyin.";
      } else {
        errorMessage = error.message || errorMessage;
      }
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details:
          process.env.NODE_ENV === "development"
            ? error instanceof Error
              ? error.message
              : String(error)
            : undefined,
      },
      { status: 500 },
    );
  }
}
