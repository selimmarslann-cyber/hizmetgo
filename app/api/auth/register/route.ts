import { NextRequest, NextResponse } from "next/server";
import { createUser, getUserByEmail } from "@/lib/auth/auth";
import { signToken } from "@/lib/auth/jwt";
import { createMobileToken } from "@/lib/auth/mobileTokens";
import { buildReferralChainOnRegister } from "@/lib/services/referralService";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";
import { trackSignup } from "@/lib/analytics/trackEvent";
import { cookies } from "next/headers";
import { validatePassword } from "@/lib/utils/passwordPolicy";
import {
  createAuditLog,
  AuditEventType,
  getIpAddress,
  getUserAgent,
} from "@/lib/utils/auditLog";
import { sanitizeEmail, sanitizeString } from "@/lib/utils/sanitize";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const registerSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalı"),
  name: z.string().min(2, "İsim en az 2 karakter olmalı"),
  instantJobNotifications: z.boolean().optional().default(false),
  unskilledJobNotifications: z.boolean().optional().default(false), // schema'da kalabilir
  whatsappNotifications: z.boolean().optional().default(false),
  smsNotifications: z.boolean().optional().default(false),
  emailMarketing: z.boolean().optional().default(false),
  skillCategories: z.array(z.string()).optional().default([]),
  publishWithoutKeyword: z.boolean().optional().default(false),
  ref: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Geçersiz JSON formatı" }, { status: 400 });
    }

    const validated = registerSchema.parse(body);

    const sanitizedEmail = sanitizeEmail(validated.email);
    const sanitizedName = sanitizeString(validated.name);

    const passwordValidation = validatePassword(validated.password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        {
          error: "Şifre gereksinimlerini karşılamıyor",
          details: passwordValidation.errors,
        },
        { status: 400 },
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const refCode = searchParams.get("ref") || validated.ref;

    const existingUser = await getUserByEmail(sanitizedEmail);
    if (existingUser) {
      return NextResponse.json(
        { error: "Bu e-posta adresi zaten kullanılıyor" },
        { status: 400 },
      );
    }

    const finalSkillCategories = validated.skillCategories || [];

    if (validated.publishWithoutKeyword && finalSkillCategories.length === 0) {
      console.log(
        "AI kategori eşleştirmesi yapılacak - publishWithoutKeyword:",
        validated.publishWithoutKeyword,
      );
    }

    // ✅ FIX: createUser payload'ından unskilledJobNotifications kaldırıldı
    const user = await createUser({
      email: sanitizedEmail,
      password: validated.password,
      name: sanitizedName,
      instantJobNotifications: validated.instantJobNotifications || false,
      whatsappNotifications: validated.whatsappNotifications || false,
      smsNotifications: validated.smsNotifications || false,
      emailMarketing: validated.emailMarketing || false,
      skillCategories: finalSkillCategories,
      publishWithoutKeyword: validated.publishWithoutKeyword || false,
    });

    const cookieStore = await cookies();
    let utmData: any = null;
    try {
      const utmCookie = cookieStore.get("utm_data");
      if (utmCookie?.value) {
        utmData = JSON.parse(utmCookie.value);
      }
    } catch {
      // ignore
    }

    if (refCode) {
      try {
        await buildReferralChainOnRegister(user.id, refCode);
      } catch (refError) {
        console.error("Referral chain oluşturma hatası:", refError);
      }
    } else {
      try {
        const { getOrCreateReferralCodeForUser } = await import(
          "@/lib/services/referralService"
        );
        await getOrCreateReferralCodeForUser(user.id);
      } catch (refError) {
        console.error("Referral kodu oluşturma hatası:", refError);
      }
    }

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
      console.error("Analytics tracking error:", analyticsError);
    }

    try {
      await prisma.wallet.upsert({
        where: { userId: user.id },
        create: { userId: user.id, balance: 0, pendingBalance: 0 },
        update: {},
      });
    } catch (walletError) {
      console.error("Wallet oluşturma hatası:", walletError);
    }

    const token = signToken({ userId: user.id, email: user.email });

    let mobileToken: string | undefined;
    try {
      mobileToken = createMobileToken(user.id, user.email);
    } catch (mobileTokenError) {
      console.error("Mobile token creation error:", mobileTokenError);
    }

    const responseData: {
      user: { id: string; email: string; name: string };
      sessionToken?: string;
    } = {
      user: { id: user.id, email: user.email, name: user.name },
    };

    if (mobileToken) responseData.sessionToken = mobileToken;

    const ipAddress = getIpAddress(request);
    const userAgent = getUserAgent(request);
    await createAuditLog({
      userId: user.id,
      eventType: AuditEventType.USER_CREATE,
      description: `New user registered: ${user.email}`,
      ipAddress,
      userAgent,
      metadata: {
        email: user.email,
        name: user.name,
        hasReferralCode: !!refCode,
      },
    });

    const response = NextResponse.json(responseData, { status: 201 });

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }

    console.error("Register error:", error);

    let errorMessage = "Kayıt işlemi başarısız";

    if (error instanceof Error) {
      if (error.message.includes("P1001") || error.message.includes("connect")) {
        errorMessage =
          "Veritabanı bağlantı hatası. Lütfen daha sonra tekrar deneyin.";
      } else if (
        error.message.includes("Unique constraint") ||
        error.message.includes("P2002")
      ) {
        errorMessage = "Bu e-posta adresi zaten kullanılıyor";
      } else if (error.message.includes("P")) {
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
