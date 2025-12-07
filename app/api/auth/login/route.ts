import { NextRequest, NextResponse } from "next/server";
import { verifyUser } from "@/lib/auth/auth";
import { signToken } from "@/lib/auth/jwt";
import { createMobileToken } from "@/lib/auth/mobileTokens";
import { z } from "zod";
import { withRateLimit } from "@/lib/middleware/rateLimit";

const loginSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  password: z.string().min(1, "Şifre gerekli"),
});

async function loginHandler(request: NextRequest) {
  try {
    // Request body'yi parse et
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { error: "Geçersiz istek formatı" },
        { status: 400 },
      );
    }

    const validated = loginSchema.parse(body);

    // Kullanıcıyı bul
    let user;
    try {
      user = await verifyUser(validated.email, validated.password);
    } catch (dbError: any) {
      console.error("Database error during login:", dbError);
      // Daha detaylı hata mesajı
      const errorMessage = dbError?.message || "Veritabanı bağlantı hatası";
      return NextResponse.json(
        {
          error:
            "Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin veya kayıt olun.",
          details:
            process.env.NODE_ENV === "development" ? errorMessage : undefined,
        },
        { status: 500 },
      );
    }

    if (!user) {
      return NextResponse.json(
        {
          error:
            "E-posta veya şifre hatalı. Lütfen bilgilerinizi kontrol edin.",
        },
        { status: 401 },
      );
    }

    // JWT token oluştur (web cookie için)
    let token;
    try {
      token = signToken({
        userId: user.id,
        email: user.email,
      });
    } catch (tokenError) {
      console.error("Token creation error:", tokenError);
      return NextResponse.json(
        { error: "Oturum oluşturulamadı. Lütfen tekrar deneyin." },
        { status: 500 },
      );
    }

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
        avatarUrl: string | null;
      };
      sessionToken?: string;
    } = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
    };

    // Mobile token varsa response'a ekle
    if (mobileToken) {
      responseData.sessionToken = mobileToken;
    }

    const response = NextResponse.json(responseData);

    // HTTP-only cookie olarak set et (web için)
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 gün
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 },
      );
    }

    // Daha kullanıcı dostu hata mesajı
    const errorMessage = error?.message || "Giriş işlemi başarısız";

    // Eğer Prisma hatası ise
    if (error?.code === "P2002" || error?.code?.startsWith("P")) {
      return NextResponse.json(
        {
          error: "Veritabanı hatası. Lütfen daha sonra tekrar deneyin.",
          details:
            process.env.NODE_ENV === "development" ? errorMessage : undefined,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        error:
          "Giriş yapılamadı. E-posta ve şifrenizi kontrol edin veya kayıt olun.",
        details:
          process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 },
    );
  }
}

// Export with rate limiting (10 requests per 15 minutes for login)

// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export const POST = withRateLimit(loginHandler, {
  maxRequests: 10,
  windowMs: 15 * 60 * 1000,
});
