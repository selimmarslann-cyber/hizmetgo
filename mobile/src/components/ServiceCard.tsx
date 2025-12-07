import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";
import spacing from "../theme/spacing";
import { Service } from "../data/mockServices";

interface ServiceCardProps {
  service: Service;
  onPress?: () => void;
}

export default function ServiceCard({ service, onPress }: ServiceCardProps) {
  const renderStars = (rating: number = 0) => {
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
        source={{ uri: service.image }}
        style={styles.image}
        accessibilityLabel={service.title}
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {service.title}
        </Text>
        {service.description && (
          <Text style={styles.description} numberOfLines={2}>
            {service.description}
          </Text>
        )}
        <View style={styles.footer}>
          <View style={styles.ratingContainer}>
            {service.rating && (
              <>
                {renderStars(service.rating)}
                <Text style={styles.ratingText}>
                  {service.rating.toFixed(1)}
                </Text>
              </>
            )}
          </View>
          <Text style={styles.price}>
            {service.price.toLocaleString("tr-TR")} ₺
          </Text>
        </View>
        {service.category && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{service.category}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    padding: spacing.md,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.xs,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: colors.textMuted,
    marginLeft: spacing.xs,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: colors.primary + "15",
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: spacing.xs,
  },
  badgeText: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: "600",
  },
});
