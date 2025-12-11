"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/lib/hooks/useToast";
import { FileText, Filter } from "lucide-react";
// Decimal removed - using number instead for client-side

interface Invoice {
  id: string;
  partnerId: string;
  orderId: string;
  commissionGross: number;
  referralFee: number;
  paymentFee: number;
  platformNet: number;
  vatAmount: number;
  totalAmount: number;
  issuedAt: string;
  partner: {
    name: string;
    email: string;
  };
}

export default function AdminInvoicesPageClient() {
  const { error } = useToast();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    partnerId: "",
    minAmount: "",
    maxAmount: "",
  });

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.fromDate) queryParams.append("fromDate", filters.fromDate);
      if (filters.toDate) queryParams.append("toDate", filters.toDate);
      if (filters.partnerId) queryParams.append("partnerId", filters.partnerId);
      if (filters.minAmount)
        queryParams.append("minAmount", filters.minAmount);
      if (filters.maxAmount)
        queryParams.append("maxAmount", filters.maxAmount);

      const res = await fetch(`/api/admin/invoices?${queryParams}`, {
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

  const handleFilter = () => {
    setLoading(true);
    loadInvoices();
  };

  // Toplam platform net geliri ve KDV hesapla
  const totalPlatformNet = invoices.reduce(
    (sum, inv) => sum + Number(inv.platformNet),
    0,
  );
  const totalVat = invoices.reduce(
    (sum, inv) => sum + Number(inv.vatAmount),
    0,
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div>Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Fatura Yönetimi</h1>
          <p className="text-textSecondary mt-2">
            Tüm komisyon faturalarını görüntüleyin ve yönetin.
          </p>
        </div>

        {/* Özet Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-textSecondary">
                Toplam Platform Net Gelir
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {Number(totalPlatformNet).toFixed(2)} ₺
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-textSecondary">
                Toplam KDV
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {Number(totalVat).toFixed(2)} ₺
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-textSecondary">
                Toplam Fatura Sayısı
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{invoices.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filtreler */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtreler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="fromDate">Başlangıç Tarihi</Label>
                <Input
                  id="fromDate"
                  type="date"
                  value={filters.fromDate}
                  onChange={(e) =>
                    setFilters({ ...filters, fromDate: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="toDate">Bitiş Tarihi</Label>
                <Input
                  id="toDate"
                  type="date"
                  value={filters.toDate}
                  onChange={(e) =>
                    setFilters({ ...filters, toDate: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="minAmount">Min Tutar</Label>
                <Input
                  id="minAmount"
                  type="number"
                  value={filters.minAmount}
                  onChange={(e) =>
                    setFilters({ ...filters, minAmount: e.target.value })
                  }
                />
              </div>
            </div>
            <Button onClick={handleFilter} className="mt-4">
              Filtrele
            </Button>
          </CardContent>
        </Card>

        {/* Fatura Listesi */}
        {invoices.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="w-16 h-16 mx-auto text-textSecondary mb-4" />
              <p className="text-textSecondary">Fatura bulunamadı</p>
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
                        <h3 className="font-semibold">
                          Fatura #{invoice.id.slice(0, 8)}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {new Date(invoice.issuedAt).toLocaleDateString(
                            "tr-TR",
                          )}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                        <div>
                          <p className="text-textSecondary">Partner</p>
                          <p className="font-medium">{invoice.partner.name}</p>
                        </div>
                        <div>
                          <p className="text-textSecondary">Platform Net</p>
                          <p className="font-medium">
                            {Number(invoice.platformNet).toFixed(2)} ₺
                          </p>
                        </div>
                        <div>
                          <p className="text-textSecondary">KDV</p>
                          <p className="font-medium">
                            {Number(invoice.vatAmount).toFixed(2)} ₺
                          </p>
                        </div>
                        <div>
                          <p className="text-textSecondary">Toplam</p>
                          <p className="font-bold">
                            {Number(invoice.totalAmount).toFixed(2)} ₺
                          </p>
                        </div>
                      </div>
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

