import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";
import spacing from "../theme/spacing";
import typography from "../theme/typography";

const PRIVACY_TEXT = `
GİZLİLİK POLİTİKASI

1. GENEL BİLGİLER

1.1. Hizmetgo olarak, kullanıcılarımızın gizliliğini korumak bizim önceliğimizdir.

1.2. Bu gizlilik politikası, platformumuzu kullandığınızda toplanan bilgilerin nasıl kullanıldığını açıklar.

2. TOPLANAN BİLGİLER

2.1. Kişisel Bilgiler:
- Ad ve soyad
- Telefon numarası
- E-posta adresi
- Konum bilgisi
- Profil fotoğrafı

2.2. Kullanım Bilgileri:
- Platform kullanım geçmişi
- Sipariş geçmişi
- Arama geçmişi
- Tercihler

2.3. Teknik Bilgiler:
- Cihaz bilgileri
- IP adresi
- Tarayıcı bilgileri
- Çerezler

3. BİLGİLERİN KULLANIMI

3.1. Toplanan bilgiler aşağıdaki amaçlar için kullanılır:
- Hizmet sunumu
- Müşteri desteği
- Platform iyileştirmeleri
- Güvenlik
- Yasal yükümlülükler

3.2. Bilgileriniz üçüncü taraflarla paylaşılmaz, ancak yasal zorunluluklar hariç.

4. VERİ GÜVENLİĞİ

4.1. Tüm veriler güvenli sunucularda saklanır.

4.2. SSL şifreleme kullanılır.

4.3. Düzenli güvenlik denetimleri yapılır.

5. ÇEREZLER

5.1. Platform, kullanıcı deneyimini iyileştirmek için çerezler kullanır.

5.2. Çerezleri tarayıcı ayarlarınızdan yönetebilirsiniz.

6. KULLANICI HAKLARI

6.1. Kişisel verilerinize erişim hakkı

6.2. Verilerinizin düzeltilmesi hakkı

6.3. Verilerinizin silinmesi hakkı

6.4. Veri taşınabilirliği hakkı

6.5. İtiraz etme hakkı

7. KVKK UYUMLULUĞU

7.1. Platform, 6698 sayılı KVKK'ya uygun olarak çalışır.

7.2. Veri işleme faaliyetleri yasalara uygundur.

8. ÇOCUKLARIN GİZLİLİĞİ

8.1. Platform 18 yaş altı kullanıcılar için uygun değildir.

8.2. 18 yaş altı kullanıcıların bilgileri toplanmaz.

9. DEĞİŞİKLİKLER

9.1. Bu gizlilik politikası zaman zaman güncellenebilir.

9.2. Önemli değişiklikler kullanıcılara bildirilir.

10. İLETİŞİM

10.1. Gizlilik ile ilgili sorularınız için:
E-posta: gizlilik@hizmetgo.app
Telefon: 0850 XXX XX XX

Son Güncelleme: 2024
`;

export default function PrivacyScreen() {
  const navigation = useNavigation();

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
        <Text style={styles.headerTitle}>Gizlilik Politikası</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.text}>{PRIVACY_TEXT}</Text>
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
    padding: spacing.md,
  },
  text: {
    fontSize: 16,
    color: colors.textDark,
    lineHeight: 24,
  },
});
