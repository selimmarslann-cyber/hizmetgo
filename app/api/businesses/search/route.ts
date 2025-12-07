import { NextRequest, NextResponse } from "next/server";
import { getBusinessesForMap } from "@/lib/services/businessService";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get("q") || "";
    const lat = searchParams.get("lat")
      ? parseFloat(searchParams.get("lat")!)
      : undefined;
    const lng = searchParams.get("lng")
      ? parseFloat(searchParams.get("lng")!)
      : undefined;
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!)
      : 20;

    const businesses = await getBusinessesForMap({
      lat,
      lng,
      search: q,
      limit,
    });

    return NextResponse.json({ businesses });
  } catch (error) {
    console.error("Business search error:", error);
    return NextResponse.json(
      { error: "Arama yapılamadı", businesses: [] },
      { status: 500 },
    );
  }
}
