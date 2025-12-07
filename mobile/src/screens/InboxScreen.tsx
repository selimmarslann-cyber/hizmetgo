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
import { fetchInbox } from "../api/inbox";
import type { InboxItem } from "../api/inbox";

const typeIcons: Record<string, string> = {
  support: "help-circle-outline",
  order: "bag-outline",
  job: "briefcase-outline",
  lead: "flash-outline",
};

const typeLabels: Record<string, string> = {
  support: "Destek",
  order: "Sipariş",
  job: "İş Teklifi",
  lead: "Lead",
};

export default function InboxScreen() {
  const navigation = useNavigation();
  const { currentUser, authToken } = useAppState();
  const [items, setItems] = useState<InboxItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<
    "all" | "support" | "orders" | "jobs" | "unread"
  >("all");

  const loadInbox = useCallback(async () => {
    if (!authToken) return;

    try {
      setLoading(true);
      const response = await fetchInbox(authToken, filter);
      setItems(response.items || []);
    } catch (error: any) {
      console.error("Inbox load error:", error);
      Alert.alert("Hata", "Mesajlar yüklenemedi");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [authToken, filter]);

  useEffect(() => {
    loadInbox();

    // Poll for new messages every 30 seconds
    const interval = setInterval(() => {
      loadInbox();
    }, 30000);

    return () => clearInterval(interval);
  }, [loadInbox]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadInbox();
  }, [loadInbox]);

  const handleItemPress = (item: InboxItem) => {
    if (item.type === "support") {
      // Navigate to support chat
      // navigation.navigate('SupportChat', { ticketId: item.id })
    } else if (item.type === "order") {
      navigation.navigate("OrderChatScreen" as never, { orderId: item.id });
    } else if (item.type === "job" || item.type === "lead") {
      // Navigate to job detail
      // navigation.navigate('JobDetail', { jobId: item.id })
    }
  };

  const filteredItems = items.filter((item) => {
    if (filter === "unread") return item.unread;
    if (filter === "all") return true;
    if (filter === "orders") return item.type === "order";
    if (filter === "jobs") return item.type === "job" || item.type === "lead";
    if (filter === "support") return item.type === "support";
    return true;
  });

  const unreadCount = items.filter((item) => item.unread).length;

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
          <Text style={styles.headerTitle}>Gelen Kutusu</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons name="mail-outline" size={64} color={colors.textMuted} />
          <Text style={styles.emptyTitle}>Giriş Yapmalısınız</Text>
          <Text style={styles.emptyText}>
            Mesajlarınızı görmek için giriş yapmalısınız
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
          <Text style={styles.headerTitle}>Gelen Kutusu</Text>
          {unreadCount > 0 && (
            <Text style={styles.headerSubtitle}>{unreadCount} okunmamış</Text>
          )}
        </View>
        <View style={styles.placeholder} />
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersScroll}
        contentContainerStyle={styles.filtersContent}
      >
        <TouchableOpacity
          style={[
            styles.filterChip,
            filter === "all" && styles.filterChipActive,
          ]}
          onPress={() => setFilter("all")}
        >
          <Text
            style={[
              styles.filterChipText,
              filter === "all" && styles.filterChipTextActive,
            ]}
          >
            Tümü
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterChip,
            filter === "unread" && styles.filterChipActive,
          ]}
          onPress={() => setFilter("unread")}
        >
          <Text
            style={[
              styles.filterChipText,
              filter === "unread" && styles.filterChipTextActive,
            ]}
          >
            Okunmamış
          </Text>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterChip,
            filter === "orders" && styles.filterChipActive,
          ]}
          onPress={() => setFilter("orders")}
        >
          <Text
            style={[
              styles.filterChipText,
              filter === "orders" && styles.filterChipTextActive,
            ]}
          >
            Siparişler
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterChip,
            filter === "jobs" && styles.filterChipActive,
          ]}
          onPress={() => setFilter("jobs")}
        >
          <Text
            style={[
              styles.filterChipText,
              filter === "jobs" && styles.filterChipTextActive,
            ]}
          >
            İşler
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterChip,
            filter === "support" && styles.filterChipActive,
          ]}
          onPress={() => setFilter("support")}
        >
          <Text
            style={[
              styles.filterChipText,
              filter === "support" && styles.filterChipTextActive,
            ]}
          >
            Destek
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Items List */}
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
        ) : filteredItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="mail-outline" size={64} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>Henüz mesaj yok</Text>
            <Text style={styles.emptyText}>
              {filter === "all"
                ? "Henüz mesajınız bulunmuyor"
                : "Bu kategoride mesaj bulunmuyor"}
            </Text>
          </View>
        ) : (
          filteredItems.map((item) => {
            const iconName = typeIcons[item.type] || "mail-outline";
            const typeLabel = typeLabels[item.type] || "Mesaj";

            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.itemCard, item.unread && styles.itemCardUnread]}
                onPress={() => handleItemPress(item)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.iconContainer,
                    item.unread && styles.iconContainerUnread,
                  ]}
                >
                  <Ionicons
                    name={iconName as any}
                    size={24}
                    color={item.unread ? colors.primary : colors.textMuted}
                  />
                </View>
                <View style={styles.itemContent}>
                  <View style={styles.itemHeader}>
                    <View style={styles.itemHeaderLeft}>
                      <Text
                        style={[
                          styles.itemTitle,
                          !item.unread && styles.itemTitleRead,
                        ]}
                        numberOfLines={1}
                      >
                        {item.title}
                      </Text>
                      {item.unread && <View style={styles.unreadDot} />}
                    </View>
                    <Text style={styles.itemTime}>
                      {new Date(item.createdAt).toLocaleDateString("tr-TR", {
                        day: "numeric",
                        month: "short",
                      })}
                    </Text>
                  </View>
                  <Text style={styles.itemPreview} numberOfLines={2}>
                    {item.preview}
                  </Text>
                  <View style={styles.itemFooter}>
                    <View style={styles.typeBadge}>
                      <Text style={styles.typeBadgeText}>{typeLabel}</Text>
                    </View>
                    {item.sender && (
                      <Text style={styles.itemSender}>{item.sender}</Text>
                    )}
                  </View>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.textMuted}
                />
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
  placeholder: {
    width: 40,
  },
  filtersScroll: {
    maxHeight: 60,
    backgroundColor: colors.cardBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filtersContent: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textDark,
  },
  filterChipTextActive: {
    color: colors.cardBg,
  },
  badge: {
    backgroundColor: "#EF4444",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
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
  itemCard: {
    flexDirection: "row",
    backgroundColor: colors.cardBg,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    gap: spacing.md,
  },
  itemCardUnread: {
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
  },
  iconContainerUnread: {
    backgroundColor: colors.primary + "15",
  },
  itemContent: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },
  itemHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: spacing.xs,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textDark,
    flex: 1,
  },
  itemTitleRead: {
    color: colors.textMuted,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  itemTime: {
    fontSize: 12,
    color: colors.textMuted,
  },
  itemPreview: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.xs,
    lineHeight: 20,
  },
  itemFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  typeBadge: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 6,
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.textMuted,
    textTransform: "uppercase",
  },
  itemSender: {
    fontSize: 12,
    color: colors.textMuted,
  },
});
