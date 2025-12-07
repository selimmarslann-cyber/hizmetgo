import { NextRequest, NextResponse } from "next/server";
import { getCustomerOrders } from "@/lib/services/orderService";


// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function GET(
  request: NextRequest,
  { params }: { params: { customerId: string } },
) {
  try {
    const orders = await getCustomerOrders(params.customerId);

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Orders fetch error:", error);
    return NextResponse.json(
      { error: "Siparişler yüklenemedi" },
      { status: 500 },
    );
  }
}
