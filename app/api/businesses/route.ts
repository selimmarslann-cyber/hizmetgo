import { NextRequest, NextResponse } from "next/server";
import { createBusiness } from "@/lib/services/businessService";
import { createBusinessSchema } from "@/lib/validations/business";


// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createBusinessSchema.parse(body);

    const business = await createBusiness({
      ownerUserId: body.ownerUserId,
      name: validated.name,
      description: validated.description,
      category: validated.category as any,
      lat: validated.lat,
      lng: validated.lng,
      addressText: validated.addressText,
      coverImageUrl: validated.coverImageUrl || undefined,
      workingHoursJson: validated.workingHoursJson,
    });

    return NextResponse.json(business, { status: 201 });
  } catch (error: any) {
    console.error("Business creation error:", error);
    return NextResponse.json(
      { error: error.message || "İşletme oluşturulamadı" },
      { status: 400 },
    );
  }
}
