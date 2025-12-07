import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { signToken } from "@/lib/auth/jwt";
import { compare } from "bcryptjs";
import { z } from "zod";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const loginSchema = z.object({
  username: z.string().min(1, "Kullanıcı adı gerekli"),
  password: z.string().min(1, "Şifre gerekli"),
});

// Admin credentials .env'den alınır, default değer yok
const getAdminCredentials = () => {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminName = process.env.ADMIN_NAME;

  if (!username || !password || !adminEmail) {
    throw new Error(
      "ADMIN_USERNAME, ADMIN_PASSWORD, and ADMIN_EMAIL must be set in .env file",
    );
  }

  return { username, password, adminEmail, adminName: adminName || "Admin" };
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = loginSchema.parse(body);

    // Admin credentials .env'den al
    const adminCredentials = getAdminCredentials();

    // Admin kontrolü
    if (
      validated.username === adminCredentials.username &&
      validated.password === adminCredentials.password
    ) {
      // Admin kullanıcıyı bul veya oluştur
      let adminUser = await prisma.user.findFirst({
        where: {
          email: adminCredentials.adminEmail,
          role: "ADMIN",
        },
      });

      if (!adminUser) {
        // Admin kullanıcı yoksa oluştur
        const bcrypt = require("bcryptjs");
        const passwordHash = await bcrypt.hash(adminCredentials.password, 10);

        adminUser = await prisma.user.create({
          data: {
            email: adminCredentials.adminEmail,
            passwordHash,
            name: adminCredentials.adminName,
            role: "ADMIN",
          },
        });
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
