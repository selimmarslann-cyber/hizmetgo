import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import prisma from "@/lib/db";
import { sendMail } from "@/lib/mail";

export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    const body = await req.json();
    const { category, subject, message } = body;

    if (!category || !subject || !message) {
      return NextResponse.json(
        { error: "Kategori, konu ve mesaj gerekli" },
        { status: 400 },
      );
    }

    // Kullanıcı bilgisini al
    let user = null;
    if (session?.userId) {
      user = await prisma.user.findUnique({
        where: { id: session.userId },
        select: { id: true, name: true, email: true },
      });
    }

    // Ticket oluştur
    const ticket = await prisma.supportTicket.create({
      data: {
        userId: user?.id || null,
        email: user?.email || session?.email || "anonymous@hizmetgo.app",
        name: user?.name || null,
        category: category as any,
        subject: subject.trim(),
        status: "ADMIN_OPEN",
        priority: category === "PAYMENT" || category === "TECHNICAL" ? 2 : 3, // Ödeme ve teknik yüksek öncelik
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

    // Admin'e email gönder
    try {
      const adminEmail = process.env.ADMIN_EMAIL;
      if (adminEmail) {
        const emailHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Yeni Destek Talebi - Hizmetgo</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #FF6000 0%, #FF5500 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">HİZMETGO</h1>
              <p style="color: white; margin: 5px 0 0 0; opacity: 0.9;">Yeni Destek Talebi</p>
            </div>
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
              <h2 style="color: #FF6000; margin-top: 0;">Yeni destek talebi alındı</h2>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FF6000;">
                <p style="margin: 0 0 10px 0;"><strong>Talep ID:</strong> ${ticket.id}</p>
                <p style="margin: 0 0 10px 0;"><strong>Kategori:</strong> ${category}</p>
                <p style="margin: 0 0 10px 0;"><strong>Konu:</strong> ${subject}</p>
                <p style="margin: 0 0 10px 0;"><strong>Kullanıcı:</strong> ${user?.name || "Misafir"} (${user?.email || ticket.email})</p>
                <p style="margin: 0 0 10px 0;"><strong>Öncelik:</strong> ${ticket.priority === 2 ? "Yüksek" : "Normal"}</p>
              </div>

              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Mesaj:</h3>
                <p style="white-space: pre-wrap; color: #666;">${message}</p>
              </div>

              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://hizmetgo.app"}/admin/tickets/${ticket.id}" 
                   style="background: #FF6000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                  Talebi Görüntüle
                </a>
              </div>

              <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
              <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
                Bu otomatik bir e-postadır. Lütfen yanıtlamayın.
              </p>
            </div>
          </body>
          </html>
        `;

        await sendMail(
          adminEmail,
          `[Hizmetgo] Yeni Destek Talebi: ${subject}`,
          emailHtml,
        );
        console.log("✅ Admin email sent for ticket:", ticket.id);
      }
    } catch (emailError: any) {
      // Email gönderilemese bile ticket oluşturuldu, sadece log'la
      console.error("❌ Failed to send admin email:", emailError.message);
    }

    // Bildirim oluştur (admin için) - FAZ 1: createNotification kullan
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
          "GENERAL", // NotificationType enum'unda SUPPORT_TICKET yok, GENERAL kullanıyoruz
          "Yeni destek talebi",
          `${user?.name || "Bir kullanıcı"} yeni bir destek talebi oluşturdu: ${subject}`,
          {
            ticketId: ticket.id,
            category,
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
  } catch (error: any) {
    console.error("Support ticket creation error:", error);
    return NextResponse.json(
      { error: "Talep oluşturulamadı", details: error.message },
      { status: 500 },
    );
  }
}
