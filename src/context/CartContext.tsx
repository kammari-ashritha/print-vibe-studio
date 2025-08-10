import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

type CartOption = { label: string; value: string };
export type CartItem = {
  id: string;
  productId: string;
  name: string;
  options: Record<string, string>;
  quantity: number;
  unitPrice: number; // in cents
  artworkPreviewUrl?: string;
};

type CartState = { items: CartItem[] };

type CartContextType = {
  state: CartState;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clear: () => void;
  subtotal: number; // in cents
  count: number; // total items
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: any): CartState {
  switch (action.type) {
    case "ADD": {
      const id = crypto.randomUUID();
      const next = { ...state, items: [{ id, ...action.payload }, ...state.items] };
      return next;
    }
    case "REMOVE": {
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    }
    case "QTY": {
      const items = state.items.map((i) => (i.id === action.id ? { ...i, quantity: Math.max(1, action.qty) } : i));
      return { ...state, items };
    }
    case "CLEAR": {
      return { items: [] };
    }
    default:
      return state;
  }
}

const STORAGE_KEY = "lovable_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartState) : { items: [] };
    } catch {
      return { items: [] };
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<CartContextType>(() => {
    const subtotal = state.items.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0);
    const count = state.items.reduce((acc, i) => acc + i.quantity, 0);
    return {
      state,
      addItem: (item) => dispatch({ type: "ADD", payload: item }),
      removeItem: (id) => dispatch({ type: "REMOVE", id }),
      updateQuantity: (id, qty) => dispatch({ type: "QTY", id, qty }),
      clear: () => dispatch({ type: "CLEAR" }),
      subtotal,
      count,
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
