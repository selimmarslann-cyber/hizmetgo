import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

interface LogoProps {
  size?: number;
  showText?: boolean;
  variant?: "default" | "light";
}

export default function Logo({
  size = 40,
  showText = true,
  variant = "default",
}: LogoProps) {
  const isLight = variant === "light";
  const textSize = size * 0.5;

  return (
    <View style={styles.container}>
      <View
        style={[styles.logoContainer, isLight && styles.logoContainerLight]}
      >
        <View style={styles.logoTextContainer}>
          <Text style={[styles.hizmetText, { fontSize: textSize }]}>
            hizmet
          </Text>
          <Text
            style={[
              styles.goText,
              { fontSize: textSize },
              isLight && styles.goTextLight,
            ]}
          >
            go
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
  logoContainerLight: {
    // Light variant için ek stil
  },
  logoTextLight: {
    // Light variant için ek stil
  },
  goTextLight: {
    color: "#FF6000",
  },
});
