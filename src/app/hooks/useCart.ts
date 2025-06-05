"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (item) => {
        const existingItem = get().cartItems.find((i) => i.id === item.id);
        if (existingItem) {
          return set({
            cartItems: get().cartItems.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        }
        return set({
          cartItems: [...get().cartItems, { ...item, quantity: 1 }],
        });
      },
      removeFromCart: (id) =>
        set({
          cartItems: get().cartItems.filter((item) => item.id !== id),
        }),
      updateQuantity: (id, quantity) =>
        set({
          cartItems: get().cartItems.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }),
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);

export function useCartItems() {
  const cartItems = useCart((state) => state.cartItems);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return {
    cartItems,
    totalPrice,
  };
}
