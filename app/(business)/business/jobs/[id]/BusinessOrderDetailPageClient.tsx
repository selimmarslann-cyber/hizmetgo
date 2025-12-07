"use client";
/**
 * Order Detail Page - Esnaf sipariş detay sayfası
 *
 * Bu sayfada esnaf:
 * - Sipariş detaylarını görür
 * - Müşteri bilgilerini görür
 * - Sipariş durumunu güncelleyebilir
 * - Müşteri ile mesajlaşabilir (yakında)
 */

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Clock,
  MapPin,
  MessageSquare,
  Phone,
  User,
  Package,
  XCircle,
} from "lucide-react";
import { useToast } from "@/lib/hooks/useToast";
import { motion } from "framer-motion";



// Static generation'ı engelle
export default function BusinessOrderDetailPageClient() {
  const params = useParams();
  const router = useRouter();
  const { success, error, info } = useToast();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const loadOrder = useCallback(async () => {
    try {
      const res = await fetch(`/api/orders/${params.id}`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setOrder(data);
      } else {
        error("Sipariş yüklenemedi");
      }
    } catch (err) {
      console.error("Sipariş yüklenemedi:", err);
      error("Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  }, [params.id, error]);

  useEffect(() => {
    loadOrder();
  }, [loadOrder]);

  const handleCompleteOrder = async () => {
    if (
      !confirm(
        "Bu siparişi tamamlandı olarak işaretlemek istediğinize emin misiniz?",
      )
    ) {
      return;
    }

    setUpdating(true);
    try {
      const res = await fetch(`/api/orders/${params.id}/complete`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        success("Sipariş tamamlandı olarak işaretlendi");
        loadOrder();
      } else {
        const data = await res.json();
        error(data.error || "Sipariş tamamlanamadı");
      }
    } catch (err) {
      error("Bir hata oluştu");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-500">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Sipariş bulunamadı</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => router.back()}
          >
            Geri Dön
          </Button>
        </div>
      </div>
    );
  }

  const getStatusText = (status: string) => {
    const statusMap: Record<string, { text: string; variant: any; icon: any }> =
      {
        PENDING_CONFIRMATION: {
          text: "Yeni İstek",
          variant: "secondary",
          icon: Clock,
        },
        ACCEPTED: {
          text: "Kabul Edildi",
          variant: "default",
          icon: CheckCircle2,
        },
        IN_PROGRESS: {
          text: "Devam Ediyor",
          variant: "default",
          icon: Package,
        },
        COMPLETED: {
          text: "Tamamlandı",
          variant: "default",
          icon: CheckCircle2,
        },
        CANCELLED_BY_CUSTOMER: {
          text: "Müşteri İptal Etti",
          variant: "destructive",
          icon: XCircle,
        },
        CANCELLED_BY_PROVIDER: {
          text: "İptal Edildi",
          variant: "destructive",
          icon: XCircle,
        },
      };
    return (
      statusMap[status] || { text: status, variant: "outline", icon: Clock }
    );
  };

  const statusInfo = getStatusText(order.status);
  const StatusIcon = statusInfo.icon;
  const canComplete = ["ACCEPTED", "IN_PROGRESS"].includes(order.status);

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="mb-4"
          >
            ← Geri
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Sipariş Detayı
              </h1>
              <p className="text-gray-600 mt-2">
                Sipariş #{order.id.slice(0, 8)}
              </p>
            </div>
            <Badge
              variant={statusInfo.variant}
              className="flex items-center gap-2 text-base px-4 py-2"
            >
              <StatusIcon className="w-4 h-4" />
              {statusInfo.text}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sipariş İçeriği</CardTitle>
              </CardHeader>
              <CardContent>
                {order.items && order.items.length > 0 ? (
                  <div className="space-y-3">
                    {order.items.map((item: any) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium">
                            {item.product?.name || "Ürün"}
                          </p>
                          <p className="text-sm text-gray-500">
                            Adet: {item.quantity} ×{" "}
                            {parseFloat(item.product?.price || 0).toFixed(2)} ₺
                          </p>
                        </div>
                        <p className="font-semibold">
                          {(
                            item.quantity * parseFloat(item.product?.price || 0)
                          ).toFixed(2)}{" "}
                          ₺
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Sipariş içeriği bulunamadı</p>
                )}
              </CardContent>
            </Card>

            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Müşteri Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">
                      {order.customer?.name || "Müşteri"}
                    </h3>
                    {order.customer?.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <a
                          href={`tel:${order.customer.phone}`}
                          className="hover:text-primary"
                        >
                          {order.customer.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Teslimat Adresi
                    </p>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <p className="font-medium">{order.addressText}</p>
                    </div>
                  </div>

                  {order.scheduledAt && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Planlanan Tarih & Saat
                      </p>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <p className="font-medium">
                          {new Date(order.scheduledAt).toLocaleString("tr-TR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sipariş Özeti</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ara Toplam</span>
                  <span className="font-medium">
                    {parseFloat(order.totalAmount || 0).toFixed(2)} ₺
                  </span>
                </div>
                {order.commissionFee && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Platform Komisyonu</span>
                    <span className="font-medium">
                      {parseFloat(order.commissionFee).toFixed(2)} ₺
                    </span>
                  </div>
                )}
                {order.vendorAmount && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sizin Payınız</span>
                    <span className="font-medium text-green-600">
                      {parseFloat(order.vendorAmount).toFixed(2)} ₺
                    </span>
                  </div>
                )}
                <div className="pt-3 border-t">
                  <div className="flex justify-between">
                    <span className="font-semibold">Toplam</span>
                    <span className="text-xl font-bold text-primary">
                      {parseFloat(order.totalAmount || 0).toFixed(2)} ₺
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">İşlemler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {canComplete && (
                  <Button
                    onClick={handleCompleteOrder}
                    disabled={updating}
                    className="w-full"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    {updating ? "Tamamlanıyor..." : "Siparişi Tamamla"}
                  </Button>
                )}

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    info("Mesajlaşma özelliği yakında eklenecek");
                  }}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Müşteriye Mesaj Gönder
                </Button>

                {order.customer?.phone && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href={`tel:${order.customer.phone}`}>
                      <Phone className="w-4 h-4 mr-2" />
                      Müşteriyi Ara
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Order Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Durum Geçmişi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                      ✓
                    </div>
                    <div className="flex-1 pt-0.5">
                      <p className="text-sm font-medium">Sipariş Oluşturuldu</p>
                      <p className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleString("tr-TR")}
                      </p>
                    </div>
                  </div>

                  {["ACCEPTED", "IN_PROGRESS", "COMPLETED"].includes(
                    order.status,
                  ) && (
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                        ✓
                      </div>
                      <div className="flex-1 pt-0.5">
                        <p className="text-sm font-medium">
                          Sipariş Kabul Edildi
                        </p>
                      </div>
                    </div>
                  )}

                  {["IN_PROGRESS", "COMPLETED"].includes(order.status) && (
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                        ✓
                      </div>
                      <div className="flex-1 pt-0.5">
                        <p className="text-sm font-medium">İş Başladı</p>
                      </div>
                    </div>
                  )}

                  {order.status === "COMPLETED" && order.completedAt && (
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center flex-shrink-0">
                        ✓
                      </div>
                      <div className="flex-1 pt-0.5">
                        <p className="text-sm font-medium">
                          Sipariş Tamamlandı
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(order.completedAt).toLocaleString("tr-TR")}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
