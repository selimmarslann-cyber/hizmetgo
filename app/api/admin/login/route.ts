import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { signToken } from "@/lib/auth/jwt";
import { compare } from "bcryptjs";
import { z } from "zod";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const loginSchema = z.object({
  username: z.string().min(1, "Kullanıcı adı veya e-posta gerekli"),
  password: z.string().min(1, "Şifre gerekli"),
});

// Admin credentials - email ve password kullanılıyor
const getAdminCredentials = () => {
  // Default admin credentials
  const username = process.env.ADMIN_USERNAME || "selimarslan";
  const password = process.env.ADMIN_PASSWORD || "selimarslan";
  const adminEmail = process.env.ADMIN_EMAIL || "selimmarslann@gmail.com";
  const adminName = process.env.ADMIN_NAME || "Admin";

  return { username, password, adminEmail, adminName };
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = loginSchema.parse(body);

    // Admin credentials .env'den al
    const adminCredentials = getAdminCredentials();

    // Önce email ile kullanıcıyı bul (normal kayıt olmuş olabilir)
    let adminUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: validated.username }, // Email ile arama
          { name: validated.username }, // Username ile arama
        ],
      },
    });

    // Eğer kullanıcı bulundu ve ADMIN rolündeyse
    if (adminUser && adminUser.role === "ADMIN") {
      // Şifre kontrolü
      if (adminUser.passwordHash) {
        // Prisma'da şifre hash'i varsa kontrol et
        const bcrypt = require("bcryptjs");
        const isPasswordValid = await bcrypt.compare(
          validated.password,
          adminUser.passwordHash,
        );
        if (!isPasswordValid) {
          return NextResponse.json(
            { error: "Kullanıcı adı veya şifre hatalı" },
            { status: 401 },
          );
        }
      } else {
        // Supabase Auth kullanılıyorsa (passwordHash null)
        try {
          const { supabaseAdmin } = await import("@/lib/supabaseAdmin");
          const { data: authData, error: authError } = 
            await supabaseAdmin.auth.signInWithPassword({
              email: adminUser.email,
              password: validated.password,
            });

          if (authError || !authData.user) {
            return NextResponse.json(
              { error: "Kullanıcı adı veya şifre hatalı" },
              { status: 401 },
            );
          }
        } catch (supabaseError) {
          console.error("Supabase auth check error:", supabaseError);
          return NextResponse.json(
            { error: "Giriş yapılamadı. Lütfen tekrar deneyin." },
            { status: 401 },
          );
        }
      }
    } 
    // Admin credentials ile kontrol (default admin)
    else if (
      (validated.username === adminCredentials.username || 
       validated.username === adminCredentials.adminEmail) &&
      validated.password === adminCredentials.password
    ) {
      // Admin kullanıcıyı bul veya oluştur
      if (!adminUser) {
        // Admin kullanıcı yoksa oluştur
        const bcrypt = require("bcryptjs");
        const passwordHash = await bcrypt.hash(adminCredentials.password, 10);

        adminUser = await prisma.user.create({
          data: {
            email: adminCredentials.adminEmail,
            passwordHash,
            name: adminCredentials.username,
            role: "ADMIN",
          },
        });
      } else {
        // Kullanıcı var ama ADMIN değilse rolünü güncelle
        if (adminUser.role !== "ADMIN") {
          adminUser = await prisma.user.update({
            where: { id: adminUser.id },
            data: { role: "ADMIN" },
          });
        }
      }
    } else {
      // Ne admin credentials ne de admin kullanıcı
      return NextResponse.json(
        { error: "Kullanıcı adı veya şifre hatalı" },
        { status: 401 },
      );
    }

    if (!adminUser || adminUser.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Admin yetkisi bulunamadı" },
        { status: 403 },
      );
    }

      // JWT token oluştur
      const token = signToken({
        userId: adminUser.id,
        email: adminUser.email,
      });

      // Cookie'ye kaydet
      const response = NextResponse.json({
        success: true,
        user: {
          id: adminUser.id,
          email: adminUser.email,
          name: adminUser.name,
          role: adminUser.role,
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
    }

    // Kullanıcı adı veya şifre hatalı
    return NextResponse.json(
      { error: "Kullanıcı adı veya şifre hatalı" },
      { status: 401 },
    );
  } catch (error: any) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: error.message || "Giriş yapılamadı" },
      { status: 400 },
    );
  }
}
