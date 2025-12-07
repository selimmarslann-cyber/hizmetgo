"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Bell, Building2, CheckCircle2, Clock, MapPin, MessageSquare, Phone, User, XCircle } from "lucide-react";
import { useToast } from "@/lib/hooks/useToast";
import { useConfirmDialog } from "@/lib/hooks/useConfirmDialog";
import { useNotificationStream } from "@/lib/hooks/useNotificationStream";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AnimatedLoadingLogo from "@/components/ui/AnimatedLoadingLogo";



// Static generation'ı engelle
export default function BusinessJobsPageClient() {
  const router = useRouter();
  const { success, error } = useToast();
  const { confirm: confirmDialog, ConfirmDialog } = useConfirmDialog();
  const { unreadCount } = useNotificationStream(true); // Real-time bildirimler
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"new" | "active" | "past">("new");
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const loadOrders = useCallback(async () => {
    try {
      const userRes = await fetch("/api/auth/me", { credentials: "include" });
      if (!userRes.ok) {
        router.push("/auth/business-login");
        return;
      }
      const userData = await userRes.json();

      const businessRes = await fetch(
        `/api/businesses/owner/${userData.user.id}`,
        {
          credentials: "include",
        },
      );
      if (!businessRes.ok) {
        router.push("/business/not-registered");
        return;
      }
      const businessData = await businessRes.json();

      const ordersRes = await fetch(`/api/orders/business/${businessData.id}`, {
        credentials: "include",
      });
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOrders(ordersData);
      }
    } catch (err) {
      console.error("Siparişler yüklenemedi:", err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleAccept = async () => {
    if (!selectedOrder) return;

    try {
      const res = await fetch(`/api/orders/${selectedOrder.id}/accept`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setAcceptDialogOpen(false);
        setSelectedOrder(null);
        loadOrders();
        success("Sipariş başarıyla kabul edildi");
      } else {
        const data = await res.json();
        error(data.error || "Sipariş kabul edilemedi");
      }
    } catch (err) {
      error("Bir hata oluştu");
    }
  };

  const handleReject = async (orderId: string) => {
    const confirmed = await confirmDialog({
      description: "Bu işi reddetmek istediğine emin misin?",
      variant: "destructive",
      confirmText: "Reddet",
      cancelText: "İptal",
    });
    if (!confirmed) {
      return;
    }

    try {
      const res = await fetch(`/api/orders/${orderId}/reject`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        loadOrders();
        success("Sipariş reddedildi");
      } else {
        const data = await res.json();
        error(data.error || "Sipariş reddedilemedi");
      }
    } catch (err) {
      error("Bir hata oluştu");
    }
  };

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
        IN_PROGRESS: { text: "Devam Ediyor", variant: "default", icon: Clock },
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

  const newOrders = orders.filter((o) => o.status === "PENDING_CONFIRMATION");
  const activeOrders = orders.filter((o) =>
    ["ACCEPTED", "IN_PROGRESS"].includes(o.status),
  );
  const pastOrders = orders.filter((o) =>
    ["COMPLETED", "CANCELLED_BY_CUSTOMER", "CANCELLED_BY_PROVIDER"].includes(
      o.status,
    ),
  );

  const displayOrders =
    activeTab === "new"
      ? newOrders
      : activeTab === "active"
        ? activeOrders
        : pastOrders;

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gelen İşler</h1>
              <p className="text-gray-600 mt-2">
                Siparişlerinizi yönetin ve müşterilerinize hizmet verin
              </p>
            </div>
            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <Button variant="outline" className="relative">
                  <Bell className="w-4 h-4 mr-2" />
                  Bildirimler
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                  >
                    {unreadCount}
                  </Badge>
                </Button>
              )}
              <Link href="/business/jobs/available">
                <Button variant="outline">
                  <Building2 className="w-4 h-4 mr-2" />
                  Uygun İşlere Teklif Ver
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as any)}
          className="mb-6"
        >
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="new">
              Yeni İstekler
              {newOrders.length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {newOrders.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="active">Aktif</TabsTrigger>
            <TabsTrigger value="past">Geçmiş</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Uyarı - Yeni İstekler */}
        {activeTab === "new" && newOrders.length > 0 && (
          <Alert className="mb-6 border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-900">
              <strong>Önemli:</strong> 2 saat içinde cevap vermezseniz,
              hesabınız otomatik olarak offline'a alınır.
            </AlertDescription>
          </Alert>
        )}

        {/* Orders List */}
        {loading ? (
          <div className="flex items-center justify-center py-12 min-h-[400px]">
            <AnimatedLoadingLogo />
          </div>
        ) : displayOrders.length === 0 ? (
          <Card className="border-2 border-dashed">
            <CardContent className="py-16 text-center">
              <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-700 mb-2">
                {activeTab === "new"
                  ? "Yeni iş isteği yok"
                  : activeTab === "active"
                    ? "Aktif işiniz yok"
                    : "Geçmiş işiniz yok"}
              </p>
              <p className="text-sm text-gray-500">
                {activeTab === "new"
                  ? "Yeni siparişler geldiğinde burada görünecek"
                  : "Tamamlanan işleriniz burada görünecek"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {displayOrders.map((order, index) => {
              const statusInfo = getStatusText(order.status);
              const StatusIcon = statusInfo.icon;
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-lg transition-all border-l-4 border-l-primary">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge
                              variant={statusInfo.variant}
                              className="flex items-center gap-1"
                            >
                              <StatusIcon className="w-3 h-3" />
                              {statusInfo.text}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {new Date(order.createdAt).toLocaleDateString(
                                "tr-TR",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}
                            </span>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="font-semibold text-gray-900">
                                {order.customer?.name || "Müşteri"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span>{order.addressText}</span>
                            </div>
                            {order.scheduledAt && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock className="w-4 h-4" />
                                <span>
                                  {new Date(order.scheduledAt).toLocaleString(
                                    "tr-TR",
                                    {
                                      day: "numeric",
                                      month: "long",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    },
                                  )}
                                </span>
                              </div>
                            )}
                            {order.totalAmount && (
                              <div className="mt-3">
                                <span className="text-2xl font-bold text-primary">
                                  {parseFloat(order.totalAmount).toFixed(2)} ₺
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 pt-4 border-t">
                        {order.status === "PENDING_CONFIRMATION" && (
                          <>
                            <Button
                              variant="default"
                              className="flex-1"
                              onClick={() => {
                                setSelectedOrder(order);
                                setAcceptDialogOpen(true);
                              }}
                            >
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Kabul Et
                            </Button>
                            <Button
                              variant="destructive"
                              className="flex-1"
                              onClick={() => handleReject(order.id)}
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Reddet
                            </Button>
                          </>
                        )}
                        {order.status !== "PENDING_CONFIRMATION" && (
                          <Link
                            href={`/business/jobs/${order.id}`}
                            className="flex-1"
                          >
                            <Button variant="outline" className="w-full">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Detayları Gör
                            </Button>
                          </Link>
                        )}
                        <Button variant="outline" size="icon">
                          <Phone className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Accept Dialog */}
      <Dialog open={acceptDialogOpen} onOpenChange={setAcceptDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bu işi kabul etmek istediğine emin misin?</DialogTitle>
            <DialogDescription>
              Bu işi kabul edip mesaj attığında, müşteriden ödeme çekilir ve iş
              sana atanır.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAcceptDialogOpen(false)}
            >
              İptal
            </Button>
            <Button onClick={handleAccept}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Onayla ve Kabul Et
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {ConfirmDialog}
    </div>
  );
}
