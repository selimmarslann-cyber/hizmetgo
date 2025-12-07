import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    const body = await req.json();
    const { action } = body;

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
