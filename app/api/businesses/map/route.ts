import { NextRequest, NextResponse } from "next/server";
import { getBusinessesForMap } from "@/lib/services/businessService";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lat = searchParams.get("lat")
      ? parseFloat(searchParams.get("lat")!)
      : undefined;
    const lng = searchParams.get("lng")
      ? parseFloat(searchParams.get("lng")!)
      : undefined;
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!)
      : 50;

    const businesses = await getBusinessesForMap({
      lat,
      lng,
      category: category as any,
      search,
      limit,
    });

    return NextResponse.json(businesses);
  } catch (error) {
    console.error("Map businesses fetch error:", error);
    return NextResponse.json(
      { error: "İşletmeler yüklenemedi" },
      { status: 500 },
    );
  }
}
