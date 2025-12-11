import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { createInvoicePdf } from "@/lib/invoice/invoiceService";
import { prisma } from "@/lib/db/prisma";

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

    // Invoice'ı kontrol et (yetki kontrolü)
    const invoice = await prisma.invoice.findUnique({
      where: { id: params.id },
      select: { partnerId: true },
    });

    if (!invoice) {
      return NextResponse.json(
        { error: "Fatura bulunamadı" },
        { status: 404 },
      );
    }

    // Sadece partner veya admin erişebilir
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (invoice.partnerId !== userId && user?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Bu faturaya erişim yetkiniz yok" },
        { status: 403 },
      );
    }

    // PDF oluştur (şimdilik HTML döndür, ileride PDF'e çevrilecek)
    const pdfUrl = await createInvoicePdf(params.id);

    // Şimdilik HTML template'i döndür
    // İleride puppeteer ile PDF'e çevrilecek
    const invoiceData = await prisma.invoice.findUnique({
      where: { id: params.id },
      include: {
        partner: {
          select: {
            name: true,
            email: true,
          },
        },
        order: {
          select: {
            id: true,
            totalAmount: true,
          },
        },
      },
    });

    if (!invoiceData) {
      return NextResponse.json(
        { error: "Fatura bulunamadı" },
        { status: 404 },
      );
    }

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Fatura #${invoiceData.id}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
          .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #333; padding-bottom: 20px; }
          .invoice-details { margin-bottom: 30px; }
          .line-item { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #eee; }
          .total { font-weight: bold; font-size: 1.3em; margin-top: 30px; padding-top: 20px; border-top: 2px solid #333; }
          .label { color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>HizmetGo Komisyon Faturası</h1>
          <p>Fatura No: ${invoiceData.id}</p>
          <p>Tarih: ${invoiceData.issuedAt.toLocaleDateString("tr-TR")}</p>
        </div>
        
        <div class="invoice-details">
          <h2>Partner Bilgileri</h2>
          <p><strong>Ad:</strong> ${invoiceData.partner.name}</p>
          <p><strong>E-posta:</strong> ${invoiceData.partner.email}</p>
        </div>

        <div class="invoice-details">
          <h2>Fatura Kalemleri</h2>
          <div class="line-item">
            <span>Komisyon (KDV Dahil):</span>
            <span>${invoiceData.commissionGross.toFixed(2)} ₺</span>
          </div>
          <div class="line-item">
            <span>Referans Fee İndirimi:</span>
            <span>-${invoiceData.referralFee.toFixed(2)} ₺</span>
          </div>
          <div class="line-item">
            <span>Ödeme Sistemi Fee Kesintisi:</span>
            <span>-${invoiceData.paymentFee.toFixed(2)} ₺</span>
          </div>
          <div class="line-item">
            <span>Net Hizmet Bedeli (KDV Hariç):</span>
            <span>${invoiceData.platformNet.toFixed(2)} ₺</span>
          </div>
          <div class="line-item">
            <span>KDV (%20):</span>
            <span>${invoiceData.vatAmount.toFixed(2)} ₺</span>
          </div>
          <div class="line-item total">
            <span>Toplam Fatura Tutarı:</span>
            <span>${invoiceData.totalAmount.toFixed(2)} ₺</span>
          </div>
        </div>

        <div class="invoice-details">
          <p><strong>Sipariş No:</strong> ${invoiceData.orderId}</p>
        </div>
      </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error: any) {
    console.error("Invoice PDF error:", error);
    return NextResponse.json(
      { error: error.message || "PDF oluşturulamadı" },
      { status: 500 },
    );
  }
}

