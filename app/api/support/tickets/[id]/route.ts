import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import prisma from "@/lib/db";

export const revalidate = 0;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userId = await getUserId(req);
    const ticketId = params.id;

    const ticket = await prisma.supportTicket.findUnique({
      where: { id: ticketId },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
          include: {
            user: {
              select: { name: true },
            },
            admin: {
              select: { name: true },
            },
          },
          take: 500, // Max 500 mesaj - performans optimizasyonu
        },
        user: {
          select: { name: true, email: true },
        },
      },
    });

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    // Yetki kontrolü
    if (ticket.userId && ticket.userId !== userId) {
      // Admin kontrolü
      if (userId) {
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: { role: true },
        });
        if (user?.role !== "ADMIN") {
          return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }
      } else {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }
    }

    // Kullanıcı mesajlarını okundu olarak işaretle
    await prisma.supportMessage.updateMany({
      where: {
        ticketId,
        type: "ADMIN",
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    return NextResponse.json({
      ticket: {
        id: ticket.id,
        subject: ticket.subject,
        category: ticket.category,
        status: ticket.status,
        createdAt: ticket.createdAt.toISOString(),
        messages: ticket.messages.map((msg) => ({
          id: msg.id,
          type: msg.type,
          content: msg.content,
          createdAt: msg.createdAt.toISOString(),
          isRead: msg.isRead,
          userName: msg.user?.name || msg.admin?.name,
        })),
      },
    });
  } catch (error: any) {
    console.error("Support ticket error:", error);
    return NextResponse.json(
      { error: "Failed to load ticket", details: error.message },
      { status: 500 },
    );
  }
}
