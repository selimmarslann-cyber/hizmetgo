import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";
import spacing from "../theme/spacing";
import typography from "../theme/typography";
import { useAppState } from "../store/AppStateContext";
import { acceptOrder, rejectOrder, completeOrder } from "../api/orders";
import { request } from "../api/client";
import type { Order } from "../types/domain";

const statusMap: Record<string, { text: string; color: string }> = {
  PENDING_CONFIRMATION: { text: "Beklemede", color: "#F59E0B" },
  ACCEPTED: { text: "Kabul Edildi", color: "#10B981" },
  IN_PROGRESS: { text: "Devam Ediyor", color: "#3B82F6" },
  COMPLETED: { text: "Tamamlandı", color: "#10B981" },
  CANCELLED_BY_CUSTOMER: { text: "İptal Edildi", color: "#EF4444" },
  CANCELLED_BY_PROVIDER: { text: "İptal Edildi", color: "#EF4444" },
};

export default function OrderDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { orderId } = (route.params as any) || {};
  const { currentUser, authToken } = useAppState();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const loadOrder = useCallback(async () => {
    if (!authToken || !orderId) return;

    try {
      setLoading(true);
      const response = await request<{ order: Order }>(
        `/api/orders/${orderId}`,
        {
          method: "GET",
          authToken,
        },
      );
      setOrder(response.order);
    } catch (error: any) {
      console.error("Order load error:", error);
      Alert.alert("Hata", "Sipariş yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, [authToken, orderId]);

  useEffect(() => {
    loadOrder();
  }, [loadOrder]);

  const handleAccept = async () => {
    if (!authToken || !orderId) return;

    Alert.alert(
      "Siparişi Kabul Et",
      "Bu siparişi kabul etmek istediğinize emin misiniz?",
      [
        { text: "İptal", style: "cancel" },
        {
          text: "Kabul Et",
          onPress: async () => {
            try {
              setActionLoading(true);
              await acceptOrder(orderId, authToken);
              Alert.alert("Başarılı", "Sipariş kabul edildi");
              loadOrder();
            } catch (error: any) {
              Alert.alert("Hata", "Sipariş kabul edilemedi");
            } finally {
              setActionLoading(false);
            }
          },
        },
      ],
    );
  };

  const handleReject = async () => {
    if (!authToken || !orderId) return;

    Alert.alert(
      "Siparişi Reddet",
      "Bu siparişi reddetmek istediğinize emin misiniz?",
      [
        { text: "İptal", style: "cancel" },
        {
          text: "Reddet",
          style: "destructive",
          onPress: async () => {
            try {
              setActionLoading(true);
              await rejectOrder(orderId, authToken);
              Alert.alert("Başarılı", "Sipariş reddedildi");
              loadOrder();
            } catch (error: any) {
              Alert.alert("Hata", "Sipariş reddedilemedi");
            } finally {
              setActionLoading(false);
            }
          },
        },
      ],
    );
  };

  const handleComplete = async () => {
    if (!authToken || !orderId) return;

    Alert.alert(
      "Siparişi Tamamla",
      "Bu siparişi tamamlandı olarak işaretlemek istediğinize emin misiniz?",
      [
        { text: "İptal", style: "cancel" },
        {
          text: "Tamamla",
          onPress: async () => {
            try {
              setActionLoading(true);
              await completeOrder(orderId, authToken);
              Alert.alert("Başarılı", "Sipariş tamamlandı");
              loadOrder();
            } catch (error: any) {
              Alert.alert("Hata", "Sipariş tamamlanamadı");
            } finally {
              setActionLoading(false);
            }
          },
        },
      ],
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Yükleniyor...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!order) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={colors.textDark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sipariş Detayı</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons
            name="document-outline"
            size={64}
            color={colors.textMuted}
          />
          <Text style={styles.emptyTitle}>Sipariş Bulunamadı</Text>
        </View>
      </SafeAreaView>
    );
  }

  const status = statusMap[order.status] || {
    text: order.status,
    color: colors.textMuted,
  };
  const isVendor = currentUser?.role === "vendor";
  const canAccept = isVendor && order.status === "PENDING_CONFIRMATION";
  const canReject =
    isVendor && ["PENDING_CONFIRMATION", "ACCEPTED"].includes(order.status);
  const canComplete = isVendor && order.status === "ACCEPTED";
  const canChat =
    order.status !== "CANCELLED_BY_CUSTOMER" &&
    order.status !== "CANCELLED_BY_PROVIDER";

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
        <Text style={styles.headerTitle}>Sipariş Detayı</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Badge */}
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: status.color + "20" },
            ]}
          >
            <Text style={[styles.statusText, { color: status.color }]}>
              {status.text}
            </Text>
          </View>
        </View>

        {/* Order Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sipariş Bilgileri</Text>
          <View style={styles.infoRow}>
            <Ionicons
              name="receipt-outline"
              size={20}
              color={colors.textMuted}
            />
            <Text style={styles.infoLabel}>Sipariş No:</Text>
            <Text style={styles.infoValue}>
              #{order.id.slice(-8).toUpperCase()}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons
              name="storefront-outline"
              size={20}
              color={colors.textMuted}
            />
            <Text style={styles.infoLabel}>İşletme:</Text>
            <Text style={styles.infoValue}>
              {order.business?.name || "İşletme"}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons
              name="location-outline"
              size={20}
              color={colors.textMuted}
            />
            <Text style={styles.infoLabel}>Adres:</Text>
            <Text style={styles.infoValue}>{order.addressText}</Text>
          </View>
          {order.scheduledAt && (
            <View style={styles.infoRow}>
              <Ionicons
                name="calendar-outline"
                size={20}
                color={colors.textMuted}
              />
              <Text style={styles.infoLabel}>Tarih:</Text>
              <Text style={styles.infoValue}>
                {new Date(order.scheduledAt).toLocaleString("tr-TR")}
              </Text>
            </View>
          )}
        </View>

        {/* Items */}
        {order.items && order.items.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Ürünler</Text>
            {order.items.map((item: any) => (
              <View key={item.id} style={styles.itemRow}>
                <Text style={styles.itemName}>
                  {item.product?.name || "Ürün"} x {item.quantity}
                </Text>
                <Text style={styles.itemPrice}>
                  {Number(item.totalPrice).toLocaleString("tr-TR")} ₺
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Total */}
        <View style={styles.card}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Toplam Tutar</Text>
            <Text style={styles.totalAmount}>
              {Number(order.totalAmount).toLocaleString("tr-TR")} ₺
            </Text>
          </View>
        </View>

        {/* Actions */}
        {isVendor && (
          <View style={styles.actionsContainer}>
            {canAccept && (
              <TouchableOpacity
                style={[styles.actionButton, styles.acceptButton]}
                onPress={handleAccept}
                disabled={actionLoading}
              >
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={colors.cardBg}
                />
                <Text style={styles.actionButtonText}>Kabul Et</Text>
              </TouchableOpacity>
            )}
            {canReject && (
              <TouchableOpacity
                style={[styles.actionButton, styles.rejectButton]}
                onPress={handleReject}
                disabled={actionLoading}
              >
                <Ionicons name="close-circle" size={20} color={colors.cardBg} />
                <Text style={styles.actionButtonText}>Reddet</Text>
              </TouchableOpacity>
            )}
            {canComplete && (
              <TouchableOpacity
                style={[styles.actionButton, styles.completeButton]}
                onPress={handleComplete}
                disabled={actionLoading}
              >
                <Ionicons
                  name="checkmark-done"
                  size={20}
                  color={colors.cardBg}
                />
                <Text style={styles.actionButtonText}>Tamamla</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Chat Button */}
        {canChat && (
          <TouchableOpacity
            style={styles.chatButton}
            onPress={() => {
              navigation.navigate("OrderChatScreen" as never, {
                orderId: order.id,
              });
            }}
          >
            <Ionicons
              name="chatbubbles-outline"
              size={20}
              color={colors.cardBg}
            />
            <Text style={styles.chatButtonText}>Mesajlaş</Text>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 16,
    color: colors.textMuted,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl * 2,
  },
  emptyTitle: {
    ...typography.h3,
    fontSize: 18,
    color: colors.textDark,
    marginTop: spacing.md,
  },
  statusContainer: {
    alignItems: "center",
    marginBottom: spacing.md,
  },
  statusBadge: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  card: {
    backgroundColor: colors.cardBg,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    ...typography.h3,
    fontSize: 18,
    color: colors.textDark,
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 14,
    color: colors.textDark,
    flex: 1,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemName: {
    fontSize: 14,
    color: colors.textDark,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textDark,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textDark,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.primary,
  },
  actionsContainer: {
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.md,
    borderRadius: 12,
    gap: spacing.sm,
  },
  acceptButton: {
    backgroundColor: "#10B981",
  },
  rejectButton: {
    backgroundColor: "#EF4444",
  },
  completeButton: {
    backgroundColor: colors.primary,
  },
  actionButtonText: {
    ...typography.button,
    color: colors.cardBg,
    fontSize: 16,
  },
  chatButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 12,
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  chatButtonText: {
    ...typography.button,
    color: colors.cardBg,
    fontSize: 16,
  },
});
