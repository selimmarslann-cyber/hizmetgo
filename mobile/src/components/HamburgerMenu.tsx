import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../theme/colors";
import spacing from "../theme/spacing";
import typography from "../theme/typography";

const { width } = Dimensions.get("window");

interface HamburgerMenuProps {
  visible: boolean;
  onClose: () => void;
}

export default function HamburgerMenu({
  visible,
  onClose,
}: HamburgerMenuProps) {
  const navigation = useNavigation();
  const slideAnim = React.useRef(new Animated.Value(-width)).current;
  const overlayOpacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -width,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const menuItems = [
    {
      id: "home",
      label: "Ana Sayfa",
      icon: "home-outline",
      onPress: () => {
        onClose();
        navigation.navigate("Home" as never);
      },
    },
    {
      id: "map",
      label: "Yakındaki Esnaflar",
      icon: "map-outline",
      onPress: () => {
        onClose();
        navigation.navigate("Map" as never);
      },
    },
    {
      id: "liveJobs",
      label: "Anlık İşler",
      icon: "flash-outline",
      onPress: () => {
        onClose();
        navigation.navigate("LiveJobs" as never);
      },
    },
    {
      id: "orders",
      label: "Siparişlerim",
      icon: "receipt-outline",
      onPress: () => {
        onClose();
        navigation.navigate("OrdersScreen" as never);
      },
    },
    {
      id: "inbox",
      label: "Mesajlar",
      icon: "chatbubbles-outline",
      onPress: () => {
        onClose();
        navigation.navigate("InboxScreen" as never);
      },
    },
    {
      id: "notifications",
      label: "Bildirimler",
      icon: "notifications-outline",
      onPress: () => {
        onClose();
        navigation.navigate("NotificationsScreen" as never);
      },
    },
    {
      id: "profile",
      label: "Profil",
      icon: "person-outline",
      onPress: () => {
        onClose();
        navigation.navigate("Profile" as never);
      },
    },
    {
      id: "settings",
      label: "Ayarlar",
      icon: "settings-outline",
      onPress: () => {
        onClose();
        navigation.navigate("Settings" as never);
      },
    },
    {
      id: "referral",
      label: "Referans Programı",
      icon: "gift-outline",
      onPress: () => {
        onClose();
        navigation.navigate("ReferralScreen" as never);
      },
    },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Overlay */}
        <Animated.View
          style={[
            styles.overlay,
            {
              opacity: overlayOpacity,
            },
          ]}
        >
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={onClose}
          />
        </Animated.View>

        {/* Menu Panel */}
        <Animated.View
          style={[
            styles.menuPanel,
            {
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          {/* Menu Header */}
          <View style={styles.menuHeader}>
            <Text style={styles.menuTitle}>Menü</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.textDark} />
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          <View style={styles.menuItems}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={item.onPress}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color={colors.textDark}
                />
                <Text style={styles.menuItemText}>{item.label}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.textMuted}
                />
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menuPanel: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: width * 0.8,
    maxWidth: 320,
    backgroundColor: colors.cardBg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  menuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingTop: spacing.xl + spacing.md,
  },
  menuTitle: {
    ...typography.h2,
    fontSize: 24,
    color: colors.textDark,
    fontWeight: "700",
  },
  closeButton: {
    padding: spacing.xs,
  },
  menuItems: {
    paddingVertical: spacing.md,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: colors.textDark,
    fontWeight: "500",
  },
});
