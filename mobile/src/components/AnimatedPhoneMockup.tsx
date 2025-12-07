import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";

const { width } = Dimensions.get("window");
const PHONE_WIDTH = width * 0.7;
const PHONE_HEIGHT = PHONE_WIDTH * 1.93; // iPhone aspect ratio

export default function AnimatedPhoneMockup() {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Subtle rotate animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "2deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.phoneContainer,
          {
            transform: [{ translateY }, { rotate }],
          },
        ]}
      >
        {/* Dış çerçeve - Beyaz */}
        <View style={styles.outerFrame}>
          {/* İç çerçeve */}
          <View style={styles.innerFrame}>
            {/* Dynamic Island */}
            <View style={styles.dynamicIsland}>
              <View style={styles.camera} />
              <View style={styles.speaker} />
            </View>

            {/* Ekran içeriği - Mobil App Anasayfası */}
            <View style={styles.screen}>
              {/* Header */}
              <View style={styles.screenHeader}>
                <View style={styles.screenLogo}>
                  <Ionicons name="menu" size={12} color="#000" />
                </View>
                <View style={styles.screenHeaderCenter}>
                  <View style={styles.screenLogoText} />
                </View>
                <View style={styles.screenIcon} />
              </View>

              {/* Search Bar */}
              <View style={styles.screenSearch}>
                <View style={styles.screenSearchBar} />
              </View>

              {/* Categories */}
              <View style={styles.screenCategories}>
                <View style={styles.screenCategoryRow}>
                  {[1, 2, 3, 4].map((i) => (
                    <View key={i} style={styles.screenCategory} />
                  ))}
                </View>
              </View>

              {/* Services */}
              <View style={styles.screenServices}>
                {[1, 2].map((i) => (
                  <View key={i} style={styles.screenService} />
                ))}
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  phoneContainer: {
    width: PHONE_WIDTH,
    height: PHONE_HEIGHT,
  },
  outerFrame: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#000000",
    padding: 3,
  },
  innerFrame: {
    flex: 1,
    borderRadius: 37,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    overflow: "hidden",
  },
  dynamicIsland: {
    position: "absolute",
    top: 8,
    left: "50%",
    marginLeft: -63,
    width: 126,
    height: 37,
    borderRadius: 18.5,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#000000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  camera: {
    position: "absolute",
    left: 18,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#000000",
  },
  speaker: {
    width: 66,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#000000",
  },
  screen: {
    flex: 1,
    marginTop: 50,
    marginHorizontal: 4,
    marginBottom: 4,
    borderRadius: 34,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    overflow: "hidden",
  },
  screenHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  screenLogo: {
    width: 20,
    height: 20,
  },
  screenHeaderCenter: {
    flex: 1,
    alignItems: "center",
  },
  screenLogoText: {
    width: 60,
    height: 8,
    backgroundColor: "#000000",
    borderRadius: 2,
  },
  screenIcon: {
    width: 20,
    height: 20,
  },
  screenSearch: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  screenSearchBar: {
    height: 24,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  screenCategories: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  screenCategoryRow: {
    flexDirection: "row",
    gap: 6,
  },
  screenCategory: {
    flex: 1,
    height: 40,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  screenServices: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 6,
  },
  screenService: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
});
