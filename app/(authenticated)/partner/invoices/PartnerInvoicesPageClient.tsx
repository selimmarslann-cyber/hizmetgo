"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye } from "lucide-react";
import { useToast } from "@/lib/hooks/useToast";
// Decimal removed - using number instead for client-side
interface Invoice {
  id: string;
  orderId: string;
  commissionGross: number;
  referralFee: number;
  paymentFee: number;
  totalAmount: number;
  issuedAt: string;
  pdfUrl?: string | null;
  order: {
    id: string;
    totalAmount: number;
    status: string;
  };
}
export default function PartnerInvoicesPageClient() {
  const router = useRouter();
  const { error } = useToast();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadInvoices();
  }, []);
  const loadInvoices = async () => {
    try {
      const res = await fetch("/api/partner/invoices", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setInvoices(data.invoices || []);
      } else {
        error("Faturalar yüklenemedi");
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
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Faturalarım</h1>
          <p className="text-textSecondary mt-2">
            Komisyon faturalarınızı buradan görüntüleyebilir ve indirebilirsiniz.
          </p>
        </div>
        {invoices.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="w-16 h-16 mx-auto text-textSecondary mb-4" />
              <p className="text-textSecondary">Henüz fatura bulunmuyor</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <Card key={invoice.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">
                          Fatura #{invoice.id.slice(0, 8)}
                        </h3>
                        <Badge variant="outline">
                          {new Date(invoice.issuedAt).toLocaleDateString("tr-TR")}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                        <div>
                          <p className="text-textSecondary">Sipariş No</p>
                          <p className="font-medium">
                            #{invoice.orderId.slice(0, 8)}
                          </p>
                        </div>
                        <div>
                          <p className="text-textSecondary">Komisyon (KDV Dahil)</p>
                          <p className="font-medium">
                            {Number(invoice.commissionGross).toFixed(2)} ₺
                          </p>
                        </div>
                        <div>
                          <p className="text-textSecondary">Referans Fee</p>
                          <p className="font-medium text-red-600">
                            -{Number(invoice.referralFee).toFixed(2)} ₺
                          </p>
                        </div>
                        <div>
                          <p className="text-textSecondary">Toplam Fatura</p>
                          <p className="font-bold text-lg">
                            {Number(invoice.totalAmount).toFixed(2)} ₺
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          router.push(`/partner/invoices/${invoice.id}`)
                        }
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Görüntüle
                      </Button>
                      {invoice.pdfUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(invoice.pdfUrl!, "_blank")}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          PDF İndir
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}