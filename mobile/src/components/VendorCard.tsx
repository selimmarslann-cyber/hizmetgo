import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";
import spacing from "../theme/spacing";
import { Vendor } from "../data/mockVendors";

interface VendorCardProps {
  vendor: Vendor;
  onPress?: () => void;
}

export default function VendorCard({ vendor, onPress }: VendorCardProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={14} color="#FFC107" />);
    }
    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={14} color="#FFC107" />,
      );
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons
          key={`empty-${i}`}
          name="star-outline"
          size={14}
          color="#E0E0E0"
        />,
      );
    }
    return stars;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: vendor.image }}
        style={styles.image}
        accessibilityLabel={vendor.name}
      />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {vendor.name}
        </Text>
        <Text style={styles.category}>{vendor.category}</Text>
        <View style={styles.ratingContainer}>
          {renderStars(vendor.rating)}
          <Text style={styles.ratingText}>{vendor.rating.toFixed(1)}</Text>
          {vendor.reviewCount && (
            <Text style={styles.reviewCount}>({vendor.reviewCount})</Text>
          )}
        </View>
        <Text style={styles.priceRange}>{vendor.priceRange} ₺</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 180,
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    marginRight: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  content: {
    padding: spacing.md,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  category: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: spacing.xs,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textDark,
    marginLeft: spacing.xs,
  },
  reviewCount: {
    fontSize: 12,
    color: colors.textMuted,
    marginLeft: spacing.xs,
  },
  priceRange: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
});
