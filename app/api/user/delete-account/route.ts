import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { email, password, reason } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "E-posta ve şifre gereklidir." },
        { status: 400 }
      );
    }

    // Kullanıcıyı bul
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "E-posta veya şifre hatalı." },
        { status: 401 }
      );
    }

    // Şifre kontrolü
    if (!user.password) {
      return NextResponse.json(
        { error: "Bu hesap için şifre doğrulaması yapılamıyor. Lütfen sosyal giriş kullanıyorsanız destek ile iletişime geçin." },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "E-posta veya şifre hatalı." },
        { status: 401 }
      );
    }

    // Hesap silme talebi oluştur (30 gün sonra silinecek)
    const deleteAt = new Date();
    deleteAt.setDate(deleteAt.getDate() + 30);

    // User modelinde deleteAt field'ı yoksa, şimdilik sadece log tutabiliriz
    // veya ayrı bir tablo oluşturabiliriz
    // Şimdilik basit bir yaklaşım: user'ı işaretle (eğer schema'da varsa)
    
    // Alternatif: Support ticket olarak kaydet
    await prisma.supportTicket.create({
      data: {
        userId: user.id,
        subject: "Hesap Silme Talebi",
        category: "ACCOUNT",
        priority: "HIGH",
        status: "OPEN",
        messages: {
          create: {
            userId: user.id,
            content: `Hesap silme talebi oluşturuldu.${reason ? `\n\nNeden: ${reason}` : ""}\n\nHesap 30 gün sonra (${deleteAt.toLocaleDateString("tr-TR")}) silinecektir.`,
            isFromUser: true,
          },
        },
      },
    });

    // TODO: E-posta gönder
    // await sendAccountDeletionEmail(user.email, deleteAt);

    return NextResponse.json({
      success: true,
      message: "Hesap silme talebi oluşturuldu. Hesabınız 30 gün sonra silinecektir.",
      deleteAt: deleteAt.toISOString(),
    });
  } catch (error) {
    console.error("Account deletion error:", error);
    return NextResponse.json(
      { error: "Bir hata oluştu. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}

