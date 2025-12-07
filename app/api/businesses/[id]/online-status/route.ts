import { NextRequest, NextResponse } from "next/server";
import { updateOnlineStatus } from "@/lib/services/businessService";
import { updateOnlineStatusSchema } from "@/lib/validations/business";


// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const validated = updateOnlineStatusSchema.parse(body);

    const business = await updateOnlineStatus(
      params.id,
      validated.onlineStatus,
    );

    return NextResponse.json(business);
  } catch (error: any) {
    console.error("Online status update error:", error);
    return NextResponse.json(
      { error: error.message || "Durum güncellenemedi" },
      { status: 400 },
    );
  }
}
