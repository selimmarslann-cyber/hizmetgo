import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Text } from "react-native";

type HizmetgoLogoLoaderProps = {
  size?: number;
};

export function HizmetgoLogoLoader({ size = 120 }: HizmetgoLogoLoaderProps) {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const textSize = size * 0.4;

  useEffect(() => {
    // Rotate animasyonu (dönen halka)
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ).start();

    // Scale animasyonu
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Opacity animasyonu
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: size * 1.2,
          height: size * 1.2,
          opacity: opacityAnim,
        },
      ]}
    >
      {/* Dönen halka */}
      <Animated.View
        style={[
          styles.ring,
          {
            width: size * 1.2,
            height: size * 1.2,
            borderWidth: 4,
            borderRadius: (size * 1.2) / 2,
            transform: [{ rotate }],
          },
        ]}
      />

      {/* Logo Text */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoTextContainer}>
          <Text style={[styles.hizmetText, { fontSize: textSize }]}>
            hizmet
          </Text>
          <Text style={[styles.goText, { fontSize: textSize }]}>go</Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

// Alias for backward compatibility
export const MahallemLogoLoader = HizmetgoLogoLoader;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  ring: {
    position: "absolute",
    borderColor: "#FF6000",
    borderTopColor: "#FF6000",
    borderRightColor: "#FF6000",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoTextContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  hizmetText: {
    color: "#1A1A1A",
    fontWeight: "700",
    fontFamily: "System",
    letterSpacing: -0.5,
  },
  goText: {
    color: "#FF6000",
    fontWeight: "800",
    fontFamily: "System",
    letterSpacing: -0.5,
  },
});
