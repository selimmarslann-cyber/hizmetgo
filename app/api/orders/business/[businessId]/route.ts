import { NextRequest, NextResponse } from "next/server";
import { getBusinessOrders } from "@/lib/services/orderService";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: NextRequest,
  { params }: { params: { businessId: string } },
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status") as any;

    const orders = await getBusinessOrders(params.businessId, status);

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Orders fetch error:", error);
    return NextResponse.json(
      { error: "Siparişler yüklenemedi" },
      { status: 500 },
    );
  }
}
