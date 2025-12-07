"use client";
/**
 * Notification Center Page
 *
 * Comprehensive notification center with filtering, real-time updates
 */

import { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useToast } from "@/lib/hooks/useToast";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedLoadingLogo from "@/components/ui/AnimatedLoadingLogo";
import {
  AlertCircle,
  ArrowLeft,
  Bell,
  Briefcase,
  CheckCheck,
  CheckCircle2,
  DollarSign,
  Gift,
  RefreshCw,
  ShoppingBag,
  Star,
  X,
} from "lucide-react";


// Static generation'ı engelle
interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  body: string;
  data?: any;
  isRead: boolean;
  createdAt: string;
}

const notificationIcons: Record<string, any> = {
  JOB_CREATED: Briefcase,
  OFFER_RECEIVED: Briefcase,
  OFFER_ACCEPTED: CheckCircle2,
  OFFER_REJECTED: X,
  ORDER_ACCEPTED: ShoppingBag,
  ORDER_COMPLETED: CheckCircle2,
  ORDER_CANCELLED: X,
  REVIEW_RECEIVED: Star,
  REFERRAL_REWARD: Gift,
  PAYOUT_APPROVED: DollarSign,
  PAYOUT_REJECTED: AlertCircle,
  PAYOUT_PAID: DollarSign,
  GENERAL: Bell,
};

const notificationColors: Record<string, string> = {
  JOB_CREATED: "bg-blue-100 text-blue-600",
  OFFER_RECEIVED: "bg-green-100 text-green-600",
  OFFER_ACCEPTED: "bg-emerald-100 text-emerald-600",
  OFFER_REJECTED: "bg-red-100 text-red-600",
  ORDER_ACCEPTED: "bg-purple-100 text-purple-600",
  ORDER_COMPLETED: "bg-green-100 text-green-600",
  ORDER_CANCELLED: "bg-red-100 text-red-600",
  REVIEW_RECEIVED: "bg-yellow-100 text-yellow-600",
  REFERRAL_REWARD: "bg-orange-100 text-orange-600",
  PAYOUT_APPROVED: "bg-green-100 text-green-600",
  PAYOUT_REJECTED: "bg-red-100 text-red-600",
  PAYOUT_PAID: "bg-emerald-100 text-emerald-600",
  GENERAL: "bg-gray-100 text-gray-600",
};

export default function NotificationsPageClient() {
  const router = useRouter();
  const { error, success } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [markingAsRead, setMarkingAsRead] = useState<string | null>(null);

  const loadNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const isReadParam = filter === "all" ? undefined : filter === "read";
      const res = await fetch(
        `/api/notifications?limit=50${isReadParam !== undefined ? `&isRead=${isReadParam}` : ""}`,
        {
          credentials: "include",
        },
      );
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
      } else {
        error("Bildirimler yüklenemedi");
      }
    } catch (err) {
      console.error("Notifications load error:", err);
      error("Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  }, [filter, error]);

  useEffect(() => {
    loadNotifications();

    // Real-time updates via SSE
    const eventSource = new EventSource("/api/notifications/stream", {
      withCredentials: true,
    });

    eventSource.onmessage = () => {
      // Reload notifications when new ones arrive
      loadNotifications();
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [loadNotifications]);

  const markAsRead = async (notificationId: string) => {
    try {
      setMarkingAsRead(notificationId);
      const res = await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: notificationId, isRead: true }),
        credentials: "include",
      });

      if (res.ok) {
        setNotifications((prev) =>
          prev.map((notif) =>
            notif.id === notificationId ? { ...notif, isRead: true } : notif,
          ),
        );
      } else {
        error("Bildirim okundu olarak işaretlenemedi");
      }
    } catch (err) {
      console.error("Mark as read error:", err);
      error("Bir hata oluştu");
    } finally {
      setMarkingAsRead(null);
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter((n) => !n.isRead);
      await Promise.all(
        unreadNotifications.map((notif) =>
          fetch("/api/notifications", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: notif.id, isRead: true }),
            credentials: "include",
          }),
        ),
      );

      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, isRead: true })),
      );
      success("Tüm bildirimler okundu olarak işaretlendi");
    } catch (err) {
      console.error("Mark all as read error:", err);
      error("Bir hata oluştu");
    }
  };

  const getNotificationLink = (notification: Notification): string | null => {
    if (!notification.data) return null;

    const data = notification.data as any;

    if (data.orderId) {
      return `/orders/${data.orderId}`;
    }
    if (data.jobId || data.instantJobId) {
      return `/jobs/${data.jobId || data.instantJobId}`;
    }
    if (data.payoutRequestId) {
      return "/account/wallet";
    }

    return null;
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Bildirimler</h1>
              <p className="text-gray-600 mt-1">
                {unreadCount > 0
                  ? `${unreadCount} okunmamış bildirim`
                  : "Tüm bildirimler okundu"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadNotifications}
              disabled={loading}
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              Yenile
            </Button>
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <CheckCheck className="w-4 h-4 mr-2" />
                Tümünü Okundu İşaretle
              </Button>
            )}
          </div>
        </div>

        {/* Filters */}
        <Tabs
          value={filter}
          onValueChange={(v) => setFilter(v as any)}
          className="mb-6"
        >
          <TabsList>
            <TabsTrigger value="all">
              Tümü
              {notifications.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {notifications.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread">
              Okunmamış
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="read">
              Okunmuş
              {notifications.filter((n) => n.isRead).length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {notifications.filter((n) => n.isRead).length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Notifications List */}
        {loading ? (
          <div className="flex items-center justify-center py-12 min-h-[400px]">
            <AnimatedLoadingLogo />
          </div>
        ) : notifications.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">
                Henüz bildirim yok
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Yeni bildirimler burada görünecek
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {notifications.map((notification) => {
                const Icon = notificationIcons[notification.type] || Bell;
                const colorClass =
                  notificationColors[notification.type] ||
                  "bg-gray-100 text-gray-600";
                const link = getNotificationLink(notification);

                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        !notification.isRead
                          ? "border-l-4 border-l-[#FF6000] bg-white"
                          : "bg-gray-50"
                      }`}
                      onClick={() => {
                        if (!notification.isRead) {
                          markAsRead(notification.id);
                        }
                        if (link) {
                          router.push(link);
                        }
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}
                          >
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <h3
                                  className={`font-semibold text-sm ${
                                    !notification.isRead
                                      ? "text-gray-900"
                                      : "text-gray-600"
                                  }`}
                                >
                                  {notification.title}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                  {notification.body}
                                </p>
                                <p className="text-xs text-gray-400 mt-2">
                                  {new Date(
                                    notification.createdAt,
                                  ).toLocaleString("tr-TR", {
                                    day: "numeric",
                                    month: "short",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                {!notification.isRead && (
                                  <div className="w-2 h-2 rounded-full bg-[#FF6000] flex-shrink-0"></div>
                                )}
                                {!notification.isRead && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="p-1 h-auto"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      markAsRead(notification.id);
                                    }}
                                    disabled={markingAsRead === notification.id}
                                  >
                                    {markingAsRead === notification.id ? (
                                      <div className="w-4 h-4 border-2 border-[#FF6000] border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                      <CheckCircle2 className="w-4 h-4 text-gray-400" />
                                    )}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
