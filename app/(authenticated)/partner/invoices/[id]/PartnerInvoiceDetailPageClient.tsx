"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { useToast } from "@/lib/hooks/useToast";
// Decimal removed - using number instead for client-side
interface InvoiceDetail {
  id: string;
  orderId: string;
  commissionGross: number;
  referralFee: number;
  paymentFee: number;
  platformNet: number;
  vatAmount: number;
  totalAmount: number;
  issuedAt: string;
  pdfUrl?: string | null;
  externalAccountingId?: string | null;
  partner: {
    id: string;
    name: string;
    email: string;
  };
  order: {
    id: string;
    totalAmount: number;
    status: string;
    createdAt: string;
  };
}
export default function PartnerInvoiceDetailPageClient({
  invoiceId,
}: {
  invoiceId: string;
}) {
  const router = useRouter();
  const { error } = useToast();
  const [invoice, setInvoice] = useState<InvoiceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadInvoice();
  }, [invoiceId]);
  const loadInvoice = async () => {
    try {
      const res = await fetch(`/api/partner/invoices/${invoiceId}`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setInvoice(data.invoice);
      } else {
        error("Fatura yüklenemedi");
      }
    } catch (err) {
      error("Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Yükleniyor...</div>
      </div>
    );
  }
  if (!invoice) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Fatura bulunamadı</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => router.push("/partner/invoices")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Faturalara Dön
        </Button>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Fatura Detayı</CardTitle>
              {invoice.pdfUrl && (
                <Button
                  variant="outline"
                  onClick={() => window.open(invoice.pdfUrl!, "_blank")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  PDF İndir
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Fatura Bilgileri */}
            <div>
              <h3 className="font-semibold mb-2">Fatura Bilgileri</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-textSecondary">Fatura No</p>
                  <p className="font-medium">#{invoice.id.slice(0, 8)}</p>
                </div>
                <div>
                  <p className="text-textSecondary">Tarih</p>
                  <p className="font-medium">
                    {new Date(invoice.issuedAt).toLocaleDateString("tr-TR")}
                  </p>
                </div>
                <div>
                  <p className="text-textSecondary">Sipariş No</p>
                  <p className="font-medium">
                    #{invoice.orderId.slice(0, 8)}
                  </p>
                </div>
                {invoice.externalAccountingId && (
                  <div>
                    <p className="text-textSecondary">Muhasebe Referansı</p>
                    <p className="font-medium">{invoice.externalAccountingId}</p>
                  </div>
                )}
              </div>
            </div>
            {/* Partner Bilgileri */}
            <div>
              <h3 className="font-semibold mb-2">Partner Bilgileri</h3>
              <div className="text-sm">
                <p className="text-gray-500">Ad</p>
                <p className="font-medium">{invoice.partner.name}</p>
                <p className="text-gray-500 mt-2">E-posta</p>
                <p className="font-medium">{invoice.partner.email}</p>
              </div>
            </div>
            {/* Fatura Kalemleri */}
            <div>
              <h3 className="font-semibold mb-4">Fatura Kalemleri</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Komisyon (KDV Dahil):</span>
                  <span className="font-medium">
                    {Number(invoice.commissionGross).toFixed(2)} ₺
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Referans Fee İndirimi:</span>
                  <span className="font-medium text-red-600">
                    -{Number(invoice.referralFee).toFixed(2)} ₺
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Ödeme Sistemi Fee Kesintisi:</span>
                  <span className="font-medium text-red-600">
                    -{Number(invoice.paymentFee).toFixed(2)} ₺
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Net Hizmet Bedeli (KDV Hariç):</span>
                  <span className="font-medium">
                    {Number(invoice.platformNet).toFixed(2)} ₺
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>KDV (%20):</span>
                  <span className="font-medium">
                    {Number(invoice.vatAmount).toFixed(2)} ₺
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-t-2 border-gray-300 mt-2">
                  <span className="font-bold text-lg">Toplam Fatura Tutarı:</span>
                  <span className="font-bold text-xl">
                    {Number(invoice.totalAmount).toFixed(2)} ₺
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}