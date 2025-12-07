import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import FooterLegal from "../components/FooterLegal";
import colors from "../theme/colors";
import spacing from "../theme/spacing";
import typography from "../theme/typography";
import { useAppState } from "../store/AppStateContext";
import { Alert } from "react-native";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { currentUser, orders, vendors } = useAppState();

  const userOrders = currentUser
    ? orders.filter((o) => o.customerId === currentUser.id)
    : [];
  const vendorOrders =
    currentUser?.role === "vendor"
      ? orders.filter((o) => {
          const vendor = vendors.find((v) => v.id === o.vendorId);
          return vendor && currentUser.id === vendor.id;
        })
      : [];

  if (!currentUser) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.loginPrompt}>
            <Ionicons
              name="person-circle-outline"
              size={80}
              color={colors.textMuted}
            />
            <Text style={styles.loginPromptTitle}>Giriş Yap / Kayıt Ol</Text>
            <Text style={styles.loginPromptDescription}>
              Profil özelliklerini kullanmak için giriş yapmalısınız
            </Text>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate("UserRegister" as never)}
            >
              <Text style={styles.loginButtonText}>Giriş Yap / Kayıt Ol</Text>
            </TouchableOpacity>
          </View>
          <FooterLegal />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            {userData.avatar ? (
              <Image
                source={{ uri: userData.avatar }}
                style={styles.avatar}
                accessibilityLabel={userData.name || "Profil avatarı"}
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={40} color={colors.textMuted} />
              </View>
            )}
          </View>
          <Text style={styles.userName}>
            {currentUser.name} (
            {currentUser.role === "vendor" ? "Esnaf" : "Kullanıcı"})
          </Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              // TODO: Navigate to edit profile screen when created
              Alert.alert(
                "Yakında",
                "Profil düzenleme özelliği yakında eklenecek",
              );
            }}
          >
            <Text style={styles.editButtonText}>Profili Düzenle</Text>
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={styles.section}>
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={20} color={colors.textMuted} />
            <Text style={styles.infoText}>{currentUser.phone}</Text>
          </View>
          {currentUser.neighborhood && (
            <View style={styles.infoRow}>
              <Ionicons
                name="location-outline"
                size={20}
                color={colors.textMuted}
              />
              <Text style={styles.infoText}>{currentUser.neighborhood}</Text>
            </View>
          )}
        </View>

        {/* Order History */}
        {currentUser.role === "customer" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sipariş Geçmişi</Text>
            {userOrders.length > 0 ? (
              userOrders.map((order) => {
                const vendor = vendors.find((v) => v.id === order.vendorId);
                return (
                  <View key={order.id} style={styles.orderCard}>
                    <View style={styles.orderHeader}>
                      <Text style={styles.orderVendorName}>
                        {vendor?.businessName || "İşletme"}
                      </Text>
                      <Text style={styles.orderStatus}>{order.status}</Text>
                    </View>
                    <Text style={styles.orderDescription} numberOfLines={2}>
                      {order.description}
                    </Text>
                    <Text style={styles.orderDate}>
                      {new Date(order.createdAt).toLocaleDateString("tr-TR")} -{" "}
                      {order.scheduledFor}
                    </Text>
                  </View>
                );
              })
            ) : (
              <Text style={styles.emptyText}>Henüz sipariş yok</Text>
            )}
          </View>
        )}

        {/* Vendor Orders */}
        {currentUser.role === "vendor" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Aldığın Talepler</Text>
            {vendorOrders.length > 0 ? (
              vendorOrders.map((order) => (
                <View key={order.id} style={styles.orderCard}>
                  <View style={styles.orderHeader}>
                    <Text style={styles.orderVendorName}>
                      Sipariş #{order.id.slice(-6)}
                    </Text>
                    <Text style={styles.orderStatus}>{order.status}</Text>
                  </View>
                  <Text style={styles.orderDescription} numberOfLines={2}>
                    {order.description}
                  </Text>
                  <Text style={styles.orderDate}>
                    {new Date(order.createdAt).toLocaleDateString("tr-TR")} -{" "}
                    {order.scheduledFor}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>Henüz talep yok</Text>
            )}
          </View>
        )}

        {/* Wallet */}
        <View style={styles.section}>
          <View style={styles.walletCard}>
            <View style={styles.walletHeader}>
              <Ionicons
                name="wallet-outline"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.walletTitle}>Cüzdan Bakiyesi</Text>
            </View>
            <Text style={styles.walletBalance}>0 ₺</Text>
            <TouchableOpacity style={styles.walletButton}>
              <Text style={styles.walletButtonText}>Para Yükle</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Referral Code */}
        <View style={styles.section}>
          <View style={styles.referralCard}>
            <Text style={styles.referralLabel}>Referans Kodu</Text>
            <View style={styles.referralCodeContainer}>
              <Text style={styles.referralCode}>
                MAH{currentUser.id.slice(-5).toUpperCase()}
              </Text>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={() => {
                  // Copy to clipboard
                  Alert.alert("Kopyalandı", "Referans kodu panoya kopyalandı");
                }}
              >
                <Ionicons
                  name="copy-outline"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.copyButtonText}>Kopyala</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.referralLinkButton}
              onPress={() => {
                navigation.navigate("ReferralScreen" as never);
              }}
            >
              <Ionicons name="gift-outline" size={20} color={colors.primary} />
              <Text style={styles.referralLinkButtonText}>
                Sıfır Yatırımla Ortak Ol
              </Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Orders */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionItem}
            onPress={() => {
              navigation.navigate("OrdersScreen" as never);
            }}
          >
            <View style={styles.sectionItemLeft}>
              <Ionicons
                name="document-text-outline"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.sectionItemText}>Siparişlerim</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        </View>

        {/* Inbox */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionItem}
            onPress={() => {
              navigation.navigate("InboxScreen" as never);
            }}
          >
            <View style={styles.sectionItemLeft}>
              <Ionicons name="mail-outline" size={24} color={colors.primary} />
              <Text style={styles.sectionItemText}>Gelen Kutusu</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionItem}
            onPress={() => {
              navigation.navigate("NotificationsScreen" as never);
            }}
          >
            <View style={styles.sectionItemLeft}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.sectionItemText}>Bildirimler</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        </View>

        {/* Earnings */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionItem}
            onPress={() => {
              // TODO: Navigate to earnings screen when created
              Alert.alert("Yakında", "Kazanç ekranı yakında eklenecek");
            }}
          >
            <View style={styles.sectionItemLeft}>
              <Ionicons name="cash-outline" size={24} color={colors.primary} />
              <Text style={styles.sectionItemText}>Kazanç Ekranı</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        </View>

        {/* Become Vendor */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.vendorButton}
            onPress={() => {
              navigation.navigate("VendorRegister" as never);
            }}
          >
            <Ionicons
              name="storefront-outline"
              size={24}
              color={colors.cardBg}
            />
            <Text style={styles.vendorButtonText}>Esnaf Olmak İstiyorum</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Legal */}
        <FooterLegal />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: spacing.xl,
  },
  profileHeader: {
    alignItems: "center",
    padding: spacing.xl,
    backgroundColor: colors.cardBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatarContainer: {
    marginBottom: spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.border,
  },
  userName: {
    ...typography.h2,
    fontSize: 24,
    color: colors.textDark,
    marginBottom: spacing.md,
  },
  editButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  editButtonText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
  },
  section: {
    marginTop: spacing.md,
    backgroundColor: colors.cardBg,
    padding: spacing.md,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  infoText: {
    fontSize: 16,
    color: colors.textDark,
  },
  sectionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
  },
  sectionItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  sectionItemText: {
    fontSize: 16,
    color: colors.textDark,
    fontWeight: "500",
  },
  walletCard: {
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  walletHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  walletTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textDark,
  },
  walletBalance: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: spacing.md,
  },
  walletButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    alignItems: "center",
  },
  walletButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.cardBg,
  },
  referralCard: {
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  referralLabel: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  referralCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  referralCode: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primary,
    letterSpacing: 2,
  },
  copyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.primary + "15",
  },
  copyButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
  referralLinkButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.primary + "15",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  referralLinkButtonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
    marginLeft: spacing.sm,
  },
  vendorButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 12,
    gap: spacing.sm,
  },
  vendorButtonText: {
    ...typography.button,
    color: colors.cardBg,
    fontSize: 16,
  },
  loginPrompt: {
    alignItems: "center",
    padding: spacing.xl,
    marginTop: spacing.xl,
  },
  loginPromptTitle: {
    ...typography.h2,
    fontSize: 24,
    color: colors.textDark,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  loginPromptDescription: {
    fontSize: 16,
    color: colors.textMuted,
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  loginButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 12,
  },
  loginButtonText: {
    ...typography.button,
    color: colors.cardBg,
    fontSize: 16,
  },
  sectionTitle: {
    ...typography.h3,
    fontSize: 18,
    color: colors.textDark,
    marginBottom: spacing.md,
  },
  orderCard: {
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  orderVendorName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textDark,
  },
  orderStatus: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  orderDescription: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  orderDate: {
    fontSize: 12,
    color: colors.textMuted,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textMuted,
    fontStyle: "italic",
    textAlign: "center",
    padding: spacing.md,
  },
});
