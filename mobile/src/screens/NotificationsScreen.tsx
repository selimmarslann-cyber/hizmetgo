import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";
import spacing from "../theme/spacing";
import typography from "../theme/typography";
import { useAppState } from "../store/AppStateContext";
import {
  fetchNotifications,
  markNotificationAsRead,
} from "../api/notifications";
import type { Notification } from "../types/domain";

const notificationIcons: Record<string, string> = {
  JOB_CREATED: "briefcase-outline",
  OFFER_RECEIVED: "briefcase-outline",
  OFFER_ACCEPTED: "checkmark-circle-outline",
  OFFER_REJECTED: "close-circle-outline",
  ORDER_ACCEPTED: "bag-outline",
  ORDER_COMPLETED: "checkmark-circle-outline",
  ORDER_CANCELLED: "close-circle-outline",
  REVIEW_RECEIVED: "star-outline",
  REFERRAL_REWARD: "gift-outline",
  PAYOUT_APPROVED: "cash-outline",
  PAYOUT_REJECTED: "alert-circle-outline",
  PAYOUT_PAID: "cash-outline",
  GENERAL: "notifications-outline",
};

export default function NotificationsScreen() {
  const navigation = useNavigation();
  const { currentUser, authToken } = useAppState();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [markingAsRead, setMarkingAsRead] = useState<string | null>(null);

  const loadNotifications = useCallback(async () => {
    if (!authToken) return;

    try {
      setLoading(true);
      const isRead = filter === "all" ? undefined : filter === "read";
      const response = await fetchNotifications(authToken, {
        limit: 50,
        isRead,
      });
      setNotifications(response.notifications || []);
    } catch (error: any) {
      console.error("Notifications load error:", error);
      Alert.alert("Hata", "Bildirimler yüklenemedi");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [authToken, filter]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadNotifications();
  }, [loadNotifications]);

  const handleMarkAsRead = async (notificationId: string) => {
    if (!authToken) return;

    try {
      setMarkingAsRead(notificationId);
      await markNotificationAsRead(notificationId, true, authToken);
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === notificationId ? { ...notif, isRead: true } : notif,
        ),
      );
    } catch (error: any) {
      console.error("Mark as read error:", error);
      Alert.alert("Hata", "Bildirim okundu olarak işaretlenemedi");
    } finally {
      setMarkingAsRead(null);
    }
  };

  const handleMarkAllAsRead = async () => {
    if (!authToken) return;

    try {
      const unreadNotifications = notifications.filter((n) => !n.isRead);
      await Promise.all(
        unreadNotifications.map((notif) =>
          markNotificationAsRead(notif.id, true, authToken),
        ),
      );
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, isRead: true })),
      );
      Alert.alert("Başarılı", "Tüm bildirimler okundu olarak işaretlendi");
    } catch (error: any) {
      console.error("Mark all as read error:", error);
      Alert.alert("Hata", "Bir hata oluştu");
    }
  };

  const handleNotificationPress = (notification: Notification) => {
    if (!notification.isRead) {
      handleMarkAsRead(notification.id);
    }

    // Navigate based on notification type
    const data = notification.data as any;
    if (data?.orderId) {
      // Navigate to order detail
      // navigation.navigate('OrderDetail', { orderId: data.orderId })
    } else if (data?.jobId || data?.instantJobId) {
      // Navigate to job detail
      // navigation.navigate('JobDetail', { jobId: data.jobId || data.instantJobId })
    } else if (data?.payoutRequestId) {
      // Navigate to wallet
      // navigation.navigate('Wallet')
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  if (!currentUser) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={colors.textDark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Bildirimler</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons
            name="notifications-off-outline"
            size={64}
            color={colors.textMuted}
          />
          <Text style={styles.emptyTitle}>Giriş Yapmalısınız</Text>
          <Text style={styles.emptyText}>
            Bildirimleri görmek için giriş yapmalısınız
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textDark} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Bildirimler</Text>
          {unreadCount > 0 && (
            <Text style={styles.headerSubtitle}>{unreadCount} okunmamış</Text>
          )}
        </View>
        <TouchableOpacity
          onPress={handleMarkAllAsRead}
          disabled={unreadCount === 0}
          style={[
            styles.markAllButton,
            unreadCount === 0 && styles.markAllButtonDisabled,
          ]}
        >
          <Ionicons
            name="checkmark-done"
            size={20}
            color={unreadCount === 0 ? colors.textMuted : colors.primary}
          />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "all" && styles.filterButtonActive,
          ]}
          onPress={() => setFilter("all")}
        >
          <Text
            style={[
              styles.filterButtonText,
              filter === "all" && styles.filterButtonTextActive,
            ]}
          >
            Tümü
          </Text>
          {notifications.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notifications.length}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "unread" && styles.filterButtonActive,
          ]}
          onPress={() => setFilter("unread")}
        >
          <Text
            style={[
              styles.filterButtonText,
              filter === "unread" && styles.filterButtonTextActive,
            ]}
          >
            Okunmamış
          </Text>
          {unreadCount > 0 && (
            <View style={[styles.badge, styles.badgeDanger]}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "read" && styles.filterButtonActive,
          ]}
          onPress={() => setFilter("read")}
        >
          <Text
            style={[
              styles.filterButtonText,
              filter === "read" && styles.filterButtonTextActive,
            ]}
          >
            Okunmuş
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Yükleniyor...</Text>
          </View>
        ) : notifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="notifications-outline"
              size={64}
              color={colors.textMuted}
            />
            <Text style={styles.emptyTitle}>Henüz bildirim yok</Text>
            <Text style={styles.emptyText}>
              Yeni bildirimler burada görünecek
            </Text>
          </View>
        ) : (
          notifications.map((notification) => {
            const iconName =
              notificationIcons[notification.type] || "notifications-outline";
            const isUnread = !notification.isRead;

            return (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationCard,
                  isUnread && styles.notificationCardUnread,
                ]}
                onPress={() => handleNotificationPress(notification)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.iconContainer,
                    isUnread && styles.iconContainerUnread,
                  ]}
                >
                  <Ionicons
                    name={iconName as any}
                    size={24}
                    color={isUnread ? colors.primary : colors.textMuted}
                  />
                </View>
                <View style={styles.notificationContent}>
                  <View style={styles.notificationHeader}>
                    <Text
                      style={[
                        styles.notificationTitle,
                        !isUnread && styles.notificationTitleRead,
                      ]}
                    >
                      {notification.title}
                    </Text>
                    {isUnread && <View style={styles.unreadDot} />}
                  </View>
                  <Text style={styles.notificationBody} numberOfLines={2}>
                    {notification.body}
                  </Text>
                  <Text style={styles.notificationTime}>
                    {new Date(notification.createdAt).toLocaleString("tr-TR", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </View>
                {isUnread && (
                  <TouchableOpacity
                    style={styles.markReadButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      handleMarkAsRead(notification.id);
                    }}
                    disabled={markingAsRead === notification.id}
                  >
                    {markingAsRead === notification.id ? (
                      <View style={styles.spinner} />
                    ) : (
                      <Ionicons
                        name="checkmark-circle-outline"
                        size={20}
                        color={colors.textMuted}
                      />
                    )}
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.cardBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    ...typography.h2,
    fontSize: 20,
    color: colors.textDark,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  markAllButton: {
    padding: spacing.xs,
  },
  markAllButtonDisabled: {
    opacity: 0.5,
  },
  placeholder: {
    width: 40,
  },
  filters: {
    flexDirection: "row",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.cardBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  filterButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    backgroundColor: colors.background,
    gap: spacing.xs,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textDark,
  },
  filterButtonTextActive: {
    color: colors.cardBg,
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  badgeDanger: {
    backgroundColor: "#EF4444",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.cardBg,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  loadingContainer: {
    padding: spacing.xl,
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: colors.textMuted,
  },
  emptyContainer: {
    padding: spacing.xl * 2,
    alignItems: "center",
  },
  emptyTitle: {
    ...typography.h3,
    fontSize: 18,
    color: colors.textDark,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: "center",
  },
  notificationCard: {
    flexDirection: "row",
    backgroundColor: colors.cardBg,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  notificationCardUnread: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    backgroundColor: colors.cardBg,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  iconContainerUnread: {
    backgroundColor: colors.primary + "15",
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textDark,
    flex: 1,
  },
  notificationTitleRead: {
    color: colors.textMuted,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginLeft: spacing.xs,
  },
  notificationBody: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.xs,
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    color: colors.textMuted,
  },
  markReadButton: {
    padding: spacing.xs,
    marginLeft: spacing.sm,
  },
  spinner: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderColor: colors.primary,
    borderTopColor: "transparent",
    borderRadius: 8,
  },
});
