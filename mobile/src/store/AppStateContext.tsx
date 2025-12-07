/**
 * AppStateContext - Mobile
 *
 * FAZ 2: Backend API'lerine bağlandı.
 * Mock data sadece fallback olarak kullanılıyor (dev ortamı için).
 */

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mockVendors } from "../data/mockVendors";
import { mockCategories } from "../data/mockCategories";
import { mockKeywords } from "../data/mockKeywords";
import * as authApi from "../api/auth";
import type { User } from "../types/domain";

export type UserRole = "guest" | "customer" | "vendor";

export type OrderStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface UserProfile {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  neighborhood?: string;
  avatarUrl?: string | null;
  role: UserRole;
}

export interface VendorProfile {
  id: string;
  name: string;
  businessName: string;
  phone: string;
  category: string;
  rating: number;
  location: {
    lat: number;
    lng: number;
    city: string;
    district: string;
    neighborhood: string;
  };
  about?: string;
  menu: Array<{
    id: string;
    name: string;
    price: number;
    description?: string;
  }>;
}

export interface Order {
  id: string;
  customerId: string;
  vendorId: string;
  serviceId?: string;
  description: string;
  budget?: { min?: number; max?: number };
  scheduledFor: string;
  status: OrderStatus;
  createdAt: string;
}

export interface Keyword {
  id: string;
  label: string;
  categoryId?: string;
  tags?: string[];
}

export interface AppState {
  currentUser: UserProfile | null;
  currentVendor: VendorProfile | null;
  authToken: string | null;
  isLoadingAuth: boolean;
  isLoggedIn: boolean;
  vendors: VendorProfile[];
  orders: Order[];
  keywords: Keyword[];
  selectedCategoryId?: string;
  selectedVendorId?: string;
}

