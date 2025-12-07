import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";
import spacing from "../theme/spacing";
import { Job } from "../data/mockJobs";

interface JobCardProps {
  job: Job;
  onPress?: () => void;
}

export default function JobCard({ job, onPress }: JobCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={2}>
          {job.title}
        </Text>
        {job.timeAgo && <Text style={styles.timeAgo}>{job.timeAgo}</Text>}
      </View>

      {job.description && (
        <Text style={styles.description} numberOfLines={2}>
          {job.description}
        </Text>
      )}

      <View style={styles.footer}>
        <View style={styles.infoRow}>
          <Ionicons
            name="location-outline"
            size={16}
            color={colors.textMuted}
          />
          <Text style={styles.location}>{job.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="pricetag-outline" size={16} color={colors.primary} />
          <Text style={styles.budget}>{job.budget} ₺</Text>
        </View>
      </View>

      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>{job.category}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.sm,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: colors.textDark,
    marginRight: spacing.sm,
  },
  timeAgo: {
    fontSize: 12,
    color: colors.textMuted,
  },
  description: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  location: {
    fontSize: 13,
    color: colors.textMuted,
  },
  budget: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.primary,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.primary + "15",
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: "600",
  },
});
