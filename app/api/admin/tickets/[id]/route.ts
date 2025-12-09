import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
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
      select: { role: true },
    });

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const ticket = await prisma.supportTicket.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        messages: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
            admin: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!ticket) {
      return NextResponse.json(
        { error: "Ticket bulunamadı" },
        { status: 404 },
      );
    }

    // Format messages
    const formattedMessages = ticket.messages.map((msg) => ({
      id: msg.id,
      type: msg.type,
      content: msg.content,
      createdAt: msg.createdAt.toISOString(),
      userName: msg.user?.name,
      adminName: msg.admin?.name,
    }));

    return NextResponse.json({
      ticket: {
        ...ticket,
        createdAt: ticket.createdAt.toISOString(),
        updatedAt: ticket.updatedAt.toISOString(),
        resolvedAt: ticket.resolvedAt?.toISOString(),
        closedAt: ticket.closedAt?.toISOString(),
        messages: formattedMessages,
      },
    });
  } catch (error: any) {
    console.error("Admin ticket detail error:", error);
    return NextResponse.json(
      { error: "Failed to load ticket", details: error.message },
      { status: 500 },
    );
  }
}

