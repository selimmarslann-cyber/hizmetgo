import { NextRequest, NextResponse } from "next/server";
import { getBusinessReviews } from "@/lib/services/ratingService";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!)
      : 20;

    const reviews = await getBusinessReviews(params.id, limit);

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Reviews fetch error:", error);
    return NextResponse.json(
      { error: "Yorumlar yüklenemedi" },
      { status: 500 },
    );
  }
}
