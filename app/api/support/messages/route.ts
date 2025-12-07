import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    const searchParams = req.nextUrl.searchParams;
    const ticketId = searchParams.get("ticketId");

    if (!ticketId) {
      return NextResponse.json({ error: "Missing ticketId" }, { status: 400 });
    }

    // Ticket'ı kontrol et
    const ticket = await prisma.supportTicket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    // Yetki kontrolü
    if (ticket.userId && session?.userId !== ticket.userId) {
      // Admin kontrolü
      if (session?.userId) {
        const user = await prisma.user.findUnique({
          where: { id: session.userId },
          select: { role: true },
        });
        if (user?.role !== "ADMIN") {
          return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }
      } else {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }
    }

    // Mesajları getir (max 500 mesaj - performans için limit)
    const messages = await prisma.supportMessage.findMany({
      where: { ticketId },
      orderBy: { createdAt: "asc" },
      include: {
        user: {
          select: { name: true, email: true },
        },
        admin: {
          select: { name: true, email: true },
        },
      },
      take: 500, // Max 500 mesaj - performans optimizasyonu
    });

    return NextResponse.json({
      messages: messages.map((msg) => ({
        id: msg.id,
        type: msg.type,
        content: msg.content,
        createdAt: msg.createdAt,
        isRead: msg.isRead,
        userName: msg.user?.name || msg.admin?.name,
      })),
    });
  } catch (error: any) {
    console.error("Support messages error:", error);
    return NextResponse.json(
      { error: "Failed to load messages", details: error.message },
      { status: 500 },
    );
  }
}
