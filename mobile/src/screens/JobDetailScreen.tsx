import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import colors from "../theme/colors";
import spacing from "../theme/spacing";
import typography from "../theme/typography";
import { mockJobs } from "../data/mockJobs";

export default function JobDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { jobId } = (route.params as any) || {};
  const job = mockJobs.find((j) => j.id === jobId) || mockJobs[0];

  const mapRegion = {
    latitude: 40.978,
    longitude: 27.511,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

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
        <Text style={styles.headerTitle}>İş Detayı</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={styles.title}>{job.title}</Text>

        {/* Category Badge */}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{job.category}</Text>
        </View>

        {/* Budget */}
        <View style={styles.budgetContainer}>
          <Ionicons name="pricetag" size={24} color={colors.primary} />
          <View style={styles.budgetInfo}>
            <Text style={styles.budgetLabel}>Bütçe</Text>
            <Text style={styles.budgetValue}>{job.budget} ₺</Text>
          </View>
        </View>

        {/* Location */}
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={24} color={colors.primary} />
          <View style={styles.locationInfo}>
            <Text style={styles.locationLabel}>Konum</Text>
            <Text style={styles.locationValue}>{job.location}</Text>
          </View>
        </View>

        {/* Time */}
        {job.timeAgo && (
          <View style={styles.timeContainer}>
            <Ionicons name="time-outline" size={24} color={colors.primary} />
            <Text style={styles.timeText}>{job.timeAgo} yayınlandı</Text>
          </View>
        )}

        {/* Description */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Açıklama</Text>
          <Text style={styles.description}>
            {job.description || "Açıklama bulunmuyor."}
          </Text>
        </View>

        {/* Map Preview */}
        <View style={styles.mapSection}>
          <Text style={styles.sectionTitle}>Konum</Text>
          <View style={styles.mapContainer}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={mapRegion}
              scrollEnabled={false}
              zoomEnabled={false}
            >
              <Marker coordinate={mapRegion} />
            </MapView>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.saveButton]}
            onPress={() => {
              // Save job
            }}
          >
            <Ionicons
              name="bookmark-outline"
              size={20}
              color={colors.primary}
            />
            <Text style={styles.saveButtonText}>Bu işi kaydet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.primaryButton]}
            onPress={() => {
              // Submit offer
            }}
          >
            <Text style={styles.primaryButtonText}>Teklif Ver</Text>
          </TouchableOpacity>
        </View>
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
  title: {
    ...typography.h1,
    fontSize: 24,
    color: colors.textDark,
    marginBottom: spacing.md,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.primary + "15",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 12,
    marginBottom: spacing.lg,
  },
  categoryText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
  },
  budgetContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBg,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  budgetInfo: {
    marginLeft: spacing.md,
  },
  budgetLabel: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  budgetValue: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primary,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBg,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  locationInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  locationLabel: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  locationValue: {
    fontSize: 16,
    color: colors.textDark,
    fontWeight: "500",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  timeText: {
    fontSize: 14,
    color: colors.textMuted,
    marginLeft: spacing.sm,
  },
  descriptionSection: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    fontSize: 18,
    color: colors.textDark,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: 16,
    color: colors.textDark,
    lineHeight: 24,
  },
  mapSection: {
    marginBottom: spacing.lg,
  },
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
  actionButtons: {
    gap: spacing.md,
    marginTop: spacing.md,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.md,
    borderRadius: 12,
    gap: spacing.sm,
  },
  saveButton: {
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  saveButtonText: {
    ...typography.button,
    color: colors.primary,
  },
  primaryButtonText: {
    ...typography.button,
    color: colors.cardBg,
  },
});
