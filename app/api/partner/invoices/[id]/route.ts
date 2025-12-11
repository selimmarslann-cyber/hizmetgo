import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { getInvoiceDetail } from "@/lib/invoice/invoiceService";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    // Invoice detayını getir (yetki kontrolü dahil)
    const invoice = await getInvoiceDetail(params.id, userId);

    return NextResponse.json({ invoice });
  } catch (error: any) {
    console.error("Invoice detail error:", error);
    return NextResponse.json(
      { error: error.message || "Fatura yüklenemedi" },
      { status: 500 },
    );
  }
}

