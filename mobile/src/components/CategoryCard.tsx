import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../theme/colors";
import spacing from "../theme/spacing";
import { Category } from "../data/mockCategories";

interface CategoryCardProps {
  category: Category;
  onPress?: () => void;
}

export default function CategoryCard({ category, onPress }: CategoryCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: category.image }}
          style={styles.image}
          accessibilityLabel={category.name}
        />
        <View style={styles.overlay} />
      </View>
      <Text style={styles.name} numberOfLines={2}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    marginRight: spacing.md,
    marginBottom: spacing.md,
  },
  imageContainer: {
    width: "100%",
    height: 100,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: spacing.sm,
    backgroundColor: colors.border,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textDark,
    textAlign: "center",
  },
});
