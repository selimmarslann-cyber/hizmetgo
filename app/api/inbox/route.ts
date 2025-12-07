import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import prisma from "@/lib/db";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const filter = searchParams.get("filter") || "all";

    const items: any[] = [];

    // Support tickets
    if (filter === "all" || filter === "support" || filter === "unread") {
      const tickets = await prisma.supportTicket.findMany({
        where: {
          userId,
          ...(filter === "unread" && {
            messages: {
              some: {
                isRead: false,
                type: "ADMIN",
              },
            },
          }),
        },
        include: {
          messages: {
            orderBy: { createdAt: "desc" },
            take: 1,
          },
          user: {
            select: { name: true, email: true },
          },
        },
        orderBy: { updatedAt: "desc" },
        take: 50,
      });

      for (const ticket of tickets) {
        const lastMessage = ticket.messages[0];
        const unreadCount = await prisma.supportMessage.count({
          where: {
            ticketId: ticket.id,
            type: "ADMIN",
            isRead: false,
          },
        });

        items.push({
          id: ticket.id,
          type: "support",
          title: ticket.subject,
          preview: lastMessage?.content?.substring(0, 100) || "Mesaj yok",
          sender: "Destek Ekibi",
          unread: unreadCount > 0,
          createdAt: ticket.updatedAt.toISOString(),
          status: ticket.status.toLowerCase(),
          category: ticket.category,
        });
      }
    }

    // Order messages
    if (filter === "all" || filter === "orders" || filter === "unread") {
      const orders = await prisma.order.findMany({
        where: {
          OR: [{ customerId: userId }, { business: { ownerUserId: userId } }],
        },
        include: {
          messages: {
            orderBy: { createdAt: "desc" },
            take: 1,
            include: {
              sender: { select: { name: true } },
            },
          },
          customer: { select: { name: true } },
          business: { select: { name: true } },
        },
        orderBy: { updatedAt: "desc" },
        take: 50,
      });

      for (const order of orders) {
        const lastMessage = order.messages[0];
        if (!lastMessage) continue;

        const unreadCount = await prisma.message.count({
          where: {
            orderId: order.id,
            receiverId: userId,
            isRead: false,
          },
        });

        const isCustomer = order.customerId === userId;
        items.push({
          id: order.id,
          type: "order",
          title: `Sipariş #${order.id.slice(0, 8)}`,
          preview: lastMessage.content.substring(0, 100),
          sender: isCustomer ? order.business.name : order.customer.name,
          unread: unreadCount > 0,
          createdAt: lastMessage.createdAt.toISOString(),
        });
      }
    }

    // Job/Lead messages (future - listing mesajları)
    // TODO: Implement when lead_purchase message system is ready

    // Sort by date (most recent first)
    items.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return NextResponse.json({ items: items.slice(0, 100) });
  } catch (error: any) {
    console.error("Inbox error:", error);
    return NextResponse.json(
      { error: "Failed to load inbox", details: error.message },
      { status: 500 },
    );
  }
}
