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
      select: { role: true },
    });

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: "Durum gerekli" },
        { status: 400 },
      );
    }

    const validStatuses = [
      "OPEN",
      "ADMIN_OPEN",
      "ADMIN_REPLIED",
      "RESOLVED",
      "CLOSED",
      "BOT_RESOLVED",
    ];

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Geçersiz durum" },
        { status: 400 },
      );
    }

    // Ticket'ı güncelle
    const updateData: any = {
      status,
      updatedAt: new Date(),
    };

    if (status === "RESOLVED") {
      updateData.resolvedAt = new Date();
      updateData.resolvedBy = session.userId;
    }

    if (status === "CLOSED") {
      updateData.closedAt = new Date();
    }

    await prisma.supportTicket.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Admin ticket status update error:", error);
    return NextResponse.json(
      { error: "Failed to update status", details: error.message },
      { status: 500 },
    );
  }
}


