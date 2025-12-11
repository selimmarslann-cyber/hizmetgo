import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { getPartnerInvoices } from "@/lib/invoice/invoiceService";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı girişi gerekli" },
        { status: 401 },
      );
    }

    // Partner'ın faturalarını getir
    const invoices = await getPartnerInvoices(userId);

    return NextResponse.json({ invoices });
  } catch (error: any) {
    console.error("Invoice list error:", error);
    return NextResponse.json(
      { error: error.message || "Faturalar yüklenemedi" },
      { status: 500 },
    );
  }
}

