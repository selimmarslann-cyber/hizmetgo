import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import colors from "../theme/colors";
import spacing from "../theme/spacing";
import typography from "../theme/typography";
import { mockCategories } from "../data/mockCategories";
import { useAppActions } from "../store/AppStateContext";

interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
}

export default function VendorRegisterScreen() {
  const navigation = useNavigation();
  const { loginAsVendor, registerVendorMenuItem } = useAppActions();
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    phone: "",
    category: "",
  });
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [newMenuItem, setNewMenuItem] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 40.978,
    longitude: 27.511,
  });
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  const handleAddMenuItem = () => {
    if (newMenuItem.name && newMenuItem.price) {
      const item = {
        id: Date.now().toString(),
        ...newMenuItem,
      };
      setMenuItems([...menuItems, item]);
      setNewMenuItem({ name: "", price: "", description: "" });
      setShowMenuModal(false);
    } else {
      Alert.alert("Hata", "Lütfen ürün adı ve fiyatı girin");
    }
  };

  const handleSubmit = () => {
    if (
      !formData.fullName ||
      !formData.businessName ||
      !formData.phone ||
      !formData.category
    ) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun");
      return;
    }
    loginAsVendor({
      name: formData.fullName,
      businessName: formData.businessName,
      phone: formData.phone,
      category: formData.category,
      location: {
        lat: selectedLocation.latitude,
        lng: selectedLocation.longitude,
        city: "Tekirdağ",
        district: "Süleymanpaşa",
        neighborhood: "Aydoğdu Mahallesi",
      },
    });
    // Add menu items to vendor
    menuItems.forEach((item) => {
      // This will be called after vendor is created, so we need to get the vendor ID
      // For now, we'll add items after registration
    });
    Alert.alert("Başarılı", "Kayıt başarıyla tamamlandı", [
      {
        text: "Tamam",
        onPress: () => navigation.navigate("MainTabs" as never),
      },
    ]);
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
        <Text style={styles.headerTitle}>Esnaf Kayıt</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Full Name */}
        <View style={styles.section}>
          <Text style={styles.label}>Ad Soyad</Text>
          <TextInput
            style={styles.input}
            placeholder="Adınız ve soyadınız"
            value={formData.fullName}
            onChangeText={(text) =>
              setFormData({ ...formData, fullName: text })
            }
          />
        </View>

        {/* Business Name */}
        <View style={styles.section}>
          <Text style={styles.label}>İşletme Adı</Text>
          <TextInput
            style={styles.input}
            placeholder="İşletme adınız"
            value={formData.businessName}
            onChangeText={(text) =>
              setFormData({ ...formData, businessName: text })
            }
          />
        </View>

        {/* Phone */}
        <View style={styles.section}>
          <Text style={styles.label}>Telefon</Text>
          <TextInput
            style={styles.input}
            placeholder="05XX XXX XX XX"
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
          />
        </View>

        {/* Category */}
        <View style={styles.section}>
          <Text style={styles.label}>Kategori</Text>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setShowCategoryPicker(true)}
          >
            <Text
              style={[
                styles.pickerText,
                !formData.category && styles.placeholderText,
              ]}
            >
              {formData.category || "Kategori Seçin"}
            </Text>
            <Ionicons name="chevron-down" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.label}>Menü Ürünleri</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowMenuModal(true)}
            >
              <Ionicons name="add" size={20} color={colors.primary} />
              <Text style={styles.addButtonText}>Ürün Ekle</Text>
            </TouchableOpacity>
          </View>
          {menuItems.map((item) => (
            <View key={item.id} style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemName}>{item.name}</Text>
                <Text style={styles.menuItemPrice}>{item.price} ₺</Text>
              </View>
              {item.description && (
                <Text style={styles.menuItemDescription}>
                  {item.description}
                </Text>
              )}
            </View>
          ))}
        </View>

        {/* Location Selection */}
        <View style={styles.section}>
          <Text style={styles.label}>Konum Seç</Text>
          <View style={styles.mapContainer}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              onPress={(e) => {
                setSelectedLocation(e.nativeEvent.coordinate);
              }}
            >
              <Marker coordinate={selectedLocation} />
            </MapView>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Kaydol</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Add Menu Item Modal */}
      <Modal
        visible={showMenuModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowMenuModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Ürün Ekle</Text>
              <TouchableOpacity onPress={() => setShowMenuModal(false)}>
                <Ionicons name="close" size={24} color={colors.textDark} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.label}>Ürün Adı</Text>
              <TextInput
                style={styles.input}
                placeholder="Ürün adı"
                value={newMenuItem.name}
                onChangeText={(text) =>
                  setNewMenuItem({ ...newMenuItem, name: text })
                }
              />
              <Text style={styles.label}>Fiyat</Text>
              <TextInput
                style={styles.input}
                placeholder="Fiyat"
                keyboardType="numeric"
                value={newMenuItem.price}
                onChangeText={(text) =>
                  setNewMenuItem({ ...newMenuItem, price: text })
                }
              />
              <Text style={styles.label}>Açıklama</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Açıklama (opsiyonel)"
                multiline
                numberOfLines={4}
                value={newMenuItem.description}
                onChangeText={(text) =>
                  setNewMenuItem({ ...newMenuItem, description: text })
                }
              />
              <TouchableOpacity
                style={styles.modalSubmitButton}
                onPress={handleAddMenuItem}
              >
                <Text style={styles.modalSubmitButtonText}>Ekle</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Category Picker Modal */}
      {showCategoryPicker && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Kategori Seçin</Text>
              <TouchableOpacity onPress={() => setShowCategoryPicker(false)}>
                <Ionicons name="close" size={24} color={colors.textDark} />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {mockCategories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={styles.categoryItem}
                  onPress={() => {
                    setFormData({ ...formData, category: cat.name });
                    setShowCategoryPicker(false);
                  }}
                >
                  <Text style={styles.categoryText}>{cat.name}</Text>
                  {formData.category === cat.name && (
                    <Ionicons
                      name="checkmark"
                      size={20}
                      color={colors.primary}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
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
    padding: spacing.md,
  },
  section: {
    marginBottom: spacing.lg,
    backgroundColor: colors.cardBg,
    padding: spacing.md,
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textDark,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.md,
    fontSize: 16,
    color: colors.textDark,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  pickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pickerText: {
    fontSize: 16,
    color: colors.textDark,
  },
  placeholderText: {
    color: colors.textMuted,
  },
  categoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  categoryText: {
    fontSize: 16,
    color: colors.textDark,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  addButtonText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
  },
  menuItem: {
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.sm,
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
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
  },
  menuItemDescription: {
    fontSize: 14,
    color: colors.textMuted,
  },
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginTop: spacing.sm,
  },
  map: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: "center",
    marginTop: spacing.lg,
  },
  submitButtonText: {
    ...typography.button,
    color: colors.cardBg,
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.cardBg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.md,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  modalTitle: {
    ...typography.h3,
    fontSize: 20,
    color: colors.textDark,
  },
  modalBody: {
    gap: spacing.md,
  },
  modalSubmitButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: "center",
    marginTop: spacing.md,
  },
  modalSubmitButtonText: {
    ...typography.button,
    color: colors.cardBg,
  },
});
