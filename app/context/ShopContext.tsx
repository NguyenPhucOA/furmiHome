"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/app/components/FeaturedProducts/useFeaturedProducts";

interface CartItem extends Product {
  quantity: number;
}

interface ShopContextType {
  favorites: Product[];
  cart: CartItem[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("favorites");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Save to localStorage when favorites change
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  // Save to localStorage when cart changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToFavorites = (product: Product) => {
    setFavorites((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromFavorites = (productId: number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== productId));
  };

  const isFavorite = (productId: number) => {
    return favorites.some((item) => item.id === productId);
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <ShopContext.Provider
      value={{
        favorites,
        cart,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
