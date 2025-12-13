import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
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

    // Son 5 açık ticket'ı getir
    const recentTickets = await prisma.supportTicket.findMany({
      where: {
        status: {
          in: ["OPEN", "ADMIN_OPEN", "ADMIN_REPLIED"],
        },
      },
      orderBy: [
        { priority: "asc" },
        { createdAt: "desc" },
      ],
      take: 5,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });

    return NextResponse.json({ tickets: recentTickets });
  } catch (error: any) {
    console.error("Recent tickets error:", error);
    return NextResponse.json(
      { error: "Failed to load recent tickets", details: error.message },
      { status: 500 },
    );
  }
}

