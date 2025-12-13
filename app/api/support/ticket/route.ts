import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    const body = await req.json();
    const { action, category, subCategory, message, type } = body;

    // Eğer category, subCategory ve message varsa, yeni ticket oluştur
    if (category && message) {
      const user = session?.userId
        ? await prisma.user.findUnique({
            where: { id: session.userId },
            select: { id: true, name: true, email: true },
          })
        : null;

      // Kategori mapping
      const categoryMap: Record<string, any> = {
        siparis: "ORDER",
        hizmet: "TECHNICAL",
        hesap: "ACCOUNT",
        odeme: "PAYMENT",
        diger: "OTHER",
      };

      const categoryTitles: Record<string, string> = {
        siparis: "Sipariş Sorunu",
        hizmet: "Hizmet Sorunu",
        hesap: "Hesap Sorunu",
        odeme: "Ödeme Sorunu",
        diger: "Diğer",
      };

      const subCategoryTitles: Record<string, Record<string, string>> = {
        siparis: {
          "siparis-gelmedi": "Siparişim gelmedi",
          "siparis-yanlis": "Yanlış sipariş geldi",
          "siparis-iptal": "Siparişimi iptal etmek istiyorum",
          "siparis-odeme": "Ödeme sorunu",
        },
        hizmet: {
          "hizmet-kalitesi": "Hizmet kalitesi beklentimi karşılamadı",
          "hizmet-gecikme": "Hizmet gecikti",
          "hizmet-iptal": "Hizmet iptal edildi",
          "hizmet-fiyat": "Fiyat uyuşmazlığı",
        },
        hesap: {
          "hesap-giris": "Giriş yapamıyorum",
          "hesap-sifre": "Şifremi unuttum",
          "hesap-bilgi": "Hesap bilgilerimi güncellemek istiyorum",
          "hesap-silme": "Hesabımı silmek istiyorum",
        },
        odeme: {
          "odeme-reddedildi": "Ödeme reddedildi",
          "odeme-iade": "İade talep ediyorum",
          "odeme-fatura": "Fatura sorunu",
          "odeme-kart": "Kart bilgileri sorunu",
        },
      };

      const ticketCategory = categoryMap[category] || "GENERAL";
      const categoryTitle = categoryTitles[category] || category;
      const subCategoryTitle = subCategory
        ? subCategoryTitles[category]?.[subCategory] || subCategory
        : null;

      // Ticket oluştur
      const ticket = await prisma.supportTicket.create({
        data: {
          userId: user?.id || null,
          email: user?.email || session?.email || "anonymous@hizmetgo.app",
          name: user?.name || null,
          category: ticketCategory,
          subject: subCategoryTitle
            ? `${categoryTitle} - ${subCategoryTitle}`
            : categoryTitle,
          status: "ADMIN_OPEN",
          priority: category === "odeme" || category === "hizmet" ? 2 : 3,
        },
      });

      // İlk mesajı ekle
      await prisma.supportMessage.create({
        data: {
          ticketId: ticket.id,
          type: "USER",
          content: message.trim(),
          userId: user?.id || null,
          isRead: false,
        },
      });

      // Admin'lere bildirim gönder
      try {
        const adminUsers = await prisma.user.findMany({
          where: { role: "ADMIN" },
          select: { id: true },
        });

        if (adminUsers.length > 0) {
          const { createNotificationsForUsers } =
            await import("@/lib/notifications/createNotification");
          await createNotificationsForUsers(
            adminUsers.map((admin) => admin.id),
            "GENERAL",
            "Yeni destek talebi",
            `${user?.name || "Bir kullanıcı"} yeni bir destek talebi oluşturdu: ${ticket.subject}`,
            {
              ticketId: ticket.id,
              category: ticketCategory,
              link: `/admin/tickets/${ticket.id}`,
            },
          );
        }
      } catch (notifError) {
        console.error("Notification creation error:", notifError);
        // Notification hatası ticket oluşturma akışını etkilememeli
      }

      return NextResponse.json({
        success: true,
        ticketId: ticket.id,
      });
    }

    if (action === "get_or_create") {
      // Kullanıcı bilgisini al (eğer giriş yapmışsa)
      let user = null;
      if (session?.userId) {
        user = await prisma.user.findUnique({
          where: { id: session.userId },
          select: { id: true, name: true, email: true },
        });
      }

      // Kullanıcının açık ticket'ı var mı kontrol et
      const openTicket = await prisma.supportTicket.findFirst({
        where: {
          userId: user?.id || null,
          status: {
            in: ["OPEN", "BOT_RESOLVED", "ADMIN_OPEN", "ADMIN_REPLIED"] as any,
          },
        },
        orderBy: { createdAt: "desc" },
        include: {
          messages: {
            orderBy: { createdAt: "asc" },
            take: 50, // Son 50 mesajı getir
          },
        },
      });

      if (openTicket) {
        return NextResponse.json({
          ticketId: openTicket.id,
          messages: openTicket.messages.map((msg) => ({
            id: msg.id,
            type: msg.type,
            content: msg.content,
            createdAt: msg.createdAt,
            isRead: msg.isRead,
          })),
        });
      }

      // Yeni ticket oluştur
      const newTicket = await prisma.supportTicket.create({
        data: {
          userId: user?.id || null,
          email:
            user?.email ||
            session?.email ||
            body.email ||
            "anonymous@hizmetgo.app",
          name: user?.name || body.name || null,
          category: "GENERAL",
          subject: "Yardım Talebi",
          status: "OPEN",
          priority: 3,
        },
        include: {
          messages: true,
        },
      });

      return NextResponse.json({
        ticketId: newTicket.id,
        messages: [],
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Support ticket error:", error);
    return NextResponse.json(
      { error: "Failed to create/load ticket", details: error.message },
      { status: 500 },
    );
  }
}
