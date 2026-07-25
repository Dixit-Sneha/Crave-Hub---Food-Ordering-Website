"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
};

type CartContextType = {
  items: CartItem[];
  restaurantId: string | null;
  addItem: (item: CartItem, restaurantId: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalAmount: number;
  totalItems: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cravebite_cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        setItems(parsed.items || []);
        setRestaurantId(parsed.restaurantId || null);
      }
    } catch (e) {
      // Ignore
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cravebite_cart", JSON.stringify({ items, restaurantId }));
  }, [items, restaurantId]);

  const addItem = (item: CartItem, resId: string) => {
    if (restaurantId && restaurantId !== resId) {
      if (!window.confirm("Adding items from a different restaurant will clear your current cart. Proceed?")) {
        return;
      }
      setItems([{ ...item }]);
      setRestaurantId(resId);
      return;
    }

    setRestaurantId(resId);
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      if (updated.length === 0) setRestaurantId(null);
      return updated;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, quantity } : i));
  };

  const clearCart = () => {
    setItems([]);
    setRestaurantId(null);
  };

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, restaurantId, addItem, removeItem, updateQuantity, clearCart, totalAmount, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
