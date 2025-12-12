import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { email, password, reason } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "E-posta ve şifre gereklidir." },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: String(email).toLowerCase() },
      select: { id: true, email: true, passwordHash: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "E-posta veya şifre hatalı." },
        { status: 401 },
      );
    }

    if (!user.passwordHash) {
      return NextResponse.json(
        {
          error:
            "Bu hesap için şifre doğrulaması yapılamıyor. Lütfen sosyal giriş kullanıyorsanız destek ile iletişime geçin.",
        },
        { status: 401 },
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "E-posta veya şifre hatalı." },
        { status: 401 },
      );
    }

    const deleteAt = new Date();
    deleteAt.setDate(deleteAt.getDate() + 30);

    const content =
      `Hesap silme talebi oluşturuldu.` +
      (reason ? `\n\nNeden: ${reason}` : "") +
      `\n\nHesap 30 gün sonra (${deleteAt.toLocaleDateString("tr-TR")}) silinecektir.`;

    await prisma.supportTicket.create({
      data: {
        userId: user.id,
        email: user.email, // ✅ FIX
        subject: "Hesap Silme Talebi",
        category: "ACCOUNT",
        priority: 3,
        status: "OPEN",
        messages: {
          create: {
            userId: user.id,
            content,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Hesap silme talebi oluşturuldu. Hesabınız 30 gün sonra silinecektir.",
      deleteAt: deleteAt.toISOString(),
    });
  } catch (error) {
    console.error("Account deletion error:", error);
    return NextResponse.json(
      { error: "Bir hata oluştu. Lütfen tekrar deneyin." },
      { status: 500 },
    );
  }
}