export interface AppActions {
  loginAsCustomer: (email: string, password: string) => Promise<void>;
  loginAsVendor: (email: string, password: string) => Promise<void>;
  registerUser: (
    email: string,
    password: string,
    name: string,
  ) => Promise<void>;
  registerVendor: (
    email: string,
    password: string,
    name: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  registerVendorMenuItem: (
    vendorId: string,
    item: { name: string; price: number; description?: string },
  ) => void;
  setSelectedCategoryId: (categoryId?: string) => void;
  setSelectedVendorId: (vendorId?: string) => void;
  createOrder: (orderInput: {
    vendorId: string;
    serviceId?: string;
    description: string;
    scheduledFor: string;
    budget?: { min?: number; max?: number };
  }) => void;
}

const AUTH_TOKEN_KEY = "@mahallem:authToken";
const USER_DATA_KEY = "@mahallem:userData";

const AppStateContext = createContext<AppState | undefined>(undefined);
const AppActionsContext = createContext<AppActions | undefined>(undefined);

// Convert mock vendors to VendorProfile format (fallback)
const convertMockVendorsToProfiles = (): VendorProfile[] => {
  return mockVendors.map((v) => ({
    id: v.id.toString(),
    name: v.name.split(" ")[0] || v.name,
    businessName: v.name,
    phone: "+90 555 000 00 00",
    category: v.category,
    rating: v.rating,
    location: {
      lat: v.lat,
      lng: v.lng,
      city: "Tekirdağ",
      district: "Süleymanpaşa",
      neighborhood: "Aydoğdu Mahallesi",
    },
    about: v.description,
    menu: [],
  }));
};

// Convert backend User to UserProfile
const convertUserToProfile = (
  user: User,
  role: UserRole = "customer",
): UserProfile => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl,
    role,
  };
};

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [currentVendor, setCurrentVendor] = useState<VendorProfile | null>(
    null,
  );
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [vendors, setVendors] = useState<VendorProfile[]>(() =>
    convertMockVendorsToProfiles(),
  );
  const [orders, setOrders] = useState<Order[]>([]);
  const [keywords] = useState<Keyword[]>(mockKeywords);
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | undefined
  >();
  const [selectedVendorId, setSelectedVendorId] = useState<
    string | undefined
  >();

  // Initialize auth state from AsyncStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
        const storedUserData = await AsyncStorage.getItem(USER_DATA_KEY);

        if (storedToken && storedUserData) {
          // Verify token by fetching user data
          try {
            const { user } = await authApi.getMe(storedToken);
            const userProfile = convertUserToProfile(user, "customer");

            setAuthToken(storedToken);
            setCurrentUser(userProfile);

            // Save updated user data
            await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
          } catch (error) {
            // Token invalid, clear storage
            console.error("Token validation failed:", error);
            await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, USER_DATA_KEY]);
            setAuthToken(null);
            setCurrentUser(null);
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setIsLoadingAuth(false);
      }
    };

    initializeAuth();
  }, []);

  const loginAsCustomer = useCallback(
    async (email: string, password: string) => {
      try {
        setIsLoadingAuth(true);
        const response = await authApi.loginWithEmail(email, password, false);

        const userProfile = convertUserToProfile(response.user, "customer");

        setAuthToken(response.sessionToken);
        setCurrentUser(userProfile);
        setCurrentVendor(null);

        // Save to AsyncStorage
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, response.sessionToken);
        await AsyncStorage.setItem(
          USER_DATA_KEY,
          JSON.stringify(response.user),
        );
      } catch (error: any) {
        console.error("Login error:", error);
        throw new Error(error.message || "Giriş yapılamadı");
      } finally {
        setIsLoadingAuth(false);
      }
    },
    [],
  );

  const loginAsVendor = useCallback(async (email: string, password: string) => {
    try {
      setIsLoadingAuth(true);
      const response = await authApi.loginWithEmail(email, password, true);

      const userProfile = convertUserToProfile(response.user, "vendor");

      setAuthToken(response.sessionToken);
      setCurrentUser(userProfile);
      setCurrentVendor(null); // Vendor profile will be loaded separately if needed

      // Save to AsyncStorage
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, response.sessionToken);
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(response.user));
    } catch (error: any) {
      console.error("Vendor login error:", error);
      throw new Error(error.message || "Giriş yapılamadı");
    } finally {
      setIsLoadingAuth(false);
    }
  }, []);

  const registerUser = useCallback(
    async (email: string, password: string, name: string) => {
      try {
        setIsLoadingAuth(true);
        const response = await authApi.registerUser({ email, password, name });

        const userProfile = convertUserToProfile(response.user, "customer");

        setAuthToken(response.sessionToken);
        setCurrentUser(userProfile);
        setCurrentVendor(null);

        // Save to AsyncStorage
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, response.sessionToken);
        await AsyncStorage.setItem(
          USER_DATA_KEY,
          JSON.stringify(response.user),
        );
      } catch (error: any) {
        console.error("Register error:", error);
        throw new Error(error.message || "Kayıt olunamadı");
      } finally {
        setIsLoadingAuth(false);
      }
    },
    [],
  );

  const registerVendor = useCallback(
    async (email: string, password: string, name: string) => {
      try {
        setIsLoadingAuth(true);
        const response = await authApi.registerVendor({
          email,
          password,
          name,
        });

        const userProfile = convertUserToProfile(response.user, "vendor");

        setAuthToken(response.sessionToken);
        setCurrentUser(userProfile);
        setCurrentVendor(null);

        // Save to AsyncStorage
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, response.sessionToken);
        await AsyncStorage.setItem(
          USER_DATA_KEY,
          JSON.stringify(response.user),
        );
      } catch (error: any) {
        console.error("Vendor register error:", error);
        throw new Error(error.message || "Kayıt olunamadı");
      } finally {
        setIsLoadingAuth(false);
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      setAuthToken(null);
      setCurrentUser(null);
      setCurrentVendor(null);
      setSelectedCategoryId(undefined);
      setSelectedVendorId(undefined);

      // Clear AsyncStorage
      await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, USER_DATA_KEY]);
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, []);

  const registerVendorMenuItem = useCallback(
    (
      vendorId: string,
      item: { name: string; price: number; description?: string },
    ) => {
      setVendors((prev) =>
        prev.map((v) =>
          v.id === vendorId
            ? {
                ...v,
                menu: [
                  ...v.menu,
                  {
                    id: `item-${Date.now()}`,
                    name: item.name,
                    price: item.price,
                    description: item.description,
                  },
                ],
              }
            : v,
        ),
      );
    },
    [],
  );

  const createOrder = useCallback(
    (orderInput: {
      vendorId: string;
      serviceId?: string;
      description: string;
      scheduledFor: string;
      budget?: { min?: number; max?: number };
    }) => {
      if (!currentUser || currentUser.role !== "customer") {
        return;
      }

      const newOrder: Order = {
        id: `order-${Date.now()}`,
        customerId: currentUser.id,
        vendorId: orderInput.vendorId,
        serviceId: orderInput.serviceId,
        description: orderInput.description,
        scheduledFor: orderInput.scheduledFor,
        budget: orderInput.budget,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      setOrders((prev) => [...prev, newOrder]);
    },
    [currentUser],
  );

  const isLoggedIn = authToken !== null && currentUser !== null;

  const state: AppState = {
    currentUser,
    currentVendor,
    authToken,
    isLoadingAuth,
    isLoggedIn,
    vendors,
    orders,
    keywords,
    selectedCategoryId,
    selectedVendorId,
  };

  const actions: AppActions = {
    loginAsCustomer,
    loginAsVendor,
    registerUser,
    registerVendor,
    logout,
    registerVendorMenuItem,
    setSelectedCategoryId,
    setSelectedVendorId,
    createOrder,
  };

  return (
    <AppStateContext.Provider value={state}>
      <AppActionsContext.Provider value={actions}>
        {children}
      </AppActionsContext.Provider>
    </AppStateContext.Provider>
  );
};

export const useAppState = (): AppState => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return context;
};

export const useAppActions = (): AppActions => {
  const context = useContext(AppActionsContext);
  if (!context) {
    throw new Error("useAppActions must be used within AppStateProvider");
  }
  return context;
};
