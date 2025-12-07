import { NextRequest, NextResponse } from "next/server";
import {
  getBusinessById,
  updateBusiness,
} from "@/lib/services/businessService";
import { getUserId } from "@/lib/auth/session";
import { z } from "zod";

const updateBusinessSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  addressText: z.string().optional(),
  coverImageUrl: z.string().url().optional().nullable(),
  workingHoursJson: z.any().optional(), // JSON object for working hours
});


// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const business = await getBusinessById(params.id);

    if (!business) {
      return NextResponse.json(
        { error: "İşletme bulunamadı" },
        { status: 404 },
      );
    }

    return NextResponse.json(business);
  } catch (error) {
    console.error("Business fetch error:", error);
    return NextResponse.json({ error: "İşletme yüklenemedi" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    // İşletmenin sahibi olduğunu kontrol et
    const business = await getBusinessById(params.id);
    if (!business || business.ownerUserId !== userId) {
      return NextResponse.json(
        { error: "İşletme bulunamadı veya yetkiniz yok" },
        { status: 404 },
      );
    }

    const body = await request.json();
    const validated = updateBusinessSchema.parse(body);

    // null değerleri undefined'a çevir
    const updateData = {
      ...validated,
      coverImageUrl: validated.coverImageUrl ?? undefined,
    };

    const updated = await updateBusiness(params.id, updateData);

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("Business update error:", error);
    return NextResponse.json(
      { error: error.message || "İşletme güncellenemedi" },
      { status: 400 },
    );
  }
}
