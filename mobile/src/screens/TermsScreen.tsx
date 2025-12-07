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

const TERMS_TEXT = `
KULLANICI SÖZLEŞMESİ

1. GENEL HÜKÜMLER

1.1. Bu sözleşme, Hizmetgo platformunu kullanan tüm kullanıcılar için geçerlidir.

1.2. Platformu kullanarak, bu sözleşmenin tüm hükümlerini kabul etmiş sayılırsınız.

1.3. Hizmetgo, platform üzerinden sunulan hizmetlerin kalitesinden sorumlu değildir.

2. KULLANICI YÜKÜMLÜLÜKLERİ

2.1. Kullanıcılar, platformu yasalara uygun şekilde kullanmakla yükümlüdür.

2.2. Kullanıcılar, doğru ve güncel bilgiler sağlamakla yükümlüdür.

2.3. Kullanıcılar, platform üzerinden yapılan işlemlerden sorumludur.

3. HİZMET SAĞLAYICILAR

3.1. Platform üzerinde hizmet sağlayan esnaf ve işletmeler, kendi hizmetlerinden sorumludur.

3.2. Hizmetgo, hizmet sağlayıcıların kalitesini garanti etmez.

3.3. Hizmet sağlayıcılar, müşterilere kaliteli hizmet sunmakla yükümlüdür.

4. ÖDEME VE İPTAL

4.1. Ödemeler platform üzerinden güvenli şekilde yapılır.

4.2. İptal koşulları her hizmet için farklı olabilir.

4.3. İade işlemleri platform politikalarına göre yapılır.

5. GİZLİLİK

5.1. Kullanıcı bilgileri gizlilik politikasına uygun şekilde korunur.

5.2. Kişisel veriler KVKK kapsamında işlenir.

6. SORUMLULUK SINIRLAMALARI

6.1. Hizmetgo, platform üzerinden sunulan hizmetlerin sonuçlarından sorumlu değildir.

6.2. Kullanıcılar, kendi riskleri altında platformu kullanır.

7. FİKRİ MÜLKİYET

7.1. Platform içeriği Hizmetgo'e aittir.

7.2. İçeriklerin izinsiz kullanımı yasaktır.

8. DEĞİŞİKLİKLER

8.1. Hizmetgo, bu sözleşmeyi istediği zaman değiştirme hakkına sahiptir.

8.2. Değişiklikler platform üzerinden duyurulur.

9. UYUŞMAZLIK ÇÖZÜMÜ

9.1. Uyuşmazlıklar öncelikle müzakere ile çözülmeye çalışılır.

9.2. Çözülemeyen uyuşmazlıklar Türkiye Cumhuriyeti yasalarına göre çözülür.

10. İLETİŞİM

10.1. Sorularınız için destek@hizmetgo.app adresine ulaşabilirsiniz.

Bu sözleşme, Hizmetgo platformunu kullandığınız andan itibaren geçerlidir.
`;

export default function TermsScreen() {
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
        <Text style={styles.headerTitle}>Kullanıcı Sözleşmesi</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.text}>{TERMS_TEXT}</Text>
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
