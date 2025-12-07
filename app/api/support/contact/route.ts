import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    const body = await req.json();
    const { name, email, phone, subject, category, message } = body;

    if (!email || !subject || !message) {
      return NextResponse.json(
        { error: "Email, subject ve message gerekli" },
        { status: 400 },
      );
    }

    // Kullanıcı bilgisini al (eğer giriş yapmışsa)
    let user = null;
    if (session?.userId) {
      user = await prisma.user.findUnique({
        where: { id: session.userId },
        select: { id: true, name: true, email: true },
      });
    }

    // Ticket oluştur (formdan gelenler için)
    const ticket = await prisma.supportTicket.create({
      data: {
        userId: user?.id || null,
        email,
        name: name || user?.name || null,
        category: (category as any) || "GENERAL",
        subject,
        status: "ADMIN_OPEN",
        priority: 2, // Orta öncelik
      },
    });

    // İlk mesajı ekle
    await prisma.supportMessage.create({
      data: {
        ticketId: ticket.id,
        type: "USER",
        content: `İletişim Formu Mesajı:\n\nTelefon: ${phone || "Belirtilmedi"}\n\n${message}`,
        userId: user?.id || null,
        isRead: false,
      },
    });

    return NextResponse.json({ success: true, ticketId: ticket.id });
  } catch (error: any) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message", details: error.message },
      { status: 500 },
    );
  }
}
