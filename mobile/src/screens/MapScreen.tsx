import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import HeaderSearchBar from "../components/HeaderSearchBar";
import colors from "../theme/colors";
import spacing from "../theme/spacing";
import typography from "../theme/typography";
import { mockCategories } from "../data/mockCategories";
import { useAppState, useAppActions } from "../store/AppStateContext";

export default function MapScreen() {
  const navigation = useNavigation();
  const { vendors, currentUser } = useAppState();
  const { setSelectedVendorId } = useAppActions();
  const [selectedVendor, setSelectedVendor] = useState<
    (typeof vendors)[0] | null
  >(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredVendors = selectedCategory
    ? vendors.filter((v) => v.category === selectedCategory)
    : vendors;

  const region = {
    latitude: 40.978,
    longitude: 27.511,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Login Buttons Overlay */}
      {!currentUser && (
        <View style={styles.loginOverlay}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("UserRegister" as never)}
          >
            <Text style={styles.loginButtonText}>Kullanıcı Giriş</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.loginButton, styles.vendorLoginButton]}
            onPress={() => navigation.navigate("VendorRegister" as never)}
          >
            <Text
              style={[styles.loginButtonText, styles.vendorLoginButtonText]}
            >
              Esnaf Giriş
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Category Filter Bar */}
      <View style={styles.filterBar}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}
        >
          <TouchableOpacity
            style={[
              styles.filterChip,
              !selectedCategory && styles.filterChipActive,
            ]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text
              style={[
                styles.filterText,
                !selectedCategory && styles.filterTextActive,
              ]}
            >
              Tümü
            </Text>
          </TouchableOpacity>
          {mockCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.filterChip,
                selectedCategory === category.name && styles.filterChipActive,
              ]}
              onPress={() => setSelectedCategory(category.name)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedCategory === category.name && styles.filterTextActive,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Map */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
        showsUserLocation
        showsMyLocationButton
      >
        {filteredVendors.map((vendor) => (
          <Marker
            key={vendor.id}
            coordinate={{
              latitude: vendor.location.lat,
              longitude: vendor.location.lng,
            }}
            onPress={() => {
              setSelectedVendor(vendor);
              setSelectedVendorId(vendor.id);
            }}
          >
            <View style={styles.markerContainer}>
              <View style={styles.marker}>
                <Ionicons name="location" size={24} color={colors.primary} />
              </View>
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Vendor Quick Preview Bottom Sheet */}
      <Modal
        visible={selectedVendor !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedVendor(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            <View style={styles.bottomSheetHandle} />
            {selectedVendor && (
              <>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.vendorImagePlaceholder}>
                    <Ionicons
                      name="storefront"
                      size={40}
                      color={colors.primary}
                    />
                  </View>
                  <View style={styles.vendorInfo}>
                    <Text style={styles.vendorName}>{selectedVendor.name}</Text>
                    <Text style={styles.vendorCategory}>
                      {selectedVendor.category}
                    </Text>
                    <View style={styles.ratingRow}>
                      <Ionicons name="star" size={16} color="#FFC107" />
                      <Text style={styles.rating}>
                        {selectedVendor.rating.toFixed(1)}
                      </Text>
                      {selectedVendor.reviewCount && (
                        <Text style={styles.reviewCount}>
                          ({selectedVendor.reviewCount} değerlendirme)
                        </Text>
                      )}
                    </View>
                    {selectedVendor.description && (
                      <Text style={styles.vendorDescription}>
                        {selectedVendor.description}
                      </Text>
                    )}
                    <Text style={styles.priceRange}>
                      {selectedVendor.priceRange} ₺
                    </Text>
                  </View>
                </ScrollView>
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.secondaryButton]}
                    onPress={() => {
                      setSelectedVendor(null);
                      navigation.navigate(
                        "VendorProfile" as never,
                        {
                          vendorId: selectedVendor.id,
                        } as never,
                      );
                    }}
                  >
                    <Text style={styles.secondaryButtonText}>Menüsüne Bak</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.primaryButton]}
                    onPress={() => {
                      setSelectedVendor(null);
                      navigation.navigate(
                        "OrderFlow" as never,
                        {
                          vendorId: selectedVendor.id,
                        } as never,
                      );
                    }}
                  >
                    <Text style={styles.primaryButtonText}>Sipariş Ver</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.secondaryButton]}
                    onPress={() => {
                      // Navigate to chat
                      setSelectedVendor(null);
                    }}
                  >
                    <Ionicons
                      name="chatbubble-outline"
                      size={20}
                      color={colors.primary}
                    />
                    <Text style={styles.secondaryButtonText}>Mesaj Gönder</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  filterBar: {
    backgroundColor: colors.cardBg,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterList: {
    paddingHorizontal: spacing.md,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.background,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: "500",
  },
  filterTextActive: {
    color: colors.cardBg,
    fontWeight: "600",
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    padding: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: colors.cardBg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "70%",
    paddingBottom: spacing.xl,
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    alignSelf: "center",
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  vendorImagePlaceholder: {
    width: "100%",
    height: 200,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  vendorInfo: {
    padding: spacing.md,
  },
  loginOverlay: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    zIndex: 1000,
    flexDirection: "row",
    gap: spacing.sm,
  },
  loginButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  loginButtonText: {
    fontSize: 12,
    color: colors.cardBg,
    fontWeight: "600",
  },
  vendorLoginButton: {
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  vendorLoginButtonText: {
    color: colors.primary,
  },
  vendorName: {
    ...typography.h2,
    fontSize: 22,
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  vendorCategory: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  rating: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textDark,
  },
  reviewCount: {
    fontSize: 14,
    color: colors.textMuted,
  },
  vendorDescription: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  priceRange: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
  },
  actionButtons: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    gap: spacing.sm,
  },
  actionButton: {
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
    backgroundColor: colors.background,
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
