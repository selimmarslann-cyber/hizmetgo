import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";
import spacing from "../theme/spacing";
import typography from "../theme/typography";
import { useAppActions } from "../store/AppStateContext";

const NEIGHBORHOODS = [
  "Aydoğdu Mahallesi",
  "Hürriyet Mahallesi",
  "Yeni Mahalle",
  "Merkez Mahalle",
  "Atatürk Mahallesi",
];

export default function UserRegisterScreen() {
  const navigation = useNavigation();
  const { loginAsCustomer } = useAppActions();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [smsCode, setSmsCode] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [showNeighborhoodPicker, setShowNeighborhoodPicker] = useState(false);

  const handlePhoneSubmit = () => {
    if (phone.length < 10) {
      Alert.alert("Hata", "Lütfen geçerli bir telefon numarası girin");
      return;
    }
    // Mock SMS code verification
    setStep(2);
  };

  const handleSMSVerify = () => {
    // Mock verification - accept any code
    if (smsCode.length === 6) {
      setStep(3);
    } else {
      Alert.alert("Hata", "Lütfen 6 haneli kodu girin");
    }
  };

  const handleFinalSubmit = () => {
    if (!name || !surname || !neighborhood || !phone || !smsCode) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun");
      return;
    }
    loginAsCustomer({
      name: `${name} ${surname}`,
      phone,
      neighborhood,
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
          onPress={() => (step > 1 ? setStep(step - 1) : navigation.goBack())}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {step === 1
            ? "Kayıt Ol"
            : step === 2
              ? "SMS Doğrulama"
              : "Profil Bilgileri"}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Step 1: Phone Input */}
        {step === 1 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Telefon Numaranızı Girin</Text>
            <Text style={styles.stepDescription}>
              Size SMS ile doğrulama kodu göndereceğiz
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="05XX XXX XX XX"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                maxLength={11}
              />
            </View>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handlePhoneSubmit}
            >
              <Text style={styles.primaryButtonText}>Devam Et</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step 2: SMS Verification */}
        {step === 2 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>SMS Kodu</Text>
            <Text style={styles.stepDescription}>
              {phone} numarasına gönderilen 6 haneli kodu girin
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="000000"
                keyboardType="number-pad"
                value={smsCode}
                onChangeText={setSmsCode}
                maxLength={6}
              />
            </View>
            <TouchableOpacity style={styles.resendButton}>
              <Text style={styles.resendText}>Kodu Tekrar Gönder</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSMSVerify}
            >
              <Text style={styles.primaryButtonText}>Doğrula</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step 3: Profile Info */}
        {step === 3 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Profil Bilgileriniz</Text>
            <Text style={styles.stepDescription}>
              Son adım! Profil bilgilerinizi tamamlayın
            </Text>

            {/* Profile Photo Picker */}
            <TouchableOpacity style={styles.photoPicker}>
              <View style={styles.photoPlaceholder}>
                <Ionicons name="camera" size={40} color={colors.textMuted} />
                <Text style={styles.photoText}>Profil Fotoğrafı Ekle</Text>
              </View>
            </TouchableOpacity>

            {/* Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Ad</Text>
              <TextInput
                style={styles.input}
                placeholder="Adınız"
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Surname */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Soyad</Text>
              <TextInput
                style={styles.input}
                placeholder="Soyadınız"
                value={surname}
                onChangeText={setSurname}
              />
            </View>

            {/* Neighborhood */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Mahalle</Text>
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => setShowNeighborhoodPicker(true)}
              >
                <Text
                  style={[
                    styles.pickerText,
                    !neighborhood && styles.placeholderText,
                  ]}
                >
                  {neighborhood || "Mahalle Seçin"}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={20}
                  color={colors.textMuted}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleFinalSubmit}
            >
              <Text style={styles.primaryButtonText}>Kayıt Ol</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Neighborhood Picker Modal */}
      {showNeighborhoodPicker && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Mahalle Seçin</Text>
              <TouchableOpacity
                onPress={() => setShowNeighborhoodPicker(false)}
              >
                <Ionicons name="close" size={24} color={colors.textDark} />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {NEIGHBORHOODS.map((nh) => (
                <TouchableOpacity
                  key={nh}
                  style={styles.neighborhoodItem}
                  onPress={() => {
                    setNeighborhood(nh);
                    setShowNeighborhoodPicker(false);
                  }}
                >
                  <Text style={styles.neighborhoodText}>{nh}</Text>
                  {neighborhood === nh && (
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
  inputContainer: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textDark,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    padding: spacing.md,
    fontSize: 16,
    color: colors.textDark,
    borderWidth: 1,
    borderColor: colors.border,
  },
  photoPicker: {
    marginBottom: spacing.lg,
  },
  photoPlaceholder: {
    height: 120,
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  photoText: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  pickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.cardBg,
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
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: "center",
    marginTop: spacing.lg,
  },
  primaryButtonText: {
    ...typography.button,
    color: colors.cardBg,
    fontSize: 18,
  },
  resendButton: {
    alignItems: "center",
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  resendText: {
    fontSize: 14,
    color: colors.primary,
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
    maxHeight: "50%",
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
  neighborhoodItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  neighborhoodText: {
    fontSize: 16,
    color: colors.textDark,
  },
});
