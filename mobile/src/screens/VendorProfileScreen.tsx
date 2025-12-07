import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import ServiceCard from "../components/ServiceCard";
import colors from "../theme/colors";
import spacing from "../theme/spacing";
import typography from "../theme/typography";
import { useAppState, useAppActions } from "../store/AppStateContext";
import { mockServices } from "../data/mockServices";

export default function VendorProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { vendorId } = (route.params as any) || {};
  const { vendors, currentUser } = useAppState();
  const { registerVendorMenuItem } = useAppActions();
  const vendor = vendors.find((v) => v.id === vendorId) || vendors[0];
  const vendorMenu = vendor?.menu || [];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={20} color="#FFC107" />);
    }
    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={20} color="#FFC107" />,
      );
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons
          key={`empty-${i}`}
          name="star-outline"
          size={20}
          color="#E0E0E0"
        />,
      );
    }
    return stars;
  };

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
        <Text style={styles.headerTitle}>İşletme Profili</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Vendor Header Image */}
        <View style={styles.headerImagePlaceholder}>
          <Ionicons name="storefront" size={60} color={colors.primary} />
        </View>

        {/* Vendor Info */}
        <View style={styles.vendorInfo}>
          <Text style={styles.vendorName}>
            {vendor?.businessName || vendor?.name}
          </Text>
          <Text style={styles.vendorCategory}>{vendor?.category}</Text>
          <View style={styles.ratingContainer}>
            {renderStars(vendor?.rating || 0)}
            <Text style={styles.ratingText}>
              {(vendor?.rating || 0).toFixed(1)}
            </Text>
            {vendor.reviewCount && (
              <Text style={styles.reviewCount}>
                ({vendor.reviewCount} değerlendirme)
              </Text>
            )}
          </View>
          <Text style={styles.priceRange}>500 - 2500 ₺</Text>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hakkında</Text>
          <Text style={styles.description}>
            {vendor?.about || "Açıklama bulunmuyor."}
          </Text>
        </View>

        {/* Menu Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Menü</Text>
          {vendorMenu.length > 0 ? (
            vendorMenu.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => {
                  navigation.navigate(
                    "OrderFlow" as never,
                    {
                      vendorId: vendor?.id,
                      serviceId: item.id,
                    } as never,
                  );
                }}
              >
                <View style={styles.menuItemContent}>
                  <Text style={styles.menuItemName}>{item.name}</Text>
                  <Text style={styles.menuItemPrice}>
                    {item.price.toLocaleString("tr-TR")} ₺
                  </Text>
                </View>
                {item.description && (
                  <Text style={styles.menuItemDescription}>
                    {item.description}
                  </Text>
                )}
                <TouchableOpacity
                  style={styles.orderButton}
                  onPress={() => {
                    navigation.navigate(
                      "OrderFlow" as never,
                      {
                        vendorId: vendor?.id,
                        serviceId: item.id,
                      } as never,
                    );
                  }}
                >
                  <Text style={styles.orderButtonText}>Sipariş Ver</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.emptyText}>Henüz menü eklenmemiş</Text>
          )}
          {/* Add Menu Item (for vendor owner) */}
          {currentUser?.role === "vendor" && currentUser.id === vendor?.id && (
            <TouchableOpacity
              style={styles.addMenuItemButton}
              onPress={() => {
                // Show add menu item modal
              }}
            >
              <Ionicons name="add" size={20} color={colors.primary} />
              <Text style={styles.addMenuItemText}>Menüye yeni ürün ekle</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Location Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Konum</Text>
          <View style={styles.mapContainer}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                latitude: vendor?.location?.lat || 40.978,
                longitude: vendor?.location?.lng || 27.511,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              scrollEnabled={false}
              zoomEnabled={false}
            >
              <Marker
                coordinate={{
                  latitude: vendor?.location?.lat || 40.978,
                  longitude: vendor?.location?.lng || 27.511,
                }}
              />
            </MapView>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={() => {
              // Navigate to chat
            }}
          >
            <Ionicons
              name="chatbubble-outline"
              size={20}
              color={colors.primary}
            />
            <Text style={styles.secondaryButtonText}>Mesaj Gönder</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.primaryButton]}
            onPress={() => {
              navigation.navigate(
                "OrderFlow" as never,
                { vendorId: vendor.id } as never,
              );
            }}
          >
            <Text style={styles.primaryButtonText}>Sipariş Ver</Text>
          </TouchableOpacity>
        </View>
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
    ...typography.h3,
    fontSize: 18,
    color: colors.textDark,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: spacing.xl,
  },
  headerImagePlaceholder: {
    width: "100%",
    height: 250,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  menuItem: {
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textDark,
  },
  menuItemPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
  },
  menuItemDescription: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  orderButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    alignItems: "center",
  },
  orderButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.cardBg,
  },
  addMenuItemButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: "dashed",
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  addMenuItemText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
  },
  vendorInfo: {
    padding: spacing.md,
    backgroundColor: colors.cardBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  vendorName: {
    ...typography.h1,
    fontSize: 24,
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  vendorCategory: {
    fontSize: 16,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textDark,
    marginLeft: spacing.xs,
  },
  reviewCount: {
    fontSize: 14,
    color: colors.textMuted,
    marginLeft: spacing.xs,
  },
  priceRange: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primary,
  },
  section: {
    padding: spacing.md,
    backgroundColor: colors.cardBg,
    marginTop: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    fontSize: 18,
    color: colors.textDark,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: 16,
    color: colors.textDark,
    lineHeight: 24,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textMuted,
    fontStyle: "italic",
  },
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
  actionButtons: {
    flexDirection: "row",
    padding: spacing.md,
    gap: spacing.md,
    marginTop: spacing.md,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.md,
    borderRadius: 12,
    gap: spacing.xs,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  primaryButtonText: {
    ...typography.button,
    color: colors.cardBg,
  },
  secondaryButtonText: {
    ...typography.button,
    color: colors.primary,
  },
});
