import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { processBotMessage } from "@/lib/support/botLogic";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    const body = await req.json();
    const { ticketId, content } = body;

    if (!ticketId || !content?.trim()) {
      return NextResponse.json(
        { error: "Missing ticketId or content" },
        { status: 400 },
      );
    }

    // Ticket'ı kontrol et
    const ticket = await prisma.supportTicket.findUnique({
      where: { id: ticketId },
      include: { messages: true },
    });

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    // Kullanıcı mesajını kaydet
    const userMessage = await prisma.supportMessage.create({
      data: {
        ticketId,
        type: "USER",
        content: content.trim(),
        userId: session?.userId || null,
        isRead: true,
      },
    });

    // Bot logic'i çalıştır
    const botResponse = await processBotMessage({
      ticket,
      userMessage: content.trim(),
      userId: session?.userId || null,
    });

    let botMessage = null;
    let escalated = false;

    if (botResponse) {
      if (botResponse.escalated) {
        // Admin'e aktar
        await prisma.supportTicket.update({
          where: { id: ticketId },
          data: {
            status: "ADMIN_OPEN",
            category: (botResponse.category as any) || ticket.category,
            priority: botResponse.priority || ticket.priority,
          },
        });
        escalated = true;
      }

      // Bot mesajını kaydet
      botMessage = await prisma.supportMessage.create({
        data: {
          ticketId,
          type: "BOT",
          content: botResponse.content,
          isRead: false,
        },
      });

      if (!botResponse.escalated && botResponse.resolved) {
        // Bot çözdüyse ticket'ı güncelle
        await prisma.supportTicket.update({
          where: { id: ticketId },
          data: {
            status: "BOT_RESOLVED",
            isBotResolved: true,
            resolvedAt: new Date(),
          },
        });
      }
    } else {
      // Bot cevap veremedi, admin'e aktar
      await prisma.supportTicket.update({
        where: { id: ticketId },
        data: {
          status: "ADMIN_OPEN",
          priority: 2, // Orta öncelik
        },
      });
      escalated = true;

      // Admin'e aktarıldı mesajı
      botMessage = await prisma.supportMessage.create({
        data: {
          ticketId,
          type: "BOT",
          content:
            "Sorunuzu daha detaylı incelemek için destek ekibimize yönlendirdim. En kısa sürede size dönüş yapılacaktır.",
          isRead: false,
        },
      });
    }

    return NextResponse.json({
      success: true,
      botResponse: botMessage
        ? {
            content: botMessage.content,
            escalated,
          }
        : null,
    });
  } catch (error: any) {
    console.error("Support message error:", error);
    return NextResponse.json(
      { error: "Failed to send message", details: error.message },
      { status: 500 },
    );
  }
}
