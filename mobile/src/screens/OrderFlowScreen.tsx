import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ServiceCard from "../components/ServiceCard";
import colors from "../theme/colors";
import spacing from "../theme/spacing";
import typography from "../theme/typography";
import { useAppState, useAppActions } from "../store/AppStateContext";

export default function OrderFlowScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { vendorId, serviceId } = (route.params as any) || {};
  const { vendors, currentUser } = useAppState();
  const { createOrder } = useAppActions();
  const vendor = vendors.find((v) => v.id === vendorId) || vendors[0];
  const vendorMenu = vendor?.menu || [];

  const [step, setStep] = useState(serviceId ? 2 : 1);
  const [selectedServiceId, setSelectedServiceId] = useState<
    string | undefined
  >(serviceId);
  const [selectedDate, setSelectedDate] = useState<
    "urgent" | "today" | "custom" | null
  >(null);
  const [customDate, setCustomDate] = useState("");
  const [description, setDescription] = useState("");

  const handleNext = () => {
    if (step === 4) {
      // Create order
      if (!currentUser || currentUser.role !== "customer") {
        Alert.alert("Hata", "Sipariş vermek için giriş yapmalısınız");
        return;
      }
      if (!vendorId || !description || !selectedDate) {
        Alert.alert("Hata", "Lütfen tüm alanları doldurun");
        return;
      }
      const scheduledFor =
        selectedDate === "urgent"
          ? "Acil"
          : selectedDate === "today"
            ? "Bugün"
            : customDate || "Tarih seçildi";
      createOrder({
        vendorId,
        serviceId: selectedServiceId,
        description,
        scheduledFor,
      });
      setStep(5);
    } else if (step < 5) {
      setStep(step + 1);
    } else {
      // Navigate to home
      navigation.navigate("MainTabs" as never);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.textDark} />
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${(step / 5) * 100}%` }]}
            />
          </View>
          <Text style={styles.stepText}>Adım {step}/5</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Step 1: Service Selection */}
        {step === 1 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Hizmet Seç</Text>
            <Text style={styles.stepDescription}>
              {vendor?.businessName || vendor?.name} işletmesinden hangi hizmeti
              almak istiyorsunuz?
            </Text>
            {vendorMenu.length > 0 ? (
              vendorMenu.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.menuItemCard,
                    selectedServiceId === item.id &&
                      styles.menuItemCardSelected,
                  ]}
                  onPress={() => setSelectedServiceId(item.id)}
                >
                  <Text style={styles.menuItemName}>{item.name}</Text>
                  <Text style={styles.menuItemPrice}>
                    {item.price.toLocaleString("tr-TR")} ₺
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.customServiceContainer}>
                <TextInput
                  style={styles.textArea}
                  placeholder="Özel hizmet açıklaması yazın (en az 10 cümle)"
                  placeholderTextColor={colors.textMuted}
                  multiline
                  numberOfLines={6}
                  value={description}
                  onChangeText={setDescription}
                />
              </View>
            )}
          </View>
        )}

        {/* Step 2: Date Selection */}
        {step === 2 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Tarih Seçimi</Text>
            <Text style={styles.stepDescription}>
              Hizmeti ne zaman almak istiyorsunuz?
            </Text>
            <TouchableOpacity
              style={[
                styles.dateOption,
                selectedDate === "urgent" && styles.dateOptionActive,
              ]}
              onPress={() => setSelectedDate("urgent")}
            >
              <Ionicons
                name="flash"
                size={24}
                color={
                  selectedDate === "urgent" ? colors.cardBg : colors.primary
                }
              />
              <View style={styles.dateOptionContent}>
                <Text
                  style={[
                    styles.dateOptionTitle,
                    selectedDate === "urgent" && styles.dateOptionTitleActive,
                  ]}
                >
                  Acil
                </Text>
                <Text
                  style={[
                    styles.dateOptionDescription,
                    selectedDate === "urgent" &&
                      styles.dateOptionDescriptionActive,
                  ]}
                >
                  En kısa sürede
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.dateOption,
                selectedDate === "today" && styles.dateOptionActive,
              ]}
              onPress={() => setSelectedDate("today")}
            >
              <Ionicons
                name="calendar"
                size={24}
                color={
                  selectedDate === "today" ? colors.cardBg : colors.primary
                }
              />
              <View style={styles.dateOptionContent}>
                <Text
                  style={[
                    styles.dateOptionTitle,
                    selectedDate === "today" && styles.dateOptionTitleActive,
                  ]}
                >
                  Bugün
                </Text>
                <Text
                  style={[
                    styles.dateOptionDescription,
                    selectedDate === "today" &&
                      styles.dateOptionDescriptionActive,
                  ]}
                >
                  Bugün içinde
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.dateOption,
                selectedDate === "custom" && styles.dateOptionActive,
              ]}
              onPress={() => setSelectedDate("custom")}
            >
              <Ionicons
                name="calendar-outline"
                size={24}
                color={
                  selectedDate === "custom" ? colors.cardBg : colors.primary
                }
              />
              <View style={styles.dateOptionContent}>
                <Text
                  style={[
                    styles.dateOptionTitle,
                    selectedDate === "custom" && styles.dateOptionTitleActive,
                  ]}
                >
                  Tarih Seç
                </Text>
                <TextInput
                  style={[
                    styles.dateInput,
                    selectedDate === "custom" && styles.dateInputActive,
                  ]}
                  placeholder="GG.AA.YYYY"
                  placeholderTextColor={
                    selectedDate === "custom" ? colors.cardBg : colors.textMuted
                  }
                  value={customDate}
                  onChangeText={setCustomDate}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Step 3: Description */}
        {step === 3 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Açıklama</Text>
            <Text style={styles.stepDescription}>
              İhtiyacınızı detaylı olarak açıklayın (en az 10 cümle)
            </Text>
            <TextInput
              style={styles.textArea}
              placeholder="Açıklama yazın... (en az 10 cümle)"
              placeholderTextColor={colors.textMuted}
              multiline
              numberOfLines={8}
              value={description}
              onChangeText={setDescription}
            />
          </View>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <View style={styles.stepContainer}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Sipariş Özeti</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>İşletme:</Text>
                <Text style={styles.summaryValue}>
                  {vendor?.businessName || vendor?.name}
                </Text>
              </View>
              {selectedServiceId && (
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Hizmet:</Text>
                  <Text style={styles.summaryValue}>
                    {vendorMenu.find((m) => m.id === selectedServiceId)?.name ||
                      "Özel hizmet"}
                  </Text>
                </View>
              )}
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tarih:</Text>
                <Text style={styles.summaryValue}>
                  {selectedDate === "urgent"
                    ? "Acil"
                    : selectedDate === "today"
                      ? "Bugün"
                      : customDate || "Tarih seçildi"}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Açıklama:</Text>
                <Text style={styles.summaryValue}>
                  {description || "Açıklama yok"}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Step 5: Success */}
        {step === 5 && (
          <View style={styles.stepContainer}>
            <View style={styles.successContainer}>
              <Ionicons
                name="checkmark-circle"
                size={100}
                color={colors.success}
              />
              <Text style={styles.successTitle}>Talebin esnafa iletildi!</Text>
              <Text style={styles.successDescription}>
                Siparişiniz başarıyla oluşturuldu. İşletme onayı bekleniyor.
              </Text>
              <TouchableOpacity
                style={styles.homeButton}
                onPress={() => navigation.navigate("MainTabs" as never)}
              >
                <Text style={styles.homeButtonText}>Anasayfaya dön</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Footer Navigation */}
      {step < 5 && (
        <View style={styles.footer}>
          {step > 1 && (
            <TouchableOpacity
              style={[styles.footerButton, styles.backButtonFooter]}
              onPress={handleBack}
            >
              <Text style={styles.backButtonText}>Geri</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.footerButton, styles.nextButton]}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>
              {step === 4 ? "Onayla ve Gönder" : "Devam Et"}
            </Text>
            <Ionicons name="arrow-forward" size={20} color={colors.cardBg} />
          </TouchableOpacity>
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
  progressContainer: {
    flex: 1,
    marginHorizontal: spacing.md,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: spacing.xs,
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
  },
  stepText: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: "center",
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
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    ...typography.h2,
    fontSize: 24,
    color: colors.textDark,
    marginBottom: spacing.sm,
  },
  stepDescription: {
    fontSize: 16,
    color: colors.textMuted,
    marginBottom: spacing.xl,
  },
  dateOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBg,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.border,
  },
  dateOptionActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dateOptionContent: {
    marginLeft: spacing.md,
    flex: 1,
  },
  dateOptionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  dateOptionTitleActive: {
    color: colors.cardBg,
  },
  dateOptionDescription: {
    fontSize: 14,
    color: colors.textMuted,
  },
  dateOptionDescriptionActive: {
    color: colors.cardBg + "CC",
  },
  dateInput: {
    fontSize: 16,
    color: colors.textDark,
    marginTop: spacing.xs,
    padding: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  dateInputActive: {
    backgroundColor: colors.cardBg + "33",
    color: colors.cardBg,
  },
  textArea: {
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    padding: spacing.md,
    fontSize: 16,
    color: colors.textDark,
    minHeight: 150,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: colors.border,
  },
  confirmationContainer: {
    alignItems: "center",
    padding: spacing.xl,
  },
  confirmationTitle: {
    ...typography.h1,
    fontSize: 28,
    color: colors.textDark,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  confirmationDescription: {
    fontSize: 16,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 24,
  },
  menuItemCard: {
    backgroundColor: colors.cardBg,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.border,
  },
  menuItemCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + "10",
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  menuItemPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
  },
  customServiceContainer: {
    marginTop: spacing.md,
  },
  summaryCard: {
    backgroundColor: colors.cardBg,
    padding: spacing.lg,
    borderRadius: 12,
    marginTop: spacing.md,
  },
  summaryTitle: {
    ...typography.h3,
    fontSize: 20,
    color: colors.textDark,
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: "600",
  },
  summaryValue: {
    fontSize: 14,
    color: colors.textDark,
    flex: 1,
    textAlign: "right",
  },
  homeButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: "center",
    marginTop: spacing.xl,
  },
  homeButtonText: {
    ...typography.button,
    color: colors.cardBg,
  },
  successContainer: {
    alignItems: "center",
    padding: spacing.xl,
  },
  successTitle: {
    ...typography.h1,
    fontSize: 32,
    color: colors.textDark,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  successDescription: {
    fontSize: 18,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 28,
  },
  footer: {
    flexDirection: "row",
    padding: spacing.md,
    gap: spacing.md,
    backgroundColor: colors.cardBg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: spacing.xs,
  },
  backButtonFooter: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  nextButton: {
    backgroundColor: colors.primary,
  },
  backButtonText: {
    ...typography.button,
    color: colors.textDark,
  },
  nextButtonText: {
    ...typography.button,
    color: colors.cardBg,
  },
});
