"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types/brand';
import { CartStore } from '@/features/cart/types';

const STORAGE_KEY = 'branda-soi-cart';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item: CartItem) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.serviceId === item.serviceId && (i.variantId || '') === (item.variantId || ''),
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.serviceId === item.serviceId && (i.variantId || '') === (item.variantId || '')
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            };
          }
          return { items: [...state.items, item] };
        });
      },
      remove: (serviceId: string, variantId: string) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.serviceId === serviceId && (i.variantId || '') === (variantId || '')),
          ),
        }));
      },
      updateQty: (serviceId: string, variantId: string, qty: number) => {
        if (qty <= 0) {
          get().remove(serviceId, variantId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.serviceId === serviceId && (i.variantId || '') === (variantId || '')
              ? { ...i, quantity: qty }
              : i,
          ),
        }));
      },
      clear: () => set({ items: [] }),
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
      getItems: () => get().items,
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
