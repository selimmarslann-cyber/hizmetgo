import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../theme/colors";
import spacing from "../theme/spacing";

export default function FooterLegal() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("TermsScreen")}
        style={styles.link}
      >
        <Text style={styles.linkText}>Kullanıcı Sözleşmesi</Text>
      </TouchableOpacity>
      <Text style={styles.separator}>•</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("PrivacyScreen")}
        style={styles.link}
      >
        <Text style={styles.linkText}>KVKK ve Gizlilik Politikası</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background,
  },
  link: {
    paddingHorizontal: spacing.sm,
  },
  linkText: {
    fontSize: 12,
    color: colors.textMuted,
    textDecorationLine: "underline",
  },
  separator: {
    marginHorizontal: spacing.xs,
    color: colors.textMuted,
  },
});
