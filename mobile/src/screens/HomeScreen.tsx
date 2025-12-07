import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  ImageBackground,
  Animated,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import HeaderSearchBar from "../components/HeaderSearchBar";
import CategoryCard from "../components/CategoryCard";
import ServiceCard from "../components/ServiceCard";
import VendorCard from "../components/VendorCard";
import FooterLegal from "../components/FooterLegal";
import HamburgerMenu from "../components/HamburgerMenu";
import AnimatedPhoneMockup from "../components/AnimatedPhoneMockup";
import Logo from "../components/Logo";
import colors from "../theme/colors";
import spacing from "../theme/spacing";
import typography from "../theme/typography";
import { mockServices } from "../data/mockServices";
import { mockCategories } from "../data/mockCategories";
import { useAppState, useAppActions } from "../store/AppStateContext";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { selectedCategoryId, vendors, keywords } = useAppState();
  const { setSelectedCategoryId } = useAppActions();
  const [rawSearch, setRawSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [matchedKeyword, setMatchedKeyword] = useState<
    (typeof keywords)[0] | null
  >(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const logoScaleAnim = useRef(new Animated.Value(1)).current;
  const logoRotateAnim = useRef(new Animated.Value(0)).current;
  const textFadeAnim = useRef(new Animated.Value(0)).current;
  const [rotatingPhraseIndex, setRotatingPhraseIndex] = useState(0);

  const rotatingPhrases = ["Ev hizmetleri", "Ek kazanç", "Esnaf bulma"];

  // Logo animasyonu
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoScaleAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(logoScaleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.timing(logoRotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
    ).start();

    Animated.timing(textFadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  // Rotating phrases
  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingPhraseIndex((prev) => (prev + 1) % rotatingPhrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const logoRotate = logoRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  // Debounce: rawSearch değişince 250ms sonra searchQuery'yi güncelle
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchQuery(rawSearch.trim());
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [rawSearch]);

  // Anahtar kelime otomatik eşleştirme fonksiyonu
  const findMatchingKeyword = useCallback(
    (query: string): (typeof keywords)[0] | null => {
      if (!query || query.length < 2) return null;

      const lowerQuery = query.toLowerCase().trim();

      // Önce tam eşleşme kontrolü
      const exactMatch = keywords.find(
        (kw) => kw.label.toLowerCase() === lowerQuery,
      );
      if (exactMatch) return exactMatch;

      // Sonra içeriyor mu kontrolü
      const containsMatch = keywords.find(
        (kw) =>
          kw.label.toLowerCase().includes(lowerQuery) ||
          lowerQuery.includes(kw.label.toLowerCase()),
      );
      if (containsMatch) return containsMatch;

      // Tags'lerde arama
      const tagMatch = keywords.find((kw) =>
        kw.tags?.some(
          (tag) =>
            tag.toLowerCase().includes(lowerQuery) ||
            lowerQuery.includes(tag.toLowerCase()),
        ),
      );
      if (tagMatch) return tagMatch;

      // Kelime bazlı eşleşme (boşluklarla ayrılmış)
      const queryWords = lowerQuery.split(/\s+/).filter((w) => w.length >= 3);
      for (const word of queryWords) {
        const wordMatch = keywords.find(
          (kw) =>
            kw.label.toLowerCase().includes(word) ||
            kw.tags?.some((tag) => tag.toLowerCase().includes(word)),
        );
        if (wordMatch) return wordMatch;
      }

      return null;
    },
    [keywords],
  );

  // Filter keywords based on search query (debounced)
  const filteredKeywords = useMemo(() => {
    if (!searchQuery) return [];
    const query = searchQuery.toLowerCase();
    return keywords.filter(
      (kw) =>
        kw.label.toLowerCase().includes(query) ||
        kw.tags?.some((tag) => tag.toLowerCase().includes(query)),
    );
  }, [searchQuery, keywords]);

  // Filter services based on search or category
  const filteredServices = useMemo(() => {
    if (searchQuery) {
      return mockServices.filter(
        (srv) =>
          srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          srv.category?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    return mockServices;
  }, [searchQuery]);

  // Filter vendors based on search
  const filteredVendors = useMemo(() => {
    if (searchQuery) {
      return vendors.filter(
        (v) =>
          v.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.category.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    return vendors.slice(0, 10);
  }, [searchQuery, vendors]);

  const handleKeywordSelect = (keyword: (typeof keywords)[0]) => {
    setRawSearch("");
    setSearchQuery("");
    setShowSuggestions(false);
    setMatchedKeyword(null);
    if (keyword.categoryId) {
      setSelectedCategoryId(keyword.categoryId);
    }
  };

  // Arama butonuna basınca veya enter'a basınca otomatik eşleştirme
  const handleSearchSubmit = useCallback(
    (query: string) => {
      const trimmedQuery = query.trim();
      if (!trimmedQuery) return;

      setIsSearching(true);
      setShowSuggestions(false);

      // Anahtar kelime eşleştirmesi yap
      const matched = findMatchingKeyword(trimmedQuery);

      if (matched) {
        // Eşleşen anahtar kelimeyi seç
        setMatchedKeyword(matched);
        setRawSearch("");
        setSearchQuery("");
        if (matched.categoryId) {
          setSelectedCategoryId(matched.categoryId);
        }
      } else {
        // Eşleşme yoksa normal arama yap
        setSearchQuery(trimmedQuery);
      }

      setIsSearching(false);
    },
    [findMatchingKeyword, setSelectedCategoryId],
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header - Animasyonlu Logo ve Yazı */}
        <View style={styles.animatedHeader}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setMenuVisible(true)}
            activeOpacity={0.7}
          >
            <Ionicons name="menu" size={24} color={colors.textDark} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Animated.View
              style={[
                styles.logoContainer,
                {
                  transform: [{ scale: logoScaleAnim }, { rotate: logoRotate }],
                },
              ]}
            >
              <View style={styles.logoCircle}>
                <Text style={styles.logoText}>H</Text>
              </View>
            </Animated.View>
            <Animated.View style={{ opacity: textFadeAnim }}>
              <View style={styles.rotatingTextContainer}>
                <Text style={styles.headerTitle}>
                  {rotatingPhrases[rotatingPhraseIndex]}
                </Text>
              </View>
              <Text style={styles.headerSubtitle}>Hizmetgo</Text>
            </Animated.View>
          </View>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => navigation.navigate("NotificationsScreen" as never)}
            activeOpacity={0.7}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color={colors.textDark}
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <HeaderSearchBar
            value={rawSearch}
            onChangeText={(text) => {
              setRawSearch(text);
              setShowSuggestions(text.length > 0);
            }}
            onSubmitSearch={handleSearchSubmit}
            placeholder="Hizmet ara..."
          />
          {/* Keyword Suggestions */}
          {showSuggestions && filteredKeywords.length > 0 && (
            <View style={styles.suggestionsContainer}>
              {filteredKeywords.map((keyword) => (
                <TouchableOpacity
                  key={keyword.id}
                  style={styles.suggestionItem}
                  onPress={() => handleKeywordSelect(keyword)}
                >
                  <Ionicons name="search" size={16} color={colors.textMuted} />
                  <Text style={styles.suggestionText}>{keyword.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {/* Loading indicator for search */}
          {isSearching && (
            <View style={styles.searchLoadingContainer}>
              <Text style={styles.searchLoadingText}>Aranıyor...</Text>
            </View>
          )}
          {/* Matched keyword indicator */}
          {matchedKeyword && !showSuggestions && (
            <View style={styles.matchedKeywordContainer}>
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={colors.primary}
              />
              <Text style={styles.matchedKeywordText}>
                &quot;{matchedKeyword.label}&quot; kategorisi seçildi
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setMatchedKeyword(null);
                  setSelectedCategoryId(undefined);
                }}
              >
                <Ionicons name="close" size={16} color={colors.textMuted} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Büyük Resim */}
        <View style={styles.heroImageContainer}>
          <ImageBackground
            source={{
              uri: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
            }}
            style={styles.heroImage}
            imageStyle={styles.heroImageStyle}
          >
            <View style={styles.heroOverlay} />
          </ImageBackground>
        </View>

        {/* Popüler Kategoriler */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popüler Kategoriler</Text>
          <FlatList
            data={mockCategories.slice(0, 8)}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CategoryCard
                category={item}
                onPress={() => {
                  // Navigate to category
                }}
              />
            )}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Animasyonlu Telefon Mockup */}
        <View style={styles.phoneMockupSection}>
          <AnimatedPhoneMockup />
        </View>

        {/* İhtiyacını Belirt İşini Hallettir Bölümü */}
        <View style={styles.ctaSection}>
          <View style={styles.ctaCard}>
            <Ionicons
              name="checkmark-circle"
              size={32}
              color={colors.primary}
            />
            <Text style={styles.ctaTitle}>
              İhtiyacını Belirt, İşini Hallettir
            </Text>
            <Text style={styles.ctaDescription}>
              Hangi hizmete ihtiyacın var? Bölgendeki en iyi ustaları bul, hızlı
              ve güvenilir çözümler al.
            </Text>
            <TouchableOpacity
              style={styles.ctaButton}
              onPress={() => {
                navigation.navigate("MapScreen" as never);
              }}
            >
              <Text style={styles.ctaButtonText}>Hizmet Ara</Text>
              <Ionicons name="arrow-forward" size={18} color={colors.cardBg} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Services Section - Küçültülmüş */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Öne Çıkan Hizmetler</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("MapScreen" as never);
              }}
            >
              <Text style={styles.seeAll}>Tümünü Gör</Text>
            </TouchableOpacity>
          </View>
          {filteredServices.slice(0, 3).map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onPress={() => {
                navigation.navigate("MapScreen" as never);
              }}
            />
          ))}
        </View>

        {/* Popular Vendors Section - Küçültülmüş */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popüler Ustalar</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("MapScreen" as never);
              }}
            >
              <Text style={styles.seeAll}>Tümünü Gör</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={filteredVendors.slice(0, 5)}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <VendorCard
                vendor={{
                  id: parseInt(item.id),
                  name: item.businessName,
                  category: item.category,
                  rating: item.rating,
                  priceRange: "500 - 2500",
                  lat: item.location.lat,
                  lng: item.location.lng,
                  image:
                    "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop",
                  reviewCount: 100,
                }}
                onPress={() => {
                  // Navigate to vendor profile
                  // navigation.navigate('VendorProfile' as never, { vendorId: item.id } as never)
                }}
              />
            )}
            contentContainerStyle={styles.vendorsList}
          />
        </View>

        <FooterLegal />
        <View style={{ height: spacing.xl * 2 }} />
      </ScrollView>

      {/* Hamburger Menu */}
      <HamburgerMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />
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
  animatedHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.cardBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuButton: {
    padding: spacing.xs,
  },
  headerContent: {
    flex: 1,
    alignItems: "center",
    gap: spacing.xs,
  },
  logoContainer: {
    marginBottom: spacing.xs,
  },
  logoCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.cardBg,
  },
  rotatingTextContainer: {
    minHeight: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textDark,
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
    textAlign: "center",
  },
  notificationButton: {
    padding: spacing.xs,
  },
  heroImageContainer: {
    width: "100%",
    height: 200,
    marginTop: spacing.md,
  },
  heroImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  heroImageStyle: {
    resizeMode: "cover",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  phoneMockupSection: {
    marginVertical: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  ctaSection: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  ctaCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: "center",
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ctaTitle: {
    ...typography.h2,
    fontSize: 20,
    color: colors.textDark,
    textAlign: "center",
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  ctaDescription: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 12,
    gap: spacing.sm,
    minWidth: 200,
  },
  ctaButtonText: {
    ...typography.button,
    fontSize: 16,
    color: colors.cardBg,
    fontWeight: "700",
  },
  searchContainer: {
    position: "relative",
    zIndex: 10,
    paddingHorizontal: spacing.md,
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  suggestionsContainer: {
    position: "absolute",
    top: "100%",
    left: spacing.md,
    right: spacing.md,
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    marginTop: spacing.xs,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: 200,
    zIndex: 1000,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  suggestionText: {
    fontSize: 14,
    color: colors.textDark,
  },
  section: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    fontSize: 16,
    color: colors.textDark,
    marginBottom: spacing.sm,
  },
  seeAll: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
  },
  categoriesList: {
    paddingRight: spacing.md,
  },
  servicesList: {
    paddingRight: spacing.md,
  },
  serviceCardWrapper: {
    width: 300,
    marginRight: spacing.md,
  },
  vendorsList: {
    paddingRight: spacing.md,
  },
  instantJobsSection: {
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  instantJobsCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    padding: spacing.sm,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  instantJobsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  instantJobsTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textDark,
  },
  instantJobsList: {
    marginBottom: spacing.sm,
  },
  instantJobsItem: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: spacing.xs / 2,
  },
  instantJobsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    gap: spacing.xs,
  },
  instantJobsButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.cardBg,
  },
  bottomSearchBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.cardBg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  bottomSearchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.textDark,
    paddingVertical: spacing.xs,
  },
  searchLoadingContainer: {
    padding: spacing.sm,
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 8,
    marginTop: spacing.xs,
    marginHorizontal: spacing.md,
  },
  searchLoadingText: {
    fontSize: 14,
    color: colors.textMuted,
  },
  matchedKeywordContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    padding: spacing.sm,
    backgroundColor: colors.primary + "15",
    borderRadius: 8,
    marginTop: spacing.xs,
    marginHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.primary + "30",
  },
  matchedKeywordText: {
    flex: 1,
    fontSize: 13,
    color: colors.primary,
    fontWeight: "500",
  },
});
