import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";
import spacing from "../theme/spacing";
import typography from "../theme/typography";

const { width, height } = Dimensions.get("window");

type SplashScreenProps = {
  onFinish: () => void;
  onNavigateToReferral?: () => void;
};

export default function SplashScreen({
  onFinish,
  onNavigateToReferral,
}: SplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const moneyAnim = useRef(new Animated.Value(0)).current;
  const confettiAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animasyonlar
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(moneyAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(moneyAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(confettiAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(confettiAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ),
    ]).start();

    // 2.5 saniye sonra ana ekrana geç
    const timer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const moneyY = moneyAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const confettiScale = confettiAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <View style={styles.gradientBackground} />

      {/* Confetti Icons */}
      <Animated.View
        style={[
          styles.confetti,
          { top: 50, left: 30 },
          { transform: [{ scale: confettiScale }] },
        ]}
      >
        <Ionicons name="star" size={30} color="#FFD700" />
      </Animated.View>
      <Animated.View
        style={[
          styles.confetti,
          { top: 100, right: 40 },
          { transform: [{ scale: confettiScale }] },
        ]}
      >
        <Ionicons name="star" size={25} color="#FF6B6B" />
      </Animated.View>
      <Animated.View
        style={[
          styles.confetti,
          { bottom: 150, left: 50 },
          { transform: [{ scale: confettiScale }] },
        ]}
      >
        <Ionicons name="star" size={28} color="#4ECDC4" />
      </Animated.View>
      <Animated.View
        style={[
          styles.confetti,
          { bottom: 200, right: 60 },
          { transform: [{ scale: confettiScale }] },
        ]}
      >
        <Ionicons name="star" size={22} color="#95E1D3" />
      </Animated.View>

      {/* Main Content */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Logo Container with Animation */}
        <View style={styles.logoContainer}>
          <Animated.View
            style={[styles.logoCircle, { transform: [{ rotate }] }]}
          >
            <View style={styles.logoInner}>
              <Ionicons name="gift" size={50} color={colors.cardBg} />
            </View>
          </Animated.View>
        </View>

        {/* Money Animation */}
        <Animated.View
          style={[
            styles.moneyContainer,
            { transform: [{ translateY: moneyY }] },
          ]}
        >
          <Ionicons name="cash" size={40} color="#FFD700" />
          <Ionicons
            name="cash"
            size={35}
            color="#FFA500"
            style={styles.moneyIcon2}
          />
          <Ionicons
            name="cash"
            size={30}
            color="#FF8C00"
            style={styles.moneyIcon3}
          />
        </Animated.View>

        {/* Title */}
        <Text style={styles.title}>Hizmetgo</Text>
        <Text style={styles.subtitle}>Ömür Boyu Kazanç Fırsatı</Text>

        {/* Short Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            0 yatırımla ortağımız ol, mahallendeki her işten pay al!
          </Text>
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            onFinish();
            if (onNavigateToReferral) {
              setTimeout(() => {
                onNavigateToReferral();
              }, 300);
            }
          }}
          activeOpacity={0.8}
        >
          <View style={styles.button}>
            <Ionicons name="arrow-forward" size={20} color={colors.primary} />
            <Text style={styles.buttonText}>
              Ömür boyu 0 yatırımla ortağımız olmak için tıkla
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.primary,
    opacity: 0.95,
  },
  confetti: {
    position: "absolute",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: spacing.xl,
  },
  logoContainer: {
    marginBottom: spacing.xl,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.cardBg,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  logoInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  moneyContainer: {
    position: "absolute",
    top: -20,
    right: -30,
    alignItems: "center",
  },
  moneyIcon2: {
    position: "absolute",
    top: 10,
    left: 5,
  },
  moneyIcon3: {
    position: "absolute",
    top: 20,
    right: 5,
  },
  title: {
    ...typography.h1,
    fontSize: 42,
    color: colors.cardBg,
    fontWeight: "900",
    marginBottom: spacing.xs,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: colors.cardBg,
    fontWeight: "600",
    marginBottom: spacing.lg,
    textAlign: "center",
    opacity: 0.95,
  },
  descriptionContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.xl,
    maxWidth: width * 0.85,
  },
  description: {
    fontSize: 16,
    color: colors.cardBg,
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "500",
  },
  buttonContainer: {
    width: "100%",
    maxWidth: width * 0.9,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.cardBg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 16,
    gap: spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    ...typography.button,
    fontSize: 16,
    color: colors.primary,
    fontWeight: "700",
    textAlign: "center",
    flex: 1,
  },
});
