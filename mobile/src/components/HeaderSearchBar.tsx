import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";
import spacing from "../theme/spacing";

interface HeaderSearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmitSearch?: (query: string) => void;
  onFilterPress?: () => void;
  placeholder?: string;
}

export default function HeaderSearchBar({
  value = "",
  onChangeText,
  onSubmitSearch,
  onFilterPress,
  placeholder = "Hangi hizmete ihtiyacın var?",
}: HeaderSearchBarProps) {
  const handleSearch = () => {
    if (onSubmitSearch && value.trim()) {
      onSubmitSearch(value.trim());
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={18}
          color={colors.textMuted}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {onFilterPress && (
          <TouchableOpacity onPress={onFilterPress} style={styles.filterButton}>
            <Ionicons name="options-outline" size={18} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBg,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 10,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    marginRight: spacing.xs,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.textDark,
    paddingVertical: 4,
  },
  filterButton: {
    marginLeft: spacing.xs,
    padding: spacing.xs,
  },
});
