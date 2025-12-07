import { NextRequest, NextResponse } from "next/server";
import { extractUserIdFromRequest } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    // Support both cookie (web) and Bearer token (mobile)
    const userId = await extractUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json({ error: "Oturum bulunamadı" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 404 },
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Auth me error:", error);
    return NextResponse.json(
      { error: "Oturum kontrolü başarısız" },
      { status: 500 },
    );
  }
}
