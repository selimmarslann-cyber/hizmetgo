import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.userId) {
      return NextResponse.json({ count: 0 });
    }

    // Kullanıcının okunmamış mesaj sayısını getir
    const unreadCount = await prisma.supportMessage.count({
      where: {
        ticket: {
          userId: session.userId,
        },
        isRead: false,
        type: {
          in: ["BOT", "ADMIN"],
        },
      },
    });

    return NextResponse.json({ count: unreadCount });
  } catch (error: any) {
    console.error("Unread count error:", error);
    return NextResponse.json({ count: 0 });
  }
}
