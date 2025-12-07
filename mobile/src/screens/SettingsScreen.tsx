import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";
import spacing from "../theme/spacing";
import typography from "../theme/typography";
import { useAppActions } from "../store/AppStateContext";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { logout } = useAppActions();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [language, setLanguage] = useState<"TR" | "EN">("TR");
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);

  const handleLogout = () => {
    Alert.alert("Çıkış Yap", "Çıkış yapmak istediğinize emin misiniz?", [
      { text: "İptal", style: "cancel" },
      {
        text: "Çıkış Yap",
        style: "destructive",
        onPress: () => {
          logout();
          navigation.navigate("MainTabs" as never);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Ayarlar</Text>
        </View>

        {/* Notification Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bildirim Ayarları</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color={colors.primary}
              />
              <View style={styles.settingItemText}>
                <Text style={styles.settingItemTitle}>Bildirimler</Text>
                <Text style={styles.settingItemDescription}>
                  Sipariş ve mesaj bildirimlerini al
                </Text>
              </View>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.border, true: colors.primary + "80" }}
              thumbColor={
                notificationsEnabled ? colors.primary : colors.textMuted
              }
            />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Ionicons name="mail-outline" size={24} color={colors.primary} />
              <View style={styles.settingItemText}>
                <Text style={styles.settingItemTitle}>
                  E-posta Bildirimleri
                </Text>
                <Text style={styles.settingItemDescription}>
                  E-posta ile bildirim al
                </Text>
              </View>
            </View>
            <Switch
              value={emailEnabled}
              onValueChange={setEmailEnabled}
              trackColor={{ false: colors.border, true: colors.primary + "80" }}
              thumbColor={emailEnabled ? colors.primary : colors.textMuted}
            />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Ionicons
                name="chatbubble-outline"
                size={24}
                color={colors.primary}
              />
              <View style={styles.settingItemText}>
                <Text style={styles.settingItemTitle}>SMS Bildirimleri</Text>
                <Text style={styles.settingItemDescription}>
                  SMS ile bildirim al
                </Text>
              </View>
            </View>
            <Switch
              value={smsEnabled}
              onValueChange={setSmsEnabled}
              trackColor={{ false: colors.border, true: colors.primary + "80" }}
              thumbColor={smsEnabled ? colors.primary : colors.textMuted}
            />
          </View>
        </View>

        {/* Language Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dil Seçimi</Text>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => setShowLanguagePicker(true)}
          >
            <View style={styles.settingItemLeft}>
              <Ionicons
                name="language-outline"
                size={24}
                color={colors.primary}
              />
              <View style={styles.settingItemText}>
                <Text style={styles.settingItemTitle}>Dil</Text>
                <Text style={styles.settingItemDescription}>{language}</Text>
              </View>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        </View>

        {/* Security Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Güvenlik</Text>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => {
              // Navigate to PIN settings
            }}
          >
            <View style={styles.settingItemLeft}>
              <Ionicons
                name="lock-closed-outline"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.settingItemTitle}>PIN Kodu</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.textMuted}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => {
              // Navigate to phone change
            }}
          >
            <View style={styles.settingItemLeft}>
              <Ionicons
                name="phone-portrait-outline"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.settingItemTitle}>Telefon Değiştir</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Destek ve Yardım</Text>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => {
              // Navigate to support
            }}
          >
            <View style={styles.settingItemLeft}>
              <Ionicons
                name="help-circle-outline"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.settingItemTitle}>Yardım Merkezi</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.textMuted}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => {
              // Navigate to contact
            }}
          >
            <View style={styles.settingItemLeft}>
              <Ionicons name="mail-outline" size={24} color={colors.primary} />
              <Text style={styles.settingItemTitle}>İletişim</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hakkında</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Ionicons
                name="information-circle-outline"
                size={24}
                color={colors.primary}
              />
              <View style={styles.settingItemText}>
                <Text style={styles.settingItemTitle}>Versiyon</Text>
                <Text style={styles.settingItemDescription}>1.0.0</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color={colors.error} />
            <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Language Picker Modal */}
      {showLanguagePicker && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Dil Seçin</Text>
              <TouchableOpacity onPress={() => setShowLanguagePicker(false)}>
                <Ionicons name="close" size={24} color={colors.textDark} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[
                styles.languageItem,
                language === "TR" && styles.languageItemActive,
              ]}
              onPress={() => {
                setLanguage("TR");
                setShowLanguagePicker(false);
              }}
            >
              <Text
                style={[
                  styles.languageText,
                  language === "TR" && styles.languageTextActive,
                ]}
              >
                Türkçe
              </Text>
              {language === "TR" && (
                <Ionicons name="checkmark" size={20} color={colors.primary} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.languageItem,
                language === "EN" && styles.languageItemActive,
              ]}
              onPress={() => {
                setLanguage("EN");
                setShowLanguagePicker(false);
              }}
            >
              <Text
                style={[
                  styles.languageText,
                  language === "EN" && styles.languageTextActive,
                ]}
              >
                English
              </Text>
              {language === "EN" && (
                <Ionicons name="checkmark" size={20} color={colors.primary} />
              )}
            </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: spacing.xl,
  },
  header: {
    padding: spacing.md,
    backgroundColor: colors.cardBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    ...typography.h2,
    fontSize: 28,
    color: colors.textDark,
  },
  section: {
    marginTop: spacing.md,
    backgroundColor: colors.cardBg,
    padding: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    fontSize: 18,
    color: colors.textDark,
    marginBottom: spacing.md,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    flex: 1,
  },
  settingItemText: {
    flex: 1,
  },
  settingItemTitle: {
    fontSize: 16,
    color: colors.textDark,
    fontWeight: "500",
  },
  settingItemDescription: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  logoutButtonText: {
    fontSize: 16,
    color: colors.error,
    fontWeight: "600",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.cardBg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.md,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  modalTitle: {
    ...typography.h3,
    fontSize: 20,
    color: colors.textDark,
  },
  languageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
    backgroundColor: colors.background,
  },
  languageItemActive: {
    backgroundColor: colors.primary + "15",
  },
  languageText: {
    fontSize: 16,
    color: colors.textDark,
  },
  languageTextActive: {
    color: colors.primary,
    fontWeight: "600",
  },
});
