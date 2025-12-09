import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getSession();

    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { role: true, name: true },
    });

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const { content } = body;

    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: "Mesaj içeriği gerekli" },
        { status: 400 },
      );
    }

    // Ticket'ı kontrol et
    const ticket = await prisma.supportTicket.findUnique({
      where: { id: params.id },
    });

    if (!ticket) {
      return NextResponse.json(
        { error: "Ticket bulunamadı" },
        { status: 404 },
      );
    }

    // Mesaj oluştur ve ticket durumunu güncelle
    await prisma.$transaction(async (tx) => {
      // Admin mesajı oluştur
      await tx.supportMessage.create({
        data: {
          ticketId: params.id,
          type: "ADMIN",
          content: content.trim(),
          adminId: session.userId,
        },
      });

      // Ticket durumunu güncelle
      await tx.supportTicket.update({
        where: { id: params.id },
        data: {
          status: "ADMIN_REPLIED",
          updatedAt: new Date(),
        },
      });
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Admin ticket reply error:", error);
    return NextResponse.json(
      { error: "Failed to send reply", details: error.message },
      { status: 500 },
    );
  }
}

