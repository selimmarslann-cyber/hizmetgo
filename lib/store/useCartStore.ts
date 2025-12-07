/**
 * Global Cart Store (Zustand)
 *
 * Sepet yönetimi için global state store.
 * localStorage ile senkronize edilir.
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string; // Unique cart item ID (productId + businessId kombinasyonu)
  productId: string;
  businessId: string;
  businessName?: string;
  productName: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (
    item: Omit<CartItem, "id" | "quantity"> & { quantity?: number },
  ) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  getItemsByBusiness: (businessId: string) => CartItem[];
}

/**
 * Generate unique cart item ID
 */
function generateCartItemId(productId: string, businessId: string): string {
  return `${businessId}_${productId}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const itemId = generateCartItemId(item.productId, item.businessId);
        const existingItems = get().items;
        const existingItem = existingItems.find((i) => i.id === itemId);

        if (existingItem) {
          // Item already exists, increase quantity
          set({
            items: existingItems.map((i) =>
              i.id === itemId
                ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                : i,
            ),
          });
        } else {
          // New item
          set({
            items: [
              ...existingItems,
              {
                ...item,
                id: itemId,
                quantity: item.quantity || 1,
              },
            ],
          });
        }
      },

      removeItem: (itemId) => {
        set({
          items: get().items.filter((i) => i.id !== itemId),
        });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        set({
          items: get().items.map((i) =>
            i.id === itemId ? { ...i, quantity } : i,
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotal: () => {
        return get().items.reduce(
          (sum, item) =>
            sum + parseFloat(item.price.toString()) * item.quantity,
          0,
        );
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getItemsByBusiness: (businessId) => {
        return get().items.filter((i) => i.businessId === businessId);
      },
    }),
    {
      name: "mahallem-cart", // localStorage key
      storage: createJSONStorage(() => localStorage),
      // SSR safety: Only persist in client
      skipHydration: false,
    },
  ),
);
