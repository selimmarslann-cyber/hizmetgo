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
import { fetchCustomerOrders, fetchBusinessOrders } from "../api/orders";
import type { Order } from "../types/domain";

const statusMap: Record<string, { text: string; color: string }> = {
  PENDING_CONFIRMATION: { text: "Beklemede", color: "#F59E0B" },
  ACCEPTED: { text: "Kabul Edildi", color: "#10B981" },
  IN_PROGRESS: { text: "Devam Ediyor", color: "#3B82F6" },
  COMPLETED: { text: "Tamamlandı", color: "#10B981" },
  CANCELLED_BY_CUSTOMER: { text: "İptal Edildi", color: "#EF4444" },
  CANCELLED_BY_PROVIDER: { text: "İptal Edildi", color: "#EF4444" },
};

export default function OrdersScreen() {
  const navigation = useNavigation();
  const { currentUser, authToken } = useAppState();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const loadOrders = useCallback(async () => {
    if (!authToken || !currentUser) return;

    try {
      setLoading(true);
      let response;
      if (currentUser.role === "customer") {
        response = await fetchCustomerOrders(currentUser.id, authToken);
      } else {
        // For vendors, we need businessId - for now use customer endpoint
        response = await fetchCustomerOrders(currentUser.id, authToken);
      }
      setOrders(response.orders || []);
    } catch (error: any) {
      console.error("Orders load error:", error);
      Alert.alert("Hata", "Siparişler yüklenemedi");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [authToken, currentUser]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadOrders();
  }, [loadOrders]);

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    if (filter === "active") {
      return ["PENDING_CONFIRMATION", "ACCEPTED", "IN_PROGRESS"].includes(
        order.status,
      );
    }
    if (filter === "completed") {
      return order.status === "COMPLETED";
    }
    return true;
  });

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
          <Text style={styles.headerTitle}>Siparişlerim</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons
            name="document-outline"
            size={64}
            color={colors.textMuted}
          />
          <Text style={styles.emptyTitle}>Giriş Yapmalısınız</Text>
          <Text style={styles.emptyText}>
            Siparişlerinizi görmek için giriş yapmalısınız
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
        <Text style={styles.headerTitle}>
          {currentUser.role === "customer"
            ? "Siparişlerim"
            : "Gelen Siparişler"}
        </Text>
        <View style={styles.placeholder} />
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
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "active" && styles.filterButtonActive,
          ]}
          onPress={() => setFilter("active")}
        >
          <Text
            style={[
              styles.filterButtonText,
              filter === "active" && styles.filterButtonTextActive,
            ]}
          >
            Aktif
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "completed" && styles.filterButtonActive,
          ]}
          onPress={() => setFilter("completed")}
        >
          <Text
            style={[
              styles.filterButtonText,
              filter === "completed" && styles.filterButtonTextActive,
            ]}
          >
            Tamamlanan
          </Text>
        </TouchableOpacity>
      </View>

      {/* Orders List */}
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
        ) : filteredOrders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="document-outline"
              size={64}
              color={colors.textMuted}
            />
            <Text style={styles.emptyTitle}>Henüz sipariş yok</Text>
            <Text style={styles.emptyText}>
              {filter === "all"
                ? "Henüz siparişiniz bulunmuyor"
                : "Bu kategoride sipariş bulunmuyor"}
            </Text>
          </View>
        ) : (
          filteredOrders.map((order) => {
            const status = statusMap[order.status] || {
              text: order.status,
              color: colors.textMuted,
            };

            return (
              <TouchableOpacity
                key={order.id}
                style={styles.orderCard}
                onPress={() => {
                  navigation.navigate("OrderDetailScreen" as never, {
                    orderId: order.id,
                  });
                }}
                activeOpacity={0.7}
              >
                <View style={styles.orderHeader}>
                  <View style={styles.orderHeaderLeft}>
                    <Text style={styles.orderId}>
                      #{order.id.slice(-8).toUpperCase()}
                    </Text>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: status.color + "20" },
                      ]}
                    >
                      <Text
                        style={[styles.statusText, { color: status.color }]}
                      >
                        {status.text}
                      </Text>
                    </View>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={colors.textMuted}
                  />
                </View>
                <View style={styles.orderBody}>
                  <View style={styles.orderRow}>
                    <Ionicons
                      name="storefront-outline"
                      size={16}
                      color={colors.textMuted}
                    />
                    <Text style={styles.orderText} numberOfLines={1}>
                      {order.business?.name || "İşletme"}
                    </Text>
                  </View>
                  <View style={styles.orderRow}>
                    <Ionicons
                      name="cash-outline"
                      size={16}
                      color={colors.textMuted}
                    />
                    <Text style={styles.orderAmount}>
                      {Number(order.totalAmount).toLocaleString("tr-TR")} ₺
                    </Text>
                  </View>
                  <View style={styles.orderRow}>
                    <Ionicons
                      name="calendar-outline"
                      size={16}
                      color={colors.textMuted}
                    />
                    <Text style={styles.orderDate}>
                      {new Date(order.createdAt).toLocaleDateString("tr-TR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </Text>
                  </View>
                </View>
                {order.status === "COMPLETED" && !order.review && (
                  <View style={styles.reviewBadge}>
                    <Ionicons
                      name="star-outline"
                      size={14}
                      color={colors.primary}
                    />
                    <Text style={styles.reviewBadgeText}>
                      Değerlendirme Yap
                    </Text>
                  </View>
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
  headerTitle: {
    ...typography.h2,
    fontSize: 20,
    color: colors.textDark,
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
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    backgroundColor: colors.background,
    alignItems: "center",
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
  orderCard: {
    backgroundColor: colors.cardBg,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  orderHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  orderHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    flex: 1,
  },
  orderId: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textDark,
    letterSpacing: 0.5,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  orderBody: {
    gap: spacing.sm,
  },
  orderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  orderText: {
    fontSize: 14,
    color: colors.textDark,
    flex: 1,
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
  },
  orderDate: {
    fontSize: 12,
    color: colors.textMuted,
  },
  reviewBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  reviewBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
  },
});
