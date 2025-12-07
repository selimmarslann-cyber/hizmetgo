import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createNavigationContainerRef } from "@react-navigation/native";
import { BottomTabs } from "./BottomTabs";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import LiveJobsScreen from "../screens/LiveJobsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import UserRegisterScreen from "../screens/UserRegisterScreen";
import VendorRegisterScreen from "../screens/VendorRegisterScreen";
import VendorProfileScreen from "../screens/VendorProfileScreen";
import JobDetailScreen from "../screens/JobDetailScreen";
import OrderFlowScreen from "../screens/OrderFlowScreen";
import TermsScreen from "../screens/TermsScreen";
import PrivacyScreen from "../screens/PrivacyScreen";
import ReferralScreen from "../screens/ReferralScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import OrdersScreen from "../screens/OrdersScreen";
import OrderChatScreen from "../screens/OrderChatScreen";
import InboxScreen from "../screens/InboxScreen";
import OrderDetailScreen from "../screens/OrderDetailScreen";

const Stack = createNativeStackNavigator();

export const navigationRef = createNavigationContainerRef();

export function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Main Tabs */}
      <Stack.Screen name="MainTabs" component={BottomTabs} />

      {/* Modal/Stack Screens */}
      <Stack.Screen
        name="JobDetail"
        component={JobDetailScreen}
        options={{ presentation: "card" }}
      />
      <Stack.Screen
        name="VendorProfile"
        component={VendorProfileScreen}
        options={{ presentation: "card" }}
      />
      <Stack.Screen
        name="UserRegister"
        component={UserRegisterScreen}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="VendorRegister"
        component={VendorRegisterScreen}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="OrderFlow"
        component={OrderFlowScreen}
        options={{ presentation: "card" }}
      />
      <Stack.Screen
        name="TermsScreen"
        component={TermsScreen}
        options={{ presentation: "card", title: "Kullanıcı Sözleşmesi" }}
      />
      <Stack.Screen
        name="PrivacyScreen"
        component={PrivacyScreen}
        options={{ presentation: "card", title: "Gizlilik Politikası" }}
      />
      <Stack.Screen
        name="ReferralScreen"
        component={ReferralScreen}
        options={{ presentation: "card", title: "Sıfır Yatırımla Ortak Ol" }}
      />
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{ presentation: "card", title: "Bildirimler" }}
      />
      <Stack.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={{ presentation: "card", title: "Siparişler" }}
      />
      <Stack.Screen
        name="OrderChatScreen"
        component={OrderChatScreen}
        options={{ presentation: "card", title: "Sohbet" }}
      />
      <Stack.Screen
        name="InboxScreen"
        component={InboxScreen}
        options={{ presentation: "card", title: "Gelen Kutusu" }}
      />
      <Stack.Screen
        name="OrderDetailScreen"
        component={OrderDetailScreen}
        options={{ presentation: "card", title: "Sipariş Detayı" }}
      />
    </Stack.Navigator>
  );
}
